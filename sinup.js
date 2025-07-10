function signup(name, email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if user already exists
    if (users.some(user => user.email === email)) {
        return false;
    }

    // Add new user
    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    
    // Auto login after signup
    currentUser = { email, name };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    updateAuthButton();
    
    return true;
}

// Event Listeners
document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = e.target.querySelector('input[type="text"]').value;
    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelector('input[type="password"]').value;

    if (signup(name, email, password)) {
        document.getElementById('signupModal').classList.remove('active');
        e.target.reset();
    } else {
        alert('Email already exists');
    }
});

document.getElementById('showLogin').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('signupModal').classList.remove('active');
    document.getElementById('loginModal').classList.add('active');
}); 