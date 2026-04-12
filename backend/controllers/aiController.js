const OpenAI = require('openai');
const House = require('../models/House');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
    console.log(err.message);
    res.status(500).json({ message: 'AI service failed, try again later' });
  }
};

const aiSearch = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ message: 'Please provide a search query' });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You extract search filters from a natural language house search query.
Return ONLY valid JSON with these fields (leave out fields that are not mentioned):
- "location": string (city name)
- "type": one of "rent", "sale", or "exchange"
- "maxPrice": number
- "minPrice": number

Example input: "I want a house for rent in Amsterdam under 1500"
Example output: {"location":"Amsterdam","type":"rent","maxPrice":1500}`,
        },
        {
          role: 'user',
          content: query,
        },
      ],
    });

    let filters = {};
    try {
      filters = JSON.parse(response.choices[0].message.content);
    } catch (e) {
      return res.status(500).json({ message: 'Could not understand the query, try again' });
    }

    const dbFilter = {};

    if (filters.location) {
      dbFilter.location = { $regex: filters.location, $options: 'i' };
    }
    if (filters.type) {
      dbFilter.type = filters.type;
    }
    if (filters.minPrice || filters.maxPrice) {
      dbFilter.price = {};
      if (filters.minPrice) dbFilter.price.$gte = filters.minPrice;
      if (filters.maxPrice) dbFilter.price.$lte = filters.maxPrice;
    }

    const houses = await House.find(dbFilter).populate('owner', 'name email');

    res.json({ filters, houses });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'AI search failed, try again later' });
  }
};

module.exports = { improveDescription, aiSearch };
