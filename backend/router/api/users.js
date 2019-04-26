const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//User Model
const User = require('../../models/user');
process.env.SECRET_KEY = 'slackers'
//@route    GET api/user
//@desc     Get all Users
//@access   Public
router.get('/',(req,res)=> {
    User.find().sort({date:-1}).then(users => res.json(users));
});

//@route    POST api/user
//@desc     Register a New User
//@access   Private
router.post('/register',(req,res)=> {
    if(req.body.first_name == null | req.body.last_name == null | req.body.email == null){
        res.send("Invalid data");
    }
    const newUser = new User({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
		password:req.body.password,
		employeeID:req.body.employeeID,
        email:req.body.email,
        companyId:req.body.companyId,
        companyName:req.body.companyName,
        managerId:req.body.managerId,
        positionTitle:req.body.positionTitle,
        startDate:req.body.startDate
    });
    User.findOne({email:req.body.email}).then(
        user=>{
            if(user){
                res.json({status:"Registration Failed: Email is already in use.",success:false});
                return;
            }
            else{
                if(req.body.password == null){
                    res.send("Invalid data");
                }
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    newUser.password = hash
                    User.create(newUser)
                        .then(user => {
                            res.json({ status: user.email + ' has been registered!' ,success:true})
                        })
                        .catch(err => {
                            res.send('error: ' + err)
                        })
                })
            }
        }
    )
    .catch(
        err=>{
        res.send(err);
    });
});

//@route    POST api/user
//@desc     Login
//@access   Private
router.post('/login',(req,res)=> {
    User.findOne({email:req.body.email}).then(
        user=>{
            if(!user){
                res.json({status:"Login Failed: invalid email or password",success:false});
            }
            else{
               
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const payload = {
                        _id: user._id,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email
                    }
                    let token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    })
                    res.send(token)
                } 
                else {
                    res.json({status:"Login Failed: invalid email or password",success:false});
                }
            }
        }
    );
    
});

//@route    DEL api/user
//@desc     Create a New User
//@access   Private
router.delete('/delete/:id',(req,res)=>{
    User.findById(req.params.id).then(user => user.remove().then(()=> res.json({ success: true})))
    .catch(err => res.status(404).json({success:false}));
});


//@route    UPDATE api/user
//@desc     Update a User
//@access   Private
router.put('/update/:id',(req,res)=>{
    User.findById(req.params.id,function(err,user){
        if(!user)
            res.status(404).send('user not found')
        else{
            user.name=req.body.name;
            //user.date=req.body.body.date
        }
        user.save().then(user=>{
            res.json({success:true})
        })
        .catch(err=>res.status(400).json({success:false}));

    });

    });

module.exports=router;