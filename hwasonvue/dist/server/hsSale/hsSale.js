'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _organizations = require('../util/schema/organizations');

var _organizations2 = _interopRequireDefault(_organizations);

var _provinces = require('../util/schema/provinces');

var _provinces2 = _interopRequireDefault(_provinces);

var _industry = require('../util/schema/industry');

var _industry2 = _interopRequireDefault(_industry);

var _projects = require('../util/schema/projects');

var _projects2 = _interopRequireDefault(_projects);

var _hwason = require('../util/schema/hwason');

var _hwason2 = _interopRequireDefault(_hwason);

var _login = require('../util/schema/login');

var _login2 = _interopRequireDefault(_login);

var _activities = require('../util/schema/activities');

var _activities2 = _interopRequireDefault(_activities);

var _salesman = require('../util/schema/salesman');

var _salesman2 = _interopRequireDefault(_salesman);

var _orgClass = require('../util/schema/orgClass');

var _orgClass2 = _interopRequireDefault(_orgClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (app) {
    app.get('/salesman/getProvinces', function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
            var provinces;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return _provinces2.default.find({ level: 1 }, { name: 1, sheng: 1 }, function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    res.status(200).send(data);
                                }
                            });

                        case 2:
                            provinces = _context.sent;

                            res.status(200).send(provinces);

                        case 4:
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

    app.get('/salesman/getCities', function () {
        var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
            var sheng, provinces;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            sheng = req.query.sheng;
                            _context2.next = 3;
                            return _provinces2.default.find({ sheng: sheng, level: 2 }, { name: 1, di: 1 }, function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    res.status(200).send(data);
                                }
                            });

                        case 3:
                            provinces = _context2.sent;

                            res.status(200).send(provinces);

                        case 5:
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

    app.get('/salesman/getArea', function () {
        var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res, next) {
            var sheng, di, provinces;
            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            sheng = req.query.sheng;
                            di = req.query.di;
                            _context3.next = 4;
                            return _provinces2.default.find({ sheng: sheng, di: di, level: 3 }, { name: 1, code: 1 }, function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    res.status(200).send(data);
                                }
                            });

                        case 4:
                            provinces = _context3.sent;

                            res.status(200).send(provinces);

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

    app.get('/salesman/getIndustry', function () {
        var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(req, res, next) {
            var industry;
            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _context4.next = 2;
                            return _industry2.default.find({}, function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    res.status(200).send(data);
                                }
                            });

                        case 2:
                            industry = _context4.sent;

                            res.status(200).send(industry);

                        case 4:
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

    app.get('/salesman/showOrgClass', function () {
        var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(req, res, next) {
            var industry_id, result;
            return _regenerator2.default.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            industry_id = req.query.industry_id;
                            _context5.next = 3;
                            return _orgClass2.default.find({ industry_id: industry_id }, { code: 1, name: 1 }, function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    res.status(200).send(data);
                                }
                            });

                        case 3:
                            result = _context5.sent;

                            res.status(200).send(result);

                        case 5:
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

    app.post('/salesman/addOrg', function () {
        var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(req, res, next) {
            var params, selesman_id, result, contactsalesman, num, getCode, code, organizationEntity;
            return _regenerator2.default.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            getCode = function getCode(num, region_code, industry_code) {
                                var len = (num + 1).toString().length;
                                switch (len) {
                                    case 1:
                                        return region_code + industry_code + "00" + (num + 1).toString();
                                        break;
                                    case 2:
                                        return region_code + industry_code + "0" + (num + 1).toString();
                                        break;
                                    case 3:
                                        return region_code + industry_code + (num + 1).toString();
                                        break;
                                    default:
                                        return "";
                                }
                            };

                            params = req.body.params;
                            selesman_id = req.cookies.userId;
                            _context6.next = 5;
                            return _hwason2.default.findOne({ _id: selesman_id }, { _id: 1, realName: 1, area: area });

                        case 5:
                            result = _context6.sent;
                            contactsalesman = {};

                            contactsalesman.selesman_id = result._id;
                            contactsalesman.salesman_name = result.realName;
                            _context6.next = 11;
                            return _organizations2.default.count({ code: /params.code/ }, function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    res.status(200).send(data);
                                }
                            });

                        case 11:
                            num = _context6.sent;
                            code = getCode(num, params.region_code, params.industry_code);
                            organizationEntity = new _organizations2.default({
                                name: params.name,
                                code: code,
                                area: result.area,
                                industry: { industry_id: params.industry_id, name: params.industry_name },
                                create_time: new Date(),
                                contactsalesman: contactsalesman,
                                region: params.region,
                                address: params.address,
                                director_name: params.director_name,
                                director_tel: params.director_tel,
                                notice_status: 0,
                                checked: false
                            });
                            _context6.next = 16;
                            return organizationEntity.save(function (err, content) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    res.status(200).send(data);
                                } else {
                                    var _data = {};
                                    _data.result = "02";
                                    _data.name = "操作成功";
                                    _data._id = content._id;
                                    res.status(200).send(_data);
                                }
                            });

                        case 16:
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

    app.post('/salesman/modifyOrg', function () {
        var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(req, res, next) {
            var params;
            return _regenerator2.default.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            params = req.body.params;
                            _context7.next = 3;
                            return _organizations2.default.update({ _id: params._id }, {
                                $set: {
                                    receiver_name: params.receiver_name,
                                    receiver_tel: params.receiver_tel,
                                    projects: params.projects
                                }
                            }, function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    res.status(200).send(data);
                                } else {
                                    var _data2 = {};
                                    _data2.result = "02";
                                    _data2.name = "操作成功";
                                    res.status(200).send(_data2);
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

    app.get('/salesman/getProjects', function () {
        var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(req, res, next) {
            var projects;
            return _regenerator2.default.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                        case 0:
                            projects = _projects2.default.find({}, function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    res.status(200).send(data);
                                }
                            });

                            res.status(200).send(projects);

                        case 2:
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

    app.get('/salesman/queryStep1', function () {
        var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9(req, res, next) {
            var _id, data;

            return _regenerator2.default.wrap(function _callee9$(_context9) {
                while (1) {
                    switch (_context9.prev = _context9.next) {
                        case 0:
                            _id = req.query._id;
                            _context9.next = 3;
                            return _organizations2.default.findOne({ _id: _id }, {
                                region: 1,
                                name: 1,
                                industry: 1,
                                address: 1,
                                director_name: 1,
                                director_tel: 1,
                                receiver_name: 1,
                                receiver_tel: 1,
                                financial_name: 1,
                                financial_tel: 1
                            }, function (err) {
                                if (err) {
                                    var _data3 = {};
                                    _data3.result = "01";
                                    _data3.name = "操作失败";
                                    res.status(200).send(_data3);
                                }
                            });

                        case 3:
                            data = _context9.sent;

                            res.status(200).send(data);

                        case 5:
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

    app.get('/salesman/queryOrg', function () {
        var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10(req, res, next) {
            var salesman_id, result;
            return _regenerator2.default.wrap(function _callee10$(_context10) {
                while (1) {
                    switch (_context10.prev = _context10.next) {
                        case 0:
                            salesman_id = req.cookies.userId;
                            _context10.next = 3;
                            return _organizations2.default.find({ "contactsalesman.salesman_id": salesman_id }, { code: 1, name: 1, create_time: 1, "projects.project": 1 }, function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    res.status(200).send(data);
                                }
                            });

                        case 3:
                            result = _context10.sent;

                            res.status(200).send(result);

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

    app.get('/salesman/orgDetail', function () {
        var _ref11 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee11(req, res, next) {
            var _id, org, data, projects, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, project, manager_id, login, date, end, activities;

            return _regenerator2.default.wrap(function _callee11$(_context11) {
                while (1) {
                    switch (_context11.prev = _context11.next) {
                        case 0:
                            _id = req.query._id;
                            _context11.next = 3;
                            return _organizations2.default.findOne({ _id: _id }, {
                                name: 1,
                                region: 1,
                                address: 1,
                                code: 1,
                                manager_id: 1,
                                director_name: 1,
                                director_tel: 1,
                                receiver_name: 1,
                                receiver_tel: 1,
                                financial_name: 1,
                                financial_tel: 1,
                                projects: 1
                            }, function (err) {
                                if (err) {
                                    var _data4 = {};
                                    _data4.result = "01";
                                    _data4.name = "操作失败";
                                    res.status(200).send(_data4);
                                }
                            });

                        case 3:
                            org = _context11.sent;
                            data = {};

                            data.region = org.region;
                            data.address = org.address;
                            data.code = org.code;
                            data.director_name = org.director_name;
                            data.director_tel = org.director_tel;
                            data.receiver_name = org.receiver_name;
                            data.receiver_tel = org.receiver_tel;
                            data.financial_name = org.financial_name;
                            data.financial_tel = org.financial_tel;
                            projects = [];
                            _iteratorNormalCompletion = true;
                            _didIteratorError = false;
                            _iteratorError = undefined;
                            _context11.prev = 18;

                            for (_iterator = (0, _getIterator3.default)(org.projects); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                project = _step.value;

                                projects.push(project.project);
                            }
                            _context11.next = 26;
                            break;

                        case 22:
                            _context11.prev = 22;
                            _context11.t0 = _context11['catch'](18);
                            _didIteratorError = true;
                            _iteratorError = _context11.t0;

                        case 26:
                            _context11.prev = 26;
                            _context11.prev = 27;

                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }

                        case 29:
                            _context11.prev = 29;

                            if (!_didIteratorError) {
                                _context11.next = 32;
                                break;
                            }

                            throw _iteratorError;

                        case 32:
                            return _context11.finish(29);

                        case 33:
                            return _context11.finish(26);

                        case 34:
                            data.projects = projects;
                            manager_id = org.manager_id;
                            _context11.next = 38;
                            return _login2.default.findOne({ _id: manager_id }, { userName: 1, password: 1 }, function (err) {
                                if (err) {
                                    var _data5 = {};
                                    _data5.result = "01";
                                    _data5.name = "操作失败";
                                    res.status(200).send(_data5);
                                }
                            });

                        case 38:
                            login = _context11.sent;

                            data.userName = login.userName;
                            data.password = login.password;
                            date = new Date();
                            end = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                            _context11.next = 45;
                            return _activities2.default.find({ organization_id: _id, activity_time: { $lt: end } }, { address: 1, activity_time: 1, sampling_number: 1 }, function (err) {
                                if (err) {
                                    var _data6 = {};
                                    _data6.result = "01";
                                    _data6.name = "操作失败";
                                    res.status(200).send(_data6);
                                }
                            });

                        case 45:
                            activities = _context11.sent;

                            data.activities = activities;
                            res.status(200).send(data);

                        case 48:
                        case 'end':
                            return _context11.stop();
                    }
                }
            }, _callee11, this, [[18, 22, 26, 34], [27,, 29, 33]]);
        }));

        return function (_x31, _x32, _x33) {
            return _ref11.apply(this, arguments);
        };
    }());

    app.get('/salesman/getOrgSalesman', function () {
        var _ref12 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee12(req, res, next) {
            var organization_id, salesmen, data, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, login;

            return _regenerator2.default.wrap(function _callee12$(_context12) {
                while (1) {
                    switch (_context12.prev = _context12.next) {
                        case 0:
                            organization_id = req.query.organization_id;
                            _context12.next = 3;
                            return _salesman2.default.find({ organization_id: organization_id }, { _id: 1 }, function (err) {
                                if (err) {
                                    var _data7 = {};
                                    _data7.result = "01";
                                    _data7.name = "操作失败";
                                    res.status(200).send(_data7);
                                }
                            });

                        case 3:
                            salesmen = _context12.sent;
                            data = [];
                            _iteratorNormalCompletion2 = true;
                            _didIteratorError2 = false;
                            _iteratorError2 = undefined;
                            _context12.prev = 8;
                            _iterator2 = (0, _getIterator3.default)(salesmen);

                        case 10:
                            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                                _context12.next = 19;
                                break;
                            }

                            salesman = _step2.value;
                            _context12.next = 14;
                            return _login2.default.findOne({ _id: saleman._id }, {
                                userName: 1,
                                password: 1,
                                tel: 1,
                                realName: 1
                            });

                        case 14:
                            login = _context12.sent;

                            data.push(login);

                        case 16:
                            _iteratorNormalCompletion2 = true;
                            _context12.next = 10;
                            break;

                        case 19:
                            _context12.next = 25;
                            break;

                        case 21:
                            _context12.prev = 21;
                            _context12.t0 = _context12['catch'](8);
                            _didIteratorError2 = true;
                            _iteratorError2 = _context12.t0;

                        case 25:
                            _context12.prev = 25;
                            _context12.prev = 26;

                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }

                        case 28:
                            _context12.prev = 28;

                            if (!_didIteratorError2) {
                                _context12.next = 31;
                                break;
                            }

                            throw _iteratorError2;

                        case 31:
                            return _context12.finish(28);

                        case 32:
                            return _context12.finish(25);

                        case 33:
                            res.status(200).send(data);

                        case 34:
                        case 'end':
                            return _context12.stop();
                    }
                }
            }, _callee12, this, [[8, 21, 25, 33], [26,, 28, 32]]);
        }));

        return function (_x34, _x35, _x36) {
            return _ref12.apply(this, arguments);
        };
    }());

    app.get('salesman/showActivities', function () {
        var _ref13 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee13(req, res, next) {
            var salesman_id, begin, organizations, data, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, result, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, activity;

            return _regenerator2.default.wrap(function _callee13$(_context13) {
                while (1) {
                    switch (_context13.prev = _context13.next) {
                        case 0:
                            salesman_id = req.cookies.userId;
                            begin = new Date();
                            _context13.next = 4;
                            return _organizations2.default.find({ "salesman.salesman_id": salesman_id }, { _id: 1, name: 1 }, function (err) {
                                if (err) {
                                    var _data8 = {};
                                    _data8.result = "01";
                                    _data8.name = "操作失败";
                                    res.status(200).send(_data8);
                                }
                            });

                        case 4:
                            organizations = _context13.sent;
                            data = [];
                            _iteratorNormalCompletion3 = true;
                            _didIteratorError3 = false;
                            _iteratorError3 = undefined;
                            _context13.prev = 9;
                            _iterator3 = (0, _getIterator3.default)(organizations);

                        case 11:
                            if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                                _context13.next = 36;
                                break;
                            }

                            organization = _step3.value;
                            result = _activities2.default.find({ organization_id: organization._id, activity_time: { $gt: begin } }, { _id: 1, activity_time: 1, projects: 1, address: 1, estimated_number: 1 }, function (err) {
                                if (err) {
                                    var _data9 = {};
                                    _data9.result = "01";
                                    _data9.name = "操作失败";
                                    res.status(200).send(_data9);
                                }
                            });
                            _iteratorNormalCompletion4 = true;
                            _didIteratorError4 = false;
                            _iteratorError4 = undefined;
                            _context13.prev = 17;

                            for (_iterator4 = (0, _getIterator3.default)(result); !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                activities = _step4.value;
                                activity = {};

                                activity.name = organization.name;
                                activity._id = activities._id;
                                activity.activity_time = activities.activity_time;
                                activity.projects = activities.projects;
                                activity.address = activities.address;
                                activity.estimated_number = activities.estimated_number;
                                data.push(activity);
                            }
                            _context13.next = 25;
                            break;

                        case 21:
                            _context13.prev = 21;
                            _context13.t0 = _context13['catch'](17);
                            _didIteratorError4 = true;
                            _iteratorError4 = _context13.t0;

                        case 25:
                            _context13.prev = 25;
                            _context13.prev = 26;

                            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                _iterator4.return();
                            }

                        case 28:
                            _context13.prev = 28;

                            if (!_didIteratorError4) {
                                _context13.next = 31;
                                break;
                            }

                            throw _iteratorError4;

                        case 31:
                            return _context13.finish(28);

                        case 32:
                            return _context13.finish(25);

                        case 33:
                            _iteratorNormalCompletion3 = true;
                            _context13.next = 11;
                            break;

                        case 36:
                            _context13.next = 42;
                            break;

                        case 38:
                            _context13.prev = 38;
                            _context13.t1 = _context13['catch'](9);
                            _didIteratorError3 = true;
                            _iteratorError3 = _context13.t1;

                        case 42:
                            _context13.prev = 42;
                            _context13.prev = 43;

                            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                _iterator3.return();
                            }

                        case 45:
                            _context13.prev = 45;

                            if (!_didIteratorError3) {
                                _context13.next = 48;
                                break;
                            }

                            throw _iteratorError3;

                        case 48:
                            return _context13.finish(45);

                        case 49:
                            return _context13.finish(42);

                        case 50:
                            res.status(200).send(data);

                        case 51:
                        case 'end':
                            return _context13.stop();
                    }
                }
            }, _callee13, this, [[9, 38, 42, 50], [17, 21, 25, 33], [26,, 28, 32], [43,, 45, 49]]);
        }));

        return function (_x37, _x38, _x39) {
            return _ref13.apply(this, arguments);
        };
    }());

    app.post('/salesman/addOrgSalesmen', function () {
        var _ref14 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee14(req, res, next) {
            var salesmen, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, login, loginEntity, result, salesmanEntity;

            return _regenerator2.default.wrap(function _callee14$(_context14) {
                while (1) {
                    switch (_context14.prev = _context14.next) {
                        case 0:
                            salesmen = req.body.params;
                            _iteratorNormalCompletion5 = true;
                            _didIteratorError5 = false;
                            _iteratorError5 = undefined;
                            _context14.prev = 4;
                            _iterator5 = (0, _getIterator3.default)(salesmen);

                        case 6:
                            if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
                                _context14.next = 22;
                                break;
                            }

                            saleman = _step5.value;
                            _context14.next = 10;
                            return _login2.default.count({ userName: /salesman.userName/ }, function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    res.status(200).send(data);
                                }
                            });

                        case 10:
                            login = _context14.sent;

                            if (!(login == 0)) {
                                _context14.next = 19;
                                break;
                            }

                            loginEntity = new _login2.default({
                                userName: saleman.userName,
                                password: "88888888",
                                role: "",
                                realName: salesman.userName
                            });
                            result = loginEntity.save(function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    res.status(200).send(data);
                                }
                            });
                            salesmanEntity = new _salesman2.default({
                                _id: result._id,
                                organization_id: organization_id,
                                realName: result.realName
                            });
                            _context14.next = 17;
                            return salesmanEntity.save(function (err) {
                                if (err) {
                                    var data = {};
                                    data.result = "01";
                                    data.name = "操作失败";
                                    res.status(200).send(data);
                                }
                            });

                        case 17:
                            _context14.next = 19;
                            break;

                        case 19:
                            _iteratorNormalCompletion5 = true;
                            _context14.next = 6;
                            break;

                        case 22:
                            _context14.next = 28;
                            break;

                        case 24:
                            _context14.prev = 24;
                            _context14.t0 = _context14['catch'](4);
                            _didIteratorError5 = true;
                            _iteratorError5 = _context14.t0;

                        case 28:
                            _context14.prev = 28;
                            _context14.prev = 29;

                            if (!_iteratorNormalCompletion5 && _iterator5.return) {
                                _iterator5.return();
                            }

                        case 31:
                            _context14.prev = 31;

                            if (!_didIteratorError5) {
                                _context14.next = 34;
                                break;
                            }

                            throw _iteratorError5;

                        case 34:
                            return _context14.finish(31);

                        case 35:
                            return _context14.finish(28);

                        case 36:
                        case 'end':
                            return _context14.stop();
                    }
                }
            }, _callee14, this, [[4, 24, 28, 36], [29,, 31, 35]]);
        }));

        return function (_x40, _x41, _x42) {
            return _ref14.apply(this, arguments);
        };
    }());
};