const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'system',
            content: 'You are ZEROSE AI, the official consultant for ZEROSE agency. ONLY answer questions about ZEROSE services (web/app development, branding, marketing, AI, automation, business growth). Politely refuse any off-topic, personal, or general questions (like jokes, recipes, weather) and redirect users to ZEROSE digital services. Keep answers concise, professional, and clear without Markdown tables.'
          },
          { role: 'user', content: message }
        ]
      })
    });

    const data = await response.json();

    if (data.error) {
      console.error('Groq API Error:', data.error);
      return res.status(500).json({ error: data.error.message || 'Groq API error' });
    }

    const reply = data.choices?.[0]?.message?.content || 'No response from AI.';
    res.json({ reply });

  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

