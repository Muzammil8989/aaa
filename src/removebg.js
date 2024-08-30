const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

export const removeBackground = async (imagePath, outputPath) => {
  const apiKey = 'YOUR_REMOVE_BG_API_KEY'; // Replace with your remove.bg API key
  const url = 'https://api.remove.bg/v1.0/removebg';
  
  const form = new FormData();
  form.append('image_file', fs.createReadStream(imagePath));
  form.append('size', 'auto');
  
  try {
    const response = await axios.post(url, form, {
      headers: {
        ...form.getHeaders(),
        'X-Api-Key': apiKey
      },
      responseType: 'arraybuffer'
    });
    
    fs.writeFileSync(outputPath, response.data);
    console.log('Background removed and image saved to', outputPath);
  } catch (error) {
    console.error('Error removing background:', error);
  }
};

// Example usage
// removeBackground('path/to/your/image.jpg', 'path/to/save/processed-image.png');
