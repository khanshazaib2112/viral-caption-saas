export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const { topic, tone } = req.body;

  const prompt = `Generate 5 short, viral social media captions for a video about "${topic}" in a ${tone} tone.`;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer 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"
    },
    body: JSON.stringify({
      model: "mistral/mistral-7b-instruct",
      messages: [
        { role: "user", content: prompt }
      ]
    })
  });

  const data = await response.json();
  res.status(200).json(data);
}