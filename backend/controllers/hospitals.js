import connectDB from "../database/connection.js";


const db = await  connectDB().then(pool => pool.getConnection());
export const handleShowDetails = async(req,res)=>{
    const {hospitalId} = req.query;
    
    const details = await db.query(`SELECT
        (SELECT name FROM hospitals WHERE id =?) as HospitalName,
        (SELECT COUNT(id) FROM psychiatrists WHERE hospitalID = ?) as totalPsychiatristCount,
        (SELECT COUNT(*) FROM psychiatrist_patients pp INNER JOIN psychiatrists p ON pp.psychiatristId = p.id GROUP BY p.hospitalID) as totalPatientsCount
    `,[hospitalId, hospitalId]);
    console.log(details);
    res.send("hello world");
    
}