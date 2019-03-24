const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    employeeID:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    companyID:{
        type: Number,
        required: true
    },
    companyName:{
        type: String,
        required: true
    },
    managerID:{
        type: Number,
        required: true
    },
    positionTitle:{
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});

var Employee = mongoose.model('employee',EmployeeSchema);

module.exports = Employee;