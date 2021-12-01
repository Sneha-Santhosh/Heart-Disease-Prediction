const mongoose = require('mongoose');
const Tip = mongoose.model('Tip');
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

    const tip = new Tip();
    tip.message = req.body.message;
    //tip.patient = req.body.patient;
    console.log(req.body)
    
    /*const inputs = JSON.stringify(req.body);
    console.log(inputs)
    const [id, un, iat, exp] = inputs.split(","); 

    const un2 = un.slice(9);
    const un3 = String(un2);
    console.log('Username is = '+un3);*/

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
        tip.patient = req.id
        console.log('req.nurse._id',req.id);

        tip.save((err) => {
            if (err) {
                console.log('error', getErrorMessage(err))

                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.status(200).json(tip);
            }
        });
    
    });
};
//
exports.list = function (req, res) {
    Tip.find().sort('-created').populate('patient', 'firstName lastName fullName').exec((err, tips) => {
if (err) {
        return res.status(400).send({
            message: getErrorMessage(err)
        });
    } else {
        res.status(200).json(tips);
    }
});
};
//
exports.tipByID = function (req, res, next, id) {
    Tip.findById(id).populate('patient', 'firstName lastName fullName').exec((err, tip) => {if (err) return next(err);
    if (!tip) return next(new Error('Failed to load tip '
            + id));
        req.tip = tip;
        console.log('in tipById:', req.tip)
        next();
    });
};
//
exports.read = function (req, res) {
    res.status(200).json(req.tip);
};
//
exports.update = function (req, res) {
    console.log('in update:', req.tip)
    const tip = req.tip;
    tip.message = req.body.message;
    tip.save((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(tip);
        }
    });
};
//
exports.delete = function (req, res) {
    const tip = req.tip;
    tip.remove((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(tip);
        }
    });
};
//The hasAuthorization() middleware uses the req.tip and req.nurse objects
//to verify that the current nurse is the patient of the current tip
exports.hasAuthorization = function (req, res, next) {
    
    console.log('in hasAuthorization - nurse: ',req.id)
    //console.log('in hasAuthorization - nurse: ',req.nurse._id)


    if (req.tip.patient.id !== req.id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};
