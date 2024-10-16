export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log(req);
    global.callbackMetadata = req.body.callbackMetadata;

    res.status(200).json({ data: req.body.callbackMetadata });
  } else if (req.method === "GET") {
    res.status(405).json({ error: "Method not allowed" });
  }
}
