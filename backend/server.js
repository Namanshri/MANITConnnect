const express = require("express");

const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors({
    origin: "https://manit-connect.vercel.app",
    credentials: true
}));

app.use(express.json());

const mentorRoutes = require("./routes/mentorRoutes");

const experienceRoutes = require("./routes/experienceRoutes");

const guidanceRoutes = require("./routes/guidanceRoutes");

const insightRoutes = require("./routes/insightRoutes");

const authRoutes = require("./routes/authRoutes");

app.use("/api/mentor",mentorRoutes);

app.use("/api/experience",experienceRoutes);

app.use("/api/guidance",guidanceRoutes);

app.use("/api/insight", insightRoutes);

app.use("/api/auth", authRoutes);

app.get("/",(req,res)=>{

    res.send("CampusPath Backend Running");

});

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{

    console.log(`Server running on port ${PORT}`);

});

