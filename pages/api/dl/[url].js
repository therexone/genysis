export default async function handler(req, res) {
  const base64Url = req.query.url.slice(0, -5);
  const url = Buffer.from(base64Url, "base64").toString("utf-8");

  try {
    await fetch(url).then((actual) => {
      actual.headers.forEach((v, n) => res.setHeader(n, v));
      actual.body.pipe(res);
    });
  } catch (error) {
    console.error(error.response?.message ?? error.message);

    return res.redirect(307, url);
  }
}
