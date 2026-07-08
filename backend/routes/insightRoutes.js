const express = require("express");

const router = express.Router();

const {

    createInsight,

    getAllInsights,

    getInsightById,

    getInsightsByMentor

} = require("../controllers/insightController");

/* CREATE INSIGHT */

router.post(

    "/",

    createInsight

);

/* GET ALL INSIGHTS */

router.get(

    "/",

    getAllInsights

);


/* GET ALL INSIGHTS OF A MENTOR */

router.get(

    "/mentor/:mentorId",

    getInsightsByMentor

);

/* GET INSIGHT BY ID */

router.get(

    "/:id",

    getInsightById

);


module.exports = router;