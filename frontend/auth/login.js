const loginForm = document.getElementById("loginForm");

const passwordInput = document.getElementById("password");

const togglePassword = document.getElementById("togglePassword");

/* SHOW / HIDE PASSWORD */

togglePassword.addEventListener("click", () => {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";

        togglePassword.innerHTML =

        '<i class="fa-regular fa-eye-slash"></i>';

    }

    else {

        passwordInput.type = "password";

        togglePassword.innerHTML =

        '<i class="fa-regular fa-eye"></i>';

    }

});

/* LOGIN */

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();

    const password = passwordInput.value;

    if (email === "" || password === "") {

        alert("Please fill all fields.");

        return;

    }

    alert("Backend login will be connected in the next step.");

});