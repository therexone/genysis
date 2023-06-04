import { searchQuery } from "@/src/utils/search";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {
      query: { query },
    } = req;
    const books = await searchQuery(query as string);

    console.log(books);

    return res.json({
      results: books ? books.length : 0,
      books,
    });
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
}
