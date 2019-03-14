const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const API_PORT = 4000;
const app = express();
const router = express.Router();

const user = require('./router/api/users');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));



// Connection URL
var url = 'mongodb://localhost:27017/myproject';

// Use connect method to connect to the server
mongoose.connect(url,function(err){
    if(err) console.log("connection error");
    console.log("MongoDB Successfully Connected");
});

router.get('/get',(req,res)=>{res.send({success: "yes"});});
router.get('/',(req,res)=>{res.send("BackEnd EntryPoint Listening on 3001");});
app.use('/',router);
app.use('/api/users',user)
app.listen(API_PORT,()=>console.log("Server listening on 4000"));
