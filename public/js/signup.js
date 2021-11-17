const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username-sign-up').value.trim();
    const password = document.querySelector('#password-sign-up').value.trim();
  
    if (username && password) {
    // Send a POST request to the API endpoint
        const response = await fetch('/api/users', {
          method: 'POST',
          body: JSON.stringify({ username, password }),
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          window.alert('Unable to create new user! Make sure your password is at least 8 characters in length.');
        }
      }
    };
  
  document
    .querySelector('#sign-up-button')
    .addEventListener('submit', signupFormHandler);
  