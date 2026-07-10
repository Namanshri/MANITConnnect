const pool = require("../config/db");

const createMentor = async (req, res) => {
    try {

        const {
            full_name,
            company,
            role,
            package_lpa,
            cgpa,
            experience_type,
            placement_mode
        } = req.body;

        const result = await pool.query(

            `INSERT INTO mentors
            (
                full_name,
                company,
                role,
                package_lpa,
                cgpa,
                experience_type,
                placement_mode
            )

            VALUES
            ($1,$2,$3,$4,$5,$6,$7)

            RETURNING mentor_id`,

            [
                full_name,
                company,
                role,
                package_lpa,
                cgpa,
                experience_type,
                placement_mode
            ]

        );

        res.status(201).json({
            mentor_id: result.rows[0].mentor_id
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Database Error"
        });

    }
};
const getAllMentors = async (req, res) => {

    try {

        const result = await pool.query(

            `SELECT * FROM mentors ORDER BY mentor_id DESC`

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
const getMentorById = async (req,res)=>{

    try{

        const id=req.params.id;

        const mentor=await pool.query(

            `SELECT * FROM mentors
             WHERE mentor_id=$1`,

            [id]

        );

        const insights=await pool.query(

            `SELECT *
             FROM insights
             WHERE mentor_id=$1`,

            [id]

        );

        res.json({

            mentor:mentor.rows[0],

            insights:insights.rows

        });

    }

    catch(err){

        console.log(err);

        res.status(500).json({

            message:"Database Error"

        });

    }

};

module.exports={

createMentor,

getAllMentors,

getMentorById

}