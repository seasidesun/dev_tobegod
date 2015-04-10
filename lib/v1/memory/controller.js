"use strict";

var manager = require('./manager');
var paginationHandler = require('../../utils/pagination');

module.exports.index = function (req, res) {
    
    res.render("memory");
};

module.exports.listPictrueByQuery = function (req, res, next) {

    var pagination = paginationHandler.getFromReq(req, 50);
    
    manager.listPictrueByQuery({}, pagination, function (error, ret) {

        if (error) return next(error);
        // console.log(ret);
        
        res.json(ret);
    });
};

module.exports.addPictrue = function (req, res, next) {

	// console.log(req.body);
	var data = req.body;

	manager.addPictrue(data, function (error, ret) {
		
        if (error) return next(error);

		res.status(200);
		res.end();
	});
};