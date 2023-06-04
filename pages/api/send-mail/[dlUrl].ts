const axios = require("axios");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  try {
    const base64Url = req.query.dlUrl.slice(0, -5);
    const url = Buffer.from(base64Url, "base64").toString("utf-8");

    const response = await axios({
      method: "get",
      url: url,
    });

    const headerLine = response.headers["content-disposition"];
    console.log(
      "%c[dlUrl].js line:17 headerline",
      "color: #007acc;",
      headerLine
    );
    const startFileNameIndex = headerLine.indexOf('"') + 1;
    const endFileNameIndex = headerLine.lastIndexOf('"');
    const filename = headerLine.substring(startFileNameIndex, endFileNameIndex);

    const email = req.query.mail;
    if (!email) {
      return res.status(400).send({ error: "No email in query" });
    }

    const msg = {
      to: email,
      from: "renerjake@gmail.com",
      subject: "Your e-book from Genysis",
      text: `${filename} is attached to this mail.`,
      attachments: [
        {
          content: response.data,
          filename: filename,
          disposition: headerLine,
        },
      ],
    };

    try {
      await sgMail.send(msg).then((resp) => console.log(resp[0].statusCode));
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: "Failed to send email" });
    }
    return res.status(200).end();
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
}
