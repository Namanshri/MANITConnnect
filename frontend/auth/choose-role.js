const studentCard = document.getElementById("studentCard");

const mentorCard = document.getElementById("mentorCard");

studentCard.addEventListener("click", () => {

    window.location.href = "student-register.html";

});

mentorCard.addEventListener("click", () => {

    window.location.href = "mentor-register.html";

});