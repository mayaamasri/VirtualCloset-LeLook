const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const unlink = util.promisify(fs.unlink);
require('dotenv').config();

// Middleware to remove background from image using remove.bg API
const removeBackground = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  // Check if the file is an image
  try {
    const imageBuffer = await readFile(req.file.path);

    const formData = new FormData();
    formData.append('size', 'auto');
    formData.append('image_file', imageBuffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype
    });

    console.log('Sending request to remove.bg API...');

    // Send the image to remove.bg API
    const response = await axios({
      method: 'post',
      url: 'https://api.remove.bg/v1.0/removebg',
      data: formData,
      headers: {
        ...formData.getHeaders(),
        'X-Api-Key': process.env.REMOVE_BG_API_KEY,
      },
      responseType: 'arraybuffer',
    });

    // Check if the API response is successful
    if (response.status !== 200) {
      throw new Error(`remove.bg API error: ${response.status}`);
    }

    console.log('Successfully removed background');

    await unlink(req.file.path);

    // Save the processed image
    const processedFileName = `nobg_${Date.now()}_${path.basename(req.file.originalname)}`;
    const processedFilePath = path.join(req.file.destination, processedFileName);

    await writeFile(processedFilePath, response.data);

    req.file.filename = processedFileName;
    req.file.path = processedFilePath;
    req.file.size = response.data.length;

    console.log('Processed image saved:', processedFileName);

    next();
  } catch (error) {
    console.error('Background removal error:', error.message);
    if (error.response) {
      console.error('API Response:', error.response.data.toString());
    }
    next();
  }
};

module.exports = removeBackground;