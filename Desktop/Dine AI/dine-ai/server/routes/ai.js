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

router.post('/scan', async (req, res) => {
  try {
    const { imageName } = req.body;
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'system',
          content: `You are a food expert AI for "Dine AI" restaurant.
          When given a food name or description, tell:
          1. What dish this might be
          2. Key ingredients
          3. Similar item from our menu: Butter Chicken (₹320), Paneer Tikka (₹280), Biryani (₹350), Gulab Jamun (₹120), Dal Makhani (₹260)
          Keep it short and friendly!`
        },
        {
          role: 'user',
          content: `I uploaded an image named: ${imageName}. What food dish could this be?`
        }
      ]
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;