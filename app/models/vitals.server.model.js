const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const VitalsSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    pulse: {
        type: String, 
        default: '',
        trim: true,
        required: 'Pulse Cannot be blank'
    },
    pressure: {
        type: String, 
        default: '',
        trim: true,
        required: 'Bp Cannot be blank'
    },
    weight: {
        type: String, 
        default: '',
        trim: true,
        required: 'Weight Cannot be blank'
    },
    temp: {
        type: String, 
        default: '',
        trim: true,
        required: 'Temp Cannot be blank'
    },
    respiratory: {
        type: String, 
        default: '',
        trim: true,
        required: 'Resp Cannot be blank'
    },
    patient: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});
mongoose.model('Vitals', VitalsSchema);
