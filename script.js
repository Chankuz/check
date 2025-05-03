// Store users in localStorage (for demo purposes)
let users = JSON.parse(localStorage.getItem('users')) || [];

// Toggle between login and signup forms
function toggleForms() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    loginForm.classList.toggle('hidden');
    signupForm.classList.toggle('hidden');
}

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Find user in users array
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Store current user in localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    } else {
        alert('Invalid email or password!');
    }
}

// Handle signup form submission
function handleSignup(event) {
    event.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validate passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    // Check if email already exists
    if (users.some(u => u.email === email)) {
        alert('Email already registered!');
        return;
    }
    
    // Add new user
    users.push({
        name,
        email,
        password
    });
    
    // Save to localStorage
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('Signup successful! Please login.');
    toggleForms(); // Switch to login form
}

// Add password strength validation
document.getElementById('signupPassword').addEventListener('input', function(e) {
    const password = e.target.value;
    const strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
    
    if (strongPassword.test(password)) {
        e.target.style.borderColor = '#28a745';
    } else {
        e.target.style.borderColor = '#dc3545';
    }
}); 