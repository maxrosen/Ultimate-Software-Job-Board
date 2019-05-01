//THIS IS NO LONGER IN USE, PLEASE USE USERS INSTEAD

const express = require('express');
const router = express.Router();

//Empoyee Model
const CustomQuestion = require('../../models/customquestion');

//@route    GET api/customquestion
//@desc     Get all customquestions
//@access   Public
router.get('/',(req,res)=> {
    CustomQuestion.find().sort({date:-1}).then(customquestions => res.json(customquestions));
});

router.get('/getCompany/:id',(req,res)=> {
    CustomQuestion.find({companyId:req.params.id}).then(customquestions => res.json(customquestions));
});

//@route    POST api/customquestion
//@desc     Create a New customquestion
//@access   Private
router.post('/create',(req,res)=> {
    const newCustomQuestion = new customquestion({
        question:req.body.question,
        companyId:req.body.companyId,
        managerId:req.body.managerId
    });
    NewCustomQuestion.save().then(customquestion=>res.json(customquestion));
});

//@route    DEL api/customquestion
//@desc     Create a New customquestion
//@access   Private
router.delete('/delete/:id',(req,res)=>{
    CustomQuestion.findById(req.params.id).then(customquestion => customquestion.remove().then(()=> res.json({ success: true})))
    .catch(err => res.status(404).json({success:false}));
});


//@route    UPDATE api/customquestion
//@desc     Update a customquestion
//@access   Private
router.put('/update/:id',(req,res)=>{
    CustomQuestion.findById(req.params.id,function(err,customquestion){
        if(!customquestion)
            res.status(404).send('customquestion not found')
        else{
            question:req.body.firstName,
            companyId:req.body.companyId,
            managerId:req.body.managerId
        }
        customquestion.save().then(customquestion=>{
            res.json({success:true})
        })
        .catch(err=>res.status(400).json({success:false}));

    });

    });

module.exports=router;