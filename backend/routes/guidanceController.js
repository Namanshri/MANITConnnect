const pool = require("../config/db");

const createGuidance = async (req,res)=>{

    try{

        const{

            mentor_id,

            year,

            category,

            question,

            answer

        }=req.body;

        const result=await pool.query(

            `INSERT INTO guidance
            (
                mentor_id,
                year,
                category,
                question,
                answer
            )

            VALUES
            (
                $1,$2,$3,$4,$5
            )

            RETURNING *`,

            [

                mentor_id,

                year,

                category,

                question,

                answer

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
const getGuidanceByMentor = async (req, res) => {

    try {

        const mentorId = req.params.id;

        const result = await pool.query(

            `SELECT *
             FROM guidance
             WHERE mentor_id = $1
             ORDER BY year ASC`,

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

module.exports = {

    createGuidance,

    getGuidanceByMentor

};