
'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var router = express.Router();
var http = require("http");
var JSZip = require("jszip");
var crypto = require('crypto');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var xlsx = require('node-xlsx');
var request = require('request');
var activityModel = require('../util/schema/activities');
var loginModel = require('../util/schema/login');
var salesmanModel = require('../util/schema/salesman');
var organizationModel = require('../util/schema/organizations');
var industryModel = require('../util/schema/industry');
var orgCategoryModel = require('../util/schema/orgCategory');
var projectModel = require('../util/schema/projects');
var cities = require('../util/code');
var industies = require('../util/industry');
var countryModel = require('../util/schema/counties');
var cityModel = require('../util/schema/cities');
var provinceModel = require('../util/schema/provinces');
var hwasonModel = require('../util/schema/hwason');
var util = require('../util2');
module.exports = function (app) {
  app.get('/laboratory/showReports', function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
      var name, pageNo, pageSize, begin, end, organizations, arr, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, organization, orgIds, query, dateParam, sample_status, data;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              name = req.query.name || "";
              pageNo = req.query.pageNo || 1;
              pageSize = req.query.pageSize || 10;
              begin = req.query.begin;
              end = req.query.end;
              _context.next = 7;
              return organizationModel.find({ name: { $regex: name } }, { _id: 1, name: 1 }, function (err) {
                if (err) {
                  var _data = {};
                  _data.result = "01";
                  _data.name = "操作失败";
                  return res.status(200).send(_data);
                }
              });

            case 7:
              organizations = _context.sent;
              arr = [];
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 12;

              for (_iterator = (0, _getIterator3.default)(organizations); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                organization = _step.value;

                arr.push(organization._id);
              }
              _context.next = 20;
              break;

            case 16:
              _context.prev = 16;
              _context.t0 = _context['catch'](12);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 20:
              _context.prev = 20;
              _context.prev = 21;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 23:
              _context.prev = 23;

              if (!_didIteratorError) {
                _context.next = 26;
                break;
              }

              throw _iteratorError;

            case 26:
              return _context.finish(23);

            case 27:
              return _context.finish(20);

            case 28:
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
              query.project = req.query.projects;
              _context.next = 42;
              return util.queryReports(pageNo, pageSize, query, res);

            case 42:
              data = _context.sent;
              return _context.abrupt('return', res.status(200).send(data));

            case 44:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[12, 16, 20, 28], [21,, 23, 27]]);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }());

  app.post('/laboratory/checkedActivity', function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return activityModel.update({ _id: req.body.params._id }, { $set: { laboratory_checked: 1 } }, function (err) {
                if (err) {
                  var data = {};
                  data.result = "01";
                  data.name = "操作失败";
                  res.status(200).send(data);
                } else {
                  var _data2 = {};
                  _data2.result = "00";
                  _data2.name = "操作成功";
                  res.status(200).send(_data2);
                }
              });

            case 2:
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

  app.post('/laboratory/addCode', function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res, next) {
      var users, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, user, data;

      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              users = req.body.params.users;
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context3.prev = 4;
              _iterator2 = (0, _getIterator3.default)(users);

            case 6:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                _context3.next = 13;
                break;
              }

              user = _step2.value;
              _context3.next = 10;
              return update({ userId: user.userId }, { $set: { laboratory_code: laboratory_code } }, function (err) {
                if (err) {
                  var _data3 = {};
                  _data3.result = "01";
                  _data3.name = "操作失败";
                  res.status(200).send(_data3);
                }
              });

            case 10:
              _iteratorNormalCompletion2 = true;
              _context3.next = 6;
              break;

            case 13:
              _context3.next = 19;
              break;

            case 15:
              _context3.prev = 15;
              _context3.t0 = _context3['catch'](4);
              _didIteratorError2 = true;
              _iteratorError2 = _context3.t0;

            case 19:
              _context3.prev = 19;
              _context3.prev = 20;

              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }

            case 22:
              _context3.prev = 22;

              if (!_didIteratorError2) {
                _context3.next = 25;
                break;
              }

              throw _iteratorError2;

            case 25:
              return _context3.finish(22);

            case 26:
              return _context3.finish(19);

            case 27:
              data = {};

              data.result = "00";
              data.name = "操作失败";
              res.status(200).send(data);

            case 31:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this, [[4, 15, 19, 27], [20,, 22, 26]]);
    }));

    return function (_x7, _x8, _x9) {
      return _ref3.apply(this, arguments);
    };
  }());

  app.post('/test/exportReports', function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(req, res, next) {
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              res.download("C:/Users/win7/Downloads/temp (37)/TM3毕仁忠HS010828.pdf", "aaa.pdf", function (err) {
                if (err) {
                  console.log(err);
                }
                console.log(222);
              });

            case 1:
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
    return date.getYear() + 1900 + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getMinutes();
  }
};