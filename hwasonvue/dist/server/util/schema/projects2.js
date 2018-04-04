'use strict';

var mongoose = require('mongoose');
var mongodb = require('../mongodb.js');

var projectsSchema = new mongoose.Schema({
    category: String,
    projects: [{
        name: String,
        count: Number
    }]
});

var projectModel = mongodb.model('projects2', projectsSchema, 'projects2');

module.exports = projectModel;