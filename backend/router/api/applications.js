const express = require('express');
const router = express.Router();

//User Model
const Application = require('../../models/application');

//@route    GET api/user
//@desc     Get all Users
//@access   Public
router.get('/',(req,res)=> {
    Application.find().sort({date:-1}).then(applications => res.json(applications));
});

//@route    POST api/user
//@desc     Create a New User
//@access   Private
router.post('/create',(req,res)=> {
    const newApplication = new Application({
        name:req.body.name,
        email:req.body.email,
        phonenumber:req.body.phonenumber,
        position:req.body.position,
        positionid:req.body.positionid
    });
    newApplication.save().then(application=>res.json(application));
});

//@route    DEL api/user
//@desc     Create a New User
//@access   Private
router.delete('/delete/:id',(req,res)=>{
    Application.findById(req.params.id).then(application => application.remove().then(()=> res.json({ success: true})))
    .catch(err => res.status(404).json({success:false}));
});


//@route    UPDATE api/user
//@desc     Update a User
//@access   Private
router.put('/update/:id',(req,res)=>{
    Application.findById(req.params.id,function(err,application){
        if(!application)
            res.status(404).send('application not found')
        else{
            application.name=req.body.name;
            application.email=req.body.email;
            application.phonenumber=req.body.phonenumber;
            //user.date=req.body.body.date
        }
        application.save().then(application=>{
            res.json({success:true})
        })
        .catch(err=>res.status(400).json({success:false}));

    });

    });

module.exports=router;
