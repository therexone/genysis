import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from "node:stream";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const base64Url = (req.query.url as string).slice(0, -5);
  const url = Buffer.from(base64Url, "base64").toString("utf-8");

  console.log(url);

  try {
    const dlResponse = await fetch(url);
    const readableStream = dlResponse.body as unknown as NodeJS.ReadableStream;

    res.setHeader(
      "Content-disposition",
      "attachment; filename=" + url.split("/").pop() + '"'
    );

    res.writeHead(200, {
      "Content-Type": "application/octet-stream",
    });

    // @ts-expect-error 
    const downloadStream = Readable.fromWeb(readableStream);

    await new Promise(function (resolve) {
      downloadStream.pipe(res).on("finish", resolve);
    });
  } catch (error) {
    console.error(error);
    return res.redirect(307, url);
  }
}
