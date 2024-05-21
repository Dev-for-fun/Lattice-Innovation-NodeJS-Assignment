import express from "express";
import "dotenv/config";
import connectDB from "./database/connection.js";
import patientRouter from "./routes/patients.js";
import hospitalRouter from "./routes/hospitals.js";

const app = express();
const connection = await  connectDB().then(pool => pool.getConnection());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/patients",patientRouter);
app.use("/api/hospitals", hospitalRouter);
app.listen(process.env.PORT, ()=>{
    console.log("server listening on the port " + process.env.PORT);
})