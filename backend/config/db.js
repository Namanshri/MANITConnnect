const { Pool } = require("pg");
require("dotenv").config();
console.log(process.env.DATABASE_URL);

const pool = new Pool({
     connectionString: process.env.DATABASE_URL,

    ssl: {
        rejectUnauthorized: false
    }
});

pool.connect()
    .then(() => {
        console.log("✅ Connected to Neon Database");
    })
    .catch((err) => {
        console.error("❌ Database Connection Error:");
        console.error(err);
    });


module.exports = pool;
