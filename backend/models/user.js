const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    employeeId:{
        type: Number,
        default:'-1'
    },
    companyName:{
        type: String,
        required: true
    },
    companyId:{
        type: Number,
        default:'-1'
    },
    managerId:{
        type: Number,
        default: '-1'
    },
    positionTitle:{
        type: Number,
        default:'-1'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

var User = mongoose.model('user',UserSchema);

module.exports = User;