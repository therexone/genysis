const libgen = require("../../../src/search");

export default async function handler(req, res) {
  try {
    const {
      query: { query },
    } = req;
    const books = await libgen(query);

    return res.json({
      results: books ? books.length : 0,
      books,
    });
  } catch (err) {
    console.dir(err);
    return res.status(500).send("Internal Server Error");
  }
}
