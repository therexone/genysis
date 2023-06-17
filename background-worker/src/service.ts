import * as dotenv from "dotenv";
import express from "express";
import expressWinston from "express-winston";
import { Queue } from "bullmq";
import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter.js";
import { ExpressAdapter } from "@bull-board/express";
import bodyParser from "body-parser";
import { logger } from "./logger";
import { RateLimitMiddleware } from "./rate-limiter";
import { getJobDataFromRequest } from "./utils";

dotenv.config();

// Connect to an existing queue (if found), or, create a new queue in Redis.
const queue = new Queue("queue", {
  connection: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
});

// Creating an Express application.
const app = express();

const jsonParser = bodyParser.json();

// Adding logger middleware (Winston) and ignoring routes related to bull-board.
app.use(
  expressWinston.logger({
    expressFormat: true,
    ignoreRoute: (request) => request.path.startsWith("/queues"),
    meta: false,
    winstonInstance: logger,
  })
);

// Create express application for bull-board that subscribes to specific queues
// then attach the application to a top-level route.
const serverAdapter = new ExpressAdapter();

serverAdapter.setBasePath("/queues");

app.use("/queues", serverAdapter.getRouter());
createBullBoard({
  queues: [new BullMQAdapter(queue)],
  serverAdapter,
});

// GET endpoint to look up information on a particular job by ID.
app.get("/queue/job/:id", async (request, response) => {
  const job = await queue.getJob(request.params.id);

  if (job === null) {
    response.status(404).end();
  } else {
    response.json({ job });
  }
});

// Adding rate limited for subsequent routes.
app.use(RateLimitMiddleware);

app.post("/queue/job", jsonParser, async (_request, response) => {
  try {
    const jobData = getJobDataFromRequest(_request);

    const job = await queue.add("Download and send email", jobData, {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 1000,
      },
    });

    response.status(200).json({ job });
  } catch (error) {
    response.status(500).json({ error });
  }
});

// Making the Express application listen for connections.
app.listen(5000, function onListening(this: any) {
  logger.info(`Listening on port ${this.address().port}.`);
});
