const pool = require("../config/db");

const createExperience = async (req, res) => {

    try {

        const {

            mentor_id,

            preparation_strategy,

            core_skills,

            resources,

            interview_timeline,

            mistakes,

            interview_rounds

        } = req.body;

        const result = await pool.query(

            `INSERT INTO insights
            (
                mentor_id,
                preparation_strategy,
                core_skills,
                resources,
                interview_timeline,
                mistakes,
                interview_rounds
            )

            VALUES
            (
                $1,$2,$3,$4,$5,$6,$7
            )

            RETURNING *`,

            [

                mentor_id,

                preparation_strategy,

                core_skills,

                resources,

                interview_timeline,

                mistakes,

                interview_rounds

            ]

        );

        res.status(201).json(result.rows[0]);

    }

    catch(err){

        console.log(err);

        res.status(500).json({

            message:"Database Error"

        });

    }

};

module.exports={

    createExperience

};