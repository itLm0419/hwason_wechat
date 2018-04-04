/**
 * Created by win7 on 2017/3/22.
 */
'use strict'
let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

let dbSetting = {
    db:'mongodb',
    host:'139.196.254.191',
    //host:'127.0.0.1',
    port:'28097',
    dbname:'Hwason',
    password:'Hwason2016-',
    username:'sa3'
    // password:'Hs1606-',
    // username:'root'
}
 //let dbStr = dbSetting.db+'://'+dbSetting.host+':'+'27017'+'/'+dbSetting.dbname;
let dbStr = dbSetting.db+'://'+dbSetting.username+':'+dbSetting.password+'@'+dbSetting.host+':'+dbSetting.port+'/'+dbSetting.dbname;
console.log(dbStr);
 // let db = mongoose.createConnection(dbStr);
mongoose.connect(dbStr);
let db =mongoose.connection;

  db.on('error',function(error){
    console.log(error);
});

module.exports = db;
