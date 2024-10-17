import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method == "POST") {
    const { issue } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: {
        role: "system",
        content: [
          {
            type: "text",
            text: `You are a medical tool that receives issues from patients and gives them a suggestion of the speciality of the doctor to see (eg. for heart related matters , suggest cardiologist) . A patient has the following issue: ${issue}. What speciality should he/she see? Speciality :  `,
          },
        ],
      },
    });

    console.log(completion.choices[0].message);

    let specialist = "General Practitioner";
    res.status(200).json({ specialist });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
