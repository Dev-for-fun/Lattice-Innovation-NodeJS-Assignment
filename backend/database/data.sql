-- create the database 
CREATE DATABASE hospital_db;
USE hospital_db;


--create the tables 

CREATE TABLE Patients(
 id INT AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(255) NOT NULL,
 address VARCHAR(255) NOT NULL,
 email VARCHAR(255) NOT NULL,
 phoneNumber VARCHAR(15) NOT NULL,
 password VARCHAR(255) NOT NULL,
 photo VARCHAR(255) NOT NULL
);

CREATE TABLE Psychiatrists (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    hospitalID INT,
    FOREIGN KEY (hospitalID) REFERENCES Hospitals(id)
);

CREATE TABLE Hospitals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE Psychiatrist_Patients(
    psychiatristId INT,
    patientId INT,
    FOREIGN KEY (psychiatristId) REFERENCES Psychiatrists(id),
    FOREIGN KEY (patientId) REFERENCES Patients(id)
);



-- Insert Hospitals
INSERT INTO Hospitals (name) VALUES ('Apollo Hospitals'), ('Jawaharlal Nehru Medical College and Hospital'), ('Indira Gandhi Institute of Medical Sciences (IGIMS)'), ('AIIMS - All India Institute Of Medical Science');
