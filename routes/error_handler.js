"use strict";

var http = require('http');

module.exports.handler404 = function (req, res, next)
{
    var error = new Error('Not Found: "' + req.originalUrl + '"');
    error.status = 404;
    error.code = 404;

    next(error);
};

module.exports.errorHandler = function (error, req, res, next)
{
    var meanError = getMeanError(error, req);

    // delete meanError.stack;
    dumpError(meanError);

    res.status(meanError.status);
    res.json(meanError);
};

function getMeanError(error, req)
{
    var status = (function () {
        var tempStatus = error.status || 500;
        var parsed = parseInt(tempStatus, 10);
        if (isNaN(parsed) || !(600 > parsed && 200 <= parsed)) {
            return 500;
        } else {
            return parsed;
        }
    })(); // direct call

    var code = (function () {
        var tempCode = error.code || status;
        var parsed = parseInt(tempCode, 10);
        if (isNaN(parsed)) {
            return 500;
        } else {
            return parsed;
        }
    })(); // direct call

    var meanError = {
        status: status,
        statusDesc: http.STATUS_CODES[status],
        code: code,
        message: error.message,
        stack: error.stack || (new Error()).stack
    };

    return meanError;
};
    
process.on('uncaughtException', function (error)
{
    console.error("uncaughtException ERROR");
    dumpError(error);
});

function dumpError(error)
{
    if (typeof error === 'object') {
        if (error.message) {
            console.error('[%s] %s: %s', new Date().toString().split(' ').splice(1).splice(0, 4).join(' '), error.name ? error.name : 'ERROR', error.message);
        }
        if (error.stack) {
            console.error('\nStacktrace:');
            console.error('====================');
            console.error(error.stack);
            console.error('\n\n\n');
        }
    } else {
        console.error('dumpError :: argument is not an object');
    }
};
