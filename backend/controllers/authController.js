const pool = require("../config/db");

const bcrypt = require("bcrypt");

/*  STUDENT REGISTRATION */

const registerStudent = async (req, res) => {

    try {

        const {

            full_name,

            email,

            password

        } = req.body;

        const existingUser = await pool.query(

            "SELECT * FROM users WHERE email=$1",

            [email]

        );

        if (existingUser.rows.length > 0) {

            return res.status(400).json({

                message: "Email already registered."

            });

        }

        const hashedPassword = await bcrypt.hash(

            password,

            10

        );

        await pool.query(

            `

            INSERT INTO users

            (

                full_name,

                email,

                password,

                role

            )

            VALUES

            (

                $1,

                $2,

                $3,

                'student'

            )

            `,

            [

                full_name,

                email,

                hashedPassword

            ]

        );

        res.status(201).json({

            message:"Student registered successfully."

        });

    }

    catch(err){

        console.log(err);

        res.status(500).json({

            message:"Database Error"

        });

    }

};

/*  MENTOR REGISTRATION*/

const registerMentor = async (req,res)=>{

    try{

        const{

            full_name,

            email,

            password

        }=req.body;

        const existingUser=await pool.query(

            "SELECT * FROM users WHERE email=$1",

            [email]

        );

        if(existingUser.rows.length){

            return res.status(400).json({

                message:"Email already exists."

            });

        }

        const hashedPassword=await bcrypt.hash(

            password,

            10

        );

        await pool.query(

            `

            INSERT INTO users

            (

                full_name,

                email,

                password,

                role

            )

            VALUES

            (

                $1,

                $2,

                $3,

                'mentor'

            )

            `,

            [

                full_name,

                email,

                hashedPassword

            ]

        );

        res.status(201).json({

            message:"Mentor registered successfully."

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

    registerStudent,

    registerMentor

};