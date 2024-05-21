import connectDB from "../database/connection.js";


const db = await  connectDB().then(pool => pool.getConnection());

const getPatientDetails = async(patientId)=>{
    const user = await db.query("SELECT * FROM patients WHERE id = ?",[patientId]);    
    return user[0];
}

export const handlePatientRegister = async(req,res)=>{
    const {name, address, email, phoneNumber, password, photo} = req.body;

    const newUser = await db.query("INSERT INTO patients(name, address, email, phoneNumber, password, photo) VALUES (?,?,?,?,?,?)",[name,address,email,phoneNumber,password,photo]);

    const responseData = await getPatientDetails(newUser[0].insertId);
    return res.status(200).json(responseData[0]);
}
