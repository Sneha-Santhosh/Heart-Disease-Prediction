const users = require('../../app/controllers/users.server.controller');
const tip = require('../../app/controllers/tip.server.controller');
//
module.exports = function (app) {
        app.route('/api/tip')
            .get(tip.list)
            .post(users.requiresLogin, tip.create);
        //
        app.route('/api/tip/:tipId')
            .get(tip.read)
            .put(users.requiresLogin, tip.hasAuthorization, tip.
                update)
            .delete(users.requiresLogin, tip.hasAuthorization, tip.
                delete);
        //
        app.param('tipId', tip.tipByID);
};
