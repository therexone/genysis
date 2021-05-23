export default async function handler(req, res) {
    const query = req.query
    return res.send({ query})

}