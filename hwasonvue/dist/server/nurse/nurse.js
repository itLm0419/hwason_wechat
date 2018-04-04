
'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require('path');
var fs = require('fs');
var join = path.join;
var multer = require('multer');

var provinces = require('../util/provinces');
var nurseModel = require('../util/schema/nurse');
var userModel = require('../util/schema/user');
var userActivityModel = require('../util/schema/userActivities');
var activityModel = require('../util/schema/activities');
var loginModel = require('../util/schema/login');
var organizationModel = require('../util/schema/organizations');
var dirDelivery = '/home/hwason/delivery/';
var dirDelivery0 = '/home/hwason/delivery';
var dirPhoto = '/home/hwason/photo_id/';
var dirPhoto0 = '/home/hwason/photo_id';
var dirWorkPhoto = '/home/hwason/photo_work/';
var dirWorkPhoto0 = '/home/hwason/photo_work';
var mineType = require('mime-types');


module.exports = function (app) {
    var getActivities = function () {
        var _ref25 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee25(userId, res) {
            var date, begin, activity, company, data, i;
            return _regenerator2.default.wrap(function _callee25$(_context25) {
                while (1) {
                    switch (_context25.prev = _context25.next) {
                        case 0:
                            date = new Date();
                            begin = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                            _context25.next = 4;
                            return activityModel.findOne({ "nurses.id": userId, "activity_time": { $gte: begin } }, { activity_time: 1, address: 1, projects: 1, organization_id: 1 }, function (err) {

                                if (err) {
                                    var _data39 = {};
                                    _data39.result = "01";
                                    _data39.name = "操作失败";
                                    res.status(200).send(_data39);
                                }
                            }).sort({ activity_time: 1 });

                        case 4:
                            activity = _context25.sent;
                            _context25.next = 7;
                            return organizationModel.findOne({ "_id": activity.organization_id }, { name: 1 }, function (err) {
                                if (err) {
                                    var _data40 = {};
                                    _data40.result = "01";
                                    _data40.name = "操作失败";
                                    return res.status(200).send(_data40);
                                }
                            });

                        case 7:
                            company = _context25.sent;
                            data = {};

                            for (i = 0; i < activity.projects.length; i++) {
                                if (i == 0) {
                                    data.projects = activity.projects[i];
                                } else {
                                    data.projects = data.projects + '+' + activity.projects[i];
                                }
                            }
                            data.activity_time = changeSingleDate(activity.activity_time);
                            data.address = activity.address;
                            data.activity_id = activity._id;
                            data.companyName = company.name;

                            return _context25.abrupt('return', data);

                        case 15:
                        case 'end':
                            return _context25.stop();
                    }
                }
            }, _callee25, this);
        }));

        return function getActivities(_x67, _x68) {
            return _ref25.apply(this, arguments);
        };
    }();

    var getAllDayActivities = function () {
        var _ref26 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee26(userId, res) {
            var date, begin, activities, data, i, company, activity, j;
            return _regenerator2.default.wrap(function _callee26$(_context26) {
                while (1) {
                    switch (_context26.prev = _context26.next) {
                        case 0:
                            date = new Date();
                            begin = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                            _context26.next = 4;
                            return activityModel.find({ "nurses.id": userId, "activity_time": { $gte: begin } }, { projects: 1, activity_time: 1, address: 1, organization_id: 1, feedback_state: 1 }, function (err) {
                                if (err) {
                                    var _data41 = {};
                                    _data41.result = "01";
                                    _data41.name = "操作失败";
                                    return res.status(200).send(_data41);
                                }
                            }).limit(7).sort({ activity_time: 1 });

                        case 4:
                            activities = _context26.sent;
                            data = [];
                            i = 0;

                        case 7:
                            if (!(i < activities.length)) {
                                _context26.next = 23;
                                break;
                            }

                            _context26.next = 10;
                            return organizationModel.findOne({ "_id": activities[i].organization_id }, { name: 1 }, function (err) {
                                if (err) {
                                    var _data42 = {};
                                    _data42.result = "01";
                                    _data42.name = "操作失败";
                                    return res.status(200).send(_data42);
                                }
                            });

                        case 10:
                            company = _context26.sent;
                            activity = {};

                            activity.companyName = company.name;
                            activity.organization_id = activities[i].organization_id;
                            activity.activity_time = changeSingleDate(activities[i].activity_time);
                            activity.address = activities[i].address;
                            activity.activity_id = activities[i]._id;
                            activity.feedback_state = activities[i].feedback_state;
                            for (j = 0; j < activities[i].projects.length; j++) {
                                if (j == 0) {
                                    activity.projects = activities[i].projects[j];
                                } else {
                                    activity.projects = activity.projects + '+' + activities[i].projects[j];
                                }
                            }

                            data.push(activity);

                        case 20:
                            i++;
                            _context26.next = 7;
                            break;

                        case 23:
                            console.log("data", data);
                            return _context26.abrupt('return', data);

                        case 25:
                        case 'end':
                            return _context26.stop();
                    }
                }
            }, _callee26, this);
        }));

        return function getAllDayActivities(_x69, _x70) {
            return _ref26.apply(this, arguments);
        };
    }();

    app.get('/wechat/nurse/getProvinces', function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            return _context.abrupt('return', res.status(200).send(provinces));

                        case 1:
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

    app.get('/wechat/nurse/getPhoto', function () {
        var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
            var filename, filePath, mime, mimeType;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            filename = req.query.userName;
                            filePath = dirPhoto + filename + '.jpg';

                            console.log("filepath", filePath);
                            mime = require('mime');
                            mimeType = mime.lookup(filePath);

                            console.log("mimeType", mimeType);
                            res.setHeader('Content-Type', mimeType);

                            res.download(filePath);

                        case 8:
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

    app.get('/wechat/nurse/getWorkPhoto', function () {
        var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res, next) {
            var filename, filePath, mime, mimeType;
            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            filename = req.query.userName;
                            filePath = dirWorkPhoto + filename + '.jpg';
                            mime = require('mime');
                            mimeType = mime.lookup(filePath);

                            res.setHeader('Content-Type', mimeType);

                            res.download(filePath);

                        case 6:
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
    app.get('/wechat/nurse/getDeliveryNo', function () {
        var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(req, res, next) {
            var _id, orgName, activity, address, datas, flag, filePath, data, base64;

            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _id = req.query._id;
                            orgName = req.query.companyName;
                            _context4.next = 4;
                            return activityModel.findOne({ _id: _id }, { delivery_id: 1, delivery_file_path: 1 });

                        case 4:
                            activity = _context4.sent;
                            address = activity.delivery_file_path + orgName + ".jpg";
                            datas = {};

                            datas.delivery_id = activity.delivery_id;
                            flag = fs.existsSync(address);

                            if (flag) {
                                filePath = path.resolve(address);
                                data = fs.readFileSync(filePath);

                                data = new Buffer(data).toString('base64');
                                base64 = 'data:' + mineType.lookup(filePath) + ';base64,' + data;

                                datas.base64 = base64;
                            }
                            console.log(activity);
                            console.log(datas);
                            res.status(200).send(datas);

                        case 13:
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
    app.get('/wechat/nurse/getDeliveryPhoto', function () {
        var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(req, res, next) {
            var filename, activity_id, activity, filePath, mime, mimeType;
            return _regenerator2.default.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            filename = req.query.companyName;
                            activity_id = req.query.activity_id;

                            console.log("filename", filename);
                            console.log("activity_id", activity_id);
                            _context5.next = 6;
                            return activityModel.findOne({ _id: activity_id }, { delivery_id: 1, delivery_file_path: 1 }, function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    return res.status(200).send(data);
                                }
                            });

                        case 6:
                            activity = _context5.sent;

                            if (activity != null) {
                                filePath = activity.delivery_file_path + filename + '.jpg';

                                console.log("filepath", filePath);
                                mime = require('mime');
                                mimeType = mime.lookup(filePath);

                                console.log("mimeType", mimeType);
                                res.setHeader('Content-Type', mimeType);

                                res.download(filePath);
                            } else {
                                res.status(200).send('');
                            }

                        case 8:
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

    app.post('/wechat/nurse/regist', function () {
        var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(req, res, next) {
            var params, nurse, data, loginEntity;
            return _regenerator2.default.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            params = req.body;
                            _context6.next = 3;
                            return loginModel.findOne({ tel: params.tel }, { tel: 1 }, function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    return res.status(200).send(data);
                                }
                            });

                        case 3:
                            nurse = _context6.sent;

                            if (!(nurse != null)) {
                                _context6.next = 9;
                                break;
                            }

                            data = {};

                            data.result = "10";
                            data.name = "用户已存在";
                            return _context6.abrupt('return', res.status(200).send(data));

                        case 9:
                            loginEntity = new loginModel({
                                userName: params.tel,
                                password: params.passwd,
                                role: '31',
                                tel: params.tel,

                                realName: '',
                                department: ''
                            });
                            _context6.next = 12;
                            return loginEntity.save(function (err) {
                                if (err) {
                                    var _data = {};
                                    _data.result = "01";
                                    _data.name = "操作失败";
                                    return res.status(200).send(_data);
                                } else {
                                    var _data2 = {};
                                    _data2.result = "00";
                                    _data2.name = "操作成功";
                                    return res.status(200).send(_data2);
                                }
                            });

                        case 12:
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

    app.get('/wechat/nurse/getRegion', function () {
        var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(req, res, next) {
            return _regenerator2.default.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            console.log("region tets");

                        case 1:
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

    app.post('/wechat/nurse/registnext', function () {
        var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(req, res, next) {
            var params, nurselogin, nurse, data, nurseEntity;
            return _regenerator2.default.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                        case 0:
                            params = req.body;
                            _context8.next = 3;
                            return loginModel.findOne({ tel: params.tel }, { _id: 1 }, function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    return res.status(200).send(data);
                                }
                            });

                        case 3:
                            nurselogin = _context8.sent;
                            _context8.next = 6;
                            return nurseModel.findOne({ _id: nurselogin._id }, { _id: 1, checked: 1 }, function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    return res.status(200).send(data);
                                }
                            });

                        case 6:
                            nurse = _context8.sent;

                            if (!(nurse != null)) {
                                _context8.next = 17;
                                break;
                            }

                            if (!(nurse.checked != 1)) {
                                _context8.next = 15;
                                break;
                            }

                            data = {};

                            data.result = "10";
                            data.name = "用户已存在";
                            return _context8.abrupt('return', res.status(200).send(data));

                        case 15:
                            _context8.next = 17;
                            return nurseModel.update({ _id: nurselogin._id }, { $set: { realName: params.realName, IDNo: params.IDNo,
                                    sex: params.sex, tel: params.tel, address: params.address, region: params.region,
                                    cardholder: params.cardholder, owned_bank: params.owned_bank, card_number: params.card_number,
                                    open_bank: params.open_bank, certificate_No: params.certificate_No, unit_name: params.unit_name,
                                    certificate_file: params.certificate_file, photo_file: params.photo_file, post: params.post, checked: 0,
                                    create_time: new Date(),
                                    referee_name: params.referee_name,
                                    referee_tel: params.referee_tel
                                } }, function (err) {
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

                        case 17:
                            nurseEntity = new nurseModel({
                                _id: nurselogin._id,
                                realName: params.realName,
                                IDNo: params.IDNo,
                                sex: params.sex,
                                tel: params.tel,
                                address: params.address,
                                region: params.region,
                                cardholder: params.cardholder,
                                owned_bank: params.owned_bank,
                                card_number: params.card_number,
                                open_bank: params.open_bank,
                                certificate_No: params.certificate_No,
                                unit_name: params.unit_name,
                                certificate_file: params.certificate_file,
                                photo_file: params.photo_file,
                                post: params.post,
                                checked: 0,
                                create_time: new Date(),
                                referee_name: params.referee_name,
                                referee_tel: params.referee_tel

                            });
                            _context8.next = 20;
                            return nurseEntity.save(function (err) {
                                if (err) {
                                    var _data5 = {};
                                    _data5.result = "01";
                                    _data5.name = "操作失败";
                                    return res.status(200).send(_data5);
                                } else {
                                    var _data6 = {};
                                    _data6.result = "00";
                                    _data6.name = "操作成功";
                                    return res.status(200).send(_data6);
                                }
                            });

                        case 20:
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

    app.post('/wechat/nurse/myCenter_Save', function () {
        var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9(req, res, next) {
            var params, userId;
            return _regenerator2.default.wrap(function _callee9$(_context9) {
                while (1) {
                    switch (_context9.prev = _context9.next) {
                        case 0:
                            params = req.body;
                            userId = req.cookies.userId;
                            _context9.next = 4;
                            return nurseModel.update({ _id: userId }, { $set: { realName: params.realName, IDNo: params.IDNo,
                                    sex: params.sex, tel: params.tel, address: params.address, region: params.region,
                                    cardholder: params.cardholder, owned_bank: params.owned_bank, card_number: params.card_number,
                                    open_bank: params.open_bank, certificate_No: params.certificate_No, unit_name: params.unit_name,
                                    certificate_file: params.certificate_file, photo_file: params.photo_file, post: params.post
                                } }, function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    return res.status(200).send(data);
                                } else {
                                    var _data7 = {};
                                    _data7.result = "00";
                                    _data7.name = "操作成功";
                                    return res.status(200).send(_data7);
                                }
                            });

                        case 4:
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

    app.get('/wechat/nurse/myCenter', function () {
        var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10(req, res, next) {
            var userId, nurse;
            return _regenerator2.default.wrap(function _callee10$(_context10) {
                while (1) {
                    switch (_context10.prev = _context10.next) {
                        case 0:
                            userId = req.cookies.userId;
                            _context10.next = 3;
                            return nurseModel.findOne({ _id: userId }, function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    return res.status(200).send(data);
                                }
                            });

                        case 3:
                            nurse = _context10.sent;
                            return _context10.abrupt('return', res.status(200).send(nurse));

                        case 5:
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

    app.get('/wechat/nurse/getActivities', function () {
        var _ref11 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee11(req, res, next) {
            var userId, activity;
            return _regenerator2.default.wrap(function _callee11$(_context11) {
                while (1) {
                    switch (_context11.prev = _context11.next) {
                        case 0:
                            userId = req.cookies.userId;
                            _context11.next = 3;
                            return getActivities(userId, res);

                        case 3:
                            activity = _context11.sent;

                            res.status(200).send(activity);

                        case 5:
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

    app.get('/wechat/nurse/getAllDayActivities', function () {
        var _ref12 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee12(req, res, next) {
            var userId, activities;
            return _regenerator2.default.wrap(function _callee12$(_context12) {
                while (1) {
                    switch (_context12.prev = _context12.next) {
                        case 0:
                            userId = req.cookies.userId;
                            _context12.next = 3;
                            return getAllDayActivities(userId, res);

                        case 3:
                            activities = _context12.sent;

                            res.status(200).send(activities);

                        case 5:
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

    app.get('/wechat/nurse/getUser', function () {
        var _ref13 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee13(req, res, next) {
            var test_number, IDNo, userId, activity_id, userActivity, _data9, _data10, _data11, _userId, user, data, _userActivity, _data15, _data16, _data17, _userId2, _user, _data13, _userActivity2, _data21, _data22, _data23, _userId3, _user2, _data19;

            return _regenerator2.default.wrap(function _callee13$(_context13) {
                while (1) {
                    switch (_context13.prev = _context13.next) {
                        case 0:
                            test_number = req.query.test_code;
                            IDNo = req.query.IDNo;
                            userId = req.query.userId;
                            activity_id = req.query.activity_id;

                            console.log("userId1", userId);

                            if (!(test_number != null && test_number != "")) {
                                _context13.next = 36;
                                break;
                            }

                            _context13.next = 8;
                            return userActivityModel.findOne({ test_number: test_number, activity_id: activity_id }, { projects: 1, salesman: 1, userId: 1, activity_id: 1, sampled: 1, checked: 1 }, function (err) {
                                if (err) {
                                    var _data8 = {};
                                    _data8.result = "01";
                                    _data8.name = "操作失败";
                                    return res.status(200).send(_data8);
                                }
                            });

                        case 8:
                            userActivity = _context13.sent;

                            if (!(userActivity == null)) {
                                _context13.next = 16;
                                break;
                            }

                            _data9 = {};

                            _data9.result = "02";
                            _data9.name = "用户不存在";
                            return _context13.abrupt('return', res.status(200).send(_data9));

                        case 16:
                            if (!(userActivity.checked == false)) {
                                _context13.next = 21;
                                break;
                            }

                            _data10 = {};

                            _data10.result = "03";
                            _data10.name = "用户还未通过审核，请联系业务员审核";
                            return _context13.abrupt('return', res.status(200).send(_data10));

                        case 21:
                            if (!(userActivity.sampled == true)) {
                                _context13.next = 26;
                                break;
                            }

                            _data11 = {};

                            _data11.result = "02";
                            _data11.name = "用户已采样完成";
                            return _context13.abrupt('return', res.status(200).send(_data11));

                        case 26:
                            _userId = userActivity.userId;
                            _context13.next = 29;
                            return userModel.findOne({ _id: _userId }, { name: 1, sex: 1, tel: 1, IDNo: 1 }, function (err) {
                                if (err) {
                                    var _data12 = {};
                                    _data12.result = "01";
                                    _data12.name = "操作失败";
                                    return res.status(200).send(_data12);
                                }
                            });

                        case 29:
                            user = _context13.sent;
                            data = {};

                            data.userActivity = userActivity;
                            data.user = user;
                            return _context13.abrupt('return', res.status(200).send(data));

                        case 36:
                            if (!(IDNo != null && IDNo != "")) {
                                _context13.next = 67;
                                break;
                            }

                            _context13.next = 39;
                            return userActivityModel.findOne({ IDNo: IDNo, activity_id: activity_id }, { projects: 1, salesman: 1, userId: 1, activity_id: 1, sampled: 1, checked: 1 }, function (err) {
                                if (err) {
                                    var _data14 = {};
                                    _data14.result = "01";
                                    _data14.name = "操作失败";
                                    return res.status(200).send(_data14);
                                }
                            });

                        case 39:
                            _userActivity = _context13.sent;

                            if (!(_userActivity == null)) {
                                _context13.next = 47;
                                break;
                            }

                            _data15 = {};

                            _data15.result = "02";
                            _data15.name = "用户不存在";
                            return _context13.abrupt('return', res.status(200).send(_data15));

                        case 47:
                            if (!(_userActivity.checked == false)) {
                                _context13.next = 52;
                                break;
                            }

                            _data16 = {};

                            _data16.result = "03";
                            _data16.name = "用户还未通过审核，请联系业务员审核";
                            return _context13.abrupt('return', res.status(200).send(_data16));

                        case 52:
                            if (!(_userActivity.sampled == true)) {
                                _context13.next = 57;
                                break;
                            }

                            _data17 = {};

                            _data17.result = "02";
                            _data17.name = "用户已采样完成";
                            return _context13.abrupt('return', res.status(200).send(_data17));

                        case 57:
                            _userId2 = _userActivity.userId;
                            _context13.next = 60;
                            return userModel.findOne({ _id: _userId2 }, { name: 1, sex: 1, tel: 1, IDNo: 1 }, function (err) {
                                if (err) {
                                    var _data18 = {};
                                    _data18.result = "01";
                                    _data18.name = "操作失败";
                                    return res.status(200).send(_data18);
                                }
                            });

                        case 60:
                            _user = _context13.sent;
                            _data13 = {};

                            _data13.userActivity = _userActivity;
                            _data13.user = _user;
                            return _context13.abrupt('return', res.status(200).send(_data13));

                        case 67:
                            if (!(userId != null && userId != "")) {
                                _context13.next = 97;
                                break;
                            }

                            _context13.next = 70;
                            return userActivityModel.findOne({ userId: req.query.userId, activity_id: activity_id }, { projects: 1, salesman: 1, userId: 1, activity_id: 1, sampled: 1, checked: 1 }, function (err) {
                                if (err) {
                                    var _data20 = {};
                                    _data20.result = "01";
                                    _data20.name = "操作失败";
                                    return res.status(200).send(_data20);
                                }
                            });

                        case 70:
                            _userActivity2 = _context13.sent;

                            console.log("userActivity1", _userActivity2);

                            if (!(_userActivity2 == null)) {
                                _context13.next = 79;
                                break;
                            }

                            _data21 = {};

                            _data21.result = "02";
                            _data21.name = "用户不存在";
                            return _context13.abrupt('return', res.status(200).send(_data21));

                        case 79:
                            if (!(_userActivity2.checked == false)) {
                                _context13.next = 84;
                                break;
                            }

                            _data22 = {};

                            _data22.result = "03";
                            _data22.name = "用户还未通过审核,请联系业务员审核";
                            return _context13.abrupt('return', res.status(200).send(_data22));

                        case 84:
                            if (!(_userActivity2.sampled == true)) {
                                _context13.next = 89;
                                break;
                            }

                            _data23 = {};

                            _data23.result = "02";
                            _data23.name = "用户已采样完成";
                            return _context13.abrupt('return', res.status(200).send(_data23));

                        case 89:
                            _userId3 = _userActivity2.userId;
                            _context13.next = 92;
                            return userModel.findOne({ _id: _userId3 }, { name: 1, sex: 1, tel: 1, IDNo: 1 }, function (err) {
                                if (err) {
                                    var _data24 = {};
                                    _data24.result = "01";
                                    _data24.name = "操作失败";
                                    return res.status(200).send(_data24);
                                }
                            });

                        case 92:
                            _user2 = _context13.sent;
                            _data19 = {};

                            _data19.userActivity = _userActivity2;
                            _data19.user = _user2;
                            return _context13.abrupt('return', res.status(200).send(_data19));

                        case 97:
                        case 'end':
                            return _context13.stop();
                    }
                }
            }, _callee13, this);
        }));

        return function (_x37, _x38, _x39) {
            return _ref13.apply(this, arguments);
        };
    }());

    app.get('/wechat/nurse/getUserbyName', function () {
        var _ref14 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee14(req, res, next) {
            var name, activity_id, userActivity, data;
            return _regenerator2.default.wrap(function _callee14$(_context14) {
                while (1) {
                    switch (_context14.prev = _context14.next) {
                        case 0:
                            name = req.query.name;
                            activity_id = req.query.activity_id;

                            if (!(name != null && name != "")) {
                                _context14.next = 14;
                                break;
                            }

                            _context14.next = 5;
                            return userActivityModel.find({ name: { $regex: name }, activity_id: activity_id }, { name: 1, IDNo: 1, userId: 1 }, function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    return res.status(200).send(data);
                                }
                            });

                        case 5:
                            userActivity = _context14.sent;

                            if (!(userActivity.length == 0)) {
                                _context14.next = 13;
                                break;
                            }

                            data = {};

                            data.result = "02";
                            data.name = "用户不存在";
                            return _context14.abrupt('return', res.status(200).send(data));

                        case 13:
                            return _context14.abrupt('return', res.status(200).send(userActivity));

                        case 14:
                        case 'end':
                            return _context14.stop();
                    }
                }
            }, _callee14, this);
        }));

        return function (_x40, _x41, _x42) {
            return _ref14.apply(this, arguments);
        };
    }());

    app.post('/wechat/nurse/sampling/sampling', function () {
        var _ref15 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee17(req, res, next) {
            var nurseId, userId, activity_id, barcode, isUserChg, isProjectChg, userInfo, nurse, nurse0, count, data;
            return _regenerator2.default.wrap(function _callee17$(_context17) {
                while (1) {
                    switch (_context17.prev = _context17.next) {
                        case 0:
                            nurseId = req.cookies.userId;
                            userId = req.body.userId;
                            activity_id = req.body.activity_id;
                            barcode = req.body.barcode;
                            isUserChg = req.body.isUserChg;
                            isProjectChg = req.body.isProjectChg;
                            userInfo = req.body.userInfo;

                            if (!(isUserChg == true)) {
                                _context17.next = 10;
                                break;
                            }

                            _context17.next = 10;
                            return userModel.update({ _id: userId }, { $set: { name: userInfo.userName, sex: userInfo.sex, tel: userInfo.tel, IDNo: userInfo.IDNo } }, function () {
                                var _ref16 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee15(err) {
                                    var data;
                                    return _regenerator2.default.wrap(function _callee15$(_context15) {
                                        while (1) {
                                            switch (_context15.prev = _context15.next) {
                                                case 0:
                                                    if (!err) {
                                                        _context15.next = 5;
                                                        break;
                                                    }

                                                    data = {};

                                                    data.result = "01";
                                                    data.name = "操作失败";
                                                    return _context15.abrupt('return', res.status(200).send(data));

                                                case 5:
                                                case 'end':
                                                    return _context15.stop();
                                            }
                                        }
                                    }, _callee15, this);
                                }));

                                return function (_x46) {
                                    return _ref16.apply(this, arguments);
                                };
                            }());

                        case 10:
                            _context17.next = 12;
                            return nurseModel.findOne({ _id: nurseId }, { _id: 1, realName: 1 }, function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    return res.status(200).send(data);
                                }
                            });

                        case 12:
                            nurse = _context17.sent;
                            nurse0 = {};

                            nurse0.id = nurse._id;
                            nurse0.name = nurse.realName;

                            _context17.next = 18;
                            return userActivityModel.findOne({ barcode: barcode }, { _id: 1 }, function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    return res.status(200).send(data);
                                }
                            });

                        case 18:
                            count = _context17.sent;

                            if (!(count != null)) {
                                _context17.next = 24;
                                break;
                            }

                            data = {};

                            data.result = "05";
                            data.name = "该条码已经使用，条码不能重复，请重新录入条码";
                            return _context17.abrupt('return', res.status(200).send(data));

                        case 24:
                            _context17.next = 26;
                            return userActivityModel.update({ userId: userId, activity_id: activity_id }, { $set: { projects: userInfo.projects, barcode: barcode, nurse: nurse0, sampled: true } }, function () {
                                var _ref17 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee16(err) {
                                    var _data25;

                                    return _regenerator2.default.wrap(function _callee16$(_context16) {
                                        while (1) {
                                            switch (_context16.prev = _context16.next) {
                                                case 0:
                                                    if (!err) {
                                                        _context16.next = 7;
                                                        break;
                                                    }

                                                    _data25 = {};

                                                    _data25.result = "01";
                                                    _data25.name = "操作失败";
                                                    return _context16.abrupt('return', res.status(200).send(_data25));

                                                case 7:
                                                    activityModel.update({ _id: activity_id }, { $inc: { sampling_number: 1 } }, function (error) {
                                                        if (error) {
                                                            var _data26 = {};
                                                            _data26.result = "01";
                                                            _data26.name = "操作失败";
                                                            return res.status(200).send(_data26);
                                                        } else {
                                                            var _data27 = {};
                                                            _data27.result = "00";
                                                            _data27.name = "操作成功";
                                                            return res.status(200).send(_data27);
                                                        }
                                                    });

                                                case 8:
                                                case 'end':
                                                    return _context16.stop();
                                            }
                                        }
                                    }, _callee16, this);
                                }));

                                return function (_x47) {
                                    return _ref17.apply(this, arguments);
                                };
                            }());

                        case 26:
                        case 'end':
                            return _context17.stop();
                    }
                }
            }, _callee17, this);
        }));

        return function (_x43, _x44, _x45) {
            return _ref15.apply(this, arguments);
        };
    }());
    app.post('/wechat/nurse/sampling/sampling2', function () {
        var _ref18 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee19(req, res, next) {
            var nurseId, userId, activity_id, barcode, nurse, nurse0, count, data;
            return _regenerator2.default.wrap(function _callee19$(_context19) {
                while (1) {
                    switch (_context19.prev = _context19.next) {
                        case 0:
                            nurseId = req.cookies.userId;
                            userId = req.body.userId;
                            activity_id = req.body.activity_id;
                            barcode = req.body.barcode;
                            _context19.next = 6;
                            return nurseModel.findOne({ _id: nurseId }, { _id: 1, realName: 1 }, function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    return res.status(200).send(data);
                                }
                            });

                        case 6:
                            nurse = _context19.sent;
                            nurse0 = {};

                            nurse0.id = nurse._id;
                            nurse0.name = nurse.realName;

                            _context19.next = 12;
                            return userActivityModel.findOne({ barcode: barcode }, { _id: 1 }, function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    return res.status(200).send(data);
                                }
                            });

                        case 12:
                            count = _context19.sent;

                            if (!(count != null)) {
                                _context19.next = 18;
                                break;
                            }

                            data = {};

                            data.result = "05";
                            data.name = "该条码已经使用，条码不能重复，请重新录入条码";
                            return _context19.abrupt('return', res.status(200).send(data));

                        case 18:
                            _context19.next = 20;
                            return userActivityModel.update({ userId: userId, activity_id: activity_id }, { $set: { barcode: barcode, nurse: nurse0, sampled: true } }, function () {
                                var _ref19 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee18(err) {
                                    var _data28;

                                    return _regenerator2.default.wrap(function _callee18$(_context18) {
                                        while (1) {
                                            switch (_context18.prev = _context18.next) {
                                                case 0:
                                                    if (!err) {
                                                        _context18.next = 7;
                                                        break;
                                                    }

                                                    _data28 = {};

                                                    _data28.result = "01";
                                                    _data28.name = "操作失败";
                                                    return _context18.abrupt('return', res.status(200).send(_data28));

                                                case 7:
                                                    activityModel.update({ _id: activity_id }, { $inc: { sampling_number: 1 } }, function (error) {
                                                        if (error) {
                                                            var _data29 = {};
                                                            _data29.result = "01";
                                                            _data29.name = "操作失败";
                                                            return res.status(200).send(_data29);
                                                        } else {
                                                            var _data30 = {};
                                                            _data30.result = "00";
                                                            _data30.name = "操作成功";
                                                            return res.status(200).send(_data30);
                                                        }
                                                    });

                                                case 8:
                                                case 'end':
                                                    return _context18.stop();
                                            }
                                        }
                                    }, _callee18, this);
                                }));

                                return function (_x51) {
                                    return _ref19.apply(this, arguments);
                                };
                            }());

                        case 20:
                        case 'end':
                            return _context19.stop();
                    }
                }
            }, _callee19, this);
        }));

        return function (_x48, _x49, _x50) {
            return _ref18.apply(this, arguments);
        };
    }());

    app.post('/wechat/nurse/sampling/modify', function () {
        var _ref20 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee20(req, res, next) {
            var param;
            return _regenerator2.default.wrap(function _callee20$(_context20) {
                while (1) {
                    switch (_context20.prev = _context20.next) {
                        case 0:
                            param = req.body;
                            _context20.next = 3;
                            return userModel.update({
                                _id: param._id
                            }, {
                                $set: {
                                    name: param.name,
                                    sex: param.sex,
                                    IDNo: param.IDNo,
                                    tel: param.tel
                                }
                            }, function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    return res.status(200).send(data);
                                } else {
                                    var _data31 = {};
                                    _data31.result = "02";
                                    _data31.name = "操作成功";
                                    return res.status(200).send(_data31);
                                }
                            });

                        case 3:
                        case 'end':
                            return _context20.stop();
                    }
                }
            }, _callee20, this);
        }));

        return function (_x52, _x53, _x54) {
            return _ref20.apply(this, arguments);
        };
    }());

    app.get('/wechat/nurse/recordeinfo/recordeinfo2', function () {
        var _ref21 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee21(req, res, next) {
            var activity_id, userActivity, users, i, data, userId, user;
            return _regenerator2.default.wrap(function _callee21$(_context21) {
                while (1) {
                    switch (_context21.prev = _context21.next) {
                        case 0:
                            activity_id = req.query.activity_id;
                            _context21.next = 3;
                            return userActivityModel.find({ activity_id: activity_id, sampled: true }, { test_number: 1, salesman: 1, barcode: 1, userId: 1 }, function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    return res.status(200).send(data);
                                }
                            });

                        case 3:
                            userActivity = _context21.sent;
                            users = [];
                            i = 0;

                        case 6:
                            if (!(i < userActivity.length)) {
                                _context21.next = 21;
                                break;
                            }

                            data = {};

                            data.test_number = userActivity[i].test_number;
                            data.salesman_name = userActivity[i].salesman.name;
                            data.barcode = userActivity[i].barcode;
                            userId = userActivity[i].userId;
                            _context21.next = 14;
                            return userModel.findOne({ _id: userId }, { name: 1, sex: 1 }, function (err) {
                                if (err) {
                                    var _data32 = {};
                                    _data32.result = "01";
                                    _data32.name = "操作失败";
                                    return res.status(200).send(_data32);
                                }
                            });

                        case 14:
                            user = _context21.sent;

                            data.userName = user.name;
                            data.sex = user.sex;
                            users.push(data);

                        case 18:
                            i++;
                            _context21.next = 6;
                            break;

                        case 21:
                            return _context21.abrupt('return', res.status(200).send(users));

                        case 22:
                        case 'end':
                            return _context21.stop();
                    }
                }
            }, _callee21, this);
        }));

        return function (_x55, _x56, _x57) {
            return _ref21.apply(this, arguments);
        };
    }());

    app.get('/wechat/nurse/recordeinfo/recordeinfo3', function () {
        var _ref22 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee22(req, res, next) {
            var activity_id, userActivity, users, i, data, userId, user;
            return _regenerator2.default.wrap(function _callee22$(_context22) {
                while (1) {
                    switch (_context22.prev = _context22.next) {
                        case 0:
                            activity_id = req.query.activity_id;
                            _context22.next = 3;
                            return userActivityModel.find({ activity_id: activity_id, sampled: false }, { test_number: 1, salesman: 1, barcode: 1, userId: 1 }, function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    return res.status(200).send(data);
                                }
                            });

                        case 3:
                            userActivity = _context22.sent;
                            users = [];
                            i = 0;

                        case 6:
                            if (!(i < userActivity.length)) {
                                _context22.next = 21;
                                break;
                            }

                            data = {};

                            data.test_number = userActivity[i].test_number;
                            data.salesman_name = userActivity[i].salesman.name;
                            data.barcode = userActivity[i].barcode;
                            userId = userActivity[i].userId;
                            _context22.next = 14;
                            return userModel.findOne({ _id: userId }, { name: 1, sex: 1 }, function (err) {
                                if (err) {
                                    var _data33 = {};
                                    _data33.result = "01";
                                    _data33.name = "操作失败";
                                    return res.status(200).send(_data33);
                                }
                            });

                        case 14:
                            user = _context22.sent;

                            data.userName = user.name;
                            data.sex = user.sex;
                            users.push(data);

                        case 18:
                            i++;
                            _context22.next = 6;
                            break;

                        case 21:
                            return _context22.abrupt('return', res.status(200).send(users));

                        case 22:
                        case 'end':
                            return _context22.stop();
                    }
                }
            }, _callee22, this);
        }));

        return function (_x58, _x59, _x60) {
            return _ref22.apply(this, arguments);
        };
    }());

    app.get('/wechat/nurse/recordeinfo/recordeinfo', function () {
        var _ref23 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee23(req, res, next) {
            var activity_id, userActivity, users, _i, _data35, userId, user, count_total, count_sampled, _data37, data, i, j, activity, pro, k, len, q, dataall;

            return _regenerator2.default.wrap(function _callee23$(_context23) {
                while (1) {
                    switch (_context23.prev = _context23.next) {
                        case 0:
                            activity_id = req.query.activity_id;
                            _context23.next = 3;
                            return userActivityModel.find({ activity_id: activity_id, sampled: true }, { test_number: 1, salesman: 1, barcode: 1, userId: 1 }, function (err) {
                                if (err) {
                                    var _data34 = {};
                                    _data34.result = "01";
                                    _data34.name = "操作失败";
                                    return res.status(200).send(_data34);
                                }
                            });

                        case 3:
                            userActivity = _context23.sent;
                            users = [];
                            _i = 0;

                        case 6:
                            if (!(_i < userActivity.length)) {
                                _context23.next = 21;
                                break;
                            }

                            _data35 = {};

                            _data35.test_number = userActivity[_i].test_number;
                            _data35.salesman_name = userActivity[_i].salesman.name;
                            _data35.barcode = userActivity[_i].barcode;
                            userId = userActivity[_i].userId;
                            _context23.next = 14;
                            return userModel.findOne({ _id: userId }, { name: 1, sex: 1 }, function (err) {
                                if (err) {
                                    var _data36 = {};
                                    _data36.result = "01";
                                    _data36.name = "操作失败";
                                    return res.status(200).send(_data36);
                                }
                            });

                        case 14:
                            user = _context23.sent;

                            _data35.userName = user.name;
                            _data35.sex = user.sex;
                            users.push(_data35);

                        case 18:
                            _i++;
                            _context23.next = 6;
                            break;

                        case 21:
                            _context23.next = 23;
                            return userActivityModel.aggregate([{ $match: { activity_id: activity_id } }, { $group: { _id: { 'projects': '$projects' }, count: { $sum: 1 } } }]);

                        case 23:
                            count_total = _context23.sent;

                            console.log("count_total", count_total);
                            _context23.next = 27;
                            return userActivityModel.aggregate([{ $match: { activity_id: activity_id, sampled: true } }, { $group: { _id: { 'projects': '$projects' }, count: { $sum: 1 } } }]);

                        case 27:
                            count_sampled = _context23.sent;

                            console.log("count_sampled", count_sampled);

                            if (!(count_total.length == 0)) {
                                _context23.next = 32;
                                break;
                            }

                            _data37 = {};
                            return _context23.abrupt('return', res.status(200).send(_data37));

                        case 32:
                            console.log("idd", count_total[0]._id);
                            console.log("projects", count_total[0]._id.projects);
                            data = new Array();
                            i = void 0, j = void 0;
                            i = 0;

                        case 37:
                            if (!(i < count_total.length)) {
                                _context23.next = 68;
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

                        case 44:
                            if (!(j < count_sampled.length)) {
                                _context23.next = 62;
                                break;
                            }

                            if (!(count_sampled[j]._id.projects.length == count_total[i]._id.projects.length)) {
                                _context23.next = 59;
                                break;
                            }

                            len = count_sampled[j]._id.projects.length;
                            q = void 0;
                            q = 0;

                        case 49:
                            if (!(q < len)) {
                                _context23.next = 55;
                                break;
                            }

                            if (!(count_sampled[j]._id.projects[q] != count_total[i]._id.projects[q])) {
                                _context23.next = 52;
                                break;
                            }

                            return _context23.abrupt('break', 55);

                        case 52:
                            q++;
                            _context23.next = 49;
                            break;

                        case 55:
                            if (!(q == len)) {
                                _context23.next = 59;
                                break;
                            }

                            activity.sampled_number = count_sampled[j].count;;
                            return _context23.abrupt('break', 62);

                        case 59:
                            j++;
                            _context23.next = 44;
                            break;

                        case 62:
                            if (j == count_sampled.length) activity.sampled_number = 0;

                            activity.nosample_number = activity.total_number - activity.sampled_number;

                            data.push(activity);

                        case 65:
                            i++;
                            _context23.next = 37;
                            break;

                        case 68:
                            dataall = {};

                            dataall.users = users;
                            dataall.data = data;
                            return _context23.abrupt('return', res.status(200).send(dataall));

                        case 72:
                        case 'end':
                            return _context23.stop();
                    }
                }
            }, _callee23, this);
        }));

        return function (_x61, _x62, _x63) {
            return _ref23.apply(this, arguments);
        };
    }());


    var storage3 = multer.diskStorage({
        destination: function destination(req, file, cb) {
            console.log("dirWork0", dirWorkPhoto0);
            cb(null, dirWorkPhoto);
        },

        filename: function filename(req, file, cb) {
            var fileFormat = file.originalname.split(".");
            cb(null, file.originalname);
        }
    });

    var upload3 = multer({ storage: storage3
    });

    app.post('/wechat/nurse/uploadworkphoto', upload3.single('file'), function (req, res, next) {

        console.log("uploadworkphoto");
        console.log(req.file);

        res.status(200).send("ok");
    });

    var storage2 = multer.diskStorage({
        destination: function destination(req, file, cb) {
            cb(null, dirPhoto0);

            console.log("photo0", dirPhoto0);
        },

        filename: function filename(req, file, cb) {
            var fileFormat = file.originalname.split(".");
            console.log(file.originalname);
            cb(null, file.originalname);
        }
    });

    var upload2 = multer({ storage: storage2 });

    app.post('/wechat/nurse/uploadphoto', upload2.single('personal_photo'), function (req, res, next) {

        console.log("uploadphoto");

        console.log(req.file);

        res.status(200).send("ok");
    });

    var storage = multer.diskStorage({
        destination: function destination(req, file, cb) {
            cb(null, dirDelivery0);
        },

        filename: function filename(req, file, cb) {
            var fileFormat = file.originalname.split(".");

            cb(null, file.originalname);
        }
    });

    var upload = multer({ storage: storage
    });

    app.post('/wechat/nurse/recordeinfo/uploadDelivery', upload.single('file'), function (req, res, next) {

        var activity_time = req.body.activity_time;

        console.log(req.file);
        var dirName = new Date(activity_time).getFullYear() + '-' + (new Date(activity_time).getMonth() + 1) + '-' + new Date(activity_time).getDate() + '/';
        fs.exists(dirDelivery + dirName, function (exists) {
            if (exists) {
                console.log("目录已存在");
                fs.rename(dirDelivery + req.file.filename, dirDelivery + dirName + req.file.filename, function (err) {
                    if (err) {
                        throw err;
                    }
                    console.log('done!');
                });
            } else {
                fs.mkdir(dirDelivery + dirName, function (err) {
                    if (err) {
                        throw err;
                    }
                    fs.rename(dirDelivery + req.file.filename, dirDelivery + dirName + req.file.filename, function (err) {
                        if (err) {
                            throw err;
                        }
                        console.log('done!');
                    });
                });
            }
        });

        res.status(200).send("ok");
    });

    app.post('/wechat/nurse/recordeinfo/deliverInfo', function () {
        var _ref24 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee24(req, res, next) {
            var params, activity_time, dirName;
            return _regenerator2.default.wrap(function _callee24$(_context24) {
                while (1) {
                    switch (_context24.prev = _context24.next) {
                        case 0:
                            params = req.body;
                            activity_time = params.activity_time;
                            dirName = new Date(activity_time).getFullYear() + '-' + (new Date(activity_time).getMonth() + 1) + '-' + new Date(activity_time).getDate() + '/';

                            console.log("dirName", dirName);
                            console.log("filepath", dirDelivery + dirName);
                            _context24.next = 7;
                            return activityModel.update({
                                _id: params.activity_id
                            }, {
                                $set: {
                                    delivery_id: params.delivery_id,
                                    delivery_file_path: dirDelivery + dirName,
                                    sample_status: 1
                                }
                            }, function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    return res.status(200).send(data);
                                } else {
                                    var _data38 = {};
                                    _data38.result = "00";
                                    _data38.name = "操作成功";
                                    return res.status(200).send(_data38);
                                }
                            });

                        case 7:
                        case 'end':
                            return _context24.stop();
                    }
                }
            }, _callee24, this);
        }));

        return function (_x64, _x65, _x66) {
            return _ref24.apply(this, arguments);
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