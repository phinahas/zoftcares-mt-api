const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const dbConnnection = require('./configurations/db.config')

const routes  = require('./routes/index')

const server = express();


server.use(bodyParser.json())
server.use(cors());


server.use('/',routes)


//Handling invalid api request
server.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404 || err.status;
    res.status(err.status).send({ message: "Invalid API" });
    next();
  });

  //Hadeling error and sending response
server.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  const message = error.message;
  console.log(error);
  res.status(statusCode).json({ message  });
});



dbConnnection.dbConnection.then(()=>{
  server.listen(8080,()=>{
      console.log("Server started at:",8080)
  })
})
