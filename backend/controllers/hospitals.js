import connectDB from "../database/connection.js";
import patientSchema from "../database/validation.js";
import bcrypt from "bcrypt";

const db = await  connectDB().then(pool => pool.getConnection());
const getPatientDetails = async(patientId)=>{
    const user = await db.query("SELECT * FROM patients WHERE id = ?",[patientId]);    
    return user[0];
}

export const handlePatientRegister = async(req,res)=>{
    const {name, address, email, phoneNumber, password} = req.body;
    const {psychiatristId} = req.params;
    const photo = req.file?.filename;
    const { error } = patientSchema.validate({ name, address, email, phoneNumber, password, photo });

    if(error){
        return res.status(400).json({Error:error.details[0].message});
    }

    try{
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = await db.query("INSERT INTO patients(name, address, email, phoneNumber, password, photo,psychiatristId) VALUES (?,?,?,?,?,?,?)",[name,address,email,phoneNumber,passwordHash,photo,psychiatristId]);

        const responseData = await getPatientDetails(newUser[0].insertId);
        
        return res.status(200).json(responseData[0]);
    }
    catch (err) {
        console.error("Error inserting new patient:", err);
        return res.status(500).json({ error: "Error while registering the new patient, "+err });
    }
    finally{
        db.release();
    }
}


export const handleShowDetails = async(req,res)=>{
    const {hospitalId} = req.query;
    
    if(!hospitalId) return res.status(400).json({Error:"Please provide the hospital Id as the query"});

    try{
        const psychiatristDetails = await db.query(`
        SELECT
            psy.id AS PsychiatristId,
            psy.name AS PsychiatristName,
            COUNT(DISTINCT pat.id) AS PatientsCount
        FROM psychiatrists psy
        LEFT JOIN Patients pat ON psy.id = pat.psychiatristId
        WHERE psy.hospitalId = ?
        GROUP BY psy.id, psy.name
    `, [hospitalId]);

        const hospitalDetails = await db.query(`SELECT 
        h.name as HospitalName,
        COUNT(DISTINCT psy.id) as totalPsychiatristCount,
        COUNT(DISTINCT p.id) as totalPatientsCount
        FROM 
            hospitals h
        LEFT JOIN 
            psychiatrists psy ON h.id = psy.hospitalID
        LEFT JOIN 
            patients p ON psy.id = p.psychiatristId
        WHERE 
            h.id = ?
        GROUP BY 
            h.name;
        `,[hospitalId,hospitalId,hospitalId]);
        
        const combinedDetails = {
            HospitalName: hospitalDetails[0][0].HospitalName,
            TotalPsychiatristCount: hospitalDetails[0][0].totalPsychiatristCount,
            TotalPatientsCount: hospitalDetails[0][0].totalPatientsCount,
            PsychiatristDetails: psychiatristDetails[0]
        };
        
        return res.status(200).json(combinedDetails);
    }
    catch(err){
        console.error("Error while fetching details:", err);
        return res.status(500).json({ error:err.message });
    }
    finally{
        db.release();
    }
    
}

