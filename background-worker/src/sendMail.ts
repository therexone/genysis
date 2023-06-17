import mailjet from "node-mailjet";
import fs from "fs";
import path from "path";
import { log } from "winston";

export const sendEmail = async (filePath: string, recipientEmail: string) => {
  try {
    // Read the file as binary data and convert it to Base64
    const fileContent = fs.readFileSync(filePath);
    const base64File = fileContent.toString("base64");

    // Extract the filename from the file path
    const filename = path.basename(filePath);

    const client = mailjet.apiConnect(
      process.env.MJ_API_KEY as string,
      process.env.MJ_SECRET_KEY as string
    );

    const result = await client.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: process.env.MJ_SENDER_EMAIL as string,
            Name: "Genysis EPUB",
          },
          To: [
            {
              Email: recipientEmail,
            },
          ],
          Subject: "Your EPUB file is ready!",
          TextPart:
            "This email was sent to you because you requested an EPUB file on Genysis",
          Attachments: [
            {
              ContentType: "application/epub+zip",
              Filename: filename,
              Base64Content: base64File,
            },
          ],
        },
      ],
    });

    console.log("Email sent successfully", result.body);
    return true;
  } catch (error: any) {
    log("error", "Failed to send email", {
      statusCode: error.statusCode,
      message: error.message,
    });
    console.error("Failed to send email", error.statusCode, error.message);
    return false;
  }
};
