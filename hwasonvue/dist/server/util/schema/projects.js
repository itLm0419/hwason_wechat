'use strict';

var mongoose = require('mongoose');
var mongodb = require('../mongodb.js');

var projectsSchema = new mongoose.Schema({
    category: String,
    projects: [{
        name: String,
        sampleNum: Number,
        sampleType: String,
        remark: String
    }]
});

var projectModel = mongodb.model('projects', projectsSchema, 'projects');

module.exports = projectModel;