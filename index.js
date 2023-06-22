
    const adminUser = {
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin'
  };
  
  const regularUsers = [
    { email: 'user1@example.com', password: 'user123', role: 'user' },
    { email: 'user2@example.com', password: 'user456', role: 'user' }
  ];

  //localStorage.clear();
  
  // Function to handle form submission
  function handleLogin(event) {
    event.preventDefault(); // Prevent form submission
  
    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
  
    // Check if the admin user is logging in
    if (email === adminUser.email && password === adminUser.password) {
      // Redirect to the admin dashboard
      localStorage.setItem('loggedInUser', email);
      window.location.href = 'task-management-admin.html';
      return;
    }
  
    // Check if a regular user is logging in
    const user = regularUsers.find(u => u.email === email && u.password === password);
    if (user) {
      // Redirect to the user dashboard
      window.location.href = 'task-management-user.html';
       // Save the logged-in user's email in local storage
        localStorage.setItem('loggedInUser', email);
        //localStorage.setItem('loggedInUser', email);
      return;
    }
  
    // Handle invalid login
    alert('Invalid email or password');
  }
  
  // Attach event listener to the form submit event
  document.getElementById('loginForm').addEventListener('submit', handleLogin);
  