const step1 = document.getElementById("step1");

const step2 = document.getElementById("step2");

const step3 = document.getElementById("step3");

const steps = document.querySelectorAll(".step");

const sendOtpBtn = document.getElementById("sendOtpBtn");

const verifyOtpBtn = document.getElementById("verifyOtpBtn");

const resetBtn = document.getElementById("resetBtn");

/* STEP 1 */

sendOtpBtn.addEventListener("click", () => {

    const email = document.getElementById("email").value.trim();

    if(email===""){

        alert("Please enter your email.");

        return;

    }

    step1.style.display="none";

    step2.style.display="block";

    steps[0].classList.remove("active");

    steps[1].classList.add("active");

});

/* STEP 2 */

verifyOtpBtn.addEventListener("click",()=>{

    const otp=document.getElementById("otp").value.trim();

    if(otp===""){

        alert("Please enter the OTP.");

        return;

    }

    step2.style.display="none";

    step3.style.display="block";

    steps[1].classList.remove("active");

    steps[2].classList.add("active");

});

/* STEP 3 */

resetBtn.addEventListener("click",()=>{

    const password=document.getElementById("newPassword").value;

    if(password.length<6){

        alert("Password must be at least 6 characters.");

        return;

    }

    alert("Backend password reset will be connected next.");

});