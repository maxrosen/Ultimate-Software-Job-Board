const express = require('express');
const router = express.Router();

//Empoyee Model
const CustomAnswer = require('../../models/customanswer');

//@route    GET api/customanswer
//@desc     Get all customanswers
//@access   Public
router.get('/',(req,res)=> {
    CustomAnswer.find().sort({date:-1}).then(customanswers => res.json(customanswers));
});

router.get('/getCompany/:id',(req,res)=> {
    CustomAnswer.find({employeeId:req.params.id}).then(customanswers => res.json(customanswers));
});

router.get('/getCompanyManager/:id',(req,res)=> {
    CustomAnswer.find({companyId:req.params.companyId, employeeId:req.params.employeeId}).then(customanswers => res.json(customanswers));
});

router.get('/count',(req,res)=> {
    CustomAnswer.countDocuments().then(data =>res.json(data));
});

router.get('/getanswers/:id', (req,res)=>{
    CustomAnswer.findById(req.params.id).then(customanswers => res.json(customanswers.answer));
});

//@route    POST api/customanswer
//@desc     Create a New customanswer
//@access   Private
router.post('/create',(req,res)=> {
    const newCustomAnswer = new CustomAnswer({
        answer:req.body.answer,
        companyId:req.body.companyId,
        employeeId:req.body.employeeId
    });
    newCustomAnswer.save().then(answer=>res.json(answer));
});



//@route    DEL api/customanswer
//@desc     Create a New customanswer
//@access   Private
router.delete('/delete/:id',(req,res)=>{
    CustomAnswer.findById(req.params.id).then(customanswer => customanswer.remove().then(()=> res.json({ success: true})))
    .catch(err => res.status(404).json({success:false}));
});


//@route    UPDATE api/customanswer
//@desc     Update a customanswer
//@access   Private
router.put('/update/:id',(req,res)=>{

    CustomAnswer.findById(req.params.id,function(err,customanswer){
       if(!customanswer)
           res.status(404).send('customanswer not found')
       else{
         customanswer.set('answer', req.body.params.answer);
       }

       customanswer.save().then(customanswer=>{
           res.json({success:true})
       })
       .catch(err=>res.status(400).json({success:false}));

    });

});

module.exports=router;
