// middleware/backgroundRemoval.js
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const unlink = util.promisify(fs.unlink);
require('dotenv').config();

const removeBackground = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  try {
    // Read the uploaded file
    const imageBuffer = await readFile(req.file.path);

    // Create form data for remove.bg API
    const formData = new FormData();
    formData.append('size', 'auto');
    formData.append('image_file', imageBuffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype
    });

    console.log('Sending request to remove.bg API...');

    // Call remove.bg API
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

    if (response.status !== 200) {
      throw new Error(`remove.bg API error: ${response.status}`);
    }

    console.log('Successfully removed background');

    // Delete the original file
    await unlink(req.file.path);

    // Create new filename for processed image
    const processedFileName = `nobg_${Date.now()}_${path.basename(req.file.originalname)}`;
    const processedFilePath = path.join(req.file.destination, processedFileName);

    // Save the processed image
    await writeFile(processedFilePath, response.data);

    // Update req.file with new file information
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
    
    // If there's an error, we should still keep the original image
    // just pass it through without background removal
    next();
  }
};

module.exports = removeBackground;