
'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var loginModel = require('./util/schema/login');
var organizationModel = require('./util/schema/organizations');
var salesmanModel = require('./util/schema/salesman');

var nurseModel = require('./util/schema/nurse');

module.exports = function (app) {
    app.post('/wechat/login', function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
            var password, userName, result, data, result2, _data2, validity, _data3, _result, _data5, result3, _data8, _validity, _data6, _result2, _data10, _validity2, _data11, _validity3, _validity4, _data12;

            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            password = req.body.password;
                            userName = req.body.userName;
                            _context.next = 4;
                            return loginModel.findOne({ 'userName': userName, 'password': password }, { _id: 1, role: 1, tel: 1 }, function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    res.status(200).send(data);
                                    return;
                                }
                            });

                        case 4:
                            result = _context.sent;

                            if (!(result == null)) {
                                _context.next = 9;
                                break;
                            }

                            _context.next = 8;
                            return loginModel.findOne({ tel: userName, password: password }, { _id: 1, role: 1 }, function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    res.status(200).send(data);
                                    return;
                                }
                            });

                        case 8:
                            result = _context.sent;

                        case 9:
                            if (!(result == null)) {
                                _context.next = 16;
                                break;
                            }

                            data = {};

                            data.result = "02";
                            data.name = "用户名或者密码不正确";
                            return _context.abrupt('return', res.status(200).send(data));

                        case 16:
                            if (!(result.role == "01")) {
                                _context.next = 38;
                                break;
                            }

                            _context.next = 19;
                            return organizationModel.findOne({ manager_id: result._id }, { _id: 1, name: 1, checked: 1 }, function (err) {
                                if (err) {
                                    var _data = {};
                                    _data.result = "01";
                                    _data.name = "操作失败";
                                    res.status(200).send(_data);
                                    return;
                                }
                            });

                        case 19:
                            result2 = _context.sent;

                            if (!(result2 == null)) {
                                _context.next = 28;
                                break;
                            }

                            _data2 = {};

                            _data2.result = "03";
                            _data2.name = "企业注册信息有误，请联系华晟人员解决";
                            res.status(200).send(_data2);
                            return _context.abrupt('return');

                        case 28:
                            validity = 30;

                            res.cookie('userId', result2._id, { expires: new Date(Date.now() + validity * 24 * 60 * 60 * 1000), httpOnly: true });

                            _data3 = {};


                            _data3._id = result._id;
                            _data3.role = result.role;
                            _data3.companyName = result2.name;
                            _data3.organization_id = result2._id;
                            return _context.abrupt('return', res.status(200).send(_data3));

                        case 36:
                            _context.next = 104;
                            break;

                        case 38:
                            if (!(result.role == "02")) {
                                _context.next = 70;
                                break;
                            }

                            _context.next = 41;
                            return salesmanModel.findOne({ _id: result._id }, { _id: 1, organization_id: 1, tel: 1 }, function (err) {
                                if (err) {
                                    var _data4 = {};
                                    _data4.result = "01";
                                    _data4.name = "操作失败";
                                    res.status(200).send(_data4);
                                    return;
                                }
                            });

                        case 41:
                            _result = _context.sent;

                            if (!(_result == null)) {
                                _context.next = 50;
                                break;
                            }

                            _data5 = {};

                            _data5.result = "03";
                            _data5.name = "业务员注册信息有误，请联系华晟人员解决";
                            res.status(200).send(_data5);
                            return _context.abrupt('return');

                        case 50:
                            console.log("organizationid:", _result.organization_id);
                            _context.next = 53;
                            return organizationModel.findOne({ _id: _result.organization_id }, { _id: 1, name: 1, checked: 1 }, function (err) {
                                if (err) {
                                    var _data7 = {};
                                    _data7.result = "01";
                                    _data7.name = "操作失败";
                                    res.status(200).send(_data7);
                                    return;
                                }
                            });

                        case 53:
                            result3 = _context.sent;

                            if (!(result3 == null)) {
                                _context.next = 60;
                                break;
                            }

                            _data8 = {};

                            _data8.result = "03";
                            _data8.name = "企业注册信息有误，请联系华晟人员解决";
                            res.status(200).send(_data8);
                            return _context.abrupt('return');

                        case 60:
                            _validity = 30;

                            res.cookie('userId', _result._id, { expires: new Date(Date.now() + _validity * 24 * 60 * 60 * 1000), httpOnly: true });

                            _data6 = {};


                            _data6._id = result._id;
                            _data6.role = result.role;
                            _data6.companyName = result3.name;
                            _data6.organization_id = result3._id;
                            return _context.abrupt('return', res.status(200).send(_data6));

                        case 68:
                            _context.next = 104;
                            break;

                        case 70:
                            if (!(result.role == "31")) {
                                _context.next = 104;
                                break;
                            }

                            _context.next = 73;
                            return nurseModel.findOne({ _id: result._id }, { _id: 1, checked: 1 }, function (err) {
                                if (err) {
                                    var _data9 = {};
                                    _data9.result = "01";
                                    _data9.name = "操作失败";
                                    res.status(200).send(_data9);
                                    return;
                                }
                            });

                        case 73:
                            _result2 = _context.sent;

                            if (!(_result2 == null || _result2.checked == 1)) {
                                _context.next = 86;
                                break;
                            }

                            _data10 = {};

                            _data10.result = "10";
                            _data10.role = result.role;
                            _data10.tel = result.tel;
                            _data10.name = "完善信息";
                            _validity2 = 1;

                            if (_result2 != null) res.cookie('userId', _result2._id, { expires: new Date(Date.now() + _validity2 * 24 * 60 * 60 * 1000), httpOnly: true });

                            res.status(200).send(_data10);
                            return _context.abrupt('return');

                        case 86:
                            if (!(_result2 == null || _result2.checked == 0)) {
                                _context.next = 98;
                                break;
                            }

                            _data11 = {};

                            _data11.result = "11";
                            _data11.role = result.role;
                            _data11.tel = result.tel;
                            _data11.name = "还在审核中，请等待";
                            _validity3 = 1;

                            if (_result2 != null) res.cookie('userId', _result2._id, { expires: new Date(Date.now() + _validity3 * 24 * 60 * 60 * 1000), httpOnly: true });

                            res.status(200).send(_data11);
                            return _context.abrupt('return');

                        case 98:
                            _validity4 = 30;

                            res.cookie('userId', _result2._id, { expires: new Date(Date.now() + _validity4 * 24 * 60 * 60 * 1000), httpOnly: true });

                            _data12 = {};


                            _data12._id = result._id;
                            _data12.role = result.role;
                            return _context.abrupt('return', res.status(200).send(_data12));

                        case 104:
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

    app.get('/wechat/login/forgetpasswd', function () {
        var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
            var tel, user, data, _data13;

            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            tel = req.query.tel;

                            console.log("tel:", tel);
                            _context2.next = 4;
                            return loginModel.findOne({ tel: tel }, function (err) {
                                if (err) {
                                    login;
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    return res.status(200).send(data);
                                }
                            });

                        case 4:
                            user = _context2.sent;

                            if (!(user != null)) {
                                _context2.next = 12;
                                break;
                            }

                            data = {};

                            data.result = "00";
                            data.name = "操作成功";
                            return _context2.abrupt('return', res.status(200).send(data));

                        case 12:
                            _data13 = {};

                            _data13.result = "02";
                            _data13.name = "用户不存在";
                            return _context2.abrupt('return', res.status(200).send(_data13));

                        case 16:
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

    app.post('/wechat/login/changepasswd2', function () {
        var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(req, res, next) {
            var params;
            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            params = req.body;
                            _context4.next = 3;
                            return loginModel.update({ tel: params.tel }, { $set: { password: params.password } }, function () {
                                var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(err) {
                                    var data, _data14;

                                    return _regenerator2.default.wrap(function _callee3$(_context3) {
                                        while (1) {
                                            switch (_context3.prev = _context3.next) {
                                                case 0:
                                                    if (!err) {
                                                        _context3.next = 7;
                                                        break;
                                                    }

                                                    data = {};

                                                    data.result = "01";
                                                    data.name = "操作失败";
                                                    res.status(200).send(data);
                                                    _context3.next = 11;
                                                    break;

                                                case 7:
                                                    _data14 = {};

                                                    _data14.result = "00";
                                                    _data14.name = "操作成功";
                                                    return _context3.abrupt('return', res.status(200).send(_data14));

                                                case 11:
                                                case 'end':
                                                    return _context3.stop();
                                            }
                                        }
                                    }, _callee3, this);
                                }));

                                return function (_x10) {
                                    return _ref4.apply(this, arguments);
                                };
                            }());

                        case 3:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, this);
        }));

        return function (_x7, _x8, _x9) {
            return _ref3.apply(this, arguments);
        };
    }());

    app.get('/wechat/login/originalpasswd', function () {
        var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(req, res, next) {
            var password, userName, result, data, _data15;

            return _regenerator2.default.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            password = req.query.password;
                            userName = req.query.userName;
                            _context5.next = 4;
                            return loginModel.findOne({ 'userName': userName, 'password': password }, { _id: 1, role: 1, tel: 1 }, function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    res.status(200).send(data);
                                    return;
                                }
                            });

                        case 4:
                            result = _context5.sent;

                            if (!(result != null)) {
                                _context5.next = 12;
                                break;
                            }

                            data = {};

                            data.result = "00";
                            data.name = "操作成功";
                            return _context5.abrupt('return', res.status(200).send(data));

                        case 12:
                            _data15 = {};

                            _data15.result = "02";
                            _data15.name = "用户名或原始密码不正确";
                            return _context5.abrupt('return', res.status(200).send(_data15));

                        case 16:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, this);
        }));

        return function (_x11, _x12, _x13) {
            return _ref5.apply(this, arguments);
        };
    }());

    app.post('/wechat/login/changepasswd', function () {
        var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(req, res, next) {
            var params;
            return _regenerator2.default.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            params = req.body;
                            _context7.next = 3;
                            return loginModel.update({ userName: params.userName }, { $set: { password: params.password } }, function () {
                                var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(err) {
                                    var data, _data16;

                                    return _regenerator2.default.wrap(function _callee6$(_context6) {
                                        while (1) {
                                            switch (_context6.prev = _context6.next) {
                                                case 0:
                                                    if (!err) {
                                                        _context6.next = 7;
                                                        break;
                                                    }

                                                    data = {};

                                                    data.result = "01";
                                                    data.name = "操作失败";
                                                    res.status(200).send(data);
                                                    _context6.next = 11;
                                                    break;

                                                case 7:
                                                    _data16 = {};

                                                    _data16.result = "00";
                                                    _data16.name = "操作成功";
                                                    return _context6.abrupt('return', res.status(200).send(_data16));

                                                case 11:
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
};