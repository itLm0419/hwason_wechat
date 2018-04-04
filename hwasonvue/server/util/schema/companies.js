/**
 * Created by win7 on 2017/4/5.
 */
var mongoose = require('mongoose');
let mongodb = require('../mongodb.js');

let companySchema = new mongoose.Schema({
    ename: String,
    name : String
});

let companyModel = mongodb.model('companies',companySchema,'companies');

module.exports = companyModel;
