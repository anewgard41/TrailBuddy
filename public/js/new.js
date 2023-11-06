// Define an asynchronous function called 'newFormHandler' to handle the submission of a new post form.
const newFormHandler = async (event) => {
    // Prevent the default form submission behavior to handle it with JavaScript.
    event.preventDefault();
  
    // Collect values from the new post form
    const title = document.querySelector('input[name="post-title"]').value.trim();
    const content = document.querySelector('textarea[name="post-content"]').value.trim();
   
    if (title && content) {
      // Send a POST request to the '/api/post' endpoint with the new post data.
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
          title,
          content
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Check if the response from the server is successful (HTTP status code 200).
      if (response.ok) {
        // If the post creation is successful, redirect the browser to the user's experience page.
        document.location.replace('/experiences');
      } else {
        // If there's an error in post creation, show an alert with the error message.
        alert(response.statusText);
      }
    } else {
      // If the title or content fields are empty, show an alert indicating that empty fields are not allowed.
      alert('Empty fields not allowed!!');
    }
  };
  
  // Add a submit event listener to the new post form to trigger the 'newFormHandler' function.
  document
    .querySelector('#new-post-form')
    .addEventListener('submit', newFormHandler);  