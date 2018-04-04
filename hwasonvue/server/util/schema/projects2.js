/**
 * Created by win7 on 2017/4/5.
 */
var mongoose = require('mongoose');
let mongodb = require('../mongodb.js');

let projectsSchema = new mongoose.Schema({
    category:String,
    projects:[{
        name:String,
        count:Number,
        }
    ]
});

let projectModel = mongodb.model('projects2',projectsSchema,'projects2');

module.exports = projectModel;

/**
 * Created by win7 on 2017/9/19.
 */
