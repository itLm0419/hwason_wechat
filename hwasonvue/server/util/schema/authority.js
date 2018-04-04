/**
 * Created by win7 on 2017/4/5.
 */
var mongoose = require('mongoose');
let mongodb = require('../mongodb.js');

let authoritySchema = new mongoose.Schema({
     role:String,
     path:String,
     login:Boolean
});

let authorityModel = mongodb.model('authority',authoritySchema);

module.exports = authorityModel;