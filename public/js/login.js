// Define an asynchronous function called 'loginFormHandler' to handle the login form submission.
const loginFormHandler = async (event) => {
    // Prevent the default form submission behavior to handle it with JavaScript.
    event.preventDefault();
  
    // Collect values from the login form
    const username = document.querySelector('#name-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    debugger;
    if (username && password) {
      // Send a POST request to the '/api/user/login' endpoint with user credentials.
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({
          username,
          password
        }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      // Check if the response from the server is successful (HTTP status code 200).
      if (response.ok) {
        // If the login is successful, redirect the browser to the user's profile page.
        document.location.replace('/experiences');
      } else {
        // If the login is unsuccessful, show an alert indicating that the user does not exist.
        alert('User does not exist!');
      }
    }
  };
  
  // Add a submit event listener to the login form to trigger the 'loginFormHandler' function.
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);   