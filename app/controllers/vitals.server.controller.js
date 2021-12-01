const mongoose = require('mongoose');
const Vitals = mongoose.model('Vitals');
const User = require('mongoose').model('User');
const Nurse = require('mongoose').model('Nurse');

//
function getErrorMessage(err) {
    if (err.errors) {
        for (let errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].
                message;
        }
    } else {
        return 'Unknown server error';
    }
};
//
exports.create = function (req, res) {

    const vitals = new Vitals();
    vitals.pulse = req.body.pulse;
    vitals.pressure = req.body.pressure;
    vitals.weight = req.body.pressure;
    vitals.temp = req.body.temperature;
    vitals.respiratory = req.body.respiratory;
    vitals.patient = req.body.patient;
    console.log(req.body)

    //
    //
    User.findOne({username: req.body.patient}, (err, user) => {

        if (err) { return getErrorMessage(err); }
        //
        console.log('11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111');
        console.log('HEREEEEEE' + req.body.patient);
        req.id = user._id;
        console.log('user._id',req.id);
        

	
    }).then( function () 
    {
        vitals.patient = req.id
        console.log('req.user._id',req.id);

        vitals.save((err) => {
            if (err) {
                console.log('error', getErrorMessage(err))

                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.status(200).json(vitals);
            }
        });
    
    });
};

exports.nurseCreate = function (req, res) {

    const vitals = new Vitals();
    vitals.pulse = req.body.pulse;
    vitals.pressure = req.body.pressure;
    vitals.weight = req.body.pressure;
    vitals.temp = req.body.temperature;
    vitals.respiratory = req.body.respiratory;
    vitals.patient = req.body.patient;
    console.log(req.body)

    //
    //
    Nurse.findOne({username: req.body.patient}, (err, nurse) => {

        if (err) { return getErrorMessage(err); }
        //
        console.log('11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111');
        console.log('HEREEEEEE' + req.body.patient);
        req.id = nurse._id;
        console.log('nurse._id',req.id);
        

	
    }).then( function () 
    {
        vitals.patient = req.id
        console.log('req.user._id',req.id);

        vitals.save((err) => {
            if (err) {
                console.log('error', getErrorMessage(err))

                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.status(200).json(vitals);
            }
        });
    
    });
};
//
exports.list = function (req, res) {
    Vitals.find().sort('-created').populate('patient', 'firstName lastName fullName').exec((err, vitals) => {
if (err) {
        return res.status(400).send({
            message: getErrorMessage(err)
        });
    } else {
        res.status(200).json(vitals);
    }
});
};
//
exports.vitalsByID = function (req, res, next, id) {
    Vitals.findById(id).populate('patient', 'firstName lastName fullName').exec((err, vitals) => {if (err) return next(err);
    if (!vitals) return next(new Error('Failed to load vitals '
            + id));
        req.vitals = vitals;
        console.log('in vitalsById:', req.vitals)
        next();
    });
};
//
exports.read = function (req, res) {
    res.status(200).json(req.vitals);
};
//
exports.update = function (req, res) {
    console.log('in update:', req.vitals)
    const vitals = req.vitals;
    vitals.title = req.body.title;
    vitals.content = req.body.content;
    vitals.save((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(vitals);
        }
    });
};
//
exports.delete = function (req, res) {
    const vitals = req.vitals;
    vitals.remove((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(vitals);
        }
    });
};
//The hasAuthorization() middleware uses the req.vitals and req.user objects
//to verify that the current user is the patient of the current vitals
exports.hasAuthorization = function (req, res, next) {
    console.log('in hasAuthorization - patient: ',req.vitals.patient)
    console.log('in hasAuthorization - user: ',req.id)
    //console.log('in hasAuthorization - user: ',req.user._id)


    if (req.vitals.patient.id !== req.id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};
