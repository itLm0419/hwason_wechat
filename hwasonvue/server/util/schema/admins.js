/**
 * Created by win7 on 2017/4/5.
 */
var mongoose = require('mongoose');
let mongodb = require('../mongodb.js');

let adminSchema = new mongoose.Schema({
    name: String,
    password : String,
    permission:Number
});

let adminModel = mongodb.model('admins',adminSchema,'admins');

module.exports = adminModel;
