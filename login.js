// Authentication state
let currentUser = JSON.parse(localStorage.getItem('currentUser'));

function isLoggedIn() {
    return !!currentUser;
}

function updateAuthButton() {
    const authBtn = document.getElementById('authBtn');
    if (isLoggedIn()) {
        authBtn.innerHTML = `
            <i class="fas fa-user"></i>
            <span>${currentUser.name.split(' ')[0]}</span>
        `;
    } else {
        authBtn.innerHTML = `
            <i class="fas fa-user"></i>
            <span>Login</span>
        `;
    }
}

function login(email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = { email: user.email, name: user.name };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateAuthButton();
        updateProfileName(); // Update profile dropdown
        return true;
    }
    return false;
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateAuthButton();
    document.getElementById('profileDropdown').classList.remove('active');
}

// Event Listeners
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelector('input[type="password"]').value;

    if (login(email, password)) {
        document.getElementById('loginModal').classList.remove('active');
        e.target.reset();
    } else {
        alert('Invalid email or password');
    }
});

document.getElementById('authBtn').addEventListener('click', () => {
    if (isLoggedIn()) {
        // Profile dropdown is handled in app.js
        return;
    } else {
        document.getElementById('loginModal').classList.add('active');
    }
});

document.getElementById('showSignup').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('loginModal').classList.remove('active');
    document.getElementById('signupModal').classList.add('active');
});

document.getElementById('logoutBtn').addEventListener('click', (e) => {
    e.preventDefault();
    logout();
});

// Initialize auth state
updateAuthButton(); 