const axios = require("axios");
const fs = require("fs");

export default async function handler(req, res) {
  try {
    const base64Url = req.query.url.slice(0, -5);
    const url = Buffer.from(base64Url, "base64").toString("utf-8");

    // console.log(url);

    const response = await axios({
      method: "get",
      url: url,
      responseType:  "stream",
    });

    const headerLine = response.headers["content-disposition"];

    res.writeHead(200, { "Content-Disposition": headerLine });


    response.data.pipe(res);

  } catch (error) {
    console.error(error);
    return res.redirect(307, url);
  }
}
