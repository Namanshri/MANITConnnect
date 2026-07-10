const pool = require("../config/db");

/* CREATE INSIGHT */

const createInsight = async (req, res) => {

    try {

        const {

            mentor_id,

            title,

            content,

            category,

            tags

        } = req.body;

        const result = await pool.query(

            `INSERT INTO insights

            (

                mentor_id,

                title,

                content,

                category,

                tags

            )

            VALUES

            ($1,$2,$3,$4,$5)

            RETURNING insight_id`,

            [

                mentor_id,

                title,

                content,

                category,

                tags

            ]

        );

        res.status(201).json({

            insight_id: result.rows[0].insight_id

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            message: "Database Error"

        });

    }

};

/* GET ALL INSIGHTS */

const getAllInsights = async (req, res) => {

    try {

        const result = await pool.query(

    `SELECT

        insights.*,

        mentors.full_name,

        mentors.company,

        mentors.role,

        mentors.package_lpa,

        mentors.experience_type

     FROM insights

     JOIN mentors

     ON insights.mentor_id = mentors.mentor_id

     ORDER BY insights.created_at DESC`

);

        res.json(result.rows);

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            message: "Database Error"

        });

    }

};

/* GET INSIGHT BY ID */

const getInsightById = async (req, res) => {

    try {

        const id = req.params.id;

        const result = await pool.query(

           `SELECT

    insights.*,

    mentors.full_name,

    mentors.company,

    mentors.role,

    mentors.package_lpa,

    mentors.experience_type

FROM insights

JOIN mentors

ON insights.mentor_id = mentors.mentor_id

WHERE insight_id=$1`,

            [id]

        );

        res.json(result.rows[0]);

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            message: "Database Error"

        });

    }

};

/* GET INSIGHTS OF A MENTOR */

const getInsightsByMentor = async (req, res) => {

    try {

        const mentorId = req.params.mentorId;

        const result = await pool.query(

           `SELECT

    insights.*,

    mentors.full_name,

    mentors.company,

    mentors.role,

    mentors.package_lpa,

    mentors.experience_type

FROM insights

JOIN mentors

ON insights.mentor_id = mentors.mentor_id

WHERE insights.mentor_id=$1

ORDER BY insights.created_at DESC`,

            [mentorId]

        );

        res.json(result.rows);

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            message: "Database Error"

        });

    }

};
const increaseHelpfulCount = async (req,res)=>{

    try{

        const id=req.params.id;

        await pool.query(

            `UPDATE insights

             SET helpful_count = helpful_count + 1

             WHERE insight_id = $1`,

            [id]

        );

        res.json({

            message:"Helpful Added"

        });

    }

    catch(err){

        console.log(err);

        res.status(500).json({

            message:"Database Error"

        });

    }

};

module.exports = {

    createInsight,

    getAllInsights,

    getInsightById,

    getInsightsByMentor,

    increaseHelpfulCount

};