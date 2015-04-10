'use strict';

var crypto = require('crypto');

module.exports.getUptoken =function (flags, ACCESS_KEY, SECRET_KEY) {

  var encodedFlags = module.exports.urlsafeBase64Encode(JSON.stringify(flags));
  var encoded = module.exports.hmacSha1(encodedFlags, SECRET_KEY);
  var encodedSign = module.exports.base64ToUrlSafe(encoded);
  return ACCESS_KEY + ':' + encodedSign + ':' + encodedFlags;
};

module.exports.urlsafeBase64Encode = function(jsonFlags) {
  
  var encoded = new Buffer(jsonFlags).toString('base64');
  return module.exports.base64ToUrlSafe(encoded);
};

module.exports.base64ToUrlSafe = function(v) {
  
  return v.replace(/\//g, '_').replace(/\+/g, '-');
};

exports.hmacSha1 = function(encodedFlags, secretKey) {

  var hmac = crypto.createHmac('sha1', secretKey);
  hmac.update(encodedFlags);
  return hmac.digest('base64');
};

exports.generateAccessToken = function(uri, body) {
  var u = url.parse(uri);
  var path = u.path;
  var access = path + '\n';

  if (body) {
    access += body;
  }

  var digest = exports.hmacSha1(access, conf.SECRET_KEY);
  var safeDigest = exports.base64ToUrlSafe(digest);
  return 'QBox ' + conf.ACCESS_KEY + ':' + safeDigest;
};

function isQiniuCallback(path, body, callbackAuth) {
  var auth = exports.generateAccessToken(path, body);
  return auth === callbackAuth;
};


