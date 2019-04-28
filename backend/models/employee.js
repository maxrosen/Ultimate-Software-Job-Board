//THIS IS NO LONGER IN USE, PLEASE USE USER INSTEAD

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
    employeeId:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    companyId:{
        type: Number,
        required: true
    },
    companyName:{
        type: String,
        required: true
    },
    managerId:{
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