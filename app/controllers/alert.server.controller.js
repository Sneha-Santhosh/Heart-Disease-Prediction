const mongoose = require('mongoose');
const Alert = mongoose.model('Alert');
const User = require('mongoose').model('User');

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

    const alert = new Alert();
    alert.message = req.body.message;
    //alert.patient = req.body.patient;
    console.log(req.body)
    
    /*const inputs = JSON.stringify(req.body);
    console.log(inputs)
    const [id, un, iat, exp] = inputs.split(","); 

    const un2 = un.slice(9);
    const un3 = String(un2);
    console.log('Username is = '+un3);*/

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
        alert.patient = req.id
        console.log('req.user._id',req.id);

        alert.save((err) => {
            if (err) {
                console.log('error', getErrorMessage(err))

                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.status(200).json(alert);
            }
        });
    
    });
};
//
exports.list = function (req, res) {
    Alert.find().sort('-created').populate('patient', 'firstName lastName fullName').exec((err, alerts) => {
if (err) {
        return res.status(400).send({
            message: getErrorMessage(err)
        });
    } else {
        res.status(200).json(alerts);
    }
});
};
//
exports.alertByID = function (req, res, next, id) {
    Alert.findById(id).populate('patient', 'firstName lastName fullName').exec((err, alert) => {if (err) return next(err);
    if (!alert) return next(new Error('Failed to load alert '
            + id));
        req.alert = alert;
        console.log('in alertById:', req.alert)
        next();
    });
};
//
exports.read = function (req, res) {
    res.status(200).json(req.alert);
};
//
exports.update = function (req, res) {
    console.log('in update:', req.alert)
    const alert = req.alert;
    alert.title = req.body.title;
    alert.content = req.body.content;
    alert.save((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(alert);
        }
    });
};
//
exports.delete = function (req, res) {
    const alert = req.alert;
    alert.remove((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(alert);
        }
    });
};
//The hasAuthorization() middleware uses the req.alert and req.user objects
//to verify that the current user is the patient of the current alert
exports.hasAuthorization = function (req, res, next) {
    console.log('in hasAuthorization - patient: ',req.alert.patient)
    console.log('in hasAuthorization - user: ',req.id)
    //console.log('in hasAuthorization - user: ',req.user._id)


    if (req.alert.patient.id !== req.id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};
