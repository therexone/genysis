//

export default async function handler(req, res) {
  const posterUrl = "http://library.lol/covers/";
  try {
    const [id, md5WithExtension] = req.query.params;
    const resp = await fetch(`${posterUrl}${id}/${md5WithExtension}`);
    if (!resp.ok) {
      return res.status(404).send("Not found");
    }
    const blob = await resp.blob();
    res.type = "image/jpeg";
    return blob.arrayBuffer().then((buf) => {
      res.send(Buffer.from(buf));
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
}
