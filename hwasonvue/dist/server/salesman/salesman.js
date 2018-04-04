'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _common = require('../util/common.js');

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userModel = require('../util/schema/user');
var userActivityModel = require('../util/schema/userActivities');
var activityModel = require('../util/schema/activities');
var loginModel = require('../util/schema/login');
var projects2Model = require('../util/schema/projects2');
var organizationModel = require('../util/schema/organizations');

var salesmanModel = require('../util/schema/salesman');

module.exports = function (app) {
  var getTestMansByUserId = function () {
    var _ref12 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee12(userId) {
      return _regenerator2.default.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              return _context12.abrupt('return', users);

            case 1:
            case 'end':
              return _context12.stop();
          }
        }
      }, _callee12, this);
    }));

    return function getTestMansByUserId(_x32) {
      return _ref12.apply(this, arguments);
    };
  }();

  var getTodayActivityByUserId = function () {
    var _ref13 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee13(userId) {
      return _regenerator2.default.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
            case 'end':
              return _context13.stop();
          }
        }
      }, _callee13, this);
    }));

    return function getTodayActivityByUserId(_x33) {
      return _ref13.apply(this, arguments);
    };
  }();

  var getTestMansBySalesmanId = function () {
    var _ref14 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee14(userId) {
      var date, begin, end, users;
      return _regenerator2.default.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              date = new Date();
              begin = new Date(date.getFullYear(), date.getMonth(), date.getDate());
              end = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
              _context14.next = 5;
              return userModel.find({ salesman_id: userId.toString() }, { name: 1, sex: 1, projects: 1 }).where('createTime').gte(begin).lt(end);

            case 5:
              users = _context14.sent;
              return _context14.abrupt('return', users);

            case 7:
            case 'end':
              return _context14.stop();
          }
        }
      }, _callee14, this);
    }));

    return function getTestMansBySalesmanId(_x34) {
      return _ref14.apply(this, arguments);
    };
  }();

  app.get('/wechat/salesman/index', function (req, res, next) {
    res.render('wechat/salesman/index');
  });

  app.get('/wechat/salesman/siteActivity', function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
      var userId, date, begin, end, userActivity, data, i, user, j, result;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              userId = req.cookies.userId;
              date = new Date();
              begin = new Date(date.getFullYear(), date.getMonth(), date.getDate());
              end = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
              _context.next = 6;
              return userActivityModel.find({ "salesman.id": userId, create_time: { $gte: begin, $lt: end } }, { projects: 1, checked: 1, userId: 1, organization_id: 1, sampled: 1, test_number: 1 }, function (err) {
                if (err) {
                  var _data = {};
                  _data.result = "01";
                  _data.name = "操作失败";
                  return res.status(200).send(_data);
                }
              });

            case 6:
              userActivity = _context.sent;
              data = [];
              i = 0;

            case 9:
              if (!(i < userActivity.length)) {
                _context.next = 28;
                break;
              }

              user = {};

              for (j = 0; j < userActivity[i].projects.length; j++) {
                if (j == 0) user.projects = userActivity[i].projects[j];else {
                  user.projects = user.projects + '+' + userActivity[i].projects[j];
                }
              }
              user.projects = user.projects + "体检套餐";
              user.activity_id = userActivity[i].activity_id;
              user.organization_id = userActivity[i].organization_id;
              user.id = userActivity[i]._id;
              user.test_number = userActivity[i].test_number;

              if (userActivity[i].checked == false) {
                user.checked = "未核对";
              } else if (userActivity[i].sampled == true) {
                user.checked = "已采样";
              } else {
                user.checked = "未采样";
              }

              _context.next = 20;
              return userModel.findOne({ _id: userActivity[i].userId }, { name: 1, sex: 1 }, function (err) {
                if (err) {
                  var _data2 = {};
                  _data2.result = "01";
                  _data2.name = "操作失败";
                  return res.status(200).send(_data2);
                }
              });

            case 20:
              result = _context.sent;

              user.user_id = result._id;
              user.name = result.name;
              user.sex = result.sex;
              data.push(user);

            case 25:
              i++;
              _context.next = 9;
              break;

            case 28:
              return _context.abrupt('return', res.status(200).send(data));

            case 29:
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

  app.post('/wechat/salesman/confirm', function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
      var userId;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              userId = req.body.params.userId;
              _context2.next = 3;
              return userActivityModel.update({ userId: userId }, { $set: { checked: true } }, function (err) {
                if (err) {
                  var data = {};
                  data.result = "01";
                  data.name = "操作失败";
                  return res.status(200).send(data);
                } else {
                  var _data3 = {};
                  _data3.result = "00";
                  _data3.name = "操作成功";
                  return res.status(200).send(_data3);
                }
              });

            case 3:
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

  app.get('/wechat/salesman/customerMsg', function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res, next) {
      var userId, salesman, date, begin, activities, data, i, activity, num, j;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              userId = req.cookies.userId;
              _context3.next = 3;
              return salesmanModel.findOne({ _id: userId }, { organization_id: 1 }, function (err) {
                if (err) {
                  var _data4 = {};
                  _data4.result = "01";
                  _data4.name = "操作失败";
                  return res.status(200).send(_data4);
                }
              });

            case 3:
              salesman = _context3.sent;
              date = new Date();
              begin = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
              _context3.next = 8;
              return activityModel.find({ organization_id: salesman.organization_id, "activity_time": { $gte: begin } }, { _id: 1, projects: 1, address: 1, sample_status: 1, activity_time: 1 }, function (err) {
                if (err) {
                  var _data5 = {};
                  _data5.result = "01";
                  _data5.name = "操作失败";
                  return res.status(200).send(_data5);
                }
              });

            case 8:
              activities = _context3.sent;
              data = [];

              if (!(activities != null)) {
                _context3.next = 21;
                break;
              }

              i = 0;

            case 12:
              if (!(i < activities.length)) {
                _context3.next = 21;
                break;
              }

              activity = {};
              _context3.next = 16;
              return userActivityModel.count({ "salesman.id": userId, activity_id: activities[i]._id, sampled: true }, function (err) {
                if (err) {
                  var _data6 = {};
                  _data6.result = "01";
                  _data6.name = "操作失败";
                  return res.status(200).send(_data6);
                }
              });

            case 16:
              num = _context3.sent;

              if (num != 0) {
                activity.activity_id = activities[i]._id;
                for (j = 0; j < activities[i].projects.length; j++) {
                  if (j == 0) {
                    activity.projects = activities[i].projects[j];
                  } else {
                    activity.projects = activity.projects + '+' + activities[i].projects[j];
                  }
                }
                activity.activity_time = changeSingleDate(activities[i].activity_time);
                activity.address = activities[i].address;

                if (activities[i].sample_status == 0) {
                  activity.sample_status = '未开始';
                } else if (activities[i].sample_status == 1) {
                  activity.sample_status = '运输中';
                } else if (activities[i].sample_status == 2) {
                  activity.sample_status = '检测中';
                } else if (activities[i].sample_status == 3) {
                  activity.sample_status = '检测结束';
                } else if (activities[i].sample_status == 4) {
                  activity.sample_status = '报告在途中';
                } else if (activities[i].sample_status == 5) {
                  activity.sample_status = '已接收';
                } else if (activities[i].sample_status == 10) {
                  activity.sample_status = '活动开始';
                } else if (activities[i].sample_status == 5) {
                  activity.sample_status = '活动结束';
                }
                activity.num = num;
                data.push(activity);
              }

            case 18:
              i++;
              _context3.next = 12;
              break;

            case 21:
              return _context3.abrupt('return', res.status(200).send(data));

            case 22:
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

  app.get('/wechat/salesman/getTodayActivity', function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(req, res, next) {
      var userId, salesman, date, begin, end, activities, data, i, activity;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              userId = req.cookies.userId;
              _context4.next = 3;
              return salesmanModel.findOne({ _id: userId }, { organization_id: 1 }, function (err) {
                if (err) {
                  var _data7 = {};
                  _data7.result = "01";
                  _data7.name = "操作失败";
                  return res.status(200).send(_data7);
                }
              });

            case 3:
              salesman = _context4.sent;
              date = new Date();
              begin = new Date(date.getFullYear(), date.getMonth(), date.getDate());
              end = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
              _context4.next = 9;
              return activityModel.find({ organization_id: salesman.organization_id, activity_time: { $gte: begin, $lt: end } }, { _id: 1, activity_time: 1, address: 1 }, function (err) {
                if (err) {
                  var _data8 = {};
                  _data8.result = "01";
                  _data8.name = "操作失败";
                  return res.status(200).send(_data8);
                }
              });

            case 9:
              activities = _context4.sent;
              data = [];

              for (i = 0; i < activities.length; i++) {
                activity = {};

                activity.activity_time = changeSingleDate(activities[i].activity_time);
                activity.address = activities[i].address;
                activity.activity_id = activities[i]._id;
                data.push(activity);
              }

              return _context4.abrupt('return', res.status(200).send(data));

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

  app.post('/wechat/salesman/addCustomer', function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(req, res, next) {
      var salesman_id, params, user, userId, userEntity, userActivity0, data, activity, salesman, login, userActivityEntity;
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              salesman_id = req.cookies.userId;
              params = req.body;
              _context6.next = 4;
              return userModel.findOne({ IDNo: params.IDNo }, { _id: 1 }, function (err) {
                if (err) {
                  var data = {};
                  data.result = "01";
                  data.name = "操作失败";
                  return res.status(200).send(data);
                }
              });

            case 4:
              user = _context6.sent;
              userId = void 0;

              if (!(user == null)) {
                _context6.next = 12;
                break;
              }

              userEntity = new userModel({
                name: params.name,
                sex: params.sex,
                tel: params.tel,
                IDNo: params.IDNo,
                createTime: new Date(),
                birthday: new Date(params.birthday.substr(0, 4) + '/' + params.birthday.substr(4, 2) + '/' + params.birthday.substr(6, 2))
              });
              _context6.next = 10;
              return userEntity.save(function (err, content) {
                if (err) {
                  var data = {};
                  data.result = "01";
                  data.name = "操作失败";
                  return res.status(200).send(data);
                } else {
                  userId = content._id;
                }
              });

            case 10:
              _context6.next = 22;
              break;

            case 12:
              userId = user._id;

              _context6.next = 15;
              return userActivityModel.findOne({ activity_id: params.activity_id, userId: userId }, { _id: 1 }, function (err) {
                if (err) {
                  var data = {};
                  data.result = "01";
                  data.name = "操作失败";
                  return res.status(200).send(data);
                }
              });

            case 15:
              userActivity0 = _context6.sent;

              console.log("userActivity0", userActivity0);

              if (!(userActivity0 != null)) {
                _context6.next = 22;
                break;
              }

              data = {};

              data.result = "06";
              data.name = "用户本场活动已经录入，不要重复提交";
              return _context6.abrupt('return', res.status(200).send(data));

            case 22:
              _context6.next = 24;
              return activityModel.findOneAndUpdate({ _id: params.activity_id }, { $inc: { registration_number: 1 } }, { new: true });

            case 24:
              activity = _context6.sent;

              if (!(activity != null && activity.registration_number == 1)) {
                _context6.next = 28;
                break;
              }

              _context6.next = 28;
              return activityModel.update({ '_id': params.activity_id
              }, { $set: {
                  sample_status: 10
                } }, function () {
                var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(err) {
                  var _data9;

                  return _regenerator2.default.wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          if (!err) {
                            _context5.next = 5;
                            break;
                          }

                          _data9 = {};

                          _data9.result = "01";
                          _data9.name = "操作失败";
                          return _context5.abrupt('return', res.status(200).send(_data9));

                        case 5:
                        case 'end':
                          return _context5.stop();
                      }
                    }
                  }, _callee5, this);
                }));

                return function (_x16) {
                  return _ref6.apply(this, arguments);
                };
              }());

            case 28:
              salesman = {};
              _context6.next = 31;
              return loginModel.findOne({ _id: salesman_id }, { _id: 1, realName: 1, tel: 1 }, function (err) {
                if (err) {
                  var _data10 = {};
                  _data10.result = "01";
                  _data10.name = "操作失败";
                  return res.status(200).send(_data10);
                }
              });

            case 31:
              login = _context6.sent;

              salesman.id = login._id;
              salesman.name = login.realName;
              salesman.tel = login.tel;
              userActivityEntity = new userActivityModel({
                userId: userId,
                name: params.name,
                IDNo: params.IDNo,
                barcode: '',
                checked: true,
                doubleChecked: false,
                nurse: {},
                organization_id: activity.organization_id,
                activity_id: params.activity_id,
                test_number: activity.registration_number,
                create_time: new Date(),
                sample_time: new Date("2000-01-01"),
                salesman: salesman,
                projects: params.projects,
                projects2: params.projects2,
                category: params.category,
                sampled: false,
                doctor_advise_status: 10
              });
              _context6.next = 38;
              return userActivityEntity.save(function (err) {
                if (err) {
                  var _data11 = {};
                  _data11.result = "01";
                  _data11.name = "操作失败";
                  return res.status(200).send(_data11);
                } else {
                  var _data12 = {};
                  _data12.test_number = activity.registration_number;
                  return res.status(200).send(_data12);
                }
              });

            case 38:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    return function (_x13, _x14, _x15) {
      return _ref5.apply(this, arguments);
    };
  }());

  app.get('/wechat/salesman/customerDetail', function () {
    var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(req, res, next) {
      var userActivities_id, user_id, data, userActivity, j, activity, user, salesman_id, login;
      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              userActivities_id = req.query.userActivities_id;
              user_id = req.query.user_id;
              data = {};
              _context7.next = 5;
              return userActivityModel.findOne({ _id: userActivities_id }, { projects: 1, activity_id: 1, salesman: 1 }, function (err) {
                if (err) {
                  var _data13 = {};
                  _data13.result = "01";
                  _data13.name = "操作失败";
                  return res.status(200).send(_data13);
                }
              });

            case 5:
              userActivity = _context7.sent;


              for (j = 0; j < userActivity.projects.length; j++) {
                if (j == 0) data.projects = userActivity.projects[j];else {
                  data.projects = data.projects + '+' + userActivity.projects[j];
                }
              }
              _context7.next = 9;
              return activityModel.findOne({ _id: userActivity.activity_id }, { activity_time: 1, address: 1 }, function (err) {
                if (err) {
                  var _data14 = {};
                  _data14.result = "01";
                  _data14.name = "操作失败";
                  return res.status(200).send(_data14);
                }
              });

            case 9:
              activity = _context7.sent;

              if (activity != null) {
                data.activity_time = _common2.default.changeSingleDate(activity.activity_time);
                data.address = activity.address;
              }
              _context7.next = 13;
              return userModel.findOne({ _id: user_id }, { name: 1, sex: 1, tel: 1, IDNo: 1 }, function (err) {
                if (err) {
                  var _data15 = {};
                  _data15.result = "01";
                  _data15.name = "操作失败";
                  return res.status(200).send(_data15);
                }
              });

            case 13:
              user = _context7.sent;

              if (user != null) {
                data.name = user.name;
                data.sex = user.sex;
                data.tel = user.tel;
                data.IDNo = user.IDNo;
                data.userId = user_id;
              }
              salesman_id = userActivity.salesman.id;
              _context7.next = 18;
              return loginModel.findOne({ _id: salesman_id }, { userName: 1, realName: 1, tel: 1 }, function (err) {
                if (err) {
                  var _data16 = {};
                  _data16.result = "01";
                  _data16.name = "操作失败";
                  return res.status(200).send(_data16);
                }
              });

            case 18:
              login = _context7.sent;

              if (login != null) {
                data.salesman_name = login.realName;
                data.salesman_number = login.userName;
                data.salesman_name_tel = login.tel;
              }
              return _context7.abrupt('return', res.status(200).send(data));

            case 21:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    return function (_x17, _x18, _x19) {
      return _ref7.apply(this, arguments);
    };
  }());

  app.get('/wechat/salesman/stateCustomerDetail', function () {
    var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(req, res, next) {
      var salesman_id, activity_id, userActivity, data, _data17, i, user, j, _id, result;

      return _regenerator2.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              salesman_id = req.cookies.userId;
              activity_id = req.query.activity_id;
              _context8.next = 4;
              return userActivityModel.find({ "salesman.id": salesman_id, "activity_id": activity_id, sampled: true }, { userId: 1, projects: 1 }, function (err) {
                if (err) {
                  var data = {};
                  data.result = "01";
                  data.name = "操作失败";
                  return res.status(200).send(data);
                }
              });

            case 4:
              userActivity = _context8.sent;

              if (!(userActivity.length == 0)) {
                _context8.next = 12;
                break;
              }

              data = {};

              data.result = "02";
              data.name = "没有数据";
              return _context8.abrupt('return', res.status(200).send(data));

            case 12:
              _data17 = [];
              i = 0;

            case 14:
              if (!(i < userActivity.length)) {
                _context8.next = 30;
                break;
              }

              user = {};


              for (j = 0; j < userActivity[i].projects.length; j++) {
                if (j == 0) user.projects = userActivity[i].projects[j];else {
                  user.projects = user.projects + '+' + userActivity[i].projects[j];
                }
              }

              _id = userActivity[i].userId;
              _context8.next = 20;
              return userModel.findOne({ _id: _id }, { name: 1, sex: 1 }, function (err) {
                if (err) {
                  var _data18 = {};
                  _data18.result = "01";
                  _data18.name = "操作失败";
                  return res.status(200).send(_data18);
                }
              });

            case 20:
              result = _context8.sent;

              user.activity_id = userActivity[i].activity_id;
              user.userActivity_id = userActivity[i]._id;
              user.user_id = result._id;
              user.name = result.name;
              user.sex = result.sex;
              _data17.push(user);

            case 27:
              i++;
              _context8.next = 14;
              break;

            case 30:
              return _context8.abrupt('return', res.status(200).send(_data17));

            case 31:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    return function (_x20, _x21, _x22) {
      return _ref8.apply(this, arguments);
    };
  }());

  app.post('/wechat/salesman/modifyCustomer2', function () {
    var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9(req, res, next) {
      var params;
      return _regenerator2.default.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              params = req.body;
              _context9.next = 3;
              return userActivityModel.update({ _id: params.userActivities_id }, { $set: { checked: true } }, function (err) {
                if (err) {
                  var data = {};
                  data.result = "01";
                  data.name = "操作失败";
                  return res.status(200).send(data);
                } else {
                  var _data19 = {};
                  _data19.result = "00";
                  _data19.name = "操作成功";
                  return res.status(200).send(_data19);
                }
              });

            case 3:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }));

    return function (_x23, _x24, _x25) {
      return _ref9.apply(this, arguments);
    };
  }());

  app.post('/wechat/salesman/modifyCustomer', function () {
    var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10(req, res, next) {
      var params, userId, salesman, data;
      return _regenerator2.default.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              params = req.body;
              userId = req.cookies.userId;
              _context10.next = 4;
              return userModel.update({ _id: params.user_id }, { $set: { name: params.name, sex: params.sex, tel: params.tel, IDNo: params.IDNo } }, function (err) {
                if (err) {
                  var _data20 = {};
                  _data20.result = "01";
                  _data20.name = "操作失败";
                  return res.status(200).send(_data20);
                }
              });

            case 4:
              if (!params.isChange_salesman) {
                _context10.next = 10;
                break;
              }

              _context10.next = 7;
              return salesmanModel.findOne({ userName: params.salesman_name }, { _id: 1 }, function (err) {
                if (err) {
                  var _data21 = {};
                  _data21.result = "01";
                  _data21.name = "操作失败";
                  return res.status(200).send(_data21);
                }
              });

            case 7:
              salesman = _context10.sent;
              _context10.next = 10;
              return userActivityModel.update({ _id: params.userActivities_id }, { $set: { projects: params.projects, name: params.name, IDNo: params.IDNo, "salesman.id": salesman._id } }, function (err) {
                if (err) {
                  var _data22 = {};
                  _data22.result = "01";
                  _data22.name = "操作失败";
                  return res.status(200).send(_data22);
                }
              });

            case 10:
              if (!params.isChange_project) {
                _context10.next = 13;
                break;
              }

              _context10.next = 13;
              return userActivityModel.update({ _id: params.userActivities_id }, { $set: { projects: params.projects, name: params.name, IDNo: params.IDNo } }, function (err) {
                if (err) {
                  var _data23 = {};
                  _data23.result = "01";
                  _data23.name = "操作失败";
                  return res.status(200).send(_data23);
                }
              });

            case 13:
              data = {};

              data.result = "00";
              data.name = "操作成功";
              return _context10.abrupt('return', res.status(200).send(data));

            case 17:
            case 'end':
              return _context10.stop();
          }
        }
      }, _callee10, this);
    }));

    return function (_x26, _x27, _x28) {
      return _ref10.apply(this, arguments);
    };
  }());

  app.get('/wechat/salesman/searchCustomer', function () {
    var _ref11 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee11(req, res, next) {
      var param, query, users;
      return _regenerator2.default.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              param = req.body;
              query = query(param);
              users = userModel.find(query);
              return _context11.abrupt('return', res.status(200).send(users));

            case 4:
            case 'end':
              return _context11.stop();
          }
        }
      }, _callee11, this);
    }));

    return function (_x29, _x30, _x31) {
      return _ref11.apply(this, arguments);
    };
  }());

  function query(param) {
    var query = {};
    if (param.project != null) {
      query.project = param.project;
    }
    if (param.name != null) {
      query.name = param.name;
    }
    var time = {};
    if (param.begin != null) {
      time.$gte = param.begin;
    }
    if (param.end != null) {
      time.$lte = param.end;
    }
    if (time.hasOwnProperty()) {
      query.sample_time = time;
    }
    return query;
  }

  app.get('/wechat/getProjects', function () {
    var _ref15 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee15(req, res, next) {
      var organization_id, time, projects, allProjects, pgp, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, gp, pro, proDetail, i, j, names, data;

      return _regenerator2.default.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              organization_id = req.query.organization_id;
              time = new Date();
              _context15.next = 4;
              return organizationModel.findOne({ _id: organization_id }, { projects: 1, giveProjects: 1 }, function (err) {
                if (err) {
                  var _data24 = {};
                  _data24.result = "01";
                  _data24.name = "操作失败";
                  return res.status(200).send(_data24);
                }
              });

            case 4:
              projects = _context15.sent;
              allProjects = [];
              pgp = "";

              if (!(projects.giveProjects && projects.giveProjects.length)) {
                _context15.next = 30;
                break;
              }

              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context15.prev = 11;

              for (_iterator = (0, _getIterator3.default)(projects.giveProjects); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                gp = _step.value;

                if (gp.beginTime <= time && gp.endTime >= time) {
                  pgp += "+" + gp.name;
                }
              }
              _context15.next = 19;
              break;

            case 15:
              _context15.prev = 15;
              _context15.t0 = _context15['catch'](11);
              _didIteratorError = true;
              _iteratorError = _context15.t0;

            case 19:
              _context15.prev = 19;
              _context15.prev = 20;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 22:
              _context15.prev = 22;

              if (!_didIteratorError) {
                _context15.next = 25;
                break;
              }

              throw _iteratorError;

            case 25:
              return _context15.finish(22);

            case 26:
              return _context15.finish(19);

            case 27:
              allProjects = [].concat((0, _toConsumableArray3.default)(projects.giveProjects), (0, _toConsumableArray3.default)(projects.projects));
              _context15.next = 31;
              break;

            case 30:
              allProjects = projects.projects;

            case 31:
              pro = [];
              proDetail = [];
              i = void 0, j = -1;

              for (i = 0; i < allProjects.length; i++) {

                if (allProjects[i].beginTime <= time && allProjects[i].endTime >= time) {
                  if (pro.indexOf(allProjects[i].category) == -1) {
                    pro.push(allProjects[i].category);
                    j = j + 1;
                    proDetail[j] = new Array();
                  }
                  names = pgp.indexOf(allProjects[i].name) < 0 ? allProjects[i].name + pgp : allProjects[i].name;

                  proDetail[j].push(names);
                }
              }

              data = {};

              data.category = pro;
              data.projects = proDetail;

              return _context15.abrupt('return', res.status(200).send(data));

            case 39:
            case 'end':
              return _context15.stop();
          }
        }
      }, _callee15, this, [[11, 15, 19, 27], [20,, 22, 26]]);
    }));

    return function (_x35, _x36, _x37) {
      return _ref15.apply(this, arguments);
    };
  }());
  app.get('/wechat/salesman/getProjects2', function () {
    var _ref16 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee16(req, res, next) {
      var projects2;
      return _regenerator2.default.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _context16.next = 2;
              return projects2Model.findOne({ category: req.query.category });

            case 2:
              projects2 = _context16.sent;
              return _context16.abrupt('return', res.status(200).send(projects2));

            case 5:
            case 'end':
              return _context16.stop();
          }
        }
      }, _callee16, this);
    }));

    return function (_x38, _x39, _x40) {
      return _ref16.apply(this, arguments);
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