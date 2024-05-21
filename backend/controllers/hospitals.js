import connectDB from "../database/connection.js";


const db = await  connectDB().then(pool => pool.getConnection());
export const handleShowDetails = async(req,res)=>{
    const {hospitalId} = req.query;
    
    const psychiatristDetails = await db.query(`
    SELECT
        p.id AS PsychiatristId,
        p.name AS PsychiatristName,
        COUNT(pp.patientId) AS PatientsCount
    FROM psychiatrists p
    LEFT JOIN Psychiatrist_Patients pp ON p.id = pp.psychiatristId
    WHERE p.hospitalId = ?
    GROUP BY p.id, p.name
`, [hospitalId]);

    const hospitalDetails = await db.query(`SELECT 
    h.name as HospitalName,
    COUNT(DISTINCT p.id) as totalPsychiatristCount,
    COUNT(DISTINCT pp.patientId) as totalPatientsCount
    FROM 
        hospitals h
    LEFT JOIN 
        psychiatrists p ON h.id = p.hospitalID
    LEFT JOIN 
        psychiatrist_patients pp ON p.id = pp.psychiatristId
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
    
    db.release()
    
    res.status(200).json(combinedDetails);
    
}