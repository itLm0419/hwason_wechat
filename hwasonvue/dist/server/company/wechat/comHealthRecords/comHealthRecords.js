

'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _common = require('../../../util/common.js');

var _common2 = _interopRequireDefault(_common);

var _mail = require('../../../mail.js');

var _mail2 = _interopRequireDefault(_mail);

var _nodeXlsx = require('node-xlsx');

var _nodeXlsx2 = _interopRequireDefault(_nodeXlsx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var cardModel = require('../../../util/schema/card');
var userModel = require('../../../util/schema/user');
var userRecordModel = require('../../../util/schema/userRecord');

var fs = require('fs');
var JSZip = require("jszip");

module.exports = function (app) {
    app.get('/wechat/company/sendEmailRecords', function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
            var param, begin, email, end, department, organization_id, head, query, dateParam, data, records, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, rd, arr, buffer, datas;

            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            param = req.query.CNI;
                            begin = req.query.beginTime;
                            email = req.query.email;
                            end = req.query.endTime;
                            department = req.query.department;
                            organization_id = req.cookies.userId;
                            head = ["部门", "业务员姓名", "业务员工号", "姓名", "年龄", "身份证", "性别", "卡号", "建档时间", "客户联系方式", "客户地址"];
                            query = {};

                            query.organization_id = organization_id;
                            if (param && param != 'undefined') {
                                query.$or = [{ cardNo: { '$regex': param, '$options': "i" } }, { name: { '$regex': param, '$options': "i" } }, { IDNo: { '$regex': param, '$options': "i" } }];
                            }
                            dateParam = {};

                            if (begin) {
                                dateParam.$gte = begin;
                            }
                            if (end) {
                                dateParam.$lte = end;
                            }
                            if (dateParam.hasOwnProperty("$gte") || dateParam.hasOwnProperty("$lte")) {
                                query.createTime = dateParam;
                            }
                            if (department) {
                                query['salesman.department'] = department;
                            }
                            data = [];
                            _context.next = 18;
                            return userRecordModel.find(query, { name: 1, IDNo: 1, sex: 1, cardNo: 1, salesman: 1, complete: 1, userId: 1, createTime: 1, tel: 1, address: 1 });

                        case 18:
                            records = _context.sent;

                            data.push(head);
                            _iteratorNormalCompletion = true;
                            _didIteratorError = false;
                            _iteratorError = undefined;
                            _context.prev = 23;
                            for (_iterator = (0, _getIterator3.default)(records); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                rd = _step.value;
                                arr = [];

                                arr.push(rd.salesman.department);
                                arr.push(rd.salesman.realName);
                                arr.push(rd.salesman.userName);
                                arr.push(rd.name);
                                arr.push(getAgeByIDNo(rd.IDNo));
                                arr.push(rd.IDNo);
                                arr.push(rd.sex);
                                arr.push(rd.cardNo);
                                arr.push(_common2.default.dateFormat(rd.createTime, 2));
                                arr.push(rd.tel);
                                arr.push(rd.address);
                                data.push(arr);
                            }
                            _context.next = 31;
                            break;

                        case 27:
                            _context.prev = 27;
                            _context.t0 = _context['catch'](23);
                            _didIteratorError = true;
                            _iteratorError = _context.t0;

                        case 31:
                            _context.prev = 31;
                            _context.prev = 32;

                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }

                        case 34:
                            _context.prev = 34;

                            if (!_didIteratorError) {
                                _context.next = 37;
                                break;
                            }

                            throw _iteratorError;

                        case 37:
                            return _context.finish(34);

                        case 38:
                            return _context.finish(31);

                        case 39:
                            buffer = _nodeXlsx2.default.build([{
                                name: 'sheet1',
                                data: data
                            }]);

                            fs.writeFile('/home/hwason/temp/records.xlsx', buffer, function (err) {
                                if (err) throw err;
                                (0, _mail2.default)(email, '健康档案', '健康档案', '健康档案.xlsx', "/home/hwason/temp/records.xlsx");
                            });
                            datas = {};

                            datas.name = "操作成功";
                            datas.result = "00";
                            res.status(200).send(datas);

                        case 45:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this, [[23, 27, 31, 39], [32,, 34, 38]]);
        }));

        return function (_x, _x2, _x3) {
            return _ref.apply(this, arguments);
        };
    }());
    app.get('/wechat/company/showRecordsOrg', function () {
        var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
            var pageNo, pageSize, param, begin, end, department, query, organization_id, dateParam, count, records, data, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, rd, record, datas;

            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            pageNo = req.query.pageNo || 1;
                            pageSize = req.query.pageSize || 20;
                            param = req.query.CNI;
                            begin = req.query.beginTime;
                            end = req.query.endTime;
                            department = req.query.department;
                            query = {};
                            organization_id = req.cookies.userId;

                            query.organization_id = organization_id;
                            if (param && param != 'undefined') {
                                query.$or = [{ cardNo: { '$regex': param, '$options': "i" } }, { name: { '$regex': param, '$options': "i" } }, { IDNo: { '$regex': param, '$options': "i" } }];
                            }
                            dateParam = {};

                            if (begin) {
                                dateParam.$gte = begin;
                            }
                            if (end) {
                                dateParam.$lte = end;
                            }
                            if (dateParam.hasOwnProperty("$gte") || dateParam.hasOwnProperty("$lte")) {
                                query.createTime = dateParam;
                            }
                            if (department && department != 'undefined') {
                                query['salesman.department'] = department;
                            }
                            console.log(query);
                            _context2.next = 18;
                            return userRecordModel.count(query, function (err) {
                                if (err) {
                                    var _data = {};
                                    _data.result = "01";
                                    _data.name = "操作失败";
                                    return res.status(200).send(_data);
                                }
                            });

                        case 18:
                            count = _context2.sent;
                            _context2.next = 21;
                            return userRecordModel.find(query, { name: 1, IDNo: 1, sex: 1, cardNo: 1, salesman: 1, complete: 1, userId: 1 }, function (err) {
                                if (err) {
                                    var _data2 = {};
                                    _data2.result = "01";
                                    _data2.name = "操作失败";
                                    return res.status(200).send(_data2);
                                }
                            }).skip((pageNo - 1) * pageSize).limit(parseInt(pageSize));

                        case 21:
                            records = _context2.sent;
                            data = [];
                            _iteratorNormalCompletion2 = true;
                            _didIteratorError2 = false;
                            _iteratorError2 = undefined;
                            _context2.prev = 26;

                            for (_iterator2 = (0, _getIterator3.default)(records); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                rd = _step2.value;
                                record = {};

                                record.name = rd.name;
                                record.userId = rd.userId;
                                record.age = getAgeByIDNo(rd.IDNo);
                                record.sex = rd.sex;
                                record.cardNo = rd.cardNo;
                                record.salesman = rd.salesman;
                                record.complete = rd.complete;
                                data.push(record);
                            }
                            _context2.next = 34;
                            break;

                        case 30:
                            _context2.prev = 30;
                            _context2.t0 = _context2['catch'](26);
                            _didIteratorError2 = true;
                            _iteratorError2 = _context2.t0;

                        case 34:
                            _context2.prev = 34;
                            _context2.prev = 35;

                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }

                        case 37:
                            _context2.prev = 37;

                            if (!_didIteratorError2) {
                                _context2.next = 40;
                                break;
                            }

                            throw _iteratorError2;

                        case 40:
                            return _context2.finish(37);

                        case 41:
                            return _context2.finish(34);

                        case 42:
                            datas = {};

                            datas.count = count;
                            datas.records = data;
                            res.status(200).send(datas);

                        case 46:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this, [[26, 30, 34, 42], [35,, 37, 41]]);
        }));

        return function (_x4, _x5, _x6) {
            return _ref2.apply(this, arguments);
        };
    }());

    app.get('/wechat/company/HRecordByDepartment', function () {
        var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res, next) {
            var organization_id, date, begintime, endtime, count_total, today_total, _data3, data, i, j, statistics, pro;

            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            organization_id = req.cookies.userId;
                            date = new Date();
                            begintime = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                            endtime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
                            _context3.next = 6;
                            return cardModel.aggregate([{ $match: { organization_id: organization_id } }, { $group: { _id: { 'department': "$salesman.department" }, count: { $sum: 1 } } }, { $sort: { "count": -1 } }]);

                        case 6:
                            count_total = _context3.sent;
                            _context3.next = 9;
                            return cardModel.aggregate([{ $match: { organization_id: organization_id, beginTime: { $gte: begintime, $lt: endtime } } }, { $group: { _id: { 'department': "$salesman.department" }, count: { $sum: 1 } } }, { $sort: { "count": -1 } }]);

                        case 9:
                            today_total = _context3.sent;

                            console.log(count_total, today_total, 22222222);

                            if (!(count_total.length == 0)) {
                                _context3.next = 14;
                                break;
                            }

                            _data3 = {};
                            return _context3.abrupt('return', res.status(200).send(_data3));

                        case 14:
                            data = new Array();
                            i = void 0, j = void 0;
                            i = 0;

                        case 17:
                            if (!(i < count_total.length)) {
                                _context3.next = 37;
                                break;
                            }

                            statistics = {};
                            pro = "";

                            statistics.department = count_total[i]._id.department;
                            statistics.total_number = count_total[i].count;
                            j = 0;

                        case 23:
                            if (!(j < today_total.length)) {
                                _context3.next = 31;
                                break;
                            }

                            if (!(today_total[j]._id.department == count_total[i]._id.department)) {
                                _context3.next = 27;
                                break;
                            }

                            statistics.today_number = today_total[j].count;
                            return _context3.abrupt('break', 31);

                        case 27:
                            if (j == today_total.length) statistics.today_number = 0;

                        case 28:
                            j++;
                            _context3.next = 23;
                            break;

                        case 31:
                            if (today_total.length == 0) statistics.today_number = 0;
                            statistics.other_number = statistics.total_number - statistics.today_number;
                            data.push(statistics);

                        case 34:
                            i++;
                            _context3.next = 17;
                            break;

                        case 37:
                            return _context3.abrupt('return', res.status(200).send(data));

                        case 38:
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

    app.get('/wechat/company/HRecordBySalesman', function () {
        var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(req, res, next) {
            var organization_id, date, beginTime, endTime, count_total, today_total, _data4, data, i, j, statistics;

            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            organization_id = req.cookies.userId;
                            date = new Date();
                            beginTime = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                            endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
                            _context4.next = 6;
                            return cardModel.aggregate([{ $match: { organization_id: organization_id } }, { $group: { _id: { 'id': '$salesman._id', 'realName': '$salesman.realName', 'department': '$salesman.department' }, count: { $sum: 1 } } }, { $sort: { "count": -1 } }]);

                        case 6:
                            count_total = _context4.sent;
                            _context4.next = 9;
                            return cardModel.aggregate([{ $match: { organization_id: organization_id, beginTime: { $gte: beginTime, $lt: endTime } } }, { $group: { _id: { 'id': '$salesman._id', 'realName': '$salesman.realName', 'department': '$salesman.department' }, count: { $sum: 1 } } }, { $sort: { "count": -1 } }]);

                        case 9:
                            today_total = _context4.sent;

                            if (!(count_total.length == 0)) {
                                _context4.next = 13;
                                break;
                            }

                            _data4 = {};
                            return _context4.abrupt('return', res.status(200).send(_data4));

                        case 13:
                            data = new Array();
                            i = void 0, j = void 0;
                            i = 0;

                        case 16:
                            if (!(i < count_total.length)) {
                                _context4.next = 35;
                                break;
                            }

                            statistics = {};


                            statistics.name = count_total[i]._id.realName;
                            statistics.department = count_total[i]._id.department;
                            statistics.total_number = count_total[i].count;
                            j = 0;

                        case 22:
                            if (!(j < today_total.length)) {
                                _context4.next = 30;
                                break;
                            }

                            if (!(today_total[j]._id.id == count_total[i]._id.id)) {
                                _context4.next = 26;
                                break;
                            }

                            statistics.today_number = today_total[j].count;
                            return _context4.abrupt('break', 30);

                        case 26:
                            if (j == today_total.length) statistics.today_number = 0;

                        case 27:
                            j++;
                            _context4.next = 22;
                            break;

                        case 30:
                            if (today_total.length == 0) statistics.today_number = 0;
                            data.push(statistics);

                        case 32:
                            i++;
                            _context4.next = 16;
                            break;

                        case 35:
                            return _context4.abrupt('return', res.status(200).send(data));

                        case 36:
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

    app.get('/wechat/company/getTotalNum', function () {
        var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(req, res, next) {
            var organization_id, totalNum, data;
            return _regenerator2.default.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            organization_id = req.cookies.userId;
                            _context5.next = 3;
                            return cardModel.count({ organization_id: organization_id }, function (err) {
                                if (err) {
                                    var _data5 = {};
                                    _data5.result = "01";
                                    _data5.name = "操作失败";
                                    return res.status(200).send(_data5);
                                }
                            });

                        case 3:
                            totalNum = _context5.sent;
                            data = {};

                            data.value = totalNum;

                            res.status(200).send(data);

                        case 7:
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

    app.get('/wechat/company/HRecordDetailList', function () {
        var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(req, res, next) {
            var organization_id, numOfPage, num, data, dataAll, userArray, users, x, result2, i, k, user, birthday;
            return _regenerator2.default.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            organization_id = req.cookies.userId;
                            numOfPage = 8;
                            num = req.query.pageNumber * numOfPage;
                            data = [], dataAll = {};
                            userArray = new Array();


                            console.log("pages", numOfPage);
                            console.log("num", num);
                            _context6.next = 9;
                            return cardModel.find({ organization_id: organization_id }, {
                                _id: 1,
                                userId: 1,
                                cardNo: 1,
                                salesman: 1,
                                status: 1
                            }).skip(num).limit(numOfPage).sort({ beginTime: -1 });

                        case 9:
                            users = _context6.sent;

                            if (!(users.length == 0)) {
                                _context6.next = 14;
                                break;
                            }

                            dataAll.data = [];
                            dataAll.end = true;
                            return _context6.abrupt('return', res.status(200).send(data));

                        case 14:

                            for (x in users) {
                                userArray.push(users[x].userId);
                            }
                            console.log("userArray", userArray);
                            _context6.next = 18;
                            return userRecordModel.find({ 'userId': { $in: userArray } }, { userId: 1, name: 1, sex: 1, IDNo: 1, complete: 1 }, function (err) {
                                if (err) {
                                    var _data6 = {};
                                    _data6.result = "01";
                                    _data6.name = "操作失败";
                                    res.status(200).send(_data6);
                                    return;
                                }
                            }).sort({ createTime: -1 });

                        case 18:
                            result2 = _context6.sent;


                            console.log("result2", result2);

                            i = 0;

                        case 21:
                            if (!(i < users.length)) {
                                _context6.next = 45;
                                break;
                            }

                            k = void 0;
                            k = 0;

                        case 24:
                            if (!(k < result2.length)) {
                                _context6.next = 30;
                                break;
                            }

                            if (!(users[i].userId == result2[k].userId)) {
                                _context6.next = 27;
                                break;
                            }

                            return _context6.abrupt('break', 30);

                        case 27:
                            k++;
                            _context6.next = 24;
                            break;

                        case 30:

                            console.log("k", k, users[i].userId);
                            user = {};

                            user.name = result2[k].name;
                            user.sex = result2[k].sex;
                            birthday = new Date(result2[k].IDNo.substr(6, 4) + '/' + result2[k].IDNo.substr(10, 2) + '/' + result2[k].IDNo.substr(12, 2));

                            user.age = new Date().getFullYear() - new Date(birthday).getFullYear();
                            user.salesmanName = users[i].salesman.realName;
                            user.salesmanUseraccount = users[i].salesman.userName;
                            user.cardNo = users[i].cardNo;
                            user.userId = result2[k].userId;
                            if (result2[k].complete) user.complete = '已完成';else user.complete = '未完成';
                            data.push(user);

                        case 42:
                            i++;
                            _context6.next = 21;
                            break;

                        case 45:
                            dataAll.data = data;
                            if (users.length < 8) dataAll.end = true;else dataAll.end = false;
                            console.log("dataAll", dataAll);

                            return _context6.abrupt('return', res.status(200).send(dataAll));

                        case 49:
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

    app.get('/wechat/company/HRecordDetailListInfo', function () {
        var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(req, res, next) {
            var organization_id, info, num, userArray, data, dataAll, users, x, result2, i, k, user, birthday;
            return _regenerator2.default.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            organization_id = req.cookies.userId;
                            info = req.query.info;
                            num = req.query.pageNumber * 8;
                            userArray = new Array();
                            data = [], dataAll = {};

                            array[0] = { cardNo: { $regex: info } };
                            array[1] = { 'salesman.userName': { $regex: info } };
                            array[2] = { 'userName': { $regex: info } };

                            _context7.next = 10;
                            return cardModel.find({ organization_id: organization_id }, {
                                _id: 1,
                                userId: 1,
                                cardNo: 1,
                                salesman: 1,
                                status: 1
                            }).or(array).skip(num).limit(8).sort({ beginTime: -1 });

                        case 10:
                            users = _context7.sent;

                            if (!(users.length == 0)) {
                                _context7.next = 15;
                                break;
                            }

                            dataAll.data = [];
                            dataAll.end = true;
                            return _context7.abrupt('return', res.status(200).send(data));

                        case 15:
                            for (x in users) {
                                userArray.push(users[x].userId);
                            }

                            _context7.next = 18;
                            return userRecordModel.find({ 'userId': { $in: userArray } }, { userId: 1, name: 1, sex: 1, IDNo: 1, complete: 1 }, function (err) {
                                if (err) {
                                    var _data7 = {};
                                    _data7.result = "01";
                                    _data7.name = "操作失败";
                                    res.status(200).send(_data7);
                                    return;
                                }
                            }).sort({ createTime: -1 });

                        case 18:
                            result2 = _context7.sent;
                            i = 0;

                        case 20:
                            if (!(i < users.length)) {
                                _context7.next = 43;
                                break;
                            }

                            k = void 0;
                            k = 0;

                        case 23:
                            if (!(k < result2.length)) {
                                _context7.next = 29;
                                break;
                            }

                            if (!(users[i].userId == result2[k].userId)) {
                                _context7.next = 26;
                                break;
                            }

                            return _context7.abrupt('break', 29);

                        case 26:
                            k++;
                            _context7.next = 23;
                            break;

                        case 29:
                            user = {};

                            user.name = result2[k].name;
                            user.sex = result2[k].sex;
                            birthday = new Date(result2[k].IDNo.substr(6, 4) + '/' + result2[k].IDNo.substr(10, 2) + '/' + result2[k].IDNo.substr(12, 2));

                            user.age = new Date().getFullYear() - new Date(birthday).getFullYear();
                            user.salesmanName = users[i].salesman.realName;
                            user.salesmanUseraccount = users[i].salesman.userName;
                            user.cardNo = users[i].cardNo;
                            user.userId = result2[k].userId;
                            if (result2[k].complete) user.complete = '已完成';else user.complete = '未完成';
                            data.push(user);

                        case 40:
                            i++;
                            _context7.next = 20;
                            break;

                        case 43:
                            dataAll.data = data;
                            if (users.length < 8) dataAll.end = true;else dataAll.end = false;
                            return _context7.abrupt('return', res.status(200).send(dataAll));

                        case 46:
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

    app.get('/wechat/company/HRecordDetailListDate', function () {
        var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(req, res, next) {
            var organization_id, startDate, endDate, department, num, userArray, end, data, dataAll, query, date, users, x, result2, i, k, user, birthday;
            return _regenerator2.default.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                        case 0:
                            organization_id = req.cookies.userId;
                            startDate = req.query.startDate;
                            endDate = req.query.endDate;
                            department = req.query.department;
                            num = req.query.pageNumber * 8;
                            userArray = new Array();
                            end = false;
                            data = [], dataAll = {};

                            console.log("organization_id", organization_id);
                            query = {};

                            query.organization_id = organization_id;

                            if (startDate != '') {
                                date = {};

                                date.$gte = startDate;
                                date.$lt = endDate;
                                query.beginTime = date;
                            }
                            if (department != '') {
                                query["salesman.department"] = department;
                            }
                            _context8.next = 15;
                            return cardModel.find(query, {
                                _id: 1,
                                userId: 1,
                                cardNo: 1,
                                salesman: 1,
                                status: 1

                            }).skip(num).limit(8).sort({ beginTime: -1 });

                        case 15:
                            users = _context8.sent;


                            console.log("users", users);

                            if (!(users.length == 0)) {
                                _context8.next = 21;
                                break;
                            }

                            dataAll.data = [];
                            dataAll.end = true;
                            return _context8.abrupt('return', res.status(200).send(data));

                        case 21:

                            for (x in users) {
                                userArray.push(users[x].userId);
                            }

                            _context8.next = 24;
                            return userRecordModel.find({ 'userId': { $in: userArray } }, { userId: 1, name: 1, sex: 1, IDNo: 1, complete: 1 }, function (err) {
                                if (err) {
                                    var _data8 = {};
                                    _data8.result = "01";
                                    _data8.name = "操作失败";
                                    res.status(200).send(_data8);
                                    return;
                                }
                            }).sort({ createTime: -1 });

                        case 24:
                            result2 = _context8.sent;
                            i = 0;

                        case 26:
                            if (!(i < users.length)) {
                                _context8.next = 49;
                                break;
                            }

                            k = void 0;
                            k = 0;

                        case 29:
                            if (!(k < result2.length)) {
                                _context8.next = 35;
                                break;
                            }

                            if (!(users[i].userId == result2[k].userId)) {
                                _context8.next = 32;
                                break;
                            }

                            return _context8.abrupt('break', 35);

                        case 32:
                            k++;
                            _context8.next = 29;
                            break;

                        case 35:
                            user = {};

                            user.name = result2[k].name;
                            user.sex = result2[k].sex;
                            birthday = new Date(result2[k].IDNo.substr(6, 4) + '/' + result2[k].IDNo.substr(10, 2) + '/' + result2[k].IDNo.substr(12, 2));

                            user.age = new Date().getFullYear() - new Date(birthday).getFullYear();
                            user.salesmanName = users[i].salesman.realName;
                            user.salesmanUseraccount = users[i].salesman.userName;
                            user.cardNo = users[i].cardNo;
                            user.userId = result2[k].userId;
                            if (result2[k].complete) user.complete = '已完成';else user.complete = '未完成';
                            data.push(user);

                        case 46:
                            i++;
                            _context8.next = 26;
                            break;

                        case 49:

                            console.log(data);
                            dataAll.data = data;
                            if (users.length < 8) dataAll.end = true;else dataAll.end = false;
                            return _context8.abrupt('return', res.status(200).send(dataAll));

                        case 53:
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

    app.get('/wechat/company/HRecordMail', function () {
        var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9(req, res, next) {
            var organization_id, startDate, endDate, department, userArray, head, data, query, date, users, x, result, i, user, k, birthday, buffer, str, path, file_name;
            return _regenerator2.default.wrap(function _callee9$(_context9) {
                while (1) {
                    switch (_context9.prev = _context9.next) {
                        case 0:
                            organization_id = req.cookies.userId;
                            startDate = req.query.startDate;
                            endDate = req.query.endDate;
                            department = req.query.department;
                            userArray = new Array();
                            head = ["部门", "业务员姓名", "业务员工号", "姓名", "年龄", "身份证", "性别", "卡号"];
                            data = [];

                            console.log("organization_id", organization_id);
                            query = {};

                            query.organization_id = organization_id;

                            if (startDate != '') {
                                date = {};

                                date.$gte = startDate;
                                date.$lt = endDate;
                                query.beginTime = date;
                            }
                            if (department != '') {
                                query["salesman.department"] = department;
                            }
                            console.log("query", query);
                            _context9.next = 15;
                            return cardModel.find(query, {
                                _id: 1,
                                userId: 1,
                                cardNo: 1,
                                salesman: 1,
                                status: 1

                            }).sort({ beginTime: -1 });

                        case 15:
                            users = _context9.sent;


                            console.log("users", users);

                            for (x in users) {
                                userArray.push(users[x].userId);
                            }

                            data.push(head);

                            _context9.next = 21;
                            return userModel.find({ '_id': { $in: userArray } }, { _id: 1, name: 1, sex: 1, IDNo: 1 }, function (err) {
                                if (err) {
                                    var _data9 = {};
                                    _data9.result = "01";
                                    _data9.name = "操作失败";
                                    res.status(200).send(_data9);
                                    return;
                                }
                            }).sort({ createTime: -1 });

                        case 21:
                            result = _context9.sent;
                            i = 0;

                        case 23:
                            if (!(i < users.length)) {
                                _context9.next = 46;
                                break;
                            }

                            user = {};
                            k = void 0;
                            k = 0;

                        case 27:
                            if (!(k < result.length)) {
                                _context9.next = 33;
                                break;
                            }

                            if (!(users[i].userId == result[k]._Id)) {
                                _context9.next = 30;
                                break;
                            }

                            return _context9.abrupt('break', 33);

                        case 30:
                            k++;
                            _context9.next = 27;
                            break;

                        case 33:
                            user.salesmanDept = users[i].salesman.department;
                            user.salesmanName = users[i].salesman.realName;
                            user.salesmanUseraccount = users[i].salesman.userName;
                            user.name = result[k].name;

                            birthday = new Date(result[k].IDNo.substr(6, 4) + '/' + result[k].IDNo.substr(10, 2) + '/' + result[k].IDNo.substr(12, 2));

                            user.age = new Date().getFullYear() - new Date(birthday).getFullYear();
                            user.IDNo = result[k].IDNo;
                            user.sex = result[k].sex;
                            user.cardNo = users[i].cardNo;
                            data.push(user);

                        case 43:
                            i++;
                            _context9.next = 23;
                            break;

                        case 46:
                            buffer = _nodeXlsx2.default.build([{
                                name: 'sheet1',
                                data: data
                            }]);
                            str = Math.ceil(Math.random() * 1000).toString();
                            path = 'e:\\report' + str + '.xlsx';
                            file_name = 'report' + str + '.xlsx';

                            console.log("filename", file_name);
                            fs.writeFile(file_name, buffer, function (err) {
                                if (err) throw err;

                                (0, _mail2.default)('517174331@qq.com', '这是测试邮件', 'Hi Amor,这是一封测试邮件', file_name, path);
                            });

                        case 52:
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

    app.post('/wechat/company/HRecordUpload2', function () {
        var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10(req, res, next) {
            return _regenerator2.default.wrap(function _callee10$(_context10) {
                while (1) {
                    switch (_context10.prev = _context10.next) {
                        case 0:

                            res.download('e:\\report.xlsx');
                            (0, _mail2.default)('amor_zhang@qq.com', '这是测试邮件', 'Hi Amor,这是一封测试邮件');

                        case 2:
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

    app.get('/wechat/company/HRecordDepartment', function () {
        var _ref11 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee11(req, res, next) {
            var organization_id, startDate, endDate, department, num, array, end, data, dept;
            return _regenerator2.default.wrap(function _callee11$(_context11) {
                while (1) {
                    switch (_context11.prev = _context11.next) {
                        case 0:
                            organization_id = req.cookies.userId;
                            startDate = req.query.startDate;
                            endDate = req.query.endDate;
                            department = req.query.department;
                            num = req.query.pageNumber * 8;
                            array = new Array();
                            end = false;
                            data = [];

                            console.log("organization_id", organization_id);

                            _context11.next = 11;
                            return cardModel.distinct("salesman.department", {
                                organization_id: organization_id

                            });

                        case 11:
                            dept = _context11.sent;


                            console.log("dept", dept);
                            return _context11.abrupt('return', res.status(200).send(dept));

                        case 14:
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