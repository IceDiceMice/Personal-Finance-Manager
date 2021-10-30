const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const operationsSchema = new Schema({
    category:{
        type: String,
        required: true,
    },
    type:{
        type: String,
        required: true,
    },
    summary:{
        type: Number,
        required: true,
    },
    date:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
});
const Operations = mongoose.model('Operations', operationsSchema);
module.exports = Operations;