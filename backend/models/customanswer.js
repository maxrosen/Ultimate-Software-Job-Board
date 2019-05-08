const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomAnswerSchema = new Schema({
    answer:[{
        type: String,
        required: true
    }],
    companyId:{
        type: Number,
        required: true
    },
    managerId:{
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

var CustomAnswer = mongoose.model('customanswers',CustomAnswerSchema);

module.exports = CustomAnswer;