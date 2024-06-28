import connectDB from "./connection.js";
import { patients, psychiatrists, hospitals } from "./data.js";

//inital config function which automatically creates the tables
export const initSqlConfig = async() =>{
    
    const db = await  connectDB().then(pool => pool.getConnection());
    try{

        //for creating the tables in the sql server if not already exists
        await db.query(`CREATE TABLE IF NOT EXISTS hospitals (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL
        );`);
        
        await db.query(`CREATE TABLE IF NOT EXISTS psychiatrists (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            hospitalID INT,
            FOREIGN KEY (hospitalID) REFERENCES Hospitals(id) 
        );`);

        await db.query(`CREATE TABLE IF NOT EXISTS patients(
            id INT AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            address VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phoneNumber VARCHAR(15) NOT NULL,
            password VARCHAR(255) NOT NULL,
            photo VARCHAR(255) NOT NULL,
            psychiatristId INT,
            FOREIGN KEY (psychiatristId) REFERENCES Psychiatrists(id),
            PRIMARY KEY(id,psychiatristId)
        );
        `);



    }
    catch(err){
        console.error("Error while configuring sql :", err);
        return res.status(500).json({ error: "Internal server error ,"+err });
    }   
    finally{
        db.release();
    }
}

//function to dump the dummy data
export const dumpData = async()=>{
    const db = await connectDB().then(pool => pool.getConnection());
    try{
        
        await db.query(`INSERT INTO hospitals(name) VALUES ?`,[hospitals]);
        
        await db.query(`INSERT INTO psychiatrists(name,hospitalID) VALUES ?`,[psychiatrists]);
        
        await db.query(`INSERT INTO patients(name,address,email,phoneNumber,password,photo,psychiatristId) VALUES ?`,[patients]);
        
        console.log("Dummy data dumped successfully! Please comment the code again.");
    }
    catch(err){
        console.error("Error while dumping dummy data:", err);
        res.status(500).json({ error: "Internal server error "+err });
    }
    finally{
        db.release();
    }
}

