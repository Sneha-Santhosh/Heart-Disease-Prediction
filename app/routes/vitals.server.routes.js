const users = require('../../app/controllers/users.server.controller');
const vitals = require('../../app/controllers/vitals.server.controller');
//
module.exports = function (app) {
        app.route('/api/vitals')
            .get(vitals.list)
            .post(users.requiresLogin, vitals.create);

        app.route('/api/nursevitals')
            .get(vitals.list)
            .post(users.requiresLogin, vitals.nurseCreate);    
        //
        app.route('/api/vitals/:vitalId') 
            .get(vitals.read)
            .put(users.requiresLogin, vitals.hasAuthorization, vitals.
                update)
            .delete(users.requiresLogin, vitals.hasAuthorization, vitals.
                delete);

        //
        app.param('vitalId', vitals.vitalsByID);
};
