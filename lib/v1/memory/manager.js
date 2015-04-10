"use strict";

var model = require('./model');
var async = require('async');
var paginationHandler = require('../../utils/pagination');

module.exports.listPictrueByQuery = function (query, pagination, callback) {

	async.parallel([
		model.countPictrueByQuery.bind(null, query),
		model.getPictrueByQuery.bind(null, query, pagination)
	], function (error, result) {

		if (error) return callback(error);

		callback(null, {
			meta: paginationHandler.getMeta(result[0], result[1].length, pagination),
			list: result[1]
		});
	});
};

module.exports.addPictrue = function (data, callback) {

	model.addPictrue(data, callback);
};
