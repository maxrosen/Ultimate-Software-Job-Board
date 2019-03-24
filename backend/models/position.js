const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PositionSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
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
    postedDate: {
        type: Date,
        default: Date.now
    }
});

var Position = mongoose.model('position',PositionSchema);

module.exports = Position;