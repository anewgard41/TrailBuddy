// Our Cloudinary cloud name, API key, and API secret
const cloudName = 'dosbwvhog';
const apiKey = '789987628956638';
const apiSecret = 'c9uK-t1lXZGmBBCOp5VHA6z8zYs';

// const router = require('express').Router();

// Our Cloudinary upload preset
const uploadPreset = 'our_upload_preset';

const fileInput = document.getElementById('file-input'); // Replace with your file input element

fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];

  if (file) {
    // Create a FormData object to send the file to Cloudinary
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    // Make a POST request to Cloudinary's upload URL
    fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Basic ${btoa(`${apiKey}:${apiSecret}`)}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from Cloudinary, which will contain information about the uploaded image
        console.log('Image uploaded:', data);
      })
      .catch((error) => {
        console.error('Error uploading image to Cloudinary:', error);
      });
  }
});

// module.exports = router;