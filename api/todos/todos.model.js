const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: {
        required: true,
        type: String,
        minlength: [5, 'La tarea tiene que tener mínimo 5 letras' ],
        maxlength: 255
    },
    completed: {
        required: true,
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const model = mongoose.model('todo', schema);

module.exports = model;