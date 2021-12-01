const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TipSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    message: {
        type: String, 
        default: '',
        trim: true,
        required: 'Message cannot be blank'
    }
    
});
mongoose.model('Tip', TipSchema);
