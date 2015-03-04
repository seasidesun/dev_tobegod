"use strict";

var errorHandler = require('../lib/utils/error_handler');
var userRounter = require('../lib/v1/user/router');

module.exports = function (app) {

    /* Ping */
    app.get('/ping', function (req, res, next) { res.send("ok"); });

    app.get('/', function (req, res, next) { res.render("home"); });

    app.use('/user', userRounter);

    // 404 handler
    app.use(errorHandler.handler404);
    
    // Error handler
    app.use(errorHandler.errorHandler);
};
