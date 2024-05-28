import express from 'express';
import {handleShowDetails,handlePatientRegister} from '../controllers/hospitals.js';
const hospitalRouter = express.Router();

hospitalRouter.get("/details",handleShowDetails);
hospitalRouter.post("/patients/register/:psychiatristId",handlePatientRegister);

export default hospitalRouter;