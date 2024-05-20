import express from "expess";
import "dotenv/config";

const app = express();

app.listen(process.env.PORT, ()=>{
    console.log("server listening on the port " + process.env.PORT);
})