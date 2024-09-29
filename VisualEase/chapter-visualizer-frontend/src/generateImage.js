const axios = require('axios');

const generateImage = async (prompt) => {
  try {
    const response = await axios.post('https://api.craiyon.com/v3/generate', {
      prompt: prompt,
      model: 'dalle-mini',
      version: 'latest',
    });

    const images = response.data.images; // Array of images
    console.log('Generated Images:', images);
  } catch (error) {
    console.error('Error generating image:', error);
  }
};

// Call the function with a prompt
generateImage("a futuristic cityscape");
