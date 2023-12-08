// Define an asynchronous function called 'signupFormHandler' to handle the submission of the signup form.
const signupFormHandler = async (event) => {
  debugger;
  // Prevent the default form submission behavior to handle it with JavaScript.
  event.preventDefault();

  // Collect values from the signup form
  const username = document.querySelector('#name-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && password) {
    // Send a POST request to the '/api/users' endpoint with the new user's data.
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    const alertbox = document.querySelector('.alert')
    // Check if the response from the server is successful (HTTP status code 200).
    if (response.ok) {
      // If the user signup is successful, redirect the browser to the user's experiences page.
      document.location.replace('/experiences');
    } else {
      // If there's an error in user signup, show an alert with the error message.
      alertbox.style.display = 'block'   
    }
  }
};

// Add a submit event listener to the signup form to trigger the 'signupFormHandler' function.
document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);