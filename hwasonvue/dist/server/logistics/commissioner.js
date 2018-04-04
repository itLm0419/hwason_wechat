'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _nurses = require('../util/schema/nurses');

var _nurses2 = _interopRequireDefault(_nurses);

var _activities = require('../util/schema/activities');

var _activities2 = _interopRequireDefault(_activities);

var _hwason = require('../util/schema/hwason');

var _hwason2 = _interopRequireDefault(_hwason);

var _organizations = require('../util/schema/organizations');

var _organizations2 = _interopRequireDefault(_organizations);

var _user = require('../util/schema/user');

var _user2 = _interopRequireDefault(_user);

var _userActivities = require('../util/schema/userActivities');

var _userActivities2 = _interopRequireDefault(_userActivities);

var _login = require('../util/schema/login');

var _login2 = _interopRequireDefault(_login);

var _util = require('../util2');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var fs = require('fs');
var JSZip = require("jszip");
var xlsx = require('node-xlsx');

module.exports = function (app) {
    app.get('/commissioner/unDistribution', function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
            var _id, hwason, organizations, data, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, organization, activities, activity, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, ac;

            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _id = req.cookies.userId;
                            _context.next = 3;
                            return _hwason2.default.findOne({ _id: _id }, { area: 1 }, function (err) {
                                if (err) {
                                    var _data = {};
                                    _data.result = "01";
                                    _data.name = "操作失败";
                                    res.status(200).send(_data);
                                }
                            });

                        case 3:
                            hwason = _context.sent;
                            _context.next = 6;
                            return _organizations2.default.find({ area: hwason.area }, { _id: 1, name: 1 }, function (err) {
                                if (err) {
                                    var _data2 = {};
                                    _data2.result = "01";
                                    _data2.name = "操作失败";
                                    res.status(200).send(_data2);
                                }
                            });

                        case 6:
                            organizations = _context.sent;
                            data = [];
                            _iteratorNormalCompletion = true;
                            _didIteratorError = false;
                            _iteratorError = undefined;
                            _context.prev = 11;
                            _iterator = (0, _getIterator3.default)(organizations);

                        case 13:
                            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                _context.next = 41;
                                break;
                            }

                            organization = _step.value;
                            _context.next = 17;
                            return _activities2.default.find({ nurses: { $size: 0 }, organization_id: organization._id }, { projects: 1, activity_time: 1, estimated_number: 1, address: 1 }, function (err) {
                                if (err) {
                                    var _data3 = {};
                                    _data3.result = "01";
                                    _data3.name = "操作失败";
                                    res.status(200).send(_data3);
                                }
                            });

                        case 17:
                            activities = _context.sent;
                            activity = {};
                            _iteratorNormalCompletion2 = true;
                            _didIteratorError2 = false;
                            _iteratorError2 = undefined;
                            _context.prev = 22;

                            for (_iterator2 = (0, _getIterator3.default)(activities); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                ac = _step2.value;

                                activity.name = organization.name;
                                activity.projects = ac.projects;
                                activity.activity_time = changeSingleDate(ac.activity_time);
                                activity.estimated_number = ac.estimated_number;
                                activity.address = ac.address;
                                data.push(activity);
                            }
                            _context.next = 30;
                            break;

                        case 26:
                            _context.prev = 26;
                            _context.t0 = _context['catch'](22);
                            _didIteratorError2 = true;
                            _iteratorError2 = _context.t0;

                        case 30:
                            _context.prev = 30;
                            _context.prev = 31;

                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }

                        case 33:
                            _context.prev = 33;

                            if (!_didIteratorError2) {
                                _context.next = 36;
                                break;
                            }

                            throw _iteratorError2;

                        case 36:
                            return _context.finish(33);

                        case 37:
                            return _context.finish(30);

                        case 38:
                            _iteratorNormalCompletion = true;
                            _context.next = 13;
                            break;

                        case 41:
                            _context.next = 47;
                            break;

                        case 43:
                            _context.prev = 43;
                            _context.t1 = _context['catch'](11);
                            _didIteratorError = true;
                            _iteratorError = _context.t1;

                        case 47:
                            _context.prev = 47;
                            _context.prev = 48;

                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }

                        case 50:
                            _context.prev = 50;

                            if (!_didIteratorError) {
                                _context.next = 53;
                                break;
                            }

                            throw _iteratorError;

                        case 53:
                            return _context.finish(50);

                        case 54:
                            return _context.finish(47);

                        case 55:
                            res.status(200).send(data);

                        case 56:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this, [[11, 43, 47, 55], [22, 26, 30, 38], [31,, 33, 37], [48,, 50, 54]]);
        }));

        return function (_x, _x2, _x3) {
            return _ref.apply(this, arguments);
        };
    }());

    app.get('/commissioner/distribution', function () {
        var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
            var _id, hwason, organizations, data, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, organization, activities, activity, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, ac;

            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _id = req.cookies.userId;
                            _context2.next = 3;
                            return _hwason2.default.findOne({ _id: _id }, { area: 1 }, function (err) {
                                if (err) {
                                    var _data4 = {};
                                    _data4.result = "01";
                                    _data4.name = "操作失败";
                                    res.status(200).send(_data4);
                                }
                            });

                        case 3:
                            hwason = _context2.sent;
                            _context2.next = 6;
                            return _organizations2.default.find({ area: hwason.area }, { _id: 1, name: 1 }, function (err) {
                                if (err) {
                                    var _data5 = {};
                                    _data5.result = "01";
                                    _data5.name = "操作失败";
                                    res.status(200).send(_data5);
                                }
                            });

                        case 6:
                            organizations = _context2.sent;
                            data = [];
                            _iteratorNormalCompletion3 = true;
                            _didIteratorError3 = false;
                            _iteratorError3 = undefined;
                            _context2.prev = 11;
                            _iterator3 = (0, _getIterator3.default)(organizations);

                        case 13:
                            if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                                _context2.next = 41;
                                break;
                            }

                            organization = _step3.value;
                            _context2.next = 17;
                            return _activities2.default.find({ "nurses.0": { $exists: true }, organization_id: organization._id }, { projects: 1, activity_time: 1, estimated_number: 1, address: 1, "nurses.name": 1 }, function (err) {
                                if (err) {
                                    var _data6 = {};
                                    _data6.result = "01";
                                    _data6.name = "操作失败";
                                    res.status(200).send(_data6);
                                }
                            });

                        case 17:
                            activities = _context2.sent;
                            activity = {};
                            _iteratorNormalCompletion4 = true;
                            _didIteratorError4 = false;
                            _iteratorError4 = undefined;
                            _context2.prev = 22;

                            for (_iterator4 = (0, _getIterator3.default)(activities); !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                ac = _step4.value;

                                activity.name = organization.name;
                                activity.projects = ac.projects;
                                activity.activity_time = changeSingleDate(ac.activity_time);
                                activity.estimated_number = ac.estimated_number;
                                activity.address = ac.address;
                                activity.nurseNum = ac.nurses.length;
                                activity.nurses = ac.nurses;
                                data.push(activity);
                            }

                            _context2.next = 30;
                            break;

                        case 26:
                            _context2.prev = 26;
                            _context2.t0 = _context2['catch'](22);
                            _didIteratorError4 = true;
                            _iteratorError4 = _context2.t0;

                        case 30:
                            _context2.prev = 30;
                            _context2.prev = 31;

                            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                _iterator4.return();
                            }

                        case 33:
                            _context2.prev = 33;

                            if (!_didIteratorError4) {
                                _context2.next = 36;
                                break;
                            }

                            throw _iteratorError4;

                        case 36:
                            return _context2.finish(33);

                        case 37:
                            return _context2.finish(30);

                        case 38:
                            _iteratorNormalCompletion3 = true;
                            _context2.next = 13;
                            break;

                        case 41:
                            _context2.next = 47;
                            break;

                        case 43:
                            _context2.prev = 43;
                            _context2.t1 = _context2['catch'](11);
                            _didIteratorError3 = true;
                            _iteratorError3 = _context2.t1;

                        case 47:
                            _context2.prev = 47;
                            _context2.prev = 48;

                            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                _iterator3.return();
                            }

                        case 50:
                            _context2.prev = 50;

                            if (!_didIteratorError3) {
                                _context2.next = 53;
                                break;
                            }

                            throw _iteratorError3;

                        case 53:
                            return _context2.finish(50);

                        case 54:
                            return _context2.finish(47);

                        case 55:
                            res.status(200).send(data);

                        case 56:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this, [[11, 43, 47, 55], [22, 26, 30, 38], [31,, 33, 37], [48,, 50, 54]]);
        }));

        return function (_x4, _x5, _x6) {
            return _ref2.apply(this, arguments);
        };
    }());

    app.get("/commissioner/showNursesByActivity", function () {
        var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res, next) {
            var aa, _id, activity, organization_id, organization, nurses;

            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return _login2.default.find({});

                        case 2:
                            aa = _context3.sent;

                            console.log(aa);
                            _id = req.query._id;
                            _context3.next = 7;
                            return _activities2.default.findOne({ _id: _id }, { organization_id: 1 }, function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    res.status(200).send(data);
                                }
                            });

                        case 7:
                            activity = _context3.sent;
                            organization_id = activity.organization_id;
                            _context3.next = 11;
                            return _organizations2.default.findOne({ _id: organization_id }, { region: 1 }, function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    res.status(200).send(data);
                                }
                            });

                        case 11:
                            organization = _context3.sent;
                            _context3.next = 14;
                            return _nurses2.default.find({ region: organization.region }, { name: 1, sex: 1, region: 1, certificate_No: 1 }, function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    res.status(200).send(data);
                                }
                            });

                        case 14:
                            nurses = _context3.sent;

                            res.status(200).send(nurses);

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

    app.get('/commissioner/showNursesByRegion', function () {
        var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(req, res, next) {
            var region, query, nurses;
            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            region = req.query.region;
                            query = {};

                            if (region) {
                                query.region = new RegExp(region);
                            }
                            _context4.next = 5;
                            return _nurses2.default.find(query, { name: 1, sex: 1, region: 1, certificate_No: 1 }, function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    res.status(200).send(data);
                                }
                            });

                        case 5:
                            nurses = _context4.sent;

                            res.status(200).send(nurses);

                        case 7:
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

    app.post('/commissioner/addNurses', function () {
        var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(req, res, next) {
            var _id, nurses, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, nurse, num, data;

            return _regenerator2.default.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _id = req.body.params._id;
                            nurses = req.body.params.nurses;
                            _iteratorNormalCompletion5 = true;
                            _didIteratorError5 = false;
                            _iteratorError5 = undefined;
                            _context5.prev = 5;
                            _iterator5 = (0, _getIterator3.default)(nurses);

                        case 7:
                            if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
                                _context5.next = 18;
                                break;
                            }

                            nurse = _step5.value;
                            _context5.next = 11;
                            return _activities2.default.count({ _id: _id, "nurses.nurse_id": nurse.nurse_id }, function (err) {
                                if (err) {
                                    var _data7 = {};
                                    _data7.result = "01";
                                    _data7.name = "操作失败";
                                    res.status(200).send(_data7);
                                }
                            });

                        case 11:
                            num = _context5.sent;

                            if (!(num == 0)) {
                                _context5.next = 15;
                                break;
                            }

                            _context5.next = 15;
                            return _activities2.default.update({ _id: _id }, { $push: { nurses: nurse } }, function (err) {
                                if (err) {
                                    var _data8 = {};
                                    _data8.result = "01";
                                    _data8.name = "操作失败";
                                    res.status(200).send(_data8);
                                }
                            });

                        case 15:
                            _iteratorNormalCompletion5 = true;
                            _context5.next = 7;
                            break;

                        case 18:
                            _context5.next = 24;
                            break;

                        case 20:
                            _context5.prev = 20;
                            _context5.t0 = _context5['catch'](5);
                            _didIteratorError5 = true;
                            _iteratorError5 = _context5.t0;

                        case 24:
                            _context5.prev = 24;
                            _context5.prev = 25;

                            if (!_iteratorNormalCompletion5 && _iterator5.return) {
                                _iterator5.return();
                            }

                        case 27:
                            _context5.prev = 27;

                            if (!_didIteratorError5) {
                                _context5.next = 30;
                                break;
                            }

                            throw _iteratorError5;

                        case 30:
                            return _context5.finish(27);

                        case 31:
                            return _context5.finish(24);

                        case 32:
                            data = {};

                            data.result = "02";
                            data.name = "操作成功";
                            res.status(200).send(data);

                        case 36:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, this, [[5, 20, 24, 32], [25,, 27, 31]]);
        }));

        return function (_x13, _x14, _x15) {
            return _ref5.apply(this, arguments);
        };
    }());

    app.post('/commissioner/removeNurses', function () {
        var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(req, res, next) {
            var _id, nurse_id;

            return _regenerator2.default.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            _id = req.body.params._id;
                            nurse_id = req.body.params.nurse_id;

                            console.log(_id, nurse_id);
                            _context6.next = 5;
                            return _activities2.default.update({ _id: _id }, { $pull: { nurse: { $elemMatch: { nurse_id: nurse_id } } } }, function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    res.status(200).send(data);
                                } else {
                                    var _data9 = {};
                                    _data9.result = "02";
                                    _data9.name = "操作成功";
                                    res.status(200).send(_data9);
                                }
                            });

                        case 5:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, this);
        }));

        return function (_x16, _x17, _x18) {
            return _ref6.apply(this, arguments);
        };
    }());

    app.get('/logistics/commissioner/showActivities', function () {
        var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(req, res, next) {
            var salesman_id, name, pageNo, pageSize, begin, end, hwason, organizations, arr, _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, organization, orgIds, query, dateParam, data;

            return _regenerator2.default.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            salesman_id = req.cookies.userId;
                            name = req.query.name || "";
                            pageNo = req.query.pageNo || 1;
                            pageSize = req.query.pageSize || 10;
                            begin = req.query.begin;
                            end = req.query.end;
                            _context7.next = 8;
                            return _hwason2.default.findOne({ _id: salesman_id }, { area: 1 }, function (err) {
                                if (err) {
                                    var _data10 = {};
                                    _data10.result = "01";
                                    _data10.name = "操作失败";
                                    return res.status(200).send(_data10);
                                }
                            });

                        case 8:
                            hwason = _context7.sent;
                            _context7.next = 11;
                            return _organizations2.default.find({ area: hwason.area, name: { $regex: name } }, {
                                _id: 1, name: 1 }, function (err) {
                                if (err) {
                                    var _data11 = {};
                                    _data11.result = "01";
                                    _data11.name = "操作失败";
                                    return res.status(200).send(_data11);
                                }
                            });

                        case 11:
                            organizations = _context7.sent;
                            arr = [];
                            _iteratorNormalCompletion6 = true;
                            _didIteratorError6 = false;
                            _iteratorError6 = undefined;
                            _context7.prev = 16;

                            for (_iterator6 = (0, _getIterator3.default)(organizations); !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                                organization = _step6.value;

                                arr.push(organization._id);
                            }
                            _context7.next = 24;
                            break;

                        case 20:
                            _context7.prev = 20;
                            _context7.t0 = _context7['catch'](16);
                            _didIteratorError6 = true;
                            _iteratorError6 = _context7.t0;

                        case 24:
                            _context7.prev = 24;
                            _context7.prev = 25;

                            if (!_iteratorNormalCompletion6 && _iterator6.return) {
                                _iterator6.return();
                            }

                        case 27:
                            _context7.prev = 27;

                            if (!_didIteratorError6) {
                                _context7.next = 30;
                                break;
                            }

                            throw _iteratorError6;

                        case 30:
                            return _context7.finish(27);

                        case 31:
                            return _context7.finish(24);

                        case 32:
                            orgIds = {};

                            orgIds.$in = arr;
                            query = {};

                            query.organization_id = orgIds;
                            dateParam = {};

                            if (begin) {
                                dateParam.$gte = begin;
                            }
                            if (end) {
                                dateParam.lte = end;
                            }
                            if (dateParam.hasOwnProperty()) {
                                query.activity_time = dateParam;
                            }
                            _context7.next = 42;
                            return _util2.default.queryActivities(pageNo, pageSize, query, res);

                        case 42:
                            data = _context7.sent;
                            return _context7.abrupt('return', res.status(200).send(data));

                        case 44:
                        case 'end':
                            return _context7.stop();
                    }
                }
            }, _callee7, this, [[16, 20, 24, 32], [25,, 27, 31]]);
        }));

        return function (_x19, _x20, _x21) {
            return _ref7.apply(this, arguments);
        };
    }());

    app.get('/logistics/commissioner/showReports', function () {
        var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(req, res, next) {
            var salesman_id, name, pageNo, pageSize, begin, end, hwason, organizations, arr, _iteratorNormalCompletion7, _didIteratorError7, _iteratorError7, _iterator7, _step7, organization, orgIds, query, dateParam, sample_status, aa;

            return _regenerator2.default.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                        case 0:
                            salesman_id = "5934f6cb0e3dda2eb88744a9";
                            name = req.query.name || "";
                            pageNo = req.query.pageNo || 1;
                            pageSize = req.query.pageSize || 10;
                            begin = req.query.begin;
                            end = req.query.end;
                            _context8.next = 8;
                            return _hwason2.default.findOne({ _id: salesman_id }, { area: 1 }, function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    return res.status(200).send(data);
                                }
                            });

                        case 8:
                            hwason = _context8.sent;
                            _context8.next = 11;
                            return _organizations2.default.find({ area: hwason.area, name: { $regex: name } }, { _id: 1, name: 1 }, function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    return res.status(200).send(data);
                                }
                            });

                        case 11:
                            organizations = _context8.sent;
                            arr = [];
                            _iteratorNormalCompletion7 = true;
                            _didIteratorError7 = false;
                            _iteratorError7 = undefined;
                            _context8.prev = 16;

                            for (_iterator7 = (0, _getIterator3.default)(organizations); !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                                organization = _step7.value;

                                arr.push(organization._id);
                            }
                            _context8.next = 24;
                            break;

                        case 20:
                            _context8.prev = 20;
                            _context8.t0 = _context8['catch'](16);
                            _didIteratorError7 = true;
                            _iteratorError7 = _context8.t0;

                        case 24:
                            _context8.prev = 24;
                            _context8.prev = 25;

                            if (!_iteratorNormalCompletion7 && _iterator7.return) {
                                _iterator7.return();
                            }

                        case 27:
                            _context8.prev = 27;

                            if (!_didIteratorError7) {
                                _context8.next = 30;
                                break;
                            }

                            throw _iteratorError7;

                        case 30:
                            return _context8.finish(27);

                        case 31:
                            return _context8.finish(24);

                        case 32:
                            orgIds = {};

                            orgIds.$in = arr;
                            query = {};

                            query.organization_id = orgIds;
                            dateParam = {};

                            if (begin) {
                                dateParam.$gte = begin;
                            }
                            if (end) {
                                dateParam.lte = end;
                            }
                            if (dateParam.hasOwnProperty()) {
                                query.activity_time = dateParam;
                            }
                            sample_status = {};

                            sample_status.$nin = 0;
                            query.sample_status = sample_status;
                            _context8.next = 45;
                            return _util2.default.queryReports(pageNo, pageSize, query, res);

                        case 45:
                            aa = _context8.sent;
                            return _context8.abrupt('return', res.status(200).send(aa));

                        case 47:
                        case 'end':
                            return _context8.stop();
                    }
                }
            }, _callee8, this, [[16, 20, 24, 32], [25,, 27, 31]]);
        }));

        return function (_x22, _x23, _x24) {
            return _ref8.apply(this, arguments);
        };
    }());

    function changeSingleDate(date) {
        return date.getYear() + 1900 + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getMinutes();
    }
};