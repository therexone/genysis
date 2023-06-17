import { JobData } from "./type";

export function getJobDataFromRequest(request: any): JobData {
  const { body } = request;

  if (!body) {
    throw new Error("Missing request body.");
  }

  const { url, email } = body;

  if (!url || !email) {
    throw new Error("Missing required parameters.");
  }

  return { url, email };
}
