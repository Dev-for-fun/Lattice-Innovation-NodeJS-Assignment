import express from 'express';
import {handlePatientRegister} from '../controllers/patients.js';
const patientRouter = express.Router();

patientRouter.post("/register",handlePatientRegister);

export default patientRouter;