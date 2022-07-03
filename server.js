const express = require("express");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');

//controllers
const Auth = require('./routes/api/user');
const Loan = require('./routes/api/loan')

const app = express();
app.use(logger("dev"));

dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(cors());



const port = process.env.port || 5000;

//entrance
app.get('/', (req, res) => {
    res.end('Welcome to my api')
})

//database config
mongoose
        .connect("mongodb://127.0.0.1:27017/api", { useUnifiedTopology:true, useNewUrlParser:true,})
        .then(() => console.log("connected to db"))
        .catch(err => console.log(err))

//auth route
app.use('/api/user', Auth);

//loan route
app.use('/api/loan', Loan);


app.listen(port, () => {
    console.log(`connected on port ${port}`)
});