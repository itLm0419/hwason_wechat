'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var organizationModel = require('./util/schema/organizations');
var activityModel = require('./util/schema/activities');
var util = require('./util2');

module.exports = function (app) {};

app.get('/salesman/showChooseProject', function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
    var _id, organization, data, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, project;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _id = req.query._id;
            _context.next = 3;
            return organizationModel.findOne({ _id: _id }, { projects: 1 }, function (err) {
              if (err) {
                var _data = {};
                _data.result = "01";
                _data.name = "操作失败";
                return res.status(200).send(_data);
              }
            });

          case 3:
            organization = _context.sent;
            data = new _set2.default();
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 8;

            for (_iterator = (0, _getIterator3.default)(organization.projects); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              project = _step.value;

              data.add(project.category);
            }
            _context.next = 16;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context['catch'](8);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 16:
            _context.prev = 16;
            _context.prev = 17;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 19:
            _context.prev = 19;

            if (!_didIteratorError) {
              _context.next = 22;
              break;
            }

            throw _iteratorError;

          case 22:
            return _context.finish(19);

          case 23:
            return _context.finish(16);

          case 24:
            res.status(200).send(data);

          case 25:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[8, 12, 16, 24], [17,, 19, 23]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());

app.post('/salesman/addActivity', function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
    var params, userId, activityEntity;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            params = req.body.params;
            userId = req.cookies.userId;
            activityEntity = new activityModel({
              projects: params.projects,
              activity_time: params.activity_time,
              address: params.address,
              remark: params.remark,
              create_man_id: userId,
              create_time: new Date(),
              organization_id: params.organization_id,
              estimated_number: params.estimated_number,
              registration_number: 0,
              sampling_number: 0,
              sample_status: 0,
              feedback_state: 0,
              last_modify_time: new Date(),
              last_modify_people_id: userId
            });
            _context2.next = 5;
            return activityEntity.save(function (err) {
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

app.post('/salesman/modifyActivity', function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res, next) {
    var params, userId;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            params = req.body.params;
            ;
            userId = req.cookies.userId;
            _context3.next = 5;
            return activityModel.update({ _id: params._id }, { $set: {
                projects: params.projects,
                activity_time: params.activity_time,
                address: params.address,
                remark: params.address,
                organization_id: params.organization_id,
                estimated_number: params.estimated_number,
                last_modify_time: new Date(),
                last_modify_people_id: userId
              } }, function (err) {
              if (err) {
                var data = {};
                data.result = "01";
                data.name = "操作失败";
                res.status(200).send(data);
              } else {
                var _data3 = {};
                _data3.result = "00";
                _data3.name = "操作成功";
                res.status(200).send(_data3);
              }
            });

          case 5:
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

app.get('/salesman/showReportDetail', function () {
  var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(req, res, next) {
    var _id, pageNo, pageSize, data;

    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _id = req.query._id;
            pageNo = req.query.pageNo || 1;
            pageSize = req.query.pageSize || 10;
            _context4.next = 5;
            return util.queryReportDetail(_id, pageNo, pageSize, res);

          case 5:
            data = _context4.sent;

            res.status(200).send(data);

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

app.get('/salesman/getProjects', function () {
  var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(req, res, next) {
    var projects;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            projects = projectModel.find({}, function (err) {
              if (err) {
                var data = {};
                data.result = "01";
                data.name = "操作失败";
                return res.status(200).send(data);
              }
            });

            res.status(200).send(projects);

          case 2:
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