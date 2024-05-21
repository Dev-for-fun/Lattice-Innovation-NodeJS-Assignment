import express from "express";
import "dotenv/config";
import connectDB from "./database/connection.js";
import patientRouter from "./routes/patients.js";
import hospitalRouter from "./routes/hospitals.js";
import { initSqlConfig, dumpData } from "./database/config.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//initial sql configuration for creating database and creating necessary tables
await initSqlConfig();

//to dump the dummy data uncomment the following line
// await dumpData();

app.use("/api/patients",patientRouter);
app.use("/api/hospitals", hospitalRouter);

app.listen(process.env.PORT, ()=>{
    console.log("server listening on the port " + process.env.PORT);
})