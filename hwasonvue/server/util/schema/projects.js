/**
 * Created by win7 on 2017/4/5.
 */
var mongoose = require('mongoose');
let mongodb = require('../mongodb.js');

let projectsSchema = new mongoose.Schema({
    category:String,
    projects:[{
        name:String,
        sampleNum:Number,
        sampleType:String,
        remark:String
    }
    ]
});

let projectModel = mongodb.model('projects',projectsSchema,'projects');

module.exports = projectModel;

