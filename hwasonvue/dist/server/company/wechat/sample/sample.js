
'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _common = require('../../../util/common.js');

var _common2 = _interopRequireDefault(_common);

var _common3 = require('../../../util/common');

var _common4 = _interopRequireDefault(_common3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var activityModel = require('../../../util/schema/activities');
var userActivitiesModel = require('../../../util/schema/userActivities');
var userModel = require('../../../util/schema/user');

var samplePackageModel = require('../../../util/schema/samplePackage');
var sampleMaterialModel = require('../../../util/schema/sampleMaterial');

module.exports = function (app) {
    app.get('/wechat/sample/samplelist', function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
            var organization_id, date, time;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            organization_id = req.cookies.userId;
                            date = new Date();
                            time = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
                            _context.next = 5;
                            return activityModel.find({ organization_id: organization_id, activity_time: { $gte: time }, sampling_number: { $gt: 0 } }, {
                                _id: 1,
                                activity_time: 1,
                                projects: 1,
                                address: 1,
                                sampling_number: 1,
                                sample_status: 1,
                                feedback_state: 1,
                                receiver: 1
                            }, function (err, content) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    return res.status(200).send(data);
                                } else {

                                    console.log("content:", content);
                                    var _data = [];
                                    for (var i = 0; i < content.length; i++) {
                                        var activity = {};

                                        activity.activity_time = _common4.default.changeSingleDate(content[i].activity_time);
                                        for (var k = 0; k < content[i].projects.length; k++) {
                                            if (k == 0) activity.projects = content[i].projects[k];else {
                                                activity.projects = activity.projects + '+' + content[i].projects[k];
                                            }
                                        }

                                        if (content[i].feedback_state == 0) {
                                            activity.feedback_state = "未核对";
                                        } else if (content[i].feedback_state == 1) {
                                            activity.feedback_state = "已核对";
                                        } else if (content[i].feedback_state == 2) {
                                            activity.feedback_state = "待核对";
                                        }

                                        if (content[i].sample_status == 0) {
                                            activity.sample_status = "未开始";
                                        } else if (content[i].sample_status == 1) {
                                            activity.sample_status = "运输中";
                                        } else if (content[i].sample_status == 2) {
                                            activity.sample_status = "检测中";
                                        } else if (content[i].sample_status == 3) {
                                            activity.sample_status = "检测结束";
                                        } else if (content[i].sample_status == 4) {
                                            activity.sample_status = "寄送中";
                                        } else if (content[i].sample_status == 5) {
                                            activity.sample_status = "已接收";
                                        } else if (content[i].sample_status == 10) {
                                            activity.sample_status = "活动开始";
                                        } else if (content[i].sample_status == 11) {
                                            activity.sample_status = "活动结束";
                                        } else {
                                            activity.sample_status = "未知";
                                        }


                                        activity.sampling_number = content[i].sampling_number;
                                        activity.address = content[i].address;
                                        activity.receiver = content[i].receiver.name;
                                        activity.activity_id = content[i]._id;
                                        _data.push(activity);
                                    }

                                    return res.status(200).send(_data);
                                }
                            });

                        case 5:
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

    app.get('/wechat/sample/sampledetaillist', function () {
        var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
            var activity_id, isSample, page, sum, userActivities, maxpage, num, users, i, user0, user, j, data;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            activity_id = req.query.activity_id;
                            isSample = req.query.isSample;
                            page = req.query.page;
                            sum = 0;
                            userActivities = [];
                            _context2.next = 7;
                            return userActivitiesModel.count({ activity_id: activity_id, sampled: true });

                        case 7:
                            sum = _context2.sent;
                            maxpage = Math.ceil(sum / 8);


                            console.log("maxpage", maxpage);

                            num = (page - 1) * 8;
                            _context2.next = 13;
                            return userActivitiesModel.find({ activity_id: activity_id, sampled: true }, {
                                _id: 1,
                                userId: 1,
                                test_number: 1,
                                barcode: 1,
                                projects: 1,
                                salesman: 1,
                                doublecheck: 1
                            }).skip(num).limit(8).sort({ test_number: 1 });

                        case 13:
                            userActivities = _context2.sent;
                            users = [];

                            if (!(userActivities != null)) {
                                _context2.next = 43;
                                break;
                            }

                            i = 0;

                        case 17:
                            if (!(i < userActivities.length)) {
                                _context2.next = 39;
                                break;
                            }

                            user0 = {};
                            _context2.next = 21;
                            return userModel.findOne({ _id: userActivities[i].userId }, {
                                _id: 1,
                                name: 1,
                                sex: 1,
                                IDNo: 1,
                                birthday: 1

                            });

                        case 21:
                            user = _context2.sent;


                            user0.name = user.name;
                            user0.sex = user.sex;
                            console.log("today", new Date().getFullYear());
                            console.log("birthday", user.birthday);
                            console.log("birthday2", new Date(user.birthday).getFullYear());

                            user0.age = new Date().getFullYear() - new Date(user.birthday).getFullYear();
                            console.log("age", user0.age);
                            user0.IDNo = user.IDNo;
                            for (j = 0; j < userActivities[i].projects.length; j++) {
                                if (j == 0) {
                                    user0.projects = userActivities[i].projects[j];
                                } else {
                                    user0.projects = user0.projects + '+' + userActivities[i].projects[j];
                                }
                            }
                            user0.barcode = userActivities[i].barcode;
                            user0.salesman = userActivities[i].salesman;
                            user0.id = userActivities[i]._id;
                            user0.userId = user._id;
                            users.push(user0);

                        case 36:
                            i++;
                            _context2.next = 17;
                            break;

                        case 39:
                            data = {};

                            data.users = users;
                            data.maxpage = maxpage;
                            return _context2.abrupt('return', res.status(200).send(data));

                        case 43:
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

    app.get('/wechat/sample/sampledetaillist2', function () {
        var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res, next) {
            var activity_id, isSample, page, sum, userActivities, maxpage, num, users, i, user0, user, j, data;
            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            activity_id = req.query.activity_id;
                            isSample = req.query.isSample;
                            page = req.query.page;
                            sum = 0;
                            userActivities = void 0;
                            _context3.next = 7;
                            return userActivitiesModel.count({ activity_id: activity_id, sampled: false });

                        case 7:
                            sum = _context3.sent;
                            maxpage = Math.ceil(sum / 8);


                            console.log("sum", sum);

                            num = (page - 1) * 8;
                            _context3.next = 13;
                            return userActivitiesModel.find({ activity_id: activity_id, sampled: false }, {
                                _id: 1,
                                userId: 1,
                                test_number: 1,
                                barcode: 1,
                                projects: 1,
                                salesman: 1,
                                doublecheck: 1
                            }).skip(num).limit(8).sort({ test_number: 1 });

                        case 13:
                            userActivities = _context3.sent;
                            users = [];

                            console.log("userActivities", userActivities);

                            if (!(userActivities != null)) {
                                _context3.next = 40;
                                break;
                            }

                            i = 0;

                        case 18:
                            if (!(i < userActivities.length)) {
                                _context3.next = 36;
                                break;
                            }

                            user0 = {};
                            _context3.next = 22;
                            return userModel.findOne({ _id: userActivities[i].userId }, {
                                _id: 1,
                                name: 1,
                                sex: 1,
                                IDNo: 1,
                                birthday: 1

                            });

                        case 22:
                            user = _context3.sent;


                            user0.name = user.name;
                            user0.sex = user.sex;

                            user0.age = new Date().getFullYear() - new Date(user.birthday).getFullYear();

                            user0.IDNo = user.IDNo;
                            for (j = 0; j < userActivities[i].projects.length; j++) {
                                if (j == 0) {
                                    user0.projects = userActivities[i].projects[j];
                                } else {
                                    user0.projects = user0.projects + '+' + userActivities[i].projects[j];
                                }
                            }
                            user0.barcode = userActivities[i].barcode;
                            user0.salesman = userActivities[i].salesman;
                            user0.id = userActivities[i]._id;
                            user0.userId = user._id;
                            users.push(user0);

                        case 33:
                            i++;
                            _context3.next = 18;
                            break;

                        case 36:
                            data = {};

                            data.users = users;
                            data.maxpage = maxpage;
                            return _context3.abrupt('return', res.status(200).send(data));

                        case 40:
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

    app.get('/wechat/sample/samplecheck', function () {
        var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(req, res, next) {
            var activity_id, userActivities, users, i, user, user0, j;
            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            activity_id = req.query.activity_id;
                            _context4.next = 3;
                            return userActivitiesModel.find({ activity_id: activity_id, sampled: true, doubleChecked: false }, {
                                _id: 1,
                                userId: 1,
                                test_number: 1,
                                barcode: 1,
                                projects: 1,
                                salesman: 1
                            }).sort({ test_number: 1 }).limit(8);

                        case 3:
                            userActivities = _context4.sent;
                            users = [];

                            if (!(userActivities != null)) {
                                _context4.next = 26;
                                break;
                            }

                            i = 0;

                        case 7:
                            if (!(i < userActivities.length)) {
                                _context4.next = 25;
                                break;
                            }

                            _context4.next = 10;
                            return userModel.findOne({ _id: userActivities[i].userId }, {
                                _id: 1,
                                name: 1,
                                sex: 1,
                                IDNo: 1,
                                birthday: 1

                            });

                        case 10:
                            user = _context4.sent;
                            user0 = {};

                            user0.name = user.name;
                            user0.sex = user.sex;
                            user0.age = new Date().getFullYear() - new Date(user.birthday).getFullYear();
                            user0.IDNo = user.IDNo;

                            for (j = 0; j < userActivities[i].projects.length; j++) {
                                if (j == 0) {
                                    user0.projects = userActivities[i].projects[j];
                                } else {
                                    user0.projects = user0.projects + '+' + userActivities[i].projects[j];
                                }
                            }
                            user0.barcode = userActivities[i].barcode;
                            user0.salesman = userActivities[i].salesman;
                            user0.id = userActivities[i]._id;
                            user0.userId = user._id;
                            users.push(user0);

                        case 22:
                            i++;
                            _context4.next = 7;
                            break;

                        case 25:
                            return _context4.abrupt('return', res.status(200).send(users));

                        case 26:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, this);
        }));

        return function (_x10, _x11, _x12) {
            return _ref4.apply(this, arguments);
        };
    }());

    app.post('/wechat/sample/confirm', function () {
        var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(req, res, next) {
            var activity_id, users;
            return _regenerator2.default.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            activity_id = req.body.activity_id;
                            users = req.body.users;
                            _context6.next = 4;
                            return userActivitiesModel.update({ userId: { $in: users }, activity_id: activity_id }, { $set: { doubleChecked: true } }, { multi: true }, function () {
                                var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(err) {
                                    var data, _data2;

                                    return _regenerator2.default.wrap(function _callee5$(_context5) {
                                        while (1) {
                                            switch (_context5.prev = _context5.next) {
                                                case 0:
                                                    if (!err) {
                                                        _context5.next = 7;
                                                        break;
                                                    }

                                                    data = {};

                                                    data.result = "01";
                                                    data.name = "操作失败";
                                                    return _context5.abrupt('return', res.status(200).send(data));

                                                case 7:
                                                    _data2 = {};

                                                    _data2.result = "00";
                                                    _data2.name = "操作成功";
                                                    return _context5.abrupt('return', res.status(200).send(_data2));

                                                case 11:
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

                        case 4:
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

    app.post('/wechat/wechat/company/demo/check', function () {
        var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(req, res, next) {
            var id;
            return _regenerator2.default.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            id = req.body.id;
                            _context7.next = 3;
                            return activityModel.update({ _id: id }, { $set: { feedback_state: 0 } }, function (err, content) {
                                if (err) {
                                    if (err) {
                                        var data = {};
                                        data.result = "01";
                                        data.name = "操作失败";
                                        return res.status(200).send(data);
                                    }
                                } else {
                                    return res.status(200).send(content);
                                }
                            });

                        case 3:
                        case 'end':
                            return _context7.stop();
                    }
                }
            }, _callee7, this);
        }));

        return function (_x17, _x18, _x19) {
            return _ref7.apply(this, arguments);
        };
    }());
};