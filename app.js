require('dotenv').config()

const bodyParser = require('body-parser');
const express = require('express')
const {databaseService} = require ('./services/databaseService');

const app = express();
app.use(bodyParser.json());
//Rutas
require('./routes')(app, databaseService());//<== Pasamos como argumento la aplicaion (app)


app.listen(3000, function(){
    console.log('App listening on port 3000!');
});