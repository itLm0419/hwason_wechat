
'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

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

  app.post('/addactivity/saveActivity', function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res) {
      var activity, company_id, data, companySchedule, result;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              activity = req.body;
              company_id = "1111";
              data = req.body;
              console.log("data");
              console.log(data);


              console.log(data);
              _context.next = 7;

              return true;

            case 7:
              result = _context.sent;

              console.log(result);
              if (result != null) {
                rep.send({ 'msg': '增加成功' });
              } else {
                rep.send({ 'msg': '操作失败，请重试！' });
              }

            case 10:
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