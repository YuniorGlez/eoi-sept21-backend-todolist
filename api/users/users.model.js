const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
        minlength: 5,
        maxlength: 255
    },
    email: {
        required: true,
        type: String,
        minlength: 5,
        maxlength: 100,
        unique : true
    }
}, { timestamps: true })

const model = mongoose.model('user', schema);

module.exports = model;