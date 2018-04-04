
'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _common = require('../../../util/common');

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');


var activityModel = require('../../../util/schema/activities');
var organizationModel = require('../../../util/schema/organizations');
var userActivityModel = require('../../../util/schema/userActivities');

module.exports = function (app) {
    app.get('/wechat/activitysheet/activity/GetDayofActivities', function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
            var organization_id, date, begin, end, activities, days, lastday0, i, day0;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            organization_id = req.cookies.userId;
                            date = new Date(req.query.year, req.query.month, req.query.day);
                            begin = new Date(date.getFullYear(), date.getMonth(), "1");
                            end = new Date(date.getFullYear(), date.getMonth() + 1, "1");
                            _context.next = 6;
                            return activityModel.find({ 'organization_id': organization_id }, { activity_time: 1 }, { sort: { 'activity_time': 1 } }).where('activity_time').gte(begin).lt(end);

                        case 6:
                            activities = _context.sent;

                            if (!(activities == null)) {
                                _context.next = 11;
                                break;
                            }

                            return _context.abrupt('return', res.status(200).send(activities));

                        case 11:
                            days = [{}];
                            lastday0 = {};


                            days.splice(0, days.length);
                            i = void 0;

                            for (i = 0; i < activities.length; i++) {
                                day0 = {};

                                day0.day = new Date(activities[i].activity_time).getDate();
                                if (day0.day != lastday0.day) days.push(day0);
                                lastday0 = day0;
                            }
                            return _context.abrupt('return', res.status(200).send(days));

                        case 17:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        return function (_x, _x2, _x3) {
            return _ref.apply(this, arguments);
        };
    }());

    app.get('/wechat/activitysheet/activity/GetAllActivities', function () {
        var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
            var i, organization_id, date, begin, end, activities, data, activity, k;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            i = 0;
                            organization_id = req.cookies.userId;
                            date = new Date(req.query.year, req.query.month, req.query.day);
                            begin = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                            end = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
                            _context2.next = 7;
                            return activityModel.find({ 'organization_id': organization_id }, {
                                _id: 1,
                                projects: 1,
                                estimated_number: 1,
                                activity_time: 1,
                                address: 1,
                                remark: 1,
                                nurses: 1
                            }).where('activity_time').gte(begin).lt(end);

                        case 7:
                            activities = _context2.sent;

                            if (!(activities == null)) {
                                _context2.next = 12;
                                break;
                            }

                            return _context2.abrupt('return', res.status(200).send(activities));

                        case 12:
                            data = [];


                            for (i = 0; i < activities.length; i++) {
                                activity = {};

                                activity.activity_time = _common2.default.changeSingleDate(activities[i].activity_time);
                                for (k = 0; k < activities[i].projects.length; k++) {
                                    if (k == 0) activity.projects = activities[i].projects[k];else {
                                        activity.projects = activity.projects + '+' + activities[i].projects[k];
                                    }
                                }
                                activity.estimated_number = activities[i].estimated_number;
                                activity.address = activities[i].address;
                                activity.remark = activities[i].remark;
                                activity.activity_id = activities[i]._id;
                                activity.nurses = activities[i].nurses;
                                data.push(activity);
                            }
                            return _context2.abrupt('return', res.status(200).send(data));

                        case 15:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));

        return function (_x4, _x5, _x6) {
            return _ref2.apply(this, arguments);
        };
    }());

    app.get('/wechat/activitysheet/activity/GetProjects', function () {
        var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res, next) {
            var organization_id, time, projects, allProjects, pro, i, pros, _i;

            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            organization_id = req.query.organization_id;
                            time = new Date();
                            _context3.next = 4;
                            return organizationModel.findOne({ '_id': organization_id }, { projects: 1, giveProjects: 1 }, function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    return res.status(200).send(data);
                                }
                            });

                        case 4:
                            projects = _context3.sent;

                            console.log(projects.projects, projects.giveProjects, 333);
                            allProjects = [].concat((0, _toConsumableArray3.default)(projects.projects), (0, _toConsumableArray3.default)(projects.giveProjects));
                            pro = [];
                            i = void 0;


                            console.log("projects", projects);

                            for (i = 0; i < allProjects.length; i++) {

                                if (allProjects[i].beginTime <= new Date() && allProjects[i].endTime >= new Date()) {
                                    if (pro.indexOf(allProjects[i].category) == -1) {
                                        pro.push(allProjects[i].category);
                                    }
                                }
                            }

                            pros = [];

                            if (pro.length > 0) {
                                for (_i = 0; _i < pro.length; _i++) {
                                    if (_i == 0) pros = pro[0];else {
                                        pros = pros + '+' + pro[_i];
                                    }
                                }
                            }

                            return _context3.abrupt('return', res.status(200).send(pros));

                        case 14:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, this);
        }));

        return function (_x7, _x8, _x9) {
            return _ref3.apply(this, arguments);
        };
    }());

    app.post('/wechat/activitysheet/activity/addactivity', function () {
        var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(req, res, next) {
            var params, userId, projects, organization, data, reportGl, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, rg, activity, _data2, activityEntity;

            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            params = req.body;
                            userId = req.cookies.userId;
                            projects = [];

                            if (params.projects.indexOf('+') != -1) {
                                projects = params.projects.split(',');
                            } else {
                                projects = params.projects;
                            }

                            _context4.next = 6;
                            return organizationModel.findOne({ _id: userId }, { organizer_name: 1, organizer_tel: 1, receiver_name: 1, receiver_tel: 1, reportGl: 1 }, function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    return res.status(200).send(data);
                                }
                            });

                        case 6:
                            organization = _context4.sent;

                            if (!(organization == null)) {
                                _context4.next = 12;
                                break;
                            }

                            data = {};

                            data.result = "03";
                            data.name = "机构信息有误，请与华晟客服人员联系";
                            return _context4.abrupt('return', res.status(200).send(data));

                        case 12:
                            reportGl = false;
                            _iteratorNormalCompletion = true;
                            _didIteratorError = false;
                            _iteratorError = undefined;
                            _context4.prev = 16;
                            _iterator = (0, _getIterator3.default)(organization.reportGl);

                        case 18:
                            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                _context4.next = 27;
                                break;
                            }

                            rg = _step.value;

                            if (!(new Date(params.activity_time) >= rg.beginTime && new Date(params.activity_time) <= rg.endTime)) {
                                _context4.next = 24;
                                break;
                            }

                            if (!rg.flag) {
                                _context4.next = 24;
                                break;
                            }

                            reportGl = true;
                            return _context4.abrupt('break', 27);

                        case 24:
                            _iteratorNormalCompletion = true;
                            _context4.next = 18;
                            break;

                        case 27:
                            _context4.next = 33;
                            break;

                        case 29:
                            _context4.prev = 29;
                            _context4.t0 = _context4['catch'](16);
                            _didIteratorError = true;
                            _iteratorError = _context4.t0;

                        case 33:
                            _context4.prev = 33;
                            _context4.prev = 34;

                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }

                        case 36:
                            _context4.prev = 36;

                            if (!_didIteratorError) {
                                _context4.next = 39;
                                break;
                            }

                            throw _iteratorError;

                        case 39:
                            return _context4.finish(36);

                        case 40:
                            return _context4.finish(33);

                        case 41:
                            _context4.next = 43;
                            return activityModel.findOne({ organization_id: userId, activity_time: params.activity_time, address: params.address }, { _id: 1 }, function (err) {
                                if (err) {
                                    var _data = {};
                                    _data.result = "01";
                                    _data.name = "操作失败";
                                    return res.status(200).send(_data);
                                }
                            });

                        case 43:
                            activity = _context4.sent;

                            if (!(activity != null)) {
                                _context4.next = 51;
                                break;
                            }

                            _data2 = {};

                            _data2.result = "02";
                            _data2.name = "活动已经添加，请不要重复添加，请核实！";
                            return _context4.abrupt('return', res.status(200).send(_data2));

                        case 51:
                            activityEntity = new activityModel({
                                projects: projects,
                                reportGl: reportGl,
                                activity_time: params.activity_time,
                                address: params.address,
                                remark: params.remark,
                                create_man: { id: '', name: organization.organizer_name, tel: organization.organizer_tel },
                                create_time: new Date(),
                                organization_id: userId,
                                laboratory_checked: 0,
                                receiver: { tel: organization.receiver_tel, name: organization.receiver_name },
                                estimated_number: params.estimated_number,
                                nurse_number: params.nurse_number,
                                registration_number: 0,
                                sampling_number: 0,
                                sample_status: 0,
                                feedback_state: 0,
                                last_modify_time: new Date(),
                                last_modify_people_id: '',
                                delivery_id: '',
                                delivery_file_path: ''

                            });
                            _context4.next = 54;
                            return activityEntity.save(function (err) {
                                if (err) {
                                    var _data3 = {};
                                    _data3.result = "01";
                                    _data3.name = "操作失败";
                                    return res.status(200).send(_data3);
                                } else {
                                    var _data4 = {};
                                    _data4.result = "00";
                                    _data4.name = "操作成功";
                                    return res.status(200).send(_data4);
                                }
                            });

                        case 54:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, this, [[16, 29, 33, 41], [34,, 36, 40]]);
        }));

        return function (_x10, _x11, _x12) {
            return _ref4.apply(this, arguments);
        };
    }());

    app.post('/wechat/activitysheet/activity/modifyactivity', function () {
        var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(req, res, next) {
            var params, userId, projects, userActivity, _data6, data;

            return _regenerator2.default.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            params = req.body;
                            userId = req.cookies.userId;
                            projects = [];

                            if (params.projects.indexOf('+') != -1) {
                                projects = params.projects.split('+');
                            } else {
                                projects = params.projects;
                            }

                            _context6.next = 6;
                            return userActivityModel.findOne({ activity_id: params.activity_id }, { _id: 1 }, function (err) {
                                if (err) {
                                    var _data5 = {};
                                    _data5.result = "01";
                                    _data5.name = "操作失败";
                                    return res.status(200).send(_data5);
                                }
                            });

                        case 6:
                            userActivity = _context6.sent;

                            if (!(userActivity != null)) {
                                _context6.next = 12;
                                break;
                            }

                            _data6 = {};

                            _data6.result = "02";
                            _data6.name = "活动开始，有用户已经录入，不能修改";
                            return _context6.abrupt('return', res.status(200).send(_data6));

                        case 12:
                            _context6.next = 14;
                            return activityModel.update({ _id: params.activity_id }, { $set: {
                                    projects: projects,
                                    activity_time: params.activity_time,
                                    address: params.address,
                                    estimated_number: params.estimated_number,
                                    nurse_number: params.nurse_number,
                                    remark: params.remark } }, function () {
                                var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(err) {
                                    var _data7;

                                    return _regenerator2.default.wrap(function _callee5$(_context5) {
                                        while (1) {
                                            switch (_context5.prev = _context5.next) {
                                                case 0:
                                                    if (!err) {
                                                        _context5.next = 5;
                                                        break;
                                                    }

                                                    _data7 = {};

                                                    _data7.result = "01";
                                                    _data7.name = "操作失败";
                                                    return _context5.abrupt('return', res.status(200).send(_data7));

                                                case 5:
                                                case 'end':
                                                    return _context5.stop();
                                            }
                                        }
                                    }, _callee5, this);
                                }));

                                return function (_x16) {
                                    return _ref6.apply(this, arguments);
                                };
                            }());

                        case 14:
                            data = {};

                            data.result = "00";
                            data.name = "操作成功";
                            return _context6.abrupt('return', res.status(200).send(data));

                        case 18:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, this);
        }));

        return function (_x13, _x14, _x15) {
            return _ref5.apply(this, arguments);
        };
    }());

    app.post('/wechat/activitysheet/activity/deleteactivity', function () {
        var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(req, res, next) {
            var params, userActivity, _data9, data;

            return _regenerator2.default.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                        case 0:
                            params = req.body;
                            _context8.next = 3;
                            return userActivityModel.findOne({ activity_id: params.activity_id }, { _id: 1 }, function (err) {
                                if (err) {
                                    var _data8 = {};
                                    _data8.result = "01";
                                    _data8.name = "操作失败";
                                    return res.status(200).send(_data8);
                                }
                            });

                        case 3:
                            userActivity = _context8.sent;

                            if (!(userActivity != null)) {
                                _context8.next = 9;
                                break;
                            }

                            _data9 = {};

                            _data9.result = "02";
                            _data9.name = "活动开始，有用户已经录入，不能删除";
                            return _context8.abrupt('return', res.status(200).send(_data9));

                        case 9:
                            _context8.next = 11;
                            return activityModel.remove({ _id: params.activity_id }, function () {
                                var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(err) {
                                    var _data10;

                                    return _regenerator2.default.wrap(function _callee7$(_context7) {
                                        while (1) {
                                            switch (_context7.prev = _context7.next) {
                                                case 0:
                                                    if (!err) {
                                                        _context7.next = 5;
                                                        break;
                                                    }

                                                    _data10 = {};

                                                    _data10.result = "01";
                                                    _data10.name = "操作失败";
                                                    return _context7.abrupt('return', res.status(200).send(_data10));

                                                case 5:
                                                case 'end':
                                                    return _context7.stop();
                                            }
                                        }
                                    }, _callee7, this);
                                }));

                                return function (_x20) {
                                    return _ref8.apply(this, arguments);
                                };
                            }());

                        case 11:
                            data = {};

                            data.result = "00";
                            data.name = "操作成功";
                            return _context8.abrupt('return', res.status(200).send(data));

                        case 15:
                        case 'end':
                            return _context8.stop();
                    }
                }
            }, _callee8, this);
        }));

        return function (_x17, _x18, _x19) {
            return _ref7.apply(this, arguments);
        };
    }());
};