const express = require('express');
const router = express.Router();

//Empoyee Model
const Employee = require('../../models/employee');

//@route    GET api/employee
//@desc     Get all Employees
//@access   Public
router.get('/',(req,res)=> {
    Employee.find().sort({date:-1}).then(employees => res.json(employees));
});

//@route    POST api/employee
//@desc     Create a New Employee
//@access   Private
router.post('/create',(req,res)=> {
    const newEmployee = new Employee({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        employeeID:req.body.employeeID,
        email:req.body.email,
        companyId:req.body.companyId,
        companyName:req.body.companyName,
        managerId:req.body.managerId,
        positionTitle:req.body.positionTitle,
        startDate:req.body.startDate
    });
    newEmployee.save().then(employee=>res.json(employee));
});

//@route    DEL api/employee
//@desc     Create a New Employee
//@access   Private
router.delete('/delete/:id',(req,res)=>{
    Employee.findById(req.params.id).then(employee => employee.remove().then(()=> res.json({ success: true})))
    .catch(err => res.status(404).json({success:false}));
});


//@route    UPDATE api/employee
//@desc     Update a Employee
//@access   Private
router.put('/update/:id',(req,res)=>{
    Employee.findById(req.params.id,function(err,employee){
        if(!employee)
            res.status(404).send('employee not found')
        else{
            employee.firstName=req.body.firstName,
            employee.lastName=req.body.lastName,
            employee.employeeID=req.body.employeeID,
            employee.email=req.body.email,
            employee.companyId=req.body.companyId,
            employee.companyName=req.body.companyName,
            employee.managerId=req.body.managerId,
            employee.positionTitle=req.body.positionTitle,
            employee.startDate=req.body.startDate
            //employee.date=req.body.body.date
        }
        employee.save().then(employee=>{
            res.json({success:true})
        })
        .catch(err=>res.status(400).json({success:false}));

    });

    });

module.exports=router;