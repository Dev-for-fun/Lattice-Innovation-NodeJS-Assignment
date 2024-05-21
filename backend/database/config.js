import connectDB from "./connection.js";
import { patients, psychiatrists, patientsPsychatrists, hospitals } from "./data.js";

export const initSqlConfig = async() =>{

    const db = await  connectDB().then(pool => pool.getConnection());

    //for creating the tables in the sql server if not already exists
    await db.query(`CREATE TABLE IF NOT EXISTS Hospitals (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    );`);

    await db.query(`CREATE TABLE IF NOT EXISTS Patients(
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phoneNumber VARCHAR(15) NOT NULL,
        password VARCHAR(255) NOT NULL,
        photo VARCHAR(255) NOT NULL
       );
       `);

       await db.query(`CREATE TABLE IF NOT EXISTS Psychiatrists (
           id INT AUTO_INCREMENT PRIMARY KEY,
           name VARCHAR(255) NOT NULL,
           hospitalID INT,
           FOREIGN KEY (hospitalID) REFERENCES Hospitals(id)
       );`);

    await db.query(`CREATE TABLE IF NOT EXISTS Psychiatrist_Patients(
        psychiatristId INT,
        patientId INT,
        FOREIGN KEY (psychiatristId) REFERENCES Psychiatrists(id),
        FOREIGN KEY (patientId) REFERENCES Patients(id),
        PRIMARY KEY (psychiatristId,patientId)
    );`);

    
}

export const dumpData = async()=>{
    const db = await connectDB().then(pool => pool.getConnection());
    await db.query(`INSERT INTO patients(name,address,email,phoneNumber,password,photo) VALUES ?`,[patients]);

    await db.query(`INSERT INTO hospitals(name) VALUES ?`,[hospitals]);
    
    await db.query(`INSERT INTO psychiatrists(name,hospitalID) VALUES ?`,[psychiatrists]);
    
    await db.query(`INSERT INTO psychiatrist_patients(psychiatristId,patientId) VALUES ?`,[patientsPsychatrists]);
}

