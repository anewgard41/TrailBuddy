// Get the value of the 'post-id' input field and trim any whitespace.
const post_id = document.querySelector('input[name="post-id"]').value.trim();

// Define an asynchronous function called 'editFormHandler' to handle the submission of an edited post.
const editFormHandler = async (event) => {
  // Prevent the default form submission behavior to handle it with JavaScript.
  event.preventDefault();

  // Collect values for the edited post's title and content.
  const title = document.querySelector('input[name="post-title"]').value.trim();
  const content = document.querySelector('textarea[name="post-body"]').value.trim();

  console.log(title);
  console.log(content);

  // Send a PUT request to the '/api/post/:post_id' endpoint with the updated post data.
  const response = await fetch(`/api/post/${post_id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      content,
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    // If there's an error in updating the post, you can optionally display an alert.
    // alert('Failed to update your post');
  }
  // Redirect to the user's experiences page after updating the post.
  document.location.replace('/experiences');
};

// Define an asynchronous function called 'deleteClickHandler' to handle the click event for post deletion.
const deleteClickHandler = async () => {
  // Send a DELETE request to the '/api/post/:post_id' endpoint for post deletion.
  await fetch(`/api/post/${post_id}`, {
    method: 'DELETE'
  });

  // Redirect to the user's dashboard page after deleting the post.
  document.location.replace('/experiences');
};

// Add a submit event listener to the edit post form to trigger the 'editFormHandler' function.
document
  .querySelector('#edit-post-form')
  .addEventListener('submit', editFormHandler);

// Add a click event listener to the delete button to trigger the 'deleteClickHandler' function.
document
  .querySelector('#delete-btn')
  .addEventListener('click', deleteClickHandler);