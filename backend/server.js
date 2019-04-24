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
const application = require('./router/api/applications');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
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
var url = 'mongodb+srv://Kumar_320:abc@cluster0-wyhgq.mongodb.net/test?retryWrites=true';

// Use connect method to connect to the server
mongoose.connect(url,function(err){
    if(err) console.log("MongoDB connection error");
    else
    console.log("MongoDB Successfully Connected");
});

//Import example data to MongoDB
let exec = require('child_process').exec

let command = 'mongo slackers --eval "db.dropDatabase()"'
exec(command, (err, stdout, stderr) => {
})

command = 'mongoimport -d slackers -c employees --jsonArray --file Clover_Enterprises-employees.json'
exec(command, (err, stdout, stderr) => {
})
command = 'mongoimport -d slackers -c employees --jsonArray --file Crystal_Security-employees.json'
exec(command, (err, stdout, stderr) => {
})
command = 'mongoimport -d slackers -c positions --jsonArray --file Clover_Enterprises-positions.json'
exec(command, (err, stdout, stderr) => {
})
command = 'mongoimport -d slackers -c positions --jsonArray --file Crystal_Security-positions.json'
exec(command, (err, stdout, stderr) => {
})

router.get('/get',(req,res)=>{res.send({success: "yes"});});
router.get('/',(req,res)=>{res.send("BackEnd EntryPoint Listening on 4000");});

var jsonParser = bodyParser.json();

// Accepting JSON data throught POST requests. We'll probably end up changing the format of the JSON later
// Right now it accepts JSON in the format of {Title, Salary, Description}
// The frontend will send this post request through some kind of form
// /jobs is the route that accepts the JSON (right now its localhost:4000/jobs)
// jsonParser is a type of body-parser object, body parser is middleware for express
// that's used for obtaining the body data of http requests
// (req, res) => is just an anonymous function that runs when a post request is made,
// req refers to the request, res refers to the server's response.
router.post('/jobs', jsonParser, (req,res) => {


    //Verifying that JSON data has been submitted correctly
    if(req.body.title == null | req.body.salary == null | req.body.description == null){
        res.send("Invalid data");
        return;
    }

// Here we would be inserting the application data to the database
// For now I'm just printing it.
    console.log("Title: " + req.body.title);
    console.log("Salary: " + req.body.salary);
    console.log("Description: " + req.body.description);

    res.send("recieved data");
} );

app.use('/',router);
app.use('/api/positions',position);
app.use('/api/employees',employee);
app.use('/api/applications',application);
app.use('/api/users',user);

app.listen(API_PORT,()=>console.log("Server listening on 4000"));
