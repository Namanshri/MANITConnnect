const express = require("express");

const router = express.Router();

const guidanceController = require("../controllers/guidanceController");
router.get("/:id", guidanceController.getGuidanceByMentor);

router.post("/", guidanceController.createGuidance);

module.exports = router;