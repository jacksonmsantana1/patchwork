'use strict';

module.exports = function (app) {
    app.use('/api/type', require('./api/type'));
    app.use('/api/board', require('./api/board'));
    //app.use('/api/user', require('./api/user'));
    //app.use('/api/login', require('./api/login'));
};
