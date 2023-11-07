// Define an asynchronous function called 'logout' to handle user logout.
const logout = async () => {
    // Send a POST request to the '/api/user/logout' endpoint.
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    // Check if the response from the server is successful (HTTP status code 200).
    if (response.ok) {
      // If the response is successful, redirect the user to the login page.
      document.location.replace('/login');
    } else {
      // If the response is not successful, show an alert with the error message.
      alert(response.statusText);
    }
  };
  
  // Add a click event listener to the element with the class 'logout-link'.
  document.querySelector('.logout-link').addEventListener('click', logout);     