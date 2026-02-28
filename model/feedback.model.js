const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    text :{
        type: String,
        required : true,
    }
})

module.exports = mongoose.model('feedback' , feedbackSchema);