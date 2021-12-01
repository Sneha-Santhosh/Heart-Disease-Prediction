const users = require('../../app/controllers/users.server.controller');
const alert = require('../../app/controllers/alert.server.controller');
//
module.exports = function (app) {
        app.route('/api/alert')
            .get(alert.list)
            .post(users.requiresLogin, alert.create);
        //
        app.route('/api/alert/:alertId')
            .get(alert.read)
            .put(users.requiresLogin, alert.hasAuthorization, alert.
                update)
            .delete(users.requiresLogin, alert.hasAuthorization, alert.
                delete);
        //
        app.param('alertId', alert.alertByID);
};
