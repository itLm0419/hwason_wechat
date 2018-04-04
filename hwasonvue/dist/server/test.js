
'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var companyScheduleModel = require('./util/schema/companySchedule');

var appResponse = require('./app-response');

module.exports = function (app) {
  var saveActivity = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(activity) {
      var promise;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:

              console.log(activity);
              promise = new _promise2.default(function (resolve, reject) {

                if (error) {
                  reject(error);
                } else {
                  resolve("ok");
                }
              });

            case 2:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function saveActivity(_x3) {
      return _ref2.apply(this, arguments);
    };
  }();

  var getTodayActivity = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(organization_id) {
      var date, begin, end, todayActivity;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              date = new Date();
              begin = new Date(date.getFullYear(), date.getMonth(), date.getDate());
              end = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
              _context3.next = 5;
              return activityModel.find({ organization_id: organization_id }).where('activityTime').gte(begin).lt(end);

            case 5:
              todayActivity = _context3.sent;
              return _context3.abrupt('return', todayActivity);

            case 7:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function getTodayActivity(_x4) {
      return _ref3.apply(this, arguments);
    };
  }();

  app.post('/addactivity/saveActivity', function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res) {
      var activity, company_id, data, s, date, companySchedule, result, respResult;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              activity = req.body;
              company_id = "2211";
              data = req.body;

              console.log(data.time);
              s = data.time;

              s = s.replace(/-/g, "/");
              date = new Date(s);

              console.log(date);
              companySchedule = new companyScheduleModel({
                company_id: company_id,
                combo: data.combo,
                time: date,
                place: data.place,
                personNum: data.personNum,
                remark: data.remark
              });

              console.log(companySchedule);
              _context.next = 12;
              return companySchedule.save();

            case 12:
              result = _context.sent;

              console.log("result");
              console.log(result);
              respResult = {
                status0: 1,
                message: '注册失败!'
              };

              console.log(respResult);
              res.status(200).send(respResult);

            case 18:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};