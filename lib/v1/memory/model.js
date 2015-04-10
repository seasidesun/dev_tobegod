"use strict";

var dbHandler = require('../../db')("memory");
var memoryColl = dbHandler.getCollection("picture");

module.exports.getPictrueByQuery = function (query, pagination, callback) {

	memoryColl.find(query).sort({createdAt: -1}).skip(pagination.offset).limit(pagination.limit).toArray(callback);
};

module.exports.countPictrueByQuery = function (query, callback) {

	memoryColl.count(query, callback);
};

module.exports.addPictrue = function (data, callback) {

	memoryColl.insert(data, callback);
};

