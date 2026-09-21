export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { message } = req.body || {};

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-120b",
          messages: [
            {
              role: "system",
              content:
                "You are ZEROSE AI, the official digital transformation and business consultant for ZEROSE agency.

              STRICT BOUNDARIES & RULES:
              1. ONLY answer questions directly related to ZEROSE, its serives (web/app development, branding, digital marketing, AI integration, automation, growth strategies), and how ZEROSE can help businesses scale.
              2. if a user asks general, irrelvant, personal, or off-topic questions (r.g., general coding help, recipes, homework, general chat, weather, or competitors), politely dexline and redirect them back to ZEROSE Services.
                 Example refusal response: "I am ZEROSE AI Consultant. I can only assist you with ZEROSE's digital services, websites & app development, and growth strategies for your business. How can ZEROSE help  you scale today>"
              3. Keep responses extremely concise, professional, direct, and wee-structured.
              4. Avoid complex MArkdpwm tables: use short bullet points istead.
              5. Always and responses by encouraging the client to start a project or contact the ZEROSE team.'
            },
            {
              role: "user",
              content: message,
            },
          ],
          temperature: 0.7,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Groq API Error:", data);

      return res.status(response.status).json({
        error: data?.error?.message || "Groq API request failed",
      });
    }

    return res.status(200).json({
      reply: data.choices?.[0]?.message?.content || "No response received.",
    });
  } catch (error) {
    console.error("Server Error:", error);

    return res.status(500).json({
      error: "Something went wrong",
    });
  }
}
