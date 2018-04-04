'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _nurses = require('../util/schema/nurses');

var _nurses2 = _interopRequireDefault(_nurses);

var _organizations = require('../util/schema/organizations');

var _organizations2 = _interopRequireDefault(_organizations);

var _user = require('../util/schema/user');

var _user2 = _interopRequireDefault(_user);

var _userActivities = require('../util/schema/userActivities');

var _userActivities2 = _interopRequireDefault(_userActivities);

var _activities = require('../util/schema/activities');

var _activities2 = _interopRequireDefault(_activities);

var _login = require('../util/schema/login');

var _login2 = _interopRequireDefault(_login);

var _util = require('../util2');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (app) {
  app.get('/director/showUncheckedNurse', function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
      var nurses;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _nurses2.default.find({ checked: false }, { _id: 1, realName: 1, sex: 1, region: 1, certificate_No: 1, create_time: 1 }, function (err) {
                if (err) {
                  var data = {};
                  data.result = "01";
                  data.name = "操作失败";
                  res.status(200).send(data);
                }
              });

            case 2:
              nurses = _context.sent;

              res.status(200).send(nurses);

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

  app.get('/director/showNurseDetail', function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
      var _id, nurse;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _id = req.query._id;

              console.log(_id);
              _context2.next = 4;
              return _nurses2.default.findOne({ _id: _id }, {
                name: 1,
                sex: 1,
                tel: 1,
                IDNo: 1,
                region: 1,
                cardholder: 1,
                owned_bank: 1,
                card_number: 1,
                open_bank: 1,
                post: 1,
                unit_name: 1,
                photo: 1,
                certificate_No: 1,
                certificate_photo: 1
              }, function (err) {
                if (err) {
                  var data = {};
                  data.result = "01";
                  data.name = "操作失败";
                  res.status(200).send(data);
                }
              });

            case 4:
              nurse = _context2.sent;

              console.log(nurse);
              res.status(200).send(nurse);

            case 7:
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

  app.post('/director/checked', function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res, next) {
      var _id;

      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _id = req.body.params._id;
              _context3.next = 3;
              return _nurses2.default.update({ _id: _id }, { checked: true }, function (err) {
                if (err) {
                  var data = {};
                  data.result = "01";
                  data.name = "操作失败";
                  res.status(200).send(data);
                } else {
                  var _data = {};
                  _data.result = "02";
                  _data.name = "操作成功";
                  res.status(200).send(_data);
                }
              });

            case 3:
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

  app.get('/director/showCheckedNurse', function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(req, res, next) {
      var region, realName, query, nurses;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              region = req.query.region;
              realName = req.query.realName;
              query = {};

              if (region) {
                query.region = new RegExp(region);
              }
              if (realName) {
                query.realName = new RegExp(realName);
              }
              query.checked = true;
              console.log(region, realName, query);
              _context4.next = 9;
              return _nurses2.default.find(query, { realName: 1, sex: 1, region: 1, tel: 1, IDNo: 1, certificate_No: 1, cardholder: 1, owned_bank: 1, card_number: 1,
                open_bank: 1, checked: 1 }, function (err) {
                if (err) {
                  var data = {};
                  data.result = "01";
                  data.name = "操作失败";
                  res.status(200).send(data);
                }
              });

            case 9:
              nurses = _context4.sent;

              res.status(200).send(nurses);

            case 11:
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

  app.get('/logistics/director/showActivities', function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(req, res, next) {
      var name, pageNo, pageSize, begin, end, organizations, arr, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, organization, orgIds, query, dateParam, data;

      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              name = req.query.name || "";
              pageNo = req.query.pageNo || 1;
              pageSize = req.query.pageSize || 10;
              begin = req.query.begin;
              end = req.query.end;
              _context5.next = 7;
              return _organizations2.default.find({ name: { $regex: name } }, {
                _id: 1, name: 1 }, function (err) {
                if (err) {
                  var _data2 = {};
                  _data2.result = "01";
                  _data2.name = "操作失败";
                  return res.status(200).send(_data2);
                }
              });

            case 7:
              organizations = _context5.sent;
              arr = [];
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context5.prev = 12;

              for (_iterator = (0, _getIterator3.default)(organizations); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                organization = _step.value;

                arr.push(organization._id);
              }
              _context5.next = 20;
              break;

            case 16:
              _context5.prev = 16;
              _context5.t0 = _context5['catch'](12);
              _didIteratorError = true;
              _iteratorError = _context5.t0;

            case 20:
              _context5.prev = 20;
              _context5.prev = 21;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 23:
              _context5.prev = 23;

              if (!_didIteratorError) {
                _context5.next = 26;
                break;
              }

              throw _iteratorError;

            case 26:
              return _context5.finish(23);

            case 27:
              return _context5.finish(20);

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
              _context5.next = 38;
              return _util2.default.queryActivities(pageNo, pageSize, query, res);

            case 38:
              data = _context5.sent;
              return _context5.abrupt('return', res.status(200).send(data));

            case 40:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this, [[12, 16, 20, 28], [21,, 23, 27]]);
    }));

    return function (_x13, _x14, _x15) {
      return _ref5.apply(this, arguments);
    };
  }());

  app.get('/logistics/director/showReports', function () {
    var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(req, res, next) {
      var name, pageNo, pageSize, begin, end, organizations, arr, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, organization, orgIds, query, dateParam, sample_status, aa;

      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              name = req.query.name || "";
              pageNo = req.query.pageNo || 1;
              pageSize = req.query.pageSize || 10;
              begin = req.query.begin;
              end = req.query.end;
              _context6.next = 7;
              return _organizations2.default.find({ name: { $regex: name } }, { _id: 1, name: 1 }, function (err) {
                if (err) {
                  var data = {};
                  data.result = "01";
                  data.name = "操作失败";
                  return res.status(200).send(data);
                }
              });

            case 7:
              organizations = _context6.sent;
              arr = [];
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context6.prev = 12;

              for (_iterator2 = (0, _getIterator3.default)(organizations); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                organization = _step2.value;

                arr.push(organization._id);
              }
              _context6.next = 20;
              break;

            case 16:
              _context6.prev = 16;
              _context6.t0 = _context6['catch'](12);
              _didIteratorError2 = true;
              _iteratorError2 = _context6.t0;

            case 20:
              _context6.prev = 20;
              _context6.prev = 21;

              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }

            case 23:
              _context6.prev = 23;

              if (!_didIteratorError2) {
                _context6.next = 26;
                break;
              }

              throw _iteratorError2;

            case 26:
              return _context6.finish(23);

            case 27:
              return _context6.finish(20);

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
              _context6.next = 41;
              return _util2.default.queryReports(pageNo, pageSize, query, res);

            case 41:
              aa = _context6.sent;
              return _context6.abrupt('return', res.status(200).send(aa));

            case 43:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this, [[12, 16, 20, 28], [21,, 23, 27]]);
    }));

    return function (_x16, _x17, _x18) {
      return _ref6.apply(this, arguments);
    };
  }());

  function changeSingleDate(date) {
    return "aa";
    return date.getYear() + 1900 + "." + (date.getMonth() + 1) + "." + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getMinutes();
  }
};