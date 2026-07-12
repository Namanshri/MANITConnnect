const express = require("express");

const router = express.Router();

const {

    registerStudent,

    registerMentor

} = require("../controllers/authController");

/* STUDENT REGISTRATION */

router.post(

    "/register/student",

    registerStudent

);

/* MENTOR REGISTRATION */

router.post(

    "/register/mentor",

    registerMentor

);

module.exports = router;