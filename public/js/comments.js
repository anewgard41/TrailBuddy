// Get the value of the 'post-id' input field and trim any whitespace.
const post_id = document.querySelector('input[name="post-id"]').value.trim();

// Define an asynchronous function called 'commentFormHandler' to handle the submission of a new comment.
const commentFormHandler = async (event) => {
  // Prevent the default form submission behavior to handle it with JavaScript.
  event.preventDefault();

  // Collect the content of the comment from the textarea.
  const content = document.querySelector('textarea[name="comment-body"]').value.trim();

  if (content) {
    // Send a POST request to the '/api/comment' endpoint with the new comment data.
    const response = await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({
        post_id,
        content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Check if the response from the server is successful (HTTP status code 200).
    if (response.ok) {
      // If the comment creation is successful, reload the page to see the new comment.
      document.location.reload();
    } else {
      // If there's an error in comment creation, show an alert with the error message.
      alert(response.statusText);
    }
  }
};

// Add a submit event listener to the new comment form to trigger the 'commentFormHandler' function.
document
  .querySelector('#new-comment-form')
  .addEventListener('submit', commentFormHandler);