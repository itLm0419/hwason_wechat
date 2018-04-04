
'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var crypto = require('crypto');
var fs = require('fs');
var JSZip = require("jszip");
var xlsx = require('node-xlsx');
var activityModel = require('../../../util/schema/activities');
var organizationModel = require('../../../util/schema/organizations');
var loginModel = require('../../../util/schema/login');
var samplePackageModel = require('../../../util/schema/samplePackage');
var sampleMaterialModel = require('../../../util/schema/sampleMaterial');
var nurseModel = require('../../../util/schema/nurses');
var testModel = require('../../../util/schema/user');
module.exports = function (app) {
  var getFinishActivity = function () {
    var _ref20 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee20(organization_id, res) {
      var finishActivity;
      return _regenerator2.default.wrap(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              _context20.next = 2;
              return activityModel.find({ organization_id: organization_id, sample_status: { $gte: 1 } }, {
                _id: 1,
                activity_time: 1,
                sample_status: 1,
                projects: 1,
                sampling_number: 1,
                address: 1
              }, function (err) {
                if (err) {
                  var data = {};
                  data.result = "01";
                  data.name = "操作失败";
                  res.status(200).send(data);
                }
              });

            case 2:
              finishActivity = _context20.sent;
              return _context20.abrupt('return', finishActivity);

            case 4:
            case 'end':
              return _context20.stop();
          }
        }
      }, _callee20, this);
    }));

    return function getFinishActivity(_x58, _x59) {
      return _ref20.apply(this, arguments);
    };
  }();

  var getNoCheckedActivity = function () {
    var _ref21 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee21(organization_id) {
      var noCheckedActivity;
      return _regenerator2.default.wrap(function _callee21$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              _context21.next = 2;
              return activityModel.find({ organization_id: organization_id, feedback_state: { $in: [0, 1] } }, {
                _id: 1,
                activity_time: 1,
                projects: 1,
                address: 1,
                sampling_number: 1,
                sample_status: 1,
                receiver: 1,
                feedback_state: 1
              });

            case 2:
              noCheckedActivity = _context21.sent;
              return _context21.abrupt('return', noCheckedActivity);

            case 4:
            case 'end':
              return _context21.stop();
          }
        }
      }, _callee21, this);
    }));

    return function getNoCheckedActivity(_x60) {
      return _ref21.apply(this, arguments);
    };
  }();

  var getPackage = function () {
    var _ref22 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee22(organization_id, res) {
      var date, time, packages;
      return _regenerator2.default.wrap(function _callee22$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              date = new Date();
              time = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
              _context22.next = 4;
              return samplePackageModel.find({ organization_id: organization_id, state: 3, send_date: { $gte: time } }, {
                send_date: 1,
                courier_number: 1,
                sender: 1,
                contact: 1,
                receiver: 1
              }, function (err) {
                if (err) {
                  var data = {};
                  data.result = "01";
                  data.name = "操作失败";
                  res.status(200).send(data);
                }
              });

            case 4:
              packages = _context22.sent;
              return _context22.abrupt('return', packages);

            case 6:
            case 'end':
              return _context22.stop();
          }
        }
      }, _callee22, this);
    }));

    return function getPackage(_x61, _x62) {
      return _ref22.apply(this, arguments);
    };
  }();

  var getTodayActivity = function () {
    var _ref23 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee23(organization_id, year, month, day, res) {
      var date, begin, end, todayActivity;
      return _regenerator2.default.wrap(function _callee23$(_context23) {
        while (1) {
          switch (_context23.prev = _context23.next) {
            case 0:
              date = new Date(year, month, day);
              begin = new Date(date.getFullYear(), date.getMonth(), date.getDate());
              end = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);

              console.log(year, month, day);
              _context23.next = 6;
              return activityModel.find({
                organization_id: organization_id,
                activity_time: { $gte: begin, $lt: end }
              }, { _id: 1, activity_time: 1, projects: 1, address: 1, estimated_number: 1, nurses: 1 }, function (err) {
                if (err) {
                  var data = {};
                  data.result = "01";
                  data.name = "操作失败";
                  res.status(200).send(data);
                }
              });

            case 6:
              todayActivity = _context23.sent;
              return _context23.abrupt('return', todayActivity);

            case 8:
            case 'end':
              return _context23.stop();
          }
        }
      }, _callee23, this);
    }));

    return function getTodayActivity(_x63, _x64, _x65, _x66, _x67) {
      return _ref23.apply(this, arguments);
    };
  }();

  var getMaterialDetail = function () {
    var _ref24 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee24(id) {
      var materialDetail;
      return _regenerator2.default.wrap(function _callee24$(_context24) {
        while (1) {
          switch (_context24.prev = _context24.next) {
            case 0:
              _context24.next = 2;
              return materialDetailModel.find({ _id: id });

            case 2:
              materialDetail = _context24.sent;
              return _context24.abrupt('return', materialDetail);

            case 4:
            case 'end':
              return _context24.stop();
          }
        }
      }, _callee24, this);
    }));

    return function getMaterialDetail(_x68) {
      return _ref24.apply(this, arguments);
    };
  }();

  var getMonthActivities = function () {
    var _ref25 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee25(organization_id, year, month) {
      var date, begin, end, activities, days, i, index;
      return _regenerator2.default.wrap(function _callee25$(_context25) {
        while (1) {
          switch (_context25.prev = _context25.next) {
            case 0:
              date = new Date(year, month);
              begin = new Date(date.getFullYear(), date.getMonth());
              end = new Date(date.getFullYear(), date.getMonth() + 1);
              _context25.next = 5;
              return activityModel.find({
                'organization_id': organization_id,
                'activity_time': { $gte: begin, $lt: end }
              }, { 'activity_time': 1 }, function (err) {
                if (err) {
                  var data = {};
                  data.result = "01";
                  data.name = "操作失败";
                  res.status(200).send(data);
                }
              });

            case 5:
              activities = _context25.sent;
              days = [];

              if (activities != null) {
                for (i = 0; i < activities.length; i++) {
                  index = days.indexOf(activities[i].activity_time.getDate());

                  if (index == -1) days.push(activities[i].activity_time.getDate());
                }
              }
              return _context25.abrupt('return', days);

            case 9:
            case 'end':
              return _context25.stop();
          }
        }
      }, _callee25, this);
    }));

    return function getMonthActivities(_x69, _x70, _x71) {
      return _ref25.apply(this, arguments);
    };
  }();

  var getMaterials = function () {
    var _ref26 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee26(organization_id) {
      var materials;
      return _regenerator2.default.wrap(function _callee26$(_context26) {
        while (1) {
          switch (_context26.prev = _context26.next) {
            case 0:
              _context26.next = 2;
              return materialDetailModel.find({ organization_id: organization_id });

            case 2:
              materials = _context26.sent;
              return _context26.abrupt('return', materials);

            case 4:
            case 'end':
              return _context26.stop();
          }
        }
      }, _callee26, this);
    }));

    return function getMaterials(_x72) {
      return _ref26.apply(this, arguments);
    };
  }();

  var getMonthData = function () {
    var _ref27 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee27(year, month) {
      var json, lastMonthDays, lastMonth, nextMonth, firstDay, lastDay, totalDays, startDay, endDay, startDate, endDate, company_id, result, eventSet, i, dateStr, arr, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, item, formatSingeDate;

      return _regenerator2.default.wrap(function _callee27$(_context27) {
        while (1) {
          switch (_context27.prev = _context27.next) {
            case 0:
              formatSingeDate = function formatSingeDate(date) {
                return date.getMonth() + 1 + "-" + date.getDate();
              };

              json = date.getMonthDayOfWeekByMonth(year, month);
              lastMonthDays = json.lastMonthDays;
              lastMonth = json.lastMonth;
              nextMonth = json.nextMonth;
              firstDay = json.firstDay;
              lastDay = json.lastDay;
              totalDays = json.totalDays;
              startDay = void 0;

              if (firstDay == 0) {
                startDay = new Date(year, month, '01');
              } else {
                if (lastMonth == 11) {
                  startDay = new Date(parseInt(year) - 1, parseInt(lastMonth) - 1, lastMonthDays - (firstDay - 1));
                } else {
                  startDay = new Date(year, parseInt(lastMonth) - 1, lastMonthDays - (firstDay - 1));
                }
              }

              endDay = void 0;

              if (lastDay == 6) {
                endDay = new Date(parseInt(year), month, totalDays);
              } else {
                if (nextMonth == 0) {
                  endDay = new Date(parseInt(year) + 1, parseInt(nextMonth) - 1, 6 - lastDay);
                } else {
                  endDay = new Date(year, parseInt(nextMonth) - 1, 6 - lastDay);
                }
              }

              startDate = new Date(startDay.getYear() + 1900, startDay.getMonth(), startDay.getDate(), startDay.getHours() + 8);
              endDate = new Date(endDay.getYear() + 1900, endDay.getMonth(), endDay.getDate() + 1, endDay.getHours() + 8);
              company_id = 1;
              _context27.next = 17;
              return companyScheduleModel.find({ 'company_id': company_id }).where('time').gt(startDate).lt(endDate);

            case 17:
              result = _context27.sent;
              eventSet = new _set2.default();

              if (result != null) {
                for (i = 0; i < result.length; i++) {
                  dateStr = formatSingeDate(result[i].time);

                  eventSet.add(dateStr);
                }
              }

              arr = new Array();
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context27.prev = 24;


              for (_iterator2 = (0, _getIterator3.default)(eventSet); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                item = _step2.value;

                arr.push(item);
              }
              _context27.next = 32;
              break;

            case 28:
              _context27.prev = 28;
              _context27.t0 = _context27['catch'](24);
              _didIteratorError2 = true;
              _iteratorError2 = _context27.t0;

            case 32:
              _context27.prev = 32;
              _context27.prev = 33;

              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }

            case 35:
              _context27.prev = 35;

              if (!_didIteratorError2) {
                _context27.next = 38;
                break;
              }

              throw _iteratorError2;

            case 38:
              return _context27.finish(35);

            case 39:
              return _context27.finish(32);

            case 40:
              json.eventArr = arr;

              return _context27.abrupt('return', json);

            case 42:
            case 'end':
              return _context27.stop();
          }
        }
      }, _callee27, this, [[24, 28, 32, 40], [33,, 35, 39]]);
    }));

    return function getMonthData(_x73, _x74) {
      return _ref27.apply(this, arguments);
    };
  }();

  app.get('/wechat/company/consultation/consultation', function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
      var userId, user, organization, organization_id, date, year, month, day, todayActivity, noCheckedActivity, data;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              userId = req.cookies.userId;
              _context.next = 3;
              return loginModel.findOne({ '_id': userId }, { _id: 1 });

            case 3:
              user = _context.sent;
              _context.next = 6;
              return organizationModel.findOne({ manager_id: user._id }, { _id: 1 }, function (err) {
                if (err) {
                  var _data = {};
                  _data.result = "01";
                  _data.name = "操作失败";
                  res.status(200).send(_data);
                }
              });

            case 6:
              organization = _context.sent;
              organization_id = organization._id;

              res.cookie('organization_id', organization_id);
              date = new Date();
              year = date.getFullYear();
              month = date.getMonth();
              day = date.getDate();
              _context.next = 15;
              return getTodayActivity(organization_id, year, month, day, res);

            case 15:
              todayActivity = _context.sent;
              _context.next = 18;
              return getNoCheckedActivity(organization_id, res);

            case 18:
              noCheckedActivity = _context.sent;
              data = {};

              data.todayActivity = todayActivity;
              data.noCheckedActivity = noCheckedActivity;
              res.status(200).send(data);

            case 23:
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

  app.get('/wechat/company/activity/main', function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
      var organization_id, date, year, month, day, activity_days, todayActivity, data;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              organization_id = req.cookies.organization_id;
              date = new Date();
              year = date.getFullYear();
              month = date.getMonth();
              day = date.getDate();
              _context2.next = 7;
              return getMonthActivities(organization_id, year, month, res);

            case 7:
              activity_days = _context2.sent;
              _context2.next = 10;
              return getTodayActivity(organization_id, year, month, day, res);

            case 10:
              todayActivity = _context2.sent;
              data = {};

              data.activity_days = activity_days;
              data.todayActivity = todayActivity;
              res.status(200).send(data);

            case 15:
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

  app.get('/wechat/company/activity/getMonthActivities', function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res, next) {
      var organization_id, year, month, activity_days;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              organization_id = req.cookies.organization_id;
              year = parseInt(req.query.year);
              month = parseInt(req.query.month) - 1;
              _context3.next = 5;
              return getMonthActivities(organization_id, year, month, res);

            case 5:
              activity_days = _context3.sent;

              res.status(200).send(activity_days);

            case 7:
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

  app.get('/wechat/company/activity/getTodayActivity', function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(req, res, next) {
      var organization_id, year, month, day, todayActivity;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              organization_id = req.cookies.organization_id;
              year = parseInt(req.query.year);
              month = parseInt(req.query.month) - 1;
              day = parseInt(req.query.day);
              _context4.next = 6;
              return getTodayActivity(organization_id, year, month, day);

            case 6:
              todayActivity = _context4.sent;

              res.status(200).send(todayActivity);

            case 8:
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

  app.post('/wechat/company/activity/doAdd', function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(req, res, next) {
      var data, project, activityTime, address, peopleNum, remark, createTime, organization_id, userId, activityEntity;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              data = req.body.params;
              project = data.project;
              activityTime = data.activityTime;
              address = data.address;
              peopleNum = data.peopleNum;
              remark = data.remark;
              createTime = new Date();
              organization_id = req.cookies.organization_id;
              userId = req.cookies.userId;
              activityEntity = new activityModel({
                projects: project,
                activity_time: activityTime,
                address: address,
                remark: remark,
                create_man_id: userId,
                create_time: createTime,
                organization_id: organization_id,
                estimated_number: peopleNum,
                registration_number: 0,
                sampling_number: 0,
                sample_status: 0,
                feedback_state: 0 });


              activityEntity.save(function (err) {
                if (err) {
                  var _data2 = {};
                  _data2.result = "01";
                  _data2.name = "操作失败";
                  res.status(200).send(_data2);
                } else {
                  var _data3 = {};
                  _data3.result = "02";
                  _data3.name = "操作成功";
                  res.status(200).send(_data3);
                }
              });

            case 11:
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

  app.get('/wechat/company/activity/getProjects', function () {
    var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(req, res, next) {
      var organization_id, organization, data, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, project;

      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              organization_id = req.cookies.organization_id;
              _context6.next = 3;
              return organizationModel.findOne({ _id: organization_id }, { projects: 1 }, function (err) {
                if (err) {
                  var _data4 = {};
                  _data4.result = "01";
                  _data4.name = "操作失败";
                  return res.status(200).send(_data4);
                }
              });

            case 3:
              organization = _context6.sent;
              data = new _set2.default();
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context6.prev = 8;

              for (_iterator = (0, _getIterator3.default)(organization.projects); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                project = _step.value;

                data.add(project.category);
              }
              _context6.next = 16;
              break;

            case 12:
              _context6.prev = 12;
              _context6.t0 = _context6['catch'](8);
              _didIteratorError = true;
              _iteratorError = _context6.t0;

            case 16:
              _context6.prev = 16;
              _context6.prev = 17;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 19:
              _context6.prev = 19;

              if (!_didIteratorError) {
                _context6.next = 22;
                break;
              }

              throw _iteratorError;

            case 22:
              return _context6.finish(19);

            case 23:
              return _context6.finish(16);

            case 24:
              res.status(200).send(data);

            case 25:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this, [[8, 12, 16, 24], [17,, 19, 23]]);
    }));

    return function (_x16, _x17, _x18) {
      return _ref6.apply(this, arguments);
    };
  }());

  app.get('/wechat/company/activity/modify', function () {
    var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(req, res, next) {
      var data, result;
      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              data = req.query;
              _context7.next = 3;
              return activityModel.find({ '_id': data.id }, {
                _id: 1,
                projects: 1,
                activity_time: 1,
                address: 1,
                estimated_number: 1,
                remark: 1
              }, function (err) {
                if (err) {
                  var _data5 = {};
                  _data5.result = "01";
                  _data5.name = "操作失败";
                  res.status(200).send(_data5);
                }
              });

            case 3:
              result = _context7.sent;

              res.status(200).send(result);

            case 5:
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

  app.post('/wechat/company/activity/doModify', function () {
    var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(req, res, next) {
      var data;
      return _regenerator2.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              data = req.body.params;
              _context8.next = 3;
              return activityModel.update({
                _id: data.id
              }, {
                $set: {
                  projects: data.projects,
                  activity_time: data.activity_time,
                  address: data.address,
                  peopleNum: data.peopleNum,
                  remark: data.remark
                }
              }, function (err) {
                if (err) {
                  var _data6 = {};
                  _data6.result = "01";
                  _data6.name = "操作失败";
                  res.status(200).send(_data6);
                } else {
                  var _data7 = {};
                  _data7.result = "02";
                  _data7.name = "操作成功";
                  res.status(200).send(_data7);
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

  app.post('/wechat/company/activity/remove', function () {
    var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9(req, res, next) {
      var id;
      return _regenerator2.default.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              id = req.body.params.id;
              _context9.next = 3;
              return activityModel.remove({ _id: id }, function (err) {
                if (err) {
                  var data = {};
                  data.result = "01";
                  data.name = "操作失败";
                  res.status(200).send(data);
                } else {
                  var _data8 = {};
                  _data8.result = "02";
                  _data8.name = "操作成功";
                  res.status(200).send(_data8);
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

  app.get('/wechat/company/activity/list', function () {
    var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10(req, res, next) {
      var organization_id, finishActivity;
      return _regenerator2.default.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              organization_id = req.cookies.organization_id;
              _context10.next = 3;
              return getFinishActivity(organization_id, res);

            case 3:
              finishActivity = _context10.sent;

              res.status(200).send(finishActivity);

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

  app.get('/wechat/company/package/package', function () {
    var _ref11 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee11(req, res, next) {
      var organization_id, packages;
      return _regenerator2.default.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              organization_id = req.cookies.organization_id;
              _context11.next = 3;
              return getPackage(organization_id, res);

            case 3:
              packages = _context11.sent;

              res.status(200).send(packages);

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

  app.get('/wechat/company/package/apply', function () {
    var _ref12 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee12(req, res, next) {
      var organization_id, inspectionPackages, index;
      return _regenerator2.default.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              organization_id = req.cookies.organization_id;
              _context12.next = 3;
              return samplePackageModel.find({ organization_id: organization_id });

            case 3:
              inspectionPackages = _context12.sent;
              index = inspectionPackages.length + 1;

              res.status(200).send(index);

            case 6:
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

  app.get('/wechat/company/package/confirm', function () {
    var _ref13 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee13(req, res, next) {
      var param, organization_id, samplePackageEntity;
      return _regenerator2.default.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              param = req.query;
              organization_id = req.cookies.organization_id;
              samplePackageEntity = samplePackageModel({
                organization_id: organization_id,
                gene_package: param.geneNum,
                senior_package: param.topNum,
                apply_date: new Date(),
                state: 1
              });
              _context13.next = 5;
              return samplePackageEntity.save(function (err) {
                if (err) {
                  var data = {};
                  data.result = "01";
                  data.name = "操作失败";
                  res.status(200).send(data);
                } else {
                  var _data9 = {};
                  _data9.result = "02";
                  _data9.name = "操作成功";
                  res.status(200).send(_data9);
                }
              });

            case 5:
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

  app.post('/wechat/company/package/detail/download', function () {
    var _ref14 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee14(req, res, next) {
      var zip, data, i, arr, buffer, organizationName, date, excelName;
      return _regenerator2.default.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              zip = new JSZip();
              data = [];

              for (i = 0; i < 5; i++) {
                arr = [];

                arr.push("ssss");
                arr.push("dddd");
                arr.push("cccc");
                arr.push("vvvv");
                arr.push("mmmm");
                data.push(arr);
              }
              buffer = xlsx.build([{
                name: 'sheet1',
                data: data
              }]);
              organizationName = "qqqq";
              date = new Date();
              excelName = 'E:/excel/' + organizationName + '.xlsx';

              fs.writeFileSync(excelName, buffer, { 'flag': 'w' });
              zip.file(organizationName + changeSingleDate(date) + '.xlsx', excelName);
              zip.generateAsync({ type: "nodebuffer" }).then(function (content) {
                fs.writeFile('e://package.zip', content, function (err) {
                  if (err) throw err;
                  res.download('e://package.zip');
                });
              });

            case 10:
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

  app.get('/wechat/company/package/detail', function () {
    var _ref15 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee15(req, res, next) {
      var organization_id, date, time;
      return _regenerator2.default.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              organization_id = req.cookies.organization_id;
              date = new Date();
              time = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
              _context15.next = 5;
              return sampleMaterialModel.find({ organization_id: organization_id, state: 3, send_date: { $gte: time } }, {
                _id: 1,
                send_date: 1,
                courier_number: 1,
                sender: 1,
                contact: 1,
                receiver: 1 }, function (err, content) {
                if (err) {
                  var data = {};
                  data.result = "01";
                  data.name = "操作失败";
                  res.status(200).send(data);
                } else {
                  res.status(200).send(content);
                }
              });

            case 5:
            case 'end':
              return _context15.stop();
          }
        }
      }, _callee15, this);
    }));

    return function (_x43, _x44, _x45) {
      return _ref15.apply(this, arguments);
    };
  }());

  app.get('/wechat/company/package/detailForm', function () {
    var _ref16 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee16(req, res, next) {
      var id;
      return _regenerator2.default.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              id = req.query.id;
              _context16.next = 3;
              return sampleMaterialModel.findOne({ _id: id }, { organization_id: 0,
                state: 0,
                apply_date: 0,
                applicant: 0,
                send_date: 0,
                courier_number: 0,
                courier_company: 0,
                sender: 0,
                contact: 0,
                receiver: 0 }, function (err, content) {
                if (err) {
                  var data = {};
                  data.result = "01";
                  data.name = "操作失败";
                  res.status(200).send(data);
                } else {
                  res.status(200).send(content);
                }
              });

            case 3:
            case 'end':
              return _context16.stop();
          }
        }
      }, _callee16, this);
    }));

    return function (_x46, _x47, _x48) {
      return _ref16.apply(this, arguments);
    };
  }());

  app.get('/wechat/company/demo/demo', function () {
    var _ref17 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee17(req, res, next) {
      var organization_id;
      return _regenerator2.default.wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              organization_id = req.cookies.organization_id;
              _context17.next = 3;
              return activityModel.find({ organization_id: organization_id }, {
                _id: 1,
                activity_time: 1,
                projects: 1,
                address: 1,
                sampling_number: 1
              }, function (err, content) {
                if (err) {
                  var data = {};
                  data.result = "01";
                  data.name = "操作失败";
                  res.status(200).send(data);
                } else {
                  res.status(200).send(content);
                }
              });

            case 3:
            case 'end':
              return _context17.stop();
          }
        }
      }, _callee17, this);
    }));

    return function (_x49, _x50, _x51) {
      return _ref17.apply(this, arguments);
    };
  }());

  app.get('/wechat/company/demo/demoDetail', function () {
    var _ref18 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee18(req, res, next) {
      var id, activity, users, data;
      return _regenerator2.default.wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              id = req.query.id;
              _context18.next = 3;
              return activityModel.find({ _id: id }, { projects: 1, activity_time: 1 });

            case 3:
              activity = _context18.sent;
              _context18.next = 6;
              return testModel.find({ activity_id: id.toString(), sampled: true }, {
                _id: 1,
                code: 1,
                name: 1,
                sex: 1,
                birthday: 1,
                projects: 1,
                cardNo: 1
              });

            case 6:
              users = _context18.sent;
              data = {};

              data.user = users;
              data.activity = activity;
              res.status(200).send(data);

            case 11:
            case 'end':
              return _context18.stop();
          }
        }
      }, _callee18, this);
    }));

    return function (_x52, _x53, _x54) {
      return _ref18.apply(this, arguments);
    };
  }());

  app.get('/wechat/company/demo/check', function () {
    var _ref19 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee19(req, res, next) {
      var id;
      return _regenerator2.default.wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              id = req.query.id;
              _context19.next = 3;
              return activityModel.update({ _id: id }, { $set: { feedback_state: 0 } }, function (err, content) {
                if (err) {
                  if (err) {
                    var data = {};
                    data.result = "01";
                    data.name = "操作失败";
                    res.status(200).send(data);
                  }
                } else {
                  res.status(200).send(content);
                }
              });

            case 3:
            case 'end':
              return _context19.stop();
          }
        }
      }, _callee19, this);
    }));

    return function (_x55, _x56, _x57) {
      return _ref19.apply(this, arguments);
    };
  }());

  function changeSingleDate(date) {
    return date.getYear() + 1900 + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getMinutes();
  }
};