"use strict";

var controller = require('./controller');
var express = require('express');
var routers = express.Router();

    //pandora
    routers.get('/uptoken', controller.getUptoken);

module.exports = routers;
