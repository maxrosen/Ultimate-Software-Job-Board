const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const API_PORT = 4000;
const app = express();
const router = express.Router();

const user = require('./router/api/users');
const position = require('./router/api/positions');
const employee = require('./router/api/employees');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));
//Cross Domain
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    // res.header("Content-Type", "application/json;charset=utf-8");
    next();
  });


// Connection URL(docker)
//var url = 'mongodb://mongodb:27017/myproject';

// Connection URL(local)
var url = 'mongodb://localhost:27017/slackers';

// Use connect method to connect to the server
mongoose.connect(url,function(err){
    if(err) console.log("MongoDB connection error");
    else
    console.log("MongoDB Successfully Connected");
});

router.get('/get',(req,res)=>{res.send({success: "yes"});});
router.get('/',(req,res)=>{res.send("BackEnd EntryPoint Listening on 4000");});
app.use('/',router);
app.use('/api/positions',position)
app.listen(API_PORT,()=>console.log("Server listening on 4000"));
