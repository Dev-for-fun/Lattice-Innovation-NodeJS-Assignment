import mysql from 'mysql2';

const connectDB = async()=>{

    try {
        const pool = mysql.createPool({
            host:process.env.HOST,
            user: process.env.USER,
            password:process.env.PASSWORD,
            database:process.env.DATABASE
        }).promise();
        return pool;
        
    } catch (error) {
        console.log("Error occured during connection to the mysql server: ",error);
    }
}

export default connectDB;

