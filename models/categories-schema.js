const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoriesSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
});
const Categories = mongoose.model('Categories', categoriesSchema);
module.exports = Categories;