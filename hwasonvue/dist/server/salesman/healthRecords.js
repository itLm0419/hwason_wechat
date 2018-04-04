'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _card = require('../util/schema/card');

var _card2 = _interopRequireDefault(_card);

var _login = require('../util/schema/login');

var _login2 = _interopRequireDefault(_login);

var _userRecord = require('../util/schema/userRecord');

var _userRecord2 = _interopRequireDefault(_userRecord);

var _user = require('../util/schema/user');

var _user2 = _interopRequireDefault(_user);

var _salesman = require('../util/schema/salesman');

var _salesman2 = _interopRequireDefault(_salesman);

var _common = require('../util/common');

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var xlsx = require('node-xlsx');
var JSZip = require("jszip");
var fs = require('fs');
module.exports = function (app) {
    app.post('/wechat/healthRecord/register', function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
            var params, cardNo, password, name, IDNo, salesmanNo, salesmanId, login, userId, card, _data3, salesman, _data5, sl, userRecord, userRecord2, _data9, _data10, user, userEntity, userRecordEntity, date, year, month, day, data;

            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            params = req.body.params;
                            cardNo = params.cardNo;
                            password = params.password;
                            name = params.name;
                            IDNo = params.IDNo;
                            salesmanNo = params.salesmanNo;
                            salesmanId = req.cookies.userId;

                            if (!(salesmanId && !salesmanNo)) {
                                _context.next = 14;
                                break;
                            }

                            _context.next = 10;
                            return _login2.default.findOne({ _id: salesmanId }, { userName: 1 }, function (err) {
                                if (err) {
                                    var _data = {};
                                    _data.result = "01";
                                    _data.name = "操作失败";
                                    return res.status(200).send(_data);
                                }
                            });

                        case 10:
                            login = _context.sent;

                            salesmanNo = login.userName;
                            _context.next = 15;
                            break;

                        case 14:
                            res.cookie('userId', "");

                        case 15:
                            userId = "";
                            _context.next = 18;
                            return _card2.default.count({ cardNo: cardNo, password: password }, function (err) {
                                if (err) {
                                    var _data2 = {};
                                    _data2.result = "01";
                                    _data2.name = "操作失败";
                                    return res.status(200).send(_data2);
                                }
                            });

                        case 18:
                            card = _context.sent;

                            console.log(2);

                            if (!(card == 0)) {
                                _context.next = 25;
                                break;
                            }

                            _data3 = {};

                            _data3.result = "02";
                            _data3.name = "卡号或密码不正确";
                            return _context.abrupt('return', res.status(200).send(_data3));

                        case 25:
                            console.log(3);
                            _context.next = 28;
                            return _login2.default.findOne({ userName: salesmanNo }, { _id: 1, userName: 1, realName: 1, tel: 1, department: 1 }, function (err) {
                                if (err) {
                                    var _data4 = {};
                                    _data4.result = "01";
                                    _data4.name = "操作失败";
                                    return res.status(200).send(_data4);
                                }
                            });

                        case 28:
                            salesman = _context.sent;

                            if (salesman) {
                                _context.next = 34;
                                break;
                            }

                            _data5 = {};

                            _data5.result = "03";
                            _data5.name = "健康服务专员工号不存在";
                            return _context.abrupt('return', res.status(200).send(_data5));

                        case 34:
                            _context.next = 36;
                            return _salesman2.default.findOne({ _id: salesman._id }, { organization_id: 1 }, function (err) {
                                if (err) {
                                    var _data6 = {};
                                    _data6.result = "01";
                                    _data6.name = "操作失败";
                                    return res.status(200).send(_data6);
                                }
                            });

                        case 36:
                            sl = _context.sent;

                            salesman.organization_id = sl.organization_id;
                            console.log(5);
                            _context.next = 41;
                            return _userRecord2.default.findOne({ cardNo: cardNo }, { IDNo: 1, userId: 1, complete: 1 }, function (err) {
                                if (err) {
                                    var _data7 = {};
                                    _data7.result = "01";
                                    _data7.name = "操作失败";
                                    return res.status(200).send(_data7);
                                }
                            });

                        case 41:
                            userRecord = _context.sent;

                            console.log(salesman);

                            if (!userRecord) {
                                _context.next = 64;
                                break;
                            }

                            _context.next = 46;
                            return _userRecord2.default.findOne({ cardNo: cardNo, IDNo: IDNo }, { userId: 1 }, function (err) {
                                if (err) {
                                    var _data8 = {};
                                    _data8.result = "01";
                                    _data8.name = "操作失败";
                                    return res.status(200).send(_data8);
                                }
                            });

                        case 46:
                            userRecord2 = _context.sent;

                            if (userRecord2) {
                                _context.next = 52;
                                break;
                            }

                            _data9 = {};

                            _data9.result = "04";
                            _data9.name = "该卡号已被其他用户使用";
                            return _context.abrupt('return', res.status(200).send(_data9));

                        case 52:
                            if (!userRecord.complete) {
                                _context.next = 57;
                                break;
                            }

                            _data10 = {};

                            _data10.result = "05";
                            _data10.name = "用户信息已填写完整";
                            return _context.abrupt('return', res.status(200).send(_data10));

                        case 57:
                            userId = userRecord2.userId;
                            _context.next = 60;
                            return _userRecord2.default.update({ cardNo: cardNo }, { $set: {
                                    name: name,
                                    organization_id: salesman.organization_id,
                                    salesman: salesman
                                } }, function (err) {
                                if (err) {
                                    var _data11 = {};
                                    _data11.result = "01";
                                    _data11.name = "操作失败";
                                    return res.status(200).send(_data11);
                                }
                            });

                        case 60:
                            _context.next = 62;
                            return _card2.default.update({ cardNo: cardNo }, { $set: {
                                    salesman: salesman,
                                    organization_id: salesman.organization_id,
                                    userId: userRecord.userId,
                                    userName: name
                                } }, function (err) {
                                if (err) {
                                    var _data12 = {};
                                    _data12.result = "01";
                                    _data12.name = "操作失败";
                                    return res.status(200).send(_data12);
                                }
                            });

                        case 62:
                            _context.next = 85;
                            break;

                        case 64:
                            console.log(11);
                            user = {};
                            _context.next = 68;
                            return _user2.default.findOne({ IDNo: IDNo }, { _id: 1 }, function (err) {
                                if (err) {
                                    var _data13 = {};
                                    _data13.result = "01";
                                    _data13.name = "操作失败";
                                    return res.status(200).send(_data13);
                                }
                            });

                        case 68:
                            user = _context.sent;

                            console.log(12);

                            if (user) {
                                _context.next = 74;
                                break;
                            }

                            userEntity = new _user2.default({
                                name: name,
                                IDNo: IDNo
                            });
                            _context.next = 74;
                            return userEntity.save(function (err, content) {
                                if (err) {
                                    var _data14 = {};
                                    _data14.result = "01";
                                    _data14.name = "操作失败";
                                    return res.status(200).send(_data14);
                                } else {
                                    user = content;
                                }
                            });

                        case 74:
                            userRecordEntity = new _userRecord2.default({
                                cardNo: cardNo,
                                password: password,
                                organization_id: salesman.organization_id,
                                salesman: salesman,
                                name: name,
                                IDNo: IDNo,
                                userId: user._id,
                                createTime: new Date()
                            });
                            _context.next = 77;
                            return userRecordEntity.save(function (err) {
                                if (err) {
                                    var _data15 = {};
                                    _data15.result = "01";
                                    _data15.name = "操作失败";
                                    return res.status(200).send(_data15);
                                }
                            });

                        case 77:
                            date = new Date();
                            year = date.getFullYear();
                            month = date.getMonth();
                            day = date.getDate();

                            console.log(salesman);
                            _context.next = 84;
                            return _card2.default.update({ cardNo: cardNo }, { $set: {
                                    userId: user.id,
                                    userName: name,
                                    organization_id: salesman.organization_id,
                                    salesman: salesman,
                                    beginTime: new Date(year, month, day),
                                    endTime: new Date(year + 1, month, day),
                                    cardType: 1,
                                    status: 1
                                } }, function (err) {
                                if (err) {
                                    var _data16 = {};
                                    _data16.result = "01";
                                    _data16.name = "操作失败";
                                    return res.status(200).send(_data16);
                                }
                            });

                        case 84:
                            userId = user._id;

                        case 85:
                            data = {};

                            console.log(userId, 2222);
                            data.userId = userId;
                            data.result = "00";
                            data.name = "操作成功";
                            res.status(200).send(data);

                        case 91:
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
    app.post("/wechat/healthRecord/step2", function () {
        var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
            var params, sex, region, address, userId, tel, data;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            params = req.body.params;
                            sex = params.sex;
                            region = params.region;
                            address = params.address;
                            userId = params.userId;
                            tel = params.tel;
                            _context2.next = 8;
                            return _user2.default.update({ _id: userId }, { $set: {
                                    sex: sex,
                                    tel: tel,
                                    region: region,
                                    address: address
                                } }, function (err) {
                                if (err) {
                                    var _data17 = {};
                                    _data17.result = "01";
                                    _data17.name = "操作失败";
                                    return res.status(200).send(_data17);
                                }
                            });

                        case 8:
                            _context2.next = 10;
                            return _userRecord2.default.update({ userId: userId }, { $set: {
                                    sex: sex,
                                    tel: tel,
                                    region: region,
                                    address: address
                                } }, function (err) {
                                if (err) {
                                    var _data18 = {};
                                    _data18.result = "01";
                                    _data18.name = "操作失败";
                                    return res.status(200).send(_data18);
                                }
                            });

                        case 10:
                            data = {};

                            data.result = "00";
                            data.name = "操作成功";
                            res.status(200).send(data);

                        case 14:
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
    app.post("/wechat/healthRecord/step3", function () {
        var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res, next) {
            var params, userId, relatives, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, relative, result, userEntity, user, data;

            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            params = req.body.params;
                            userId = params.userId;
                            relatives = params.relatives;
                            _context3.next = 5;
                            return _userRecord2.default.update({ userId: userId }, { $set: { relatives: relatives } }, function (err) {
                                if (err) {
                                    console.log(err);
                                    var _data19 = {};
                                    _data19.result = "01";
                                    _data19.name = "操作失败";
                                    return res.status(200).send(_data19);
                                }
                            });

                        case 5:
                            _iteratorNormalCompletion = true;
                            _didIteratorError = false;
                            _iteratorError = undefined;
                            _context3.prev = 8;
                            _iterator = (0, _getIterator3.default)(relatives);

                        case 10:
                            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                _context3.next = 29;
                                break;
                            }

                            relative = _step.value;
                            _context3.next = 14;
                            return _user2.default.findOne({ IDNo: relative.IDNo }, { _id: 1 }, function (err) {
                                if (err) {
                                    console.log(err);
                                    var _data20 = {};
                                    _data20.result = "01";
                                    _data20.name = "操作失败";
                                    return res.status(200).send(_data20);
                                }
                            });

                        case 14:
                            result = _context3.sent;

                            if (!result) {
                                _context3.next = 20;
                                break;
                            }

                            _context3.next = 18;
                            return _card2.default.update({ userId: userId }, { $push: { familyId: result._id } }, function (err) {
                                if (err) {
                                    console.log(err);
                                    var _data21 = {};
                                    _data21.result = "01";
                                    _data21.name = "操作失败";
                                    return res.status(200).send(_data21);
                                }
                            });

                        case 18:
                            _context3.next = 26;
                            break;

                        case 20:
                            userEntity = new _user2.default({
                                name: relative.name,
                                IDNo: relative.IDNo
                            });
                            _context3.next = 23;
                            return userEntity.save(function (err) {
                                if (err) {
                                    console.log(err);
                                    var _data22 = {};
                                    _data22.result = "01";
                                    _data22.name = "操作失败";
                                    return res.status(200).send(_data22);
                                }
                            });

                        case 23:
                            user = _context3.sent;
                            _context3.next = 26;
                            return _card2.default.update({ userId: userId }, { $push: { familyId: user._id } }, function (err) {
                                if (err) {
                                    console.log(err);
                                    var _data23 = {};
                                    _data23.result = "01";
                                    _data23.name = "操作失败";
                                    return res.status(200).send(_data23);
                                }
                            });

                        case 26:
                            _iteratorNormalCompletion = true;
                            _context3.next = 10;
                            break;

                        case 29:
                            _context3.next = 35;
                            break;

                        case 31:
                            _context3.prev = 31;
                            _context3.t0 = _context3['catch'](8);
                            _didIteratorError = true;
                            _iteratorError = _context3.t0;

                        case 35:
                            _context3.prev = 35;
                            _context3.prev = 36;

                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }

                        case 38:
                            _context3.prev = 38;

                            if (!_didIteratorError) {
                                _context3.next = 41;
                                break;
                            }

                            throw _iteratorError;

                        case 41:
                            return _context3.finish(38);

                        case 42:
                            return _context3.finish(35);

                        case 43:
                            data = {};

                            data.result = "00";
                            data.name = "操作成功";
                            res.status(200).send(data);

                        case 47:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, this, [[8, 31, 35, 43], [36,, 38, 42]]);
        }));

        return function (_x7, _x8, _x9) {
            return _ref3.apply(this, arguments);
        };
    }());
    app.post("/wechat/healthRecord/step4", function () {
        var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(req, res, next) {
            var params;
            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            params = req.body.params;
                            _context4.next = 3;
                            return _userRecord2.default.update({ userId: params.userId }, {
                                height: params.height,
                                weight: params.weight,
                                regularTest: params.regularTest,
                                recentResidence: params.recentResidence,
                                cardioCerebrovascular: params.cardioCerebrovascular
                            }, function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    return res.status(200).send(data);
                                } else {
                                    var _data24 = {};
                                    _data24.result = "00";
                                    _data24.name = "操作成功";
                                    return res.status(200).send(_data24);
                                }
                            });

                        case 3:
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
    app.post("/wechat/healthRecord/step5", function () {
        var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(req, res, next) {
            var params;
            return _regenerator2.default.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            params = req.body.params;
                            _context5.next = 3;
                            return _userRecord2.default.update({ userId: params.userId }, {
                                digestiveSystem: params.digestiveSystem,
                                respiratorySystem: params.respiratorySystem
                            }, function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    return res.status(200).send(data);
                                } else {
                                    var _data25 = {};
                                    _data25.result = "00";
                                    _data25.name = "操作成功";
                                    return res.status(200).send(_data25);
                                }
                            });

                        case 3:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, this);
        }));

        return function (_x13, _x14, _x15) {
            return _ref5.apply(this, arguments);
        };
    }());
    app.post("/wechat/healthRecord/step6", function () {
        var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(req, res, next) {
            var params;
            return _regenerator2.default.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            params = req.body.params;
                            _context6.next = 3;
                            return _userRecord2.default.update({ userId: params.userId }, {
                                endocrine: params.endocrine,
                                gynaecopathia: params.gynaecopathia
                            }, function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    return res.status(200).send(data);
                                } else {
                                    var _data26 = {};
                                    _data26.result = "00";
                                    _data26.name = "操作成功";
                                    return res.status(200).send(_data26);
                                }
                            });

                        case 3:
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
    app.post("/wechat/healthRecord/step7", function () {
        var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(req, res, next) {
            var params;
            return _regenerator2.default.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            params = req.body.params;
                            _context7.next = 3;
                            return _userRecord2.default.update({ userId: params.userId }, {
                                tumour: params.tumour,
                                otherDiseases: params.otherDiseases
                            }, function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    return res.status(200).send(data);
                                } else {
                                    var _data27 = {};
                                    _data27.result = "00";
                                    _data27.name = "操作成功";
                                    return res.status(200).send(_data27);
                                }
                            });

                        case 3:
                        case 'end':
                            return _context7.stop();
                    }
                }
            }, _callee7, this);
        }));

        return function (_x19, _x20, _x21) {
            return _ref7.apply(this, arguments);
        };
    }());

    app.post("/wechat/healthRecord/step8", function () {
        var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(req, res, next) {
            var params;
            return _regenerator2.default.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                        case 0:
                            params = req.body.params;
                            _context8.next = 3;
                            return _userRecord2.default.update({ userId: params.userId }, {
                                familyDiseases: params.familyDiseases,
                                health: params.health,
                                fatigue: params.fatigue
                            }, function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    return res.status(200).send(data);
                                } else {
                                    var _data28 = {};
                                    _data28.result = "00";
                                    _data28.name = "操作成功";
                                    return res.status(200).send(_data28);
                                }
                            });

                        case 3:
                        case 'end':
                            return _context8.stop();
                    }
                }
            }, _callee8, this);
        }));

        return function (_x22, _x23, _x24) {
            return _ref8.apply(this, arguments);
        };
    }());
    app.post("/wechat/healthRecord/step9", function () {
        var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9(req, res, next) {
            var params;
            return _regenerator2.default.wrap(function _callee9$(_context9) {
                while (1) {
                    switch (_context9.prev = _context9.next) {
                        case 0:
                            params = req.body.params;
                            _context9.next = 3;
                            return _userRecord2.default.update({ userId: params.userId }, {
                                sleep: params.sleep,
                                stayUpLate: params.stayUpLate,
                                weightChange: params.weightChange,
                                reduceWeight: params.reduceWeight,
                                smokeYear: params.smokeYear,
                                smokeOneDay: params.smokeOneDay
                            }, function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    return res.status(200).send(data);
                                } else {
                                    var _data29 = {};
                                    _data29.result = "00";
                                    _data29.name = "操作成功";
                                    return res.status(200).send(_data29);
                                }
                            });

                        case 3:
                        case 'end':
                            return _context9.stop();
                    }
                }
            }, _callee9, this);
        }));

        return function (_x25, _x26, _x27) {
            return _ref9.apply(this, arguments);
        };
    }());
    app.post("/wechat/healthRecord/step10", function () {
        var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10(req, res, next) {
            var params, userId, login, data;
            return _regenerator2.default.wrap(function _callee10$(_context10) {
                while (1) {
                    switch (_context10.prev = _context10.next) {
                        case 0:
                            params = req.body.params;
                            userId = req.cookies.userId;
                            _context10.next = 4;
                            return _userRecord2.default.update({ userId: params.userId }, {
                                drinkYear: params.drinkYear,
                                drinkOneDay: params.drinkOneDay,
                                exerciseFrequency: params.exerciseFrequency,
                                exerciseTimeOnce: params.exerciseTimeOnce,
                                other: params.other,
                                complete: true
                            }, function (err) {
                                if (err) {
                                    var _data30 = {};
                                    _data30.result = "01";
                                    _data30.name = "操作失败";
                                    return res.status(200).send(_data30);
                                }
                            });

                        case 4:
                            login = {};

                            if (!userId) {
                                _context10.next = 9;
                                break;
                            }

                            _context10.next = 8;
                            return _login2.default.findOne({ _id: userId }, { role: 1 }, function (err) {
                                if (err) {
                                    var _data31 = {};
                                    _data31.result = "01";
                                    _data31.name = "操作失败";
                                    return res.status(200).send(_data31);
                                }
                            });

                        case 8:
                            login = _context10.sent;

                        case 9:
                            data = {};

                            data.result = "00";
                            data.name = "操作成功";
                            if (login) {
                                data.role = login.role;
                            }
                            return _context10.abrupt('return', res.status(200).send(data));

                        case 14:
                        case 'end':
                            return _context10.stop();
                    }
                }
            }, _callee10, this);
        }));

        return function (_x28, _x29, _x30) {
            return _ref10.apply(this, arguments);
        };
    }());
    app.get("/wechat/healthRecord/queryInfo", function () {
        var _ref11 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee11(req, res, next) {
            var result, card, datas;
            return _regenerator2.default.wrap(function _callee11$(_context11) {
                while (1) {
                    switch (_context11.prev = _context11.next) {
                        case 0:
                            _context11.next = 2;
                            return _userRecord2.default.findOne({ userId: req.query.userId }, function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    return res.status(200).send(data);
                                }
                            });

                        case 2:
                            result = _context11.sent;
                            _context11.next = 5;
                            return _card2.default.findOne({ userId: req.query.userId }, { salesman: 1, beginTime: 1, endTime: 1 }, function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    return res.status(200).send(data);
                                }
                            });

                        case 5:
                            card = _context11.sent;
                            datas = {};

                            datas.record = result;
                            datas.salesman = card.salesman;
                            datas.beginTime = _common2.default.dateFormat(card.beginTime, 3);
                            datas.endTime = _common2.default.dateFormat(card.endTime, 3);
                            datas.cteateTime = _common2.default.dateFormat(result.createTime, 2);
                            res.status(200).send(datas);

                        case 13:
                        case 'end':
                            return _context11.stop();
                    }
                }
            }, _callee11, this);
        }));

        return function (_x31, _x32, _x33) {
            return _ref11.apply(this, arguments);
        };
    }());
    app.get('/wechat/healthRecord/isComplete', function () {
        var _ref12 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee12(req, res, next) {
            var data;
            return _regenerator2.default.wrap(function _callee12$(_context12) {
                while (1) {
                    switch (_context12.prev = _context12.next) {
                        case 0:
                            data = _userRecord2.default.findOne({ cardNo: req.query.cardNo }, { complete: 1 }, function (err, content) {
                                if (err) {
                                    var _data32 = {};
                                    _data32.result = "01";
                                    _data32.name = "操作失败";
                                    return res.status(200).send(_data32);
                                }
                            });

                            res.status(200).send(data.complete);

                        case 2:
                        case 'end':
                            return _context12.stop();
                    }
                }
            }, _callee12, this);
        }));

        return function (_x34, _x35, _x36) {
            return _ref12.apply(this, arguments);
        };
    }());
    app.get('/wechat/healthRecord/showRecords', function () {
        var _ref13 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee13(req, res, next) {
            var userId, pageNo, pageSize, param, card, arr, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, cd, query, count, records, data, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, rd, record, datas;

            return _regenerator2.default.wrap(function _callee13$(_context13) {
                while (1) {
                    switch (_context13.prev = _context13.next) {
                        case 0:
                            userId = req.cookies.userId;
                            pageNo = req.query.pageNo || 1;
                            pageSize = req.query.pageSize || 20;
                            param = req.query.param;
                            _context13.next = 6;
                            return _card2.default.find({ "salesman._id": userId }, { userId: 1 }, function (err) {
                                if (err) {
                                    var _data33 = {};
                                    _data33.result = "01";
                                    _data33.name = "操作失败";
                                    return res.status(200).send(_data33);
                                }
                            });

                        case 6:
                            card = _context13.sent;
                            arr = [];
                            _iteratorNormalCompletion2 = true;
                            _didIteratorError2 = false;
                            _iteratorError2 = undefined;
                            _context13.prev = 11;

                            for (_iterator2 = (0, _getIterator3.default)(card); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                cd = _step2.value;

                                arr.push(cd.userId);
                            }
                            _context13.next = 19;
                            break;

                        case 15:
                            _context13.prev = 15;
                            _context13.t0 = _context13['catch'](11);
                            _didIteratorError2 = true;
                            _iteratorError2 = _context13.t0;

                        case 19:
                            _context13.prev = 19;
                            _context13.prev = 20;

                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }

                        case 22:
                            _context13.prev = 22;

                            if (!_didIteratorError2) {
                                _context13.next = 25;
                                break;
                            }

                            throw _iteratorError2;

                        case 25:
                            return _context13.finish(22);

                        case 26:
                            return _context13.finish(19);

                        case 27:
                            query = {};

                            query.userId = { $in: arr };
                            if (param) {
                                query.$or = [{ cardNo: { '$regex': param, '$options': "i" } }, { name: { '$regex': param, '$options': "i" } }, { IDNo: { '$regex': param, '$options': "i" } }];
                            }
                            _context13.next = 32;
                            return _userRecord2.default.count(query, function (err) {
                                if (err) {
                                    var _data34 = {};
                                    _data34.result = "01";
                                    _data34.name = "操作失败";
                                    return res.status(200).send(_data34);
                                }
                            });

                        case 32:
                            count = _context13.sent;
                            _context13.next = 35;
                            return _userRecord2.default.find(query, { name: 1, IDNo: 1, sex: 1, cardNo: 1, createTime: 1, complete: 1, userId: 1 }, function (err) {
                                if (err) {
                                    var _data35 = {};
                                    _data35.result = "01";
                                    _data35.name = "操作失败";
                                    return res.status(200).send(_data35);
                                }
                            }).skip((pageNo - 1) * pageSize).limit(parseInt(pageSize));

                        case 35:
                            records = _context13.sent;
                            data = [];
                            _iteratorNormalCompletion3 = true;
                            _didIteratorError3 = false;
                            _iteratorError3 = undefined;
                            _context13.prev = 40;

                            for (_iterator3 = (0, _getIterator3.default)(records); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                rd = _step3.value;
                                record = {};

                                record.name = rd.name;
                                record.userId = rd.userId;
                                record.age = getAgeByIDNo(rd.IDNo);
                                record.sex = rd.sex;
                                record.cardNo = rd.cardNo;
                                record.createTime = _common2.default.dateFormat(rd.createTime, 2);
                                record.complete = rd.complete;
                                data.push(record);
                            }
                            _context13.next = 48;
                            break;

                        case 44:
                            _context13.prev = 44;
                            _context13.t1 = _context13['catch'](40);
                            _didIteratorError3 = true;
                            _iteratorError3 = _context13.t1;

                        case 48:
                            _context13.prev = 48;
                            _context13.prev = 49;

                            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                _iterator3.return();
                            }

                        case 51:
                            _context13.prev = 51;

                            if (!_didIteratorError3) {
                                _context13.next = 54;
                                break;
                            }

                            throw _iteratorError3;

                        case 54:
                            return _context13.finish(51);

                        case 55:
                            return _context13.finish(48);

                        case 56:
                            datas = {};

                            datas.count = count;
                            datas.records = data;
                            res.status(200).send(datas);

                        case 60:
                        case 'end':
                            return _context13.stop();
                    }
                }
            }, _callee13, this, [[11, 15, 19, 27], [20,, 22, 26], [40, 44, 48, 56], [49,, 51, 55]]);
        }));

        return function (_x37, _x38, _x39) {
            return _ref13.apply(this, arguments);
        };
    }());
    app.get("/wechat/healthRecord/step999", function () {
        var _ref14 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee14(req, res, next) {
            var zip, card, data, head, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, cd, arr, buffer;

            return _regenerator2.default.wrap(function _callee14$(_context14) {
                while (1) {
                    switch (_context14.prev = _context14.next) {
                        case 0:
                            zip = new JSZip();
                            _context14.next = 3;
                            return _card2.default.find({}).skip(9999);

                        case 3:
                            card = _context14.sent;
                            data = [];
                            head = [];

                            head.push("卡号");
                            head.push("密码");
                            data.push(head);
                            _iteratorNormalCompletion4 = true;
                            _didIteratorError4 = false;
                            _iteratorError4 = undefined;
                            _context14.prev = 12;
                            for (_iterator4 = (0, _getIterator3.default)(card); !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                cd = _step4.value;
                                arr = [];

                                arr.push(cd.cardNo);
                                arr.push(cd.password);
                                data.push(arr);
                            }
                            _context14.next = 20;
                            break;

                        case 16:
                            _context14.prev = 16;
                            _context14.t0 = _context14['catch'](12);
                            _didIteratorError4 = true;
                            _iteratorError4 = _context14.t0;

                        case 20:
                            _context14.prev = 20;
                            _context14.prev = 21;

                            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                _iterator4.return();
                            }

                        case 23:
                            _context14.prev = 23;

                            if (!_didIteratorError4) {
                                _context14.next = 26;
                                break;
                            }

                            throw _iteratorError4;

                        case 26:
                            return _context14.finish(23);

                        case 27:
                            return _context14.finish(20);

                        case 28:
                            buffer = xlsx.build([{
                                name: 'sheet1',
                                data: data
                            }]);

                            zip.file("卡号密码.xlsx", buffer);
                            zip.generateAsync({ type: "nodebuffer" }).then(function (content) {
                                fs.writeFile('/home/hwason/temp/report.zip', content, function (err) {
                                    if (err) throw err;
                                    res.download('/home/hwason/temp/report.zip');
                                });
                            });

                        case 31:
                        case 'end':
                            return _context14.stop();
                    }
                }
            }, _callee14, this, [[12, 16, 20, 28], [21,, 23, 27]]);
        }));

        return function (_x40, _x41, _x42) {
            return _ref14.apply(this, arguments);
        };
    }());
};
function getAgeByIDNo(IDNo) {
    if (IDNo.length == 18) {
        var birthdayYear = parseInt(IDNo.substr(6, 4));
        var nowYear = new Date().getFullYear();
        return nowYear - birthdayYear;
    } else if (IDNo.length == 15) {
        var _birthdayYear = parseInt(19 + IDNo.substr(6, 2));
        var _nowYear = new Date().getFullYear();
        return _nowYear - _birthdayYear;
    }
}
function getpwd() {
    var num = parseInt(Math.random() * 1000000000);
    if (num.toString().length < 6) {
        return "845166";
    } else {
        return num.toString().substring(0, 6);
    }
}