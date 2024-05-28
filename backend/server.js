import express from "express";
import "dotenv/config";
import path from "path"
import hospitalRouter from "./routes/hospitals.js";
import { initSqlConfig, dumpData } from "./database/config.js";
import { fileURLToPath } from "url";
import multer from "multer";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
      cb(null, `${req.body.name} - ${file.originalname}`);
    },
  });
  const upload = multer({ storage });

//initial sql configuration for creating database and creating necessary tables
await initSqlConfig();

//to dump the dummy data uncomment the following line
// await dumpData();

app.use("/api/hospitals",upload.single("photo"), hospitalRouter);

app.listen(process.env.PORT, ()=>{
    console.log("server listening on the port " + process.env.PORT);
})