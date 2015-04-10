"use strict";

var controller = require('./controller');
var express = require('express');
var routers = express.Router();
	
    //page
    routers.get('', controller.index);

    //api
    routers.get('/api/v1/picture/list', controller.listPictrueByQuery);
    routers.post('/api/v1/picture', controller.addPictrue);

module.exports = routers;
