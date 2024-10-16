export default async function handler(req, res) {
  res.status(200).json({ data: global.callbackMetadata });
  global.callbackMetadata = null;
}
