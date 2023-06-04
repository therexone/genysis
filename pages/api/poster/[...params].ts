import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const posterUrl = "http://library.lol/covers/";
  try {
    const [id, md5WithExtension] = req.query.params as string[];

    const resp = await fetch(`${posterUrl}${id}/${md5WithExtension}`);

    if (!resp.ok) {
      return res.status(404).send("Not found");
    }

    const blob = await resp.blob();

    res.setHeader("Content-Type", blob.type || "image/png");

    const buffer = await blob.arrayBuffer();

    return res.send(Buffer.from(buffer));
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
}
