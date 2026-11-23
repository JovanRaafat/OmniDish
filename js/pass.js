const form = document.getElementById('resetForm');
const input = document.getElementById('emailInput');
const errorMsg = document.getElementById('emailError');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function showError(text) {
    errorMsg.textContent = text;
    errorMsg.classList.remove('d-none');
    input.classList.add('is-invalid');
}

function clearError() {
    errorMsg.classList.add('d-none');
    input.classList.remove('is-invalid');
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = input.value.trim();

    if (email === '') {
        showError('Please enter your email.');
        return;
    }

    if (!emailRegex.test(email)) {
        showError('Please enter a valid email, e.g. name@example.com');
        return;
    }

    clearError();
    window.location.href = `email.html?email=${encodeURIComponent(email)}`;
});

input.addEventListener('input', clearError);

