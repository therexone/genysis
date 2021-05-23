const axios = require("axios");
const fs = require("fs");

export default async function handler(req, res) {
  try {
    const base64Url = req.query.url.slice(0, -5);
    const url = Buffer.from(base64Url, "base64").toString("utf-8");

    const isAReadRequest = req.query.readmode;

    // console.log(url);

    const response = await axios({
      method: "get",
      url: url,
      responseType: isAReadRequest ? "stream" : "",
    });

    const headerLine = response.headers["content-disposition"];

    res.writeHead(200, { "Content-Disposition": headerLine });

    if (isAReadRequest) {
      return response.data.pipe(res);
    }
    res.end(response.data);
  } catch (error) {
    console.error(error);
    return res.redirect(307, url);
  }
}
