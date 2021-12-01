const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AlertSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    message: {
        type: String, 
        default: '',
        trim: true,
        required: 'Message cannot be blank'
    },
    patient: {
        type: Schema.ObjectId,
        ref: 'User'
    }
    
});
mongoose.model('Alert', AlertSchema);
