
'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var activityModel = require('../../../util/schema/activities');
var userActivitiesModel = require('../../../util/schema/userActivities');
var organizationModel = require('../../../util/schema/organizations');

module.exports = function (app) {
    app.get('/wechat/activityinfo/todayActivity', function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
            var organization_id, date, begin, end, todayActivities, data, i, activity, j;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            organization_id = req.cookies.userId;
                            date = new Date();
                            begin = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                            end = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
                            _context.next = 6;
                            return activityModel.find({ organization_id: organization_id }, { projects: 1, activity_time: 1, address: 1, organization_id: 1, feedback_state: 1 }, function (err) {
                                if (err) {
                                    var _data = {};
                                    _data.result = "01";
                                    _data.name = "操作失败";
                                    return res.status(200).send(_data);
                                }
                            }).where('activity_time').gte(begin).lt(end).sort({ activity_time: 1 });

                        case 6:
                            todayActivities = _context.sent;
                            data = [];

                            for (i = 0; i < todayActivities.length; i++) {
                                activity = {};

                                activity.activity_time = changeSingleDate(todayActivities[i].activity_time);
                                activity.address = todayActivities[i].address;
                                activity.activity_id = todayActivities[i]._id;
                                activity.feedback_state = todayActivities[i].feedback_state;
                                for (j = 0; j < todayActivities[i].projects.length; j++) {
                                    if (j == 0) {
                                        activity.projects = todayActivities[i].projects[j];
                                    } else {
                                        activity.projects = activity.projects + '+' + todayActivities[i].projects[j];
                                    }
                                }

                                data.push(activity);
                            }

                            return _context.abrupt('return', res.status(200).send(data));

                        case 10:
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

    app.get('/wechat/activityinfo/todayActivityReport', function () {
        var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
            var todayActivity_id, count_total, count_sampled, _data2, data, i, j, activity, pro, k, len, q;

            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            todayActivity_id = req.query.activity_id;

                            console.log("id2", todayActivity_id);
                            _context2.next = 4;
                            return userActivitiesModel.aggregate([{ $match: { activity_id: todayActivity_id } }, { $group: { _id: { 'projects': '$projects' }, count: { $sum: 1 } } }]);

                        case 4:
                            count_total = _context2.sent;

                            console.log("count_total", count_total);
                            _context2.next = 8;
                            return userActivitiesModel.aggregate([{ $match: { activity_id: todayActivity_id, sampled: true } }, { $group: { _id: { 'projects': '$projects' }, count: { $sum: 1 } } }]);

                        case 8:
                            count_sampled = _context2.sent;

                            console.log("count_sampled", count_sampled);

                            if (!(count_total.length == 0)) {
                                _context2.next = 13;
                                break;
                            }

                            _data2 = {};
                            return _context2.abrupt('return', res.status(200).send(_data2));

                        case 13:
                            console.log("idd", count_total[0]._id);
                            console.log("projects", count_total[0]._id.projects);
                            data = new Array();
                            i = void 0, j = void 0;
                            i = 0;

                        case 18:
                            if (!(i < count_total.length)) {
                                _context2.next = 49;
                                break;
                            }

                            activity = {};
                            pro = "";


                            for (k = 0; k < count_total[i]._id.projects.length; k++) {
                                if (k == 0) pro = count_total[i]._id.projects[k];else pro = pro + '+' + count_total[i]._id.projects[k];
                            }

                            activity.projects = pro;
                            activity.total_number = count_total[i].count;
                            j = 0;

                        case 25:
                            if (!(j < count_sampled.length)) {
                                _context2.next = 43;
                                break;
                            }

                            if (!(count_sampled[j]._id.projects.length == count_total[i]._id.projects.length)) {
                                _context2.next = 40;
                                break;
                            }

                            len = count_sampled[j]._id.projects.length;
                            q = void 0;
                            q = 0;

                        case 30:
                            if (!(q < len)) {
                                _context2.next = 36;
                                break;
                            }

                            if (!(count_sampled[j]._id.projects[q] != count_total[i]._id.projects[q])) {
                                _context2.next = 33;
                                break;
                            }

                            return _context2.abrupt('break', 36);

                        case 33:
                            q++;
                            _context2.next = 30;
                            break;

                        case 36:
                            if (!(q == len)) {
                                _context2.next = 40;
                                break;
                            }

                            activity.sampled_number = count_sampled[j].count;;
                            return _context2.abrupt('break', 43);

                        case 40:
                            j++;
                            _context2.next = 25;
                            break;

                        case 43:
                            if (j == count_sampled.length) activity.sampled_number = 0;
                            activity.nosample_number = activity.total_number - activity.sampled_number;
                            data.push(activity);

                        case 46:
                            i++;
                            _context2.next = 18;
                            break;

                        case 49:
                            return _context2.abrupt('return', res.status(200).send(data));

                        case 50:
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

    app.get('/wechat/activityinfo/GetUnCheckActivity', function () {
        var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res, next) {
            var organization_id, unCheckActivity, activity_time, data, i;
            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            organization_id = req.cookies.userId;
                            _context3.next = 3;
                            return activityModel.find({ organization_id: organization_id, feedback_state: { $gte: 0 } }, {
                                activity_time: 1, projects: 1, address: 1, sampling_number: 1, sample_status: 1, receiver: 1, feedback_state: 1 }).sort({ activity_time: -1 }).limit(2);

                        case 3:
                            unCheckActivity = _context3.sent;

                            if (!(unCheckActivity == null)) {
                                _context3.next = 8;
                                break;
                            }

                            return _context3.abrupt('return', res.status(200).send(unCheckActivity));

                        case 8:
                            activity_time = {}, data = {};

                            for (i = 0; i < unCheckActivity.length; i++) {
                                activity_time[i] = changeSingleDate(unCheckActivity[i].activity_time);
                            }

                            data.unCheckActivity = unCheckActivity;
                            data.activity_time = activity_time;

                            return _context3.abrupt('return', res.status(200).send(data));

                        case 13:
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

    app.get('/wechat/activityinfo/queryNote', function () {
        var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(req, res, next) {
            var organization_id, data;
            return _regenerator2.default.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            organization_id = req.cookies.userId;
                            _context5.next = 3;
                            return organizationModel.findOne({ _id: organization_id }, {
                                notice_status: 1 }, function () {
                                var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(err) {
                                    var _data3;

                                    return _regenerator2.default.wrap(function _callee4$(_context4) {
                                        while (1) {
                                            switch (_context4.prev = _context4.next) {
                                                case 0:
                                                    if (!err) {
                                                        _context4.next = 5;
                                                        break;
                                                    }

                                                    _data3 = {};

                                                    _data3.result = "01";
                                                    _data3.name = "操作失败";
                                                    return _context4.abrupt('return', res.status(200).send(_data3));

                                                case 5:
                                                case 'end':
                                                    return _context4.stop();
                                            }
                                        }
                                    }, _callee4, this);
                                }));

                                return function (_x13) {
                                    return _ref5.apply(this, arguments);
                                };
                            }());

                        case 3:
                            data = _context5.sent;
                            return _context5.abrupt('return', res.status(200).send(data));

                        case 5:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, this);
        }));

        return function (_x10, _x11, _x12) {
            return _ref4.apply(this, arguments);
        };
    }());

    app.post('/wechat/activityinfo/updateNote', function () {
        var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(req, res, next) {
            var userId, data;
            return _regenerator2.default.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            userId = req.cookies.userId;
                            _context7.next = 3;
                            return organizationModel.update({ _id: userId }, { $set: {
                                    notice_status: 1
                                } }, function () {
                                var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(err) {
                                    var _data4;

                                    return _regenerator2.default.wrap(function _callee6$(_context6) {
                                        while (1) {
                                            switch (_context6.prev = _context6.next) {
                                                case 0:
                                                    if (!err) {
                                                        _context6.next = 5;
                                                        break;
                                                    }

                                                    _data4 = {};

                                                    _data4.result = "01";
                                                    _data4.name = "操作失败";
                                                    return _context6.abrupt('return', res.status(200).send(_data4));

                                                case 5:
                                                case 'end':
                                                    return _context6.stop();
                                            }
                                        }
                                    }, _callee6, this);
                                }));

                                return function (_x17) {
                                    return _ref7.apply(this, arguments);
                                };
                            }());

                        case 3:
                            data = {};

                            data.result = "00";
                            data.name = "操作成功";
                            return _context7.abrupt('return', res.status(200).send(data));

                        case 7:
                        case 'end':
                            return _context7.stop();
                    }
                }
            }, _callee7, this);
        }));

        return function (_x14, _x15, _x16) {
            return _ref6.apply(this, arguments);
        };
    }());
    app.post('/wechat/sample/comfirmActivity', function () {
        var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(req, res, next) {
            var _id, update, activity, data;

            return _regenerator2.default.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                        case 0:
                            _id = req.body.params._id;
                            update = {};
                            _context8.next = 4;
                            return activityModel.findOne({ _id: _id }, { sample_status: 1 });

                        case 4:
                            activity = _context8.sent;

                            if (activity.sample_status == "0" || "10") {
                                update = { $set: {
                                        feedback_state: 1,
                                        sample_status: 11
                                    } };
                            } else {
                                update = { $set: {
                                        feedback_state: 1
                                    } };
                            }
                            _context8.next = 8;
                            return activityModel.update({ _id: _id }, update);

                        case 8:
                            data = {};

                            data.result = "00";
                            data.name = "操作成功";
                            res.status(200).send(data);

                        case 12:
                        case 'end':
                            return _context8.stop();
                    }
                }
            }, _callee8, this);
        }));

        return function (_x18, _x19, _x20) {
            return _ref8.apply(this, arguments);
        };
    }());

    app.post('/wechat/activityinfo/confirm', function () {
        var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10(req, res, next) {
            var activity_id, data;
            return _regenerator2.default.wrap(function _callee10$(_context10) {
                while (1) {
                    switch (_context10.prev = _context10.next) {
                        case 0:
                            activity_id = req.body.activity_id;
                            _context10.next = 3;
                            return activityModel.update({ '_id': activity_id
                            }, { $set: {
                                    feedback_state: 1,
                                    sample_status: 11
                                } }, function () {
                                var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9(err) {
                                    var _data5;

                                    return _regenerator2.default.wrap(function _callee9$(_context9) {
                                        while (1) {
                                            switch (_context9.prev = _context9.next) {
                                                case 0:
                                                    if (!err) {
                                                        _context9.next = 5;
                                                        break;
                                                    }

                                                    _data5 = {};

                                                    _data5.result = "01";
                                                    _data5.name = "操作失败";
                                                    return _context9.abrupt('return', res.status(200).send(_data5));

                                                case 5:
                                                case 'end':
                                                    return _context9.stop();
                                            }
                                        }
                                    }, _callee9, this);
                                }));

                                return function (_x24) {
                                    return _ref10.apply(this, arguments);
                                };
                            }());

                        case 3:
                            data = {};

                            data.result = "00";
                            data.name = "操作成功";
                            return _context10.abrupt('return', res.status(200).send(data));

                        case 7:
                        case 'end':
                            return _context10.stop();
                    }
                }
            }, _callee10, this);
        }));

        return function (_x21, _x22, _x23) {
            return _ref9.apply(this, arguments);
        };
    }());

    function changeSingleDate(date) {
        var month = void 0;
        if ((date.getMonth() + 1).toString().length == 1) {
            month = "0" + (date.getMonth() + 1).toString();
        } else {
            month = (date.getMonth() + 1).toString();
        }
        var minute = date.getMinutes();
        minute = minute < 10 ? '0' + minute : minute;

        var hour = date.getHours();
        hour = hour < 10 ? '0' + hour : hour;

        return date.getYear() + 1900 + "/" + month + "/" + date.getDate() + " " + hour + ":" + minute;
    }
};