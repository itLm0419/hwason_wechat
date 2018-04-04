
'use strict';

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var dbSetting = {
  db: 'mongodb',
  host: '139.196.254.191',

  port: '28097',
  dbname: 'Hwason',
  password: 'Hwason2016-',
  username: 'sa3'
};

var dbStr = dbSetting.db + '://' + dbSetting.username + ':' + dbSetting.password + '@' + dbSetting.host + ':' + dbSetting.port + '/' + dbSetting.dbname;
console.log(dbStr);

mongoose.connect(dbStr);
var db = mongoose.connection;

db.on('error', function (error) {
  console.log(error);
});

module.exports = db;