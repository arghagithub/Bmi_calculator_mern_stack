const mongoose = require('mongoose');
const { Schema } = mongoose;

const dataSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    feet: {
        type: Number,
        required: true
    },
    inch: {
        type: Number,
        required: true
    },
    kg: {
        type: Number,
        required: true
    },
    bmi: {
        type: Number,
        required: true
    },
    condition: {
        type: String,
        required: true
    }
}, { timestamps: true });




module.exports = mongoose.model('data', dataSchema);
