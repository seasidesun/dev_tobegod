'use strict';

var mongoskin = require('mongoskin');
var config = require('../config');

var mongoQueryString = '?readPreference=secondaryPreferred&auto_reconnect=true&poolSize=3';
var mongoOpts = {
    numberOfRetries: 1,
    retryMiliSeconds: 500,
    safe: true,
    native_parser: true
};

var dbList = {};

function getDb (dbName)
{
    if (!dbList[dbName]) {
        dbList[dbName] = mongoskin.db(config[dbName + '_mongo'].url + mongoQueryString, mongoOpts, { socketOptions: { timeout: 5000 } });
    }
    return dbList[dbName];
}

function getCollection (dbName, collectionName)
{
    return getDb(dbName).collection(collectionName);
}

module.exports = function (dbName)
{
    return {
        getDb: getDb.bind(null, dbName),
        getCollection: getCollection.bind(null, dbName),
        ObjectID: mongoskin.ObjectID,
        toObjectID: mongoskin.helper.toObjectID
    };
};
