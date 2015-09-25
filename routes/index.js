"use strict";

var errorHandler = require('./error_handler');
var pandoraRounter = require('../lib/v1/pandora/router');
var memoryRounter = require('../lib/v1/memory/router');
var planRounter = require('../lib/v1/plan/router');
var userRounter = require('../lib/v1/user/router');
var qiniuRounter = require('../lib/v1/qiniu/router');

module.exports = function (app) {

    app.get('/', function (req, res, next) { res.render("home"); });
    app.get('/ping', function (req, res, next) { res.send("ok"); });

    // for test
    app.post('/sms/result/push', function (req, res, next) {
        console.log(req.body);
        console.log(req.query);
    });

    app.use('/pandora', pandoraRounter);
    app.use('/memory', memoryRounter);
    app.use('/qiniu', qiniuRounter);
    app.use('/plan', planRounter);
    app.use('/user', userRounter);

    // 404 handler
    app.use(errorHandler.handler404);
    
    // Error handler
    app.use(errorHandler.errorHandler);
};
