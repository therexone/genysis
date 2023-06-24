import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { email, downloadURL } = req.body;

    if (!email || !downloadURL) {
      return res.status(400).send("Bad Request");
    }

    // console.log(email, downloadURL);

    const response = await fetch(process.env.BACKEND_URL + "/queue/job", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        url: downloadURL,
      }),
    });

    if (response.status === 429) {
      return res.status(429).send("Too Many Requests");
    }

    if (!response.ok) {
      console.log("add to queue error", response);

      return res.status(500).send("Internal Server Error");
    }

    return res.status(200).end();
  } catch (error: any) {
    console.log(error.message);
    console.log("add to queue error", parseError(String(error?.cause ?? "")));
    return res.status(500).send("Internal Server Error");
  }
}

function parseError(stackTrace: string): string {
  console.log(stackTrace);
  // Check if the stack trace contains 'fetch failed'
  // Extract the underlying cause of the error
  const causeMatch = stackTrace.match(/Error: (.*)/);
  console.log(stackTrace, causeMatch);
  const cause = causeMatch ? causeMatch[1] : "unknown cause";

  // Handle different error causes
  if (cause.includes("ECONNREFUSED")) {
    const addressMatch = stackTrace.match(/address: (.+?),/);
    const portMatch = stackTrace.match(/port: (.+?)\n/);

    const address = addressMatch ? addressMatch[1] : "unknown address";
    const port = portMatch ? portMatch[1] : "unknown port";

    return `The fetch operation failed because the connection was refused by the server at ${address} on port ${port}. This may be because the server is down or not accepting connections.`;
  } else if (cause.includes("ETIMEDOUT")) {
    return `The fetch operation failed because the request timed out. This may be due to network issues or the server taking too long to respond.`;
  } else if (cause.includes("ECONNRESET")) {
    return `The fetch operation failed because the connection was reset by the peer. This can happen if the remote server crashes or there are network issues.`;
  } else if (cause.includes("ENOTFOUND")) {
    return `The fetch operation failed because the server could not be found. Check if the server address is correct.`;
  } else {
    // Generic message for other error causes
    return `The fetch operation failed due to ${cause}.`;
  }
}
