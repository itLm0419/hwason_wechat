'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _organizations = require('../util/schema/organizations');

var _organizations2 = _interopRequireDefault(_organizations);

var _activities = require('../util/schema/activities');

var _activities2 = _interopRequireDefault(_activities);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function changeSingleDate(date) {
  var month = void 0;
  if ((date.getMonth() + 1).toString().length == 1) {
    month = "0" + (date.getMonth() + 1).toString();
  } else {
    month = (date.getMonth() + 1).toString();
  }

  return date.getYear() + 1900 + "/" + month + "/" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
}
module.exports = {
  queryOrg: function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(pageNo, pageSize, query, res) {
      var organizations, data, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, organization, org, project_category, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, project;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _organizations2.default.find(query, { code: 1, name: 1, create_time: 1, "projects.category": 1 }, function (err) {
                if (err) {
                  var _data = {};
                  _data.result = "01";
                  _data.name = "操作失败";
                  return res.status(200).send(_data);
                }
              }).skip((pageNo - 1) * pageSize).limit(pageSize);

            case 2:
              organizations = _context.sent;
              data = [];
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 7;
              _iterator = (0, _getIterator3.default)(organizations);

            case 9:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context.next = 41;
                break;
              }

              organization = _step.value;

              console.log(organization);
              org = {};

              org.name = organization.name;
              org.code = organization.code;
              org.create_time = changeSingleDate(organization.create_time);
              project_category = [];
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context.prev = 20;

              for (_iterator2 = (0, _getIterator3.default)(organization.projects); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                project = _step2.value;

                if (project_category.indexOf(project.category) == -1) {
                  project_category.push(project.category);
                }
              }
              _context.next = 28;
              break;

            case 24:
              _context.prev = 24;
              _context.t0 = _context['catch'](20);
              _didIteratorError2 = true;
              _iteratorError2 = _context.t0;

            case 28:
              _context.prev = 28;
              _context.prev = 29;

              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }

            case 31:
              _context.prev = 31;

              if (!_didIteratorError2) {
                _context.next = 34;
                break;
              }

              throw _iteratorError2;

            case 34:
              return _context.finish(31);

            case 35:
              return _context.finish(28);

            case 36:
              org.project_category = project_category;
              data.push(org);

            case 38:
              _iteratorNormalCompletion = true;
              _context.next = 9;
              break;

            case 41:
              _context.next = 47;
              break;

            case 43:
              _context.prev = 43;
              _context.t1 = _context['catch'](7);
              _didIteratorError = true;
              _iteratorError = _context.t1;

            case 47:
              _context.prev = 47;
              _context.prev = 48;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 50:
              _context.prev = 50;

              if (!_didIteratorError) {
                _context.next = 53;
                break;
              }

              throw _iteratorError;

            case 53:
              return _context.finish(50);

            case 54:
              return _context.finish(47);

            case 55:
              return _context.abrupt('return', data);

            case 56:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[7, 43, 47, 55], [20, 24, 28, 36], [29,, 31, 35], [48,, 50, 54]]);
    }));

    function queryOrg(_x, _x2, _x3, _x4) {
      return _ref.apply(this, arguments);
    }

    return queryOrg;
  }(),
  queryActivities: function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(pageNo, pageSize, query, res) {
      var result, data, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, activities, activity, organization;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _activities2.default.find(query, { _id: 1, activity_time: 1, projects: 1, address: 1, estimated_number: 1, organization_id: 1 }, function (err) {
                if (err) {
                  var _data2 = {};
                  _data2.result = "01";
                  _data2.name = "操作失败";
                  return res.status(200).send(_data2);
                }
              }).sort({ activity_time: -1 }).skip((pageNo - 1) * pageSize).limit(pageSize);

            case 2:
              result = _context2.sent;
              data = [];
              _iteratorNormalCompletion3 = true;
              _didIteratorError3 = false;
              _iteratorError3 = undefined;
              _context2.prev = 7;
              _iterator3 = (0, _getIterator3.default)(result);

            case 9:
              if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                _context2.next = 25;
                break;
              }

              activities = _step3.value;
              activity = {};
              _context2.next = 14;
              return _organizations2.default.findOne({ _id: activities.organization_id }, { name: 1 }, function (err) {
                if (err) {
                  var _data3 = {};
                  _data3.result = "01";
                  _data3.name = "操作失败";
                  return res.status(200).send(_data3);
                }
              });

            case 14:
              organization = _context2.sent;

              activity.organization_name = organization.name;
              activity._id = activities._id;
              activity.activity_time = changeSingleDate(activities.activity_time);
              activity.projects = activities.projects;
              activity.address = activities.address;
              activity.estimated_number = activities.estimated_number;
              data.push(activity);

            case 22:
              _iteratorNormalCompletion3 = true;
              _context2.next = 9;
              break;

            case 25:
              _context2.next = 31;
              break;

            case 27:
              _context2.prev = 27;
              _context2.t0 = _context2['catch'](7);
              _didIteratorError3 = true;
              _iteratorError3 = _context2.t0;

            case 31:
              _context2.prev = 31;
              _context2.prev = 32;

              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }

            case 34:
              _context2.prev = 34;

              if (!_didIteratorError3) {
                _context2.next = 37;
                break;
              }

              throw _iteratorError3;

            case 37:
              return _context2.finish(34);

            case 38:
              return _context2.finish(31);

            case 39:
              return _context2.abrupt('return', data);

            case 40:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[7, 27, 31, 39], [32,, 34, 38]]);
    }));

    function queryActivities(_x5, _x6, _x7, _x8) {
      return _ref2.apply(this, arguments);
    }

    return queryActivities;
  }(),
  queryReports: function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(pageNo, pageSize, query, res) {
      var result, data, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, activities, activity, organization;

      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _activities2.default.find(query, {
                _id: 1,
                activity_time: 1,
                projects: 1,
                address: 1,
                sample_status: 1,
                receiver: 1,
                feedback_state: 1,
                sampling_number: 1,
                organization_id: 1
              }, function (err) {
                if (err) {
                  var _data4 = {};
                  _data4.result = "01";
                  _data4.name = "操作失败";
                  return res.status(200).send(_data4);
                }
              }).sort({ activity_time: -1 }).skip((pageNo - 1) * pageSize).limit(pageSize);

            case 2:
              result = _context3.sent;
              data = [];
              _iteratorNormalCompletion4 = true;
              _didIteratorError4 = false;
              _iteratorError4 = undefined;
              _context3.prev = 7;
              _iterator4 = (0, _getIterator3.default)(result);

            case 9:
              if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                _context3.next = 28;
                break;
              }

              activities = _step4.value;
              activity = {};
              _context3.next = 14;
              return _organizations2.default.findOne({ _id: activities.organization_id }, { name: 1 }, function (err) {
                if (err) {
                  var _data5 = {};
                  _data5.result = "01";
                  _data5.name = "操作失败";
                  return res.status(200).send(_data5);
                }
              });

            case 14:
              organization = _context3.sent;

              activity.organization_name = organization.name;
              activity._id = activities._id;
              activity.activity_time = changeSingleDate(activities.activity_time);
              activity.projects = activities.projects;
              activity.address = activities.address;
              activity.sampling_number = activities.sampling_number;
              activity.feedback_state = activities.feedback_state;
              activity.receiver = activities.receiver;
              activity.feedback_state = activities.feedback_state;
              data.push(activity);

            case 25:
              _iteratorNormalCompletion4 = true;
              _context3.next = 9;
              break;

            case 28:
              _context3.next = 34;
              break;

            case 30:
              _context3.prev = 30;
              _context3.t0 = _context3['catch'](7);
              _didIteratorError4 = true;
              _iteratorError4 = _context3.t0;

            case 34:
              _context3.prev = 34;
              _context3.prev = 35;

              if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
              }

            case 37:
              _context3.prev = 37;

              if (!_didIteratorError4) {
                _context3.next = 40;
                break;
              }

              throw _iteratorError4;

            case 40:
              return _context3.finish(37);

            case 41:
              return _context3.finish(34);

            case 42:
              return _context3.abrupt('return', data);

            case 43:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this, [[7, 30, 34, 42], [35,, 37, 41]]);
    }));

    function queryReports(_x9, _x10, _x11, _x12) {
      return _ref3.apply(this, arguments);
    }

    return queryReports;
  }(),
  dateFormat: changeSingleDate
};