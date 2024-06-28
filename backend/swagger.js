import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
      title: 'My API',
      description: 'Description'
    },
    produces: ['application/json'],
    host: 'localhost:'+process.env.PORT,
    definitions: {
        HospitalDetails: {
          type: 'object',
          properties: {
            HospitalName: "Aims",
            TotalPsychiatristCount: 5,
            TotalPatientsCount: 4,
            PsychiatristDetails: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  PsychiatristId: 1,
                  PsychiatristName: "Gajendra",
                  PatientsCount: 2,
                },
              },
            },
          },
        },
        PatientRegister:{
            type:'object',
            properties:{
                id: 21,
                name: "gajendrayy",
                address: "2asdasdassfsdfsdf",
                email: "g@g.com",
                phoneNumber: "+91323232232",
                password: "$2b$10$DbKc0ov7S597OPBdOcZMQeN2o7cODYuVwKip6hC1KBfse2.eoBNie",
                photo: "gajendrayy - BlogHomeForReport.png",
                psychiatristId: 17
            }
        },
        
    }
};

const outputFile = './swagger-output.json';
const routes = ['./routes/hospitals.js'];

swaggerAutogen()(outputFile, routes, doc);

