import * as dotenv from "dotenv";
import { Worker, Job } from "bullmq";
import { logger } from "./logger.js";
import download from "./download.js";
import { sendEmail } from "./sendMail.js";
import { unlinkSync } from "fs";

dotenv.config();

// Defines a processing function for jobs in the queue.
const processingFunc = async (
  job: Job
): Promise<{
  emailSent: boolean;
  sentAt: number;
}> => {
  logger.info(`Processing Job ID #${job.id}`, { data: job.data });
  await job.log("Beginning processing...");

  const { url, email } = job.data;
  try {
    // download the file
    await job.log("Downloading file...");
    const filePath = await download(url);

    // send the email
    await job.log("Sending email...");

    await sendEmail(filePath, email);

    // delete the file
    await job.log("Deleting file...");
    unlinkSync(filePath);

    await job.log("File deleted.");

    logger.info(`Successfully processed Job ID #${job.id}`);

    return { emailSent: true, sentAt: new Date().getTime() };
  } catch (error) {
    logger.error(`Failed to process Job ID #${job.id}`, error);
    throw error;
  }
};

// Instantiate the worker, connect to redis and attach to the queue name.
const queueWorker = new Worker("queue", processingFunc, {
  connection: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
});

// Logging to the console every time a job is completed successfully.
queueWorker.on("completed", (job, returnValue) => {
  logger.info(`Job with id ${job.id} has been completed.`, returnValue);
});
