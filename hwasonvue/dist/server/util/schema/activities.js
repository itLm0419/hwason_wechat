'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mongoose = require('mongoose');
var mongodb = require('../mongodb.js');

var activitiesSchema = new mongoose.Schema({
    projects: [String],
    reportGl: Boolean,
    activity_time: Date,
    address: String,
    remark: String,
    create_man: (0, _defineProperty3.default)({ tel: String, name: String }, 'tel', String),
    create_time: Date,
    organization_id: String,
    laboratory_checked: Number,
    receiver: { tel: String, name: String },
    estimated_number: Number,
    registration_number: Number,
    sampling_number: Number,
    sample_status: Number,
    feedback_state: Number,
    last_modify_time: Date,
    last_modify_people_id: String,
    nurses: [{
        id: String, name: String
    }],
    nurse_number: Number,
    delivery_id: String,
    delivery_file_path: String
});
var activityModel = mongodb.model('activities', activitiesSchema, 'activities');

module.exports = activityModel;