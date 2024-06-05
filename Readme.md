# Lattice Assignment

## Libraries/Frameworks Used
- **Express.js**: Used as the web framework for handling API requests and responses efficiently.
- **MySQL**: Used as the relational database management system for storing and retrieving data.
- **Joi**: Used for input validation to ensure data integrity and security.
- **Postman**: Used for testing and documenting APIs during development.
- **Bycrypt**: A library to help in hashing passwords.
- **Multer**: Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
- **dotenv**: Used for accessing the environment variables

## API Endpoints

### 1. New Patient Registration
- **Endpoint:** `/api/patients/register`
- **Method:** POST
- **Description:** Register a new patient with provided details.
- **Request Parameters:**
  - `psychiatristId`: Integer (ID of the Psychiatrist)
- **Request Body Fields:**
  - `name`: String
  - `address`: String (Minimum 10 characters)
  - `email`: String (Valid email address)
  - `phoneNumber`: String (Minimum 10 digits with country code)
  - `password`: String (8-15 characters, at least one uppercase letter, one lowercase letter, and one number)
  - `photo`: String

### 2. Fetch Psychiatrists and Patient Details for a Hospital
- **Endpoint:** `/api/hospitals/psychiatrists`
- **Method:** GET
- **Description:** Fetch all psychiatrists and their patients count for a given hospital.
- **Request Parameters:**
  - `hospitalId`: Integer (ID of the hospital)

## Postman Collection
You can test and explore the APIs using the Postman collection provided below:
[Postman Collection Link](https://elements.getpostman.com/redirect?entityId=16667625-4f847231-f758-4241-bd9f-152ba502c9bc&entityType=collection)

## Steps to run the project
1. Install NodeJS and run npm install to install the dependencies
2. Create .env file( for guidance see .env.example file)
3. Run the sql queries given in the /database/sql_schema_that_must_be_used.sql
4. use npm run dev to run the nodejs project

## For dummy data dump, uncomment the line 14 in server.js file but please sure that you have created the database before doing that.
