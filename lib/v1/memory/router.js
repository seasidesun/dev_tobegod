"use strict";

var controller = require('./controller');
var express = require('express');
var routers = express.Router();

    //pandora
    routers.get('', controller.index);

module.exports = routers;
