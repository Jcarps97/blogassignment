const loginUserFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (username && password) {
        // Send a POST request to the API endpoint
        const response = await fetch('api/users/login', {
          method: 'POST',
          body: JSON.stringify({ username, password }),
          headers: { 'Content-Type': 'application/json' },
        });
        console.log(response);
    if (response.ok) {
      // If successful, redirect the browser to the dashboard page
      console.log("logged in");
      document.location.replace('/dashboard');
    } else {
      window.alert('Incorrect username or password, please try again');
    }
  };
  };
  
  document
    .querySelector('#login-button')
    .addEventListener('submit', loginUserFormHandler);