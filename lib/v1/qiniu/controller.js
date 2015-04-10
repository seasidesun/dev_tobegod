"use strict";

var path = require('path');
var qiniu = require('../../../config').qiniu;
var tool = require('../../utils/tool');

var domain = "http://7xii35.com1.z0.glb.clouddn.com";
var bucket = "memory";
var uptoken = null;
var expires = 3600;

module.exports.getUptoken = function (req, res, next) {

	var flags = {
		scope: 'memory', 
		deadline: expires + Math.floor(Date.now() / 1000)
	}

	var token = tool.getUptoken(flags, qiniu.ACCESS_KEY, qiniu.SECRET_KEY);
	
	res.json({uptoken: token});
};