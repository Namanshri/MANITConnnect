const passwordInput = document.getElementById("password");

const togglePassword = document.getElementById("togglePassword");

const strengthText = document.getElementById("strengthText");

const studentForm = document.getElementById("studentForm");

/* SHOW / HIDE PASSWORD */

togglePassword.addEventListener("click", () => {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";

        togglePassword.textContent = "👁️⃠";

    }

    else {

        passwordInput.type = "password";

        togglePassword.textContent = "👁";

    }

});

/* PASSWORD STRENGTH */

passwordInput.addEventListener("input", () => {

    const password = passwordInput.value;

    let strength = "Weak";
    let color = "#e74c3c";

    if (
        password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /\d/.test(password)
    ) {

        strength = "Strong";
        color = "#27ae60";

    }

    else if (password.length >= 6) {

        strength = "Medium";
        color = "#f39c12";

    }

    strengthText.textContent = `Password Strength: ${strength}`;

    strengthText.style.color = color;

});

/* FORM SUBMIT */

studentForm.addEventListener("submit", (e) => {

    e.preventDefault();

    alert("Backend registration will be connected next.");

});