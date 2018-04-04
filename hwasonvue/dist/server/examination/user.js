'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var fs = require('fs');
var activityModel = require('../util/schema/activities');
var organizationModel = require('../util/schema/organizations');
var loginModel = require('../util/schema/login');
var userModel = require('../util/schema/user');
var userActivityModel = require('../util/schema/userActivities');
var salesmanModel = require('../util/schema/salesman');
var provinces = require('../../../src/util/provinces');
var provinceModel = require('../util/schema/provinces');
module.exports = function (app) {
    app.get('/wechat/examination/examination', function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
            var userName, salesman;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            userName = req.query.userName;
                            _context.next = 3;
                            return loginModel.findOne({ userName: userName }, { realName: 1, tel: 1 }, function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    res.status(200).send(data);
                                }
                            });

                        case 3:
                            salesman = _context.sent;

                            res.cookie("salesman", salesman);
                            res.status(200).send(salesman);

                        case 6:
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
            var _id, salesman, organization_id, date, begin, end, activities, data, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, activity, ac;

            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _id = req.cookies.salesman._id;
                            _context2.next = 3;
                            return salesmanModel.findOne({ _id: _id }, { organization_id: 1 }, function (err) {
                                if (err) {
                                    var _data = {};
                                    _data.result = "01";
                                    _data.name = "操作失败";
                                    res.status(200).send(_data);
                                }
                            });

                        case 3:
                            salesman = _context2.sent;
                            organization_id = salesman.organization_id;
                            date = new Date();
                            begin = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                            end = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
                            _context2.next = 10;
                            return activityModel.find({ organization_id: organization_id, activity_time: { $gte: begin, $lt: end } }, { address: 1, activity_time: 1 }, function (err) {
                                if (err) {
                                    var _data2 = {};
                                    _data2.result = "01";
                                    _data2.name = "操作失败";
                                    res.status(200).send(_data2);
                                }
                            });

                        case 10:
                            activities = _context2.sent;
                            data = [];
                            _iteratorNormalCompletion = true;
                            _didIteratorError = false;
                            _iteratorError = undefined;
                            _context2.prev = 15;

                            for (_iterator = (0, _getIterator3.default)(activities); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                activity = _step.value;
                                ac = {};

                                ac.address = activity.address;
                                ac.activity_time = changeSingleDate(activity.activity_time);
                                data.push(ac);
                            }
                            _context2.next = 23;
                            break;

                        case 19:
                            _context2.prev = 19;
                            _context2.t0 = _context2['catch'](15);
                            _didIteratorError = true;
                            _iteratorError = _context2.t0;

                        case 23:
                            _context2.prev = 23;
                            _context2.prev = 24;

                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }

                        case 26:
                            _context2.prev = 26;

                            if (!_didIteratorError) {
                                _context2.next = 29;
                                break;
                            }

                            throw _iteratorError;

                        case 29:
                            return _context2.finish(26);

                        case 30:
                            return _context2.finish(23);

                        case 31:
                            res.status(200).send(data);

                        case 32:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this, [[15, 19, 23, 31], [24,, 26, 30]]);
        }));

        return function (_x4, _x5, _x6) {
            return _ref2.apply(this, arguments);
        };
    }());

    app.get('/wechat/examination/getProjects', function () {
        var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res, next) {
            var _id, activity, projects, data, organization, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, project, pro, arr, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, proj;

            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _id = req.query._id;
                            _context3.next = 3;
                            return activityModel.findOne({ _id: _id }, { projects: 1, organization_id: 1 }, function (err) {
                                if (err) {
                                    var _data3 = {};
                                    _data3.result = "01";
                                    _data3.name = "操作失败";
                                    res.status(200).send(_data3);
                                }
                            });

                        case 3:
                            activity = _context3.sent;
                            projects = activity.projects;
                            data = [];
                            _context3.next = 8;
                            return organizationModel.findOne({ _id: activity.organization_id }, { projects: 1 }, function (err) {
                                if (err) {
                                    var _data4 = {};
                                    _data4.result = "01";
                                    _data4.name = "操作失败";
                                    res.status(200).send(_data4);
                                }
                            });

                        case 8:
                            organization = _context3.sent;
                            _iteratorNormalCompletion2 = true;
                            _didIteratorError2 = false;
                            _iteratorError2 = undefined;
                            _context3.prev = 12;
                            _iterator2 = (0, _getIterator3.default)(projects);

                        case 14:
                            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                                _context3.next = 43;
                                break;
                            }

                            project = _step2.value;
                            pro = {};

                            pro.category = project;
                            arr = [];
                            _iteratorNormalCompletion3 = true;
                            _didIteratorError3 = false;
                            _iteratorError3 = undefined;
                            _context3.prev = 22;

                            for (_iterator3 = (0, _getIterator3.default)(organization.projects); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                proj = _step3.value;

                                if (project == proj.category) {
                                    arr.push(proj.name);
                                }
                            }
                            _context3.next = 30;
                            break;

                        case 26:
                            _context3.prev = 26;
                            _context3.t0 = _context3['catch'](22);
                            _didIteratorError3 = true;
                            _iteratorError3 = _context3.t0;

                        case 30:
                            _context3.prev = 30;
                            _context3.prev = 31;

                            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                _iterator3.return();
                            }

                        case 33:
                            _context3.prev = 33;

                            if (!_didIteratorError3) {
                                _context3.next = 36;
                                break;
                            }

                            throw _iteratorError3;

                        case 36:
                            return _context3.finish(33);

                        case 37:
                            return _context3.finish(30);

                        case 38:
                            pro.projects = arr;
                            data.push(pro);

                        case 40:
                            _iteratorNormalCompletion2 = true;
                            _context3.next = 14;
                            break;

                        case 43:
                            _context3.next = 49;
                            break;

                        case 45:
                            _context3.prev = 45;
                            _context3.t1 = _context3['catch'](12);
                            _didIteratorError2 = true;
                            _iteratorError2 = _context3.t1;

                        case 49:
                            _context3.prev = 49;
                            _context3.prev = 50;

                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }

                        case 52:
                            _context3.prev = 52;

                            if (!_didIteratorError2) {
                                _context3.next = 55;
                                break;
                            }

                            throw _iteratorError2;

                        case 55:
                            return _context3.finish(52);

                        case 56:
                            return _context3.finish(49);

                        case 57:
                            res.status(200).send(data);

                        case 58:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, this, [[12, 45, 49, 57], [22, 26, 30, 38], [31,, 33, 37], [50,, 52, 56]]);
        }));

        return function (_x7, _x8, _x9) {
            return _ref3.apply(this, arguments);
        };
    }());

    app.post('/wechat/examination/addUser', function () {
        var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(req, res, next) {
            var params, user, userId, userEntity, result, activity, salesman, userActivityEntity;
            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            params = req.body.params;
                            _context4.next = 3;
                            return userModel.findOne({ IDNo: params.IDNo }, { _id: 1 }, function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    res.status(200).send(data);
                                }
                            });

                        case 3:
                            user = _context4.sent;
                            userId = void 0;

                            if (!user) {
                                _context4.next = 9;
                                break;
                            }

                            userId = user._id;
                            _context4.next = 14;
                            break;

                        case 9:
                            userEntity = new userModel({
                                name: params.name,
                                sex: params.sex,
                                birthday: params.birthday,
                                tel: params.tel,
                                create_time: new Date(),
                                IDNo: params.IDNo
                            });
                            _context4.next = 12;
                            return userEntity.save(function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    res.status(200).send(data);
                                }
                            });

                        case 12:
                            result = _context4.sent;

                            userId = result._id;

                        case 14:
                            _context4.next = 16;
                            return activityModel.findOne({ _id: params.activity_id }, { registration_number: 1 }, function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    res.status(200).send(data);
                                }
                            });

                        case 16:
                            activity = _context4.sent;
                            salesman = {};

                            salesman.salesman_id = req.cookies.salesman._id;
                            salesman.salesman_name = req.cookies.salesman.realName;
                            userActivityEntity = new userActivityModel({
                                userId: userId,
                                activity_id: params.activity_id,
                                test_number: activity.registration_number + 1,
                                checked: false,
                                create_time: new Date(),
                                salesman: salesman,
                                projects: params.projects
                            });
                            _context4.next = 23;
                            return userActivityEntity.save(function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    res.status(200).send(data);
                                }
                            });

                        case 23:
                            _context4.next = 25;
                            return activityModel.update({ _id: params.activity_id }, { $inc: { registration_number: 1 } }, function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    res.status(200).send(data);
                                } else {
                                    var _data5 = {};
                                    _data5.result = "02";
                                    _data5.name = "操作成功";
                                    res.status(200).send(_data5);
                                }
                            });

                        case 25:
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

    function changeSingleDate(date) {
        return date.getYear() + 1900 + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
    }
};