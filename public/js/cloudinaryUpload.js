// Initialize the Cloudinary Upload Widget
cloudinary.createUploadWidget({
    cloudName: 'dosbwvhog',
    uploadPreset: 'our_upload_preset',
    sources: ['local', 'url', 'camera'],
    defaultSource: 'local',
    multiple: false,
    maxFiles: 1,
    cropping: false,
    showAdvancedOptions: false,
  }, (error, result) => {
    if (!error && result && result.event === 'success') {
      // Handle the Cloudinary upload response
      const imageUrl = result.info.url;
      // You can use the `imageUrl` to store or display the uploaded image as needed.
    }
  });
  
  // Attach an event listener to the image upload input field
  document.getElementById('image-upload').addEventListener('click', function () {
    cloudinary.openUploadWidget();
  });
