import express from 'express';
import {handleShowDetails} from '../controllers/hospitals.js';
const hospitalRouter = express.Router();

hospitalRouter.get("/details",handleShowDetails);

export default hospitalRouter;