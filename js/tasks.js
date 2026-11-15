document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Login System Logic ---
    const loginForm = document.getElementById('login-form');
    const loginSection = document.getElementById('login-section');
    const taskSection = document.getElementById('task-section');
    const loginError = document.getElementById('login-error');
    const logoutBtn = document.getElementById('logout-btn');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const user = document.getElementById('username').value;
        const pass = document.getElementById('password').value;

        // Basic login check (admin / 1234)
        if (user === 'admin' && pass === '1234') {
            loginSection.style.display = 'none';
            taskSection.style.display = 'block';
            loginError.style.display = 'none';
        } else {
            loginError.style.display = 'block';
        }
    });

    // Logout logic
    logoutBtn.addEventListener('click', () => {
        loginSection.style.display = 'block';
        taskSection.style.display = 'none';
        loginForm.reset();
    });

    // --- 2. Current Date and Time Display ---
    function updateDateTime() {
        const now = new Date();
        const datetimeDisplay = document.getElementById('datetime-display');
        // Format: Monday, 15 November 2026, 08:30:00 PM
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        datetimeDisplay.textContent = "Current Date and Time: " + now.toLocaleDateString('en-AU', options);
    }
    
    // Update immediately, then every second
    updateDateTime();
    setInterval(updateDateTime, 1000);
});