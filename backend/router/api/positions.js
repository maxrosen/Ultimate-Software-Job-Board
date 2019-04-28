const express = require('express');
const router = express.Router();

//Position Model
const Position = require('../../models/position');

//@route    GET api/position
//@desc     Get all Positions
//@access   Public
router.get('/page',(req,res)=> {
    var perpage =6, page =Number(req.query.page);
    Position.find().sort({postedDate:-1}).skip(perpage*(page-1)).limit(perpage).then(positions => res.json(positions));
});

//@route    GET api/position
//@desc     Get all Positions
//@access   Public
router.get('/count',(req,res)=> {

    Position.count().then(data =>res.json(data));
});

//@route    POST api/position
//@desc     Create a New Position
//@access   Private
router.post('/create',(req,res)=> {
    const newPosition = new Position({
        title:req.body.title,
        description:req.body.description,
        companyId:req.body.companyId,
        companyName:req.body.companyName,
        managerId:req.body.managerId
    });
    newPosition.save().then(position=>res.json(position));
});

//@route    DEL api/position
//@desc     Create a New Position
//@access   Private
router.delete('/delete/:id',(req,res)=>{
    Position.findById(req.params.id).then(position => position.remove().then(()=> res.json({ success: true})))
    .catch(err => res.status(404).json({success:false}));
});


//@route    UPDATE api/position
//@desc     Update a Position
//@access   Private
router.put('/update/:id',(req,res)=>{
    Position.findById(req.params.id,function(err,position){
        if(!position)
            res.status(404).send('position not found')
        else{
            position.title=req.body.title;
            position.description=req.body.description;
            position.companyId=req.body.companyId;
            position.companyName=req.body.companyName;
            position.managerId=req.body.managerId;
            //position.date=req.body.body.date
        }
        position.save().then(position=>{
            res.json({success:true})
        })
        .catch(err=>res.status(400).json({success:false}));

    });

    });

module.exports=router;