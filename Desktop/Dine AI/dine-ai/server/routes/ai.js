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
    const { image } = req.body;
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const completion = await groq.chat.completions.create({
      model: 'meta-llama/llama-4-scout-17b-16e-instruct',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: { url: `data:image/jpeg;base64,${image}` }
            },
            {
              type: 'text',
              text: `You are a food expert AI for "Dine AI" restaurant. 
              Look at this food image and tell:
              1. What dish is this?
              2. Key ingredients you can see
              3. Similar item from our menu: Butter Chicken (₹320), Paneer Tikka (₹280), Biryani (₹350), Gulab Jamun (₹120), Dal Makhani (₹260)
              Keep it short and friendly!`
            }
          ]
        }
      ]
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/sentiment', async (req, res) => {
  try {
    const { review } = req.body;
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'system',
          content: `You are a sentiment analysis AI. Analyze the given review and respond ONLY in this exact JSON format:
          {
            "sentiment": "positive" or "negative" or "neutral",
            "score": a number between 0 and 100,
            "emoji": "😊" or "😠" or "😐",
            "summary": "one line summary in English"
          }
          Nothing else. Only JSON.`
        },
        { role: 'user', content: review }
      ]
    });

    const text = completion.choices[0].message.content;
    const clean = text.replace(/```json|```/g, '').trim();
    const result = JSON.parse(clean);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/calories', async (req, res) => {
  try {
    const { dish } = req.body;
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'system',
          content: `You are a nutrition expert AI. When given a dish name, respond ONLY in this exact JSON format:
          {
            "dish": "dish name",
            "calories": number,
            "protein": "Xg",
            "carbs": "Xg",
            "fat": "Xg",
            "fiber": "Xg",
            "serving": "serving size",
            "healthScore": number between 1-10,
            "verdict": "one line health verdict",
            "tips": "one healthy eating tip"
          }
          Only JSON. No extra text.`
        },
        { role: 'user', content: `Dish: ${dish}` }
      ]
    });

    const text = completion.choices[0].message.content;
    const clean = text.replace(/```json|```/g, '').trim();
    const result = JSON.parse(clean);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;