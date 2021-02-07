const axios = require("axios");

export default async function handler(req, res) {
  try {
    const base64Url = req.query.url.slice(0,-5);
    const url = Buffer.from(base64Url, "base64").toString("utf-8");

    console.log(url);

    const response = await axios({
      method: "get",
      url: url,
      responseType: "stream",
    });

    const headerLine = response.headers["content-disposition"];
    const startFileNameIndex = headerLine.indexOf('"') + 1;
    const endFileNameIndex = headerLine.lastIndexOf('"');
    const filename = headerLine.substring(startFileNameIndex, endFileNameIndex);
    console.log(filename);
    
    return response.data.pipe(res);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
}
