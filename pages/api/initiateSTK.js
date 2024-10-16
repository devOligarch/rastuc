const consumerKey = "6Jt2r1YMp51UfthDkYWNFgxAlGbl415k7MfeMnUZ3rwGbPUu";
const consumerSecret =
  "QamvNovy5Au9Zgn1ZDA94SH2leD2BlYG2iYt25dqUgSBu640epmgR9GD8vGMMMBJ";

export default function handler(req, res) {
  return new Promise((resolve, reject) => {
    if (req.method === "POST") {
      const base64Key = Buffer.from(
        `${consumerKey}:${consumerSecret}`
      ).toString("base64");

      let authHeaders = new Headers();
      let stkHeaders = new Headers();

      authHeaders.append("Authorization", `Basic ${base64Key}`);
      fetch(
        "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
        { headers: authHeaders }
      )
        .then((response) => response.text())
        .then((result) => {
          let { access_token } = JSON.parse(result);
          return access_token;
        })
        .then((access_token) => {
          stkHeaders.append("Content-Type", "application/json");
          stkHeaders.append("Authorization", `Bearer ${access_token}`);
          fetch(
            "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
            {
              headers: stkHeaders,
              method: "POST",
              body: JSON.stringify({
                BusinessShortCode: 174379,
                Password:
                  "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjQxMDEwMTUwNjI1",
                Timestamp: "20241010150625",
                TransactionType: "CustomerPayBillOnline",
                Amount: 1,
                PartyA: 254748920306,
                PartyB: 174379,
                PhoneNumber: 254748920306,
                CallBackURL:
                  "https://68d4-102-215-33-94.ngrok-free.app/api/mpesaCallback",
                AccountReference: "CompanyXLTD",
                TransactionDesc: "Payment of X",
              }),
            }
          )
            .then((response) => response.text())
            .then((result) => {
              res.status(200).json(result);
              resolve();
            })
            .catch((error) => {
              res.status(500).json({ error: "Failed to initiate STK" });
              resolve();
            });
        })
        .catch((error) => {
          res.status(500).json({ error: "Failed to initiate STK" });
          resolve();
        });
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
      reject();
    }
  });
}
