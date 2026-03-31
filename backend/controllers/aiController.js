const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// POST /api/ai/improve-description
const improveDescription = async (req, res) => {
  try {
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({ message: 'Please provide a description' });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful real estate copywriter. Improve the following house listing description to make it more appealing and professional. Keep it concise (2-3 sentences max).',
        },
        {
          role: 'user',
          content: description,
        },
      ],
    });

    const improvedDescription = response.choices[0].message.content;

    res.json({ improvedDescription });
  } catch (err) {
    res.status(500).json({ message: 'AI service failed, try again later' });
  }
};

module.exports = { improveDescription };
