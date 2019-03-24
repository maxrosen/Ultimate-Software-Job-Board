const express = require('express');
const router = express.Router();

//User Model
const User = require('../../models/user');

//@route    GET api/user
//@desc     Get all Users
//@access   Public
router.get('/',(req,res)=> {
    User.find().sort({date:-1}).then(users => res.json(users));
});

//@route    POST api/user
//@desc     Create a New User
//@access   Private
router.post('/create',(req,res)=> {
    const newUser = new User({
        name:req.body.name
    });
    newUser.save().then(user=>res.json(user));
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