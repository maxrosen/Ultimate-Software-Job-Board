const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    email:{
    	type: String
    },
    phonenumber:{
    	type: Number
    },
    position:{
    	type: String
    },
    positionid:{
    	type: mongoose.Schema.Types.ObjectId,
    	required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

var Application = mongoose.model('application',ApplicationSchema);

module.exports = Application;
