'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var activityModel = require('../util/schema/activities');
var organizationModel = require('../util/schema/organizations');
var loginModel = require('../util/schema/login');
var userModel = require('../util/schema/user');
var userActivityModel = require('../util/schema/userActivities');
var salesmanModel = require('../util/schema/salesman');

var provinceModel = require('../util/schema/provinces');
module.exports = function (app) {
    app.get('/wechat/examination/examination', function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
            var userName, salesman, result2, data, result3, _data3, _data, _data4;

            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            userName = req.query.userName;
                            _context.next = 3;
                            return loginModel.findOne({ userName: userName }, { _id: 1, realName: 1, tel: 1 }, function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    return res.status(200).send(data);
                                }
                            });

                        case 3:
                            salesman = _context.sent;

                            if (!(salesman != null)) {
                                _context.next = 34;
                                break;
                            }

                            _context.next = 7;
                            return salesmanModel.findOne({ _id: salesman._id }, { _id: 1, organization_id: 1, tel: 1 }, function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    return res.status(200).send(data);
                                }
                            });

                        case 7:
                            result2 = _context.sent;

                            if (!(result2 == null)) {
                                _context.next = 15;
                                break;
                            }

                            data = {};

                            data.result = "03";
                            data.name = "业务员注册信息有误，请联系华晟人员解决";
                            return _context.abrupt('return', res.status(200).send(data));

                        case 15:
                            _context.next = 17;
                            return organizationModel.findOne({ _id: result2.organization_id }, {
                                _id: 1,
                                name: 1,
                                checked: 1
                            }, function (err) {
                                if (err) {
                                    var _data2 = {};
                                    _data2.result = "01";
                                    _data2.name = "操作失败";
                                    res.status(200).send(_data2);
                                    return;
                                }
                            });

                        case 17:
                            result3 = _context.sent;

                            if (!(result3 == null)) {
                                _context.next = 24;
                                break;
                            }

                            _data3 = {};

                            _data3.result = "03";
                            _data3.name = "企业注册信息有误，请联系华晟人员解决";
                            res.status(200).send(_data3);
                            return _context.abrupt('return');

                        case 24:
                            _data = {};
                            ;
                            _data.result = "00";
                            _data.salesman = salesman;
                            _data.organization_id = result2.organization_id;
                            _data.companyName = result3.name;
                            res.cookie("salesman", salesman);
                            return _context.abrupt('return', res.status(200).send(_data));

                        case 32:
                            _context.next = 39;
                            break;

                        case 34:
                            _data4 = {};

                            _data4.result = "02";
                            _data4.name = "业务员不存在，请核实";
                            res.status(200).send(_data4);
                            return _context.abrupt('return');

                        case 39:
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

    app.get('/wechat/examination/getActivities', function () {
        var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
            var _id, salesman, organization_id, company, date, begin, end, activities, data, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, activity, ac, result;

            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _id = req.cookies.salesman._id;
                            _context2.next = 3;
                            return salesmanModel.findOne({ _id: _id }, { organization_id: 1 }, function (err) {
                                if (err) {
                                    var _data5 = {};
                                    _data5.result = "01";
                                    _data5.name = "操作失败";
                                    return res.status(200).send(_data5);
                                }
                            });

                        case 3:
                            salesman = _context2.sent;
                            organization_id = salesman.organization_id;
                            _context2.next = 7;
                            return organizationModel.findOne({ _id: organization_id }, { name: 1 }, function (err) {
                                if (err) {
                                    var _data6 = {};
                                    _data6.result = "01";
                                    _data6.name = "操作失败";
                                    return res.status(200).send(_data6);
                                }
                            });

                        case 7:
                            company = _context2.sent;
                            date = new Date();
                            begin = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                            end = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
                            _context2.next = 13;
                            return activityModel.find({ organization_id: organization_id, activity_time: { $gte: begin, $lt: end } }, { address: 1, activity_time: 1, feedback_state: 1 }, function (err) {
                                if (err) {
                                    var _data7 = {};
                                    _data7.result = "01";
                                    _data7.name = "操作失败";
                                    return res.status(200).send(_data7);
                                }
                            });

                        case 13:
                            activities = _context2.sent;
                            data = [];
                            _iteratorNormalCompletion = true;
                            _didIteratorError = false;
                            _iteratorError = undefined;
                            _context2.prev = 18;

                            for (_iterator = (0, _getIterator3.default)(activities); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                activity = _step.value;
                                ac = {};

                                ac.address = activity.address;
                                ac.activity_time = changeSingleDate(activity.activity_time);
                                ac.activity_id = activity._id;
                                data.push(ac);
                            }
                            _context2.next = 26;
                            break;

                        case 22:
                            _context2.prev = 22;
                            _context2.t0 = _context2['catch'](18);
                            _didIteratorError = true;
                            _iteratorError = _context2.t0;

                        case 26:
                            _context2.prev = 26;
                            _context2.prev = 27;

                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }

                        case 29:
                            _context2.prev = 29;

                            if (!_didIteratorError) {
                                _context2.next = 32;
                                break;
                            }

                            throw _iteratorError;

                        case 32:
                            return _context2.finish(29);

                        case 33:
                            return _context2.finish(26);

                        case 34:
                            result = {};

                            result.data = data;
                            result.company = company;
                            return _context2.abrupt('return', res.status(200).send(result));

                        case 38:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this, [[18, 22, 26, 34], [27,, 29, 33]]);
        }));

        return function (_x4, _x5, _x6) {
            return _ref2.apply(this, arguments);
        };
    }());

    app.get('/wechat/examination/getProjects', function () {
        var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res, next) {
            var _id, activity, time, projects, pro, proDetail, i, j, data;

            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _id = req.query._id;
                            _context3.next = 3;
                            return activityModel.findOne({ _id: _id }, { projects: 1, organization_id: 1 }, function (err) {
                                if (err) {
                                    var _data8 = {};
                                    _data8.result = "01";
                                    _data8.name = "操作失败";
                                    return res.status(200).send(_data8);
                                }
                            });

                        case 3:
                            activity = _context3.sent;
                            time = new Date();
                            _context3.next = 7;
                            return organizationModel.findOne({ _id: activity.organization_id }, { projects: 1 }, function (err) {
                                if (err) {
                                    var _data9 = {};
                                    _data9.result = "01";
                                    _data9.name = "操作失败";
                                    return res.status(200).send(_data9);
                                }
                            });

                        case 7:
                            projects = _context3.sent;
                            pro = [];
                            proDetail = [];
                            i = void 0, j = -1;


                            for (i = 0; i < projects.projects.length; i++) {

                                if (projects.projects[i].beginTime <= time && projects.projects[i].endTime >= time) {
                                    if (pro.indexOf(projects.projects[i].category) == -1) {
                                        pro.push(projects.projects[i].category);
                                        j = j + 1;
                                        proDetail[j] = new Array();
                                    }

                                    proDetail[j].push(projects.projects[i].name);
                                }
                            }
                            data = {};

                            data.category = pro;
                            data.projects = proDetail;

                            return _context3.abrupt('return', res.status(200).send(data));

                        case 16:
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

    app.post('/wechat/examination/addUser', function () {
        var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(req, res, next) {
            var params, user, userId, userActivity0, data, userEntity, result, activity, salesman, userActivityEntity;
            return _regenerator2.default.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            params = req.body;
                            _context5.next = 3;
                            return userModel.findOne({ IDNo: params.IDNo }, { _id: 1 }, function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    return res.status(200).send(data);
                                }
                            });

                        case 3:
                            user = _context5.sent;
                            userId = void 0;

                            if (!user) {
                                _context5.next = 17;
                                break;
                            }

                            userId = user._id;
                            _context5.next = 9;
                            return userActivityModel.findOne({ activity_id: params.activity_id, userId: userId }, { _id: 1 }, function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    return res.status(200).send(data);
                                }
                            });

                        case 9:
                            userActivity0 = _context5.sent;

                            if (!(userActivity0 != null)) {
                                _context5.next = 15;
                                break;
                            }

                            data = {};

                            data.result = "06";
                            data.name = "用户本场活动已经录入，不要重复提交";
                            return _context5.abrupt('return', res.status(200).send(data));

                        case 15:
                            _context5.next = 22;
                            break;

                        case 17:
                            userEntity = new userModel({
                                name: params.name,
                                sex: params.sex,
                                birthday: new Date(params.IDNo.substr(6, 4) + '/' + params.IDNo.substr(10, 2) + '/' + params.IDNo.substr(12, 2)),
                                tel: params.tel,
                                create_time: new Date(),
                                IDNo: params.IDNo
                            });
                            _context5.next = 20;
                            return userEntity.save(function (err) {
                                if (err) {
                                    var _data10 = {};
                                    _data10.result = "01";
                                    _data10.name = "操作失败";
                                    return res.status(200).send(_data10);
                                }
                            });

                        case 20:
                            result = _context5.sent;

                            userId = result._id;

                        case 22:
                            _context5.next = 24;
                            return activityModel.findOneAndUpdate({ _id: params.activity_id }, { $inc: { registration_number: 1 } }, { new: true });

                        case 24:
                            activity = _context5.sent;

                            if (!(activity != null && activity.registration_number == 1)) {
                                _context5.next = 28;
                                break;
                            }

                            _context5.next = 28;
                            return activityModel.update({ '_id': params.activity_id
                            }, { $set: {
                                    sample_status: 10
                                } }, function () {
                                var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(err) {
                                    var _data11;

                                    return _regenerator2.default.wrap(function _callee4$(_context4) {
                                        while (1) {
                                            switch (_context4.prev = _context4.next) {
                                                case 0:
                                                    if (!err) {
                                                        _context4.next = 5;
                                                        break;
                                                    }

                                                    _data11 = {};

                                                    _data11.result = "01";
                                                    _data11.name = "操作失败";
                                                    return _context4.abrupt('return', res.status(200).send(_data11));

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

                        case 28:
                            salesman = {};

                            salesman.id = req.cookies.salesman._id;
                            salesman.name = req.cookies.salesman.realName;
                            salesman.tel = req.cookies.salesman.tel;

                            userActivityEntity = new userActivityModel({
                                userId: userId,
                                name: params.name,
                                IDNo: params.IDNo,
                                barcode: '',
                                activity_id: params.activity_id,
                                test_number: activity.registration_number,
                                organization_id: activity.organization_id,
                                checked: false,
                                doubleChecked: false,
                                nurse: {},
                                create_time: new Date(),
                                sample_time: new Date("2000-01-01"),
                                salesman: salesman,
                                projects: params.projects,
                                category: params.category,
                                sampled: false
                            });
                            _context5.next = 35;
                            return userActivityEntity.save(function (err) {
                                if (err) {
                                    var _data12 = {};
                                    _data12.result = "01";
                                    _data12.name = "操作失败";
                                    return res.status(200).send(_data12);
                                } else {
                                    var _data13 = {};
                                    _data13.test_number = activity.registration_number;
                                    return res.status(200).send(_data13);
                                }
                            });

                        case 35:
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