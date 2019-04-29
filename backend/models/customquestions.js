const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomQuestionSchema = new Schema({
    question:{
        type: [String],
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

var CustomQuestion = mongoose.model('customquestion',CustomQuestionSchema);

module.exports = CustomQuestion;