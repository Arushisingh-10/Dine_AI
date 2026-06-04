const router = require('express').Router();
const Groq = require('groq-sdk');

router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'system',
          content: `You are a helpful AI assistant for "Dine AI", an Indian restaurant. 
          Our menu includes: Butter Chicken (₹320), Paneer Tikka (₹280), Biryani (₹350), 
          Gulab Jamun (₹120), Dal Makhani (₹260).
          Answer customer questions about food, recommendations, and orders.
          Keep responses short, friendly and helpful.`
        },
        { role: 'user', content: message }
      ]
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;