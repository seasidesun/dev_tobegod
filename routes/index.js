"use strict";

var userRounter = require('../lib/v1/user/router');

module.exports = function (app) {

    /* Ping */
    app.get('/ping', function(req, res) { res.send("ok"); });

    app.use('/user', userRounter);

};
