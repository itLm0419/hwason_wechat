"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (app) {
  app.get('/salesman/orgDetail', function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
      var _id, org, data, project_category, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, project, manager_id, login, date, begin, end, result, activities, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, ac, activity;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _id = req.query._id;
              _context.next = 3;
              return organizationModel.findOne({ _id: _id }, {
                name: 1,
                region: 1,
                address: 1,
                code: 1,
                manager_id: 1,
                contactsalesman: 1,
                director_name: 1,
                director_tel: 1,
                receiver_name: 1,
                receiver_tel: 1,
                financial_name: 1,
                financial_tel: 1,
                projects: 1
              }, function (err) {
                if (err) {
                  var _data = {};
                  _data.result = "01";
                  _data.name = "操作失败";
                  return res.status(200).send(_data);
                }
              });

            case 3:
              org = _context.sent;
              data = {};

              data.name = org.name;
              data.region = org.region;
              data.address = org.address;
              data.code = org.code;
              data.director_name = org.director_name;
              data.director_tel = org.director_tel;
              data.receiver_name = org.receiver_name;
              data.receiver_tel = org.receiver_tel;
              data.financial_name = org.financial_name;
              data.financial_tel = org.financial_tel;
              data.salesman = org.contactsalesman.salesman_name;
              project_category = [];
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 20;

              for (_iterator = (0, _getIterator3.default)(org.projects); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                project = _step.value;

                if (project_category.indexOf(project.category) == -1) {
                  project_category.push(project.category);
                }
              }
              _context.next = 28;
              break;

            case 24:
              _context.prev = 24;
              _context.t0 = _context["catch"](20);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 28:
              _context.prev = 28;
              _context.prev = 29;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 31:
              _context.prev = 31;

              if (!_didIteratorError) {
                _context.next = 34;
                break;
              }

              throw _iteratorError;

            case 34:
              return _context.finish(31);

            case 35:
              return _context.finish(28);

            case 36:
              data.project_category = project_category;
              manager_id = org.manager_id;
              _context.next = 40;
              return loginModel.findOne({ _id: manager_id }, { userName: 1, password: 1 }, function (err) {
                if (err) {
                  var _data2 = {};
                  _data2.result = "01";
                  _data2.name = "操作失败";
                  return res.status(200).send(_data2);
                }
              });

            case 40:
              login = _context.sent;

              data.userName = login.userName;
              data.password = login.password;
              date = new Date();
              begin = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
              end = new Date(date.getFullYear(), date.getMonth(), date.getDate());
              _context.next = 48;
              return activityModel.find({ organization_id: _id, activity_time: { $gt: begin, $lt: end } }, { address: 1, activity_time: 1, sampling_number: 1 }, function (err) {
                if (err) {
                  var _data3 = {};
                  _data3.result = "01";
                  _data3.name = "操作失败";
                  return res.status(200).send(_data3);
                }
              });

            case 48:
              result = _context.sent;
              activities = [];
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context.prev = 53;

              for (_iterator2 = (0, _getIterator3.default)(result); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                ac = _step2.value;
                activity = {};

                activity.address = ac.address;
                activity.activity_time = changeSingleDate(ac.activity_time);
                activity.sampling_number = ac.sampling_number;
                activities.push(activity);
              }
              _context.next = 61;
              break;

            case 57:
              _context.prev = 57;
              _context.t1 = _context["catch"](53);
              _didIteratorError2 = true;
              _iteratorError2 = _context.t1;

            case 61:
              _context.prev = 61;
              _context.prev = 62;

              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }

            case 64:
              _context.prev = 64;

              if (!_didIteratorError2) {
                _context.next = 67;
                break;
              }

              throw _iteratorError2;

            case 67:
              return _context.finish(64);

            case 68:
              return _context.finish(61);

            case 69:
              data.activities = activities;
              return _context.abrupt("return", res.status(200).send(data));

            case 71:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[20, 24, 28, 36], [29,, 31, 35], [53, 57, 61, 69], [62,, 64, 68]]);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }());

  app.get('/salesman/getOrgSalesman', function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
      var organization_id, pageNo, pageSize, salesmen, arr, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, salesman, data;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              organization_id = req.query.organization_id;
              pageNo = req.query.pageNo || 1;
              pageSize = req.query.pageSize || 10;
              _context2.next = 5;
              return salesmanModel.find({ organization_id: organization_id }, { _id: 1 }, function (err) {
                if (err) {
                  var _data4 = {};
                  _data4.result = "01";
                  _data4.name = "操作失败";
                  return res.status(200).send(_data4);
                }
              });

            case 5:
              salesmen = _context2.sent;
              arr = [];
              _iteratorNormalCompletion3 = true;
              _didIteratorError3 = false;
              _iteratorError3 = undefined;
              _context2.prev = 10;

              for (_iterator3 = (0, _getIterator3.default)(salesmen); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                salesman = _step3.value;

                arr.push(salesman._id);
              }
              _context2.next = 18;
              break;

            case 14:
              _context2.prev = 14;
              _context2.t0 = _context2["catch"](10);
              _didIteratorError3 = true;
              _iteratorError3 = _context2.t0;

            case 18:
              _context2.prev = 18;
              _context2.prev = 19;

              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }

            case 21:
              _context2.prev = 21;

              if (!_didIteratorError3) {
                _context2.next = 24;
                break;
              }

              throw _iteratorError3;

            case 24:
              return _context2.finish(21);

            case 25:
              return _context2.finish(18);

            case 26:
              _context2.next = 28;
              return loginModel.find({ _id: { $in: arr } }, {
                userName: 1,
                password: 1,
                tel: 1,
                realName: 1
              }).skip((pageNo - 1) * pageSize).limit(pageSize);

            case 28:
              data = _context2.sent;
              return _context2.abrupt("return", res.status(200).send(data));

            case 30:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this, [[10, 14, 18, 26], [19,, 21, 25]]);
    }));

    return function (_x4, _x5, _x6) {
      return _ref2.apply(this, arguments);
    };
  }());

  app.get('/salesman/getIndustry', function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res, next) {
      var industry;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return industryModel.find({}, { _id: 1, name: 1, code: 1 }, function (err) {
                if (err) {
                  var data = {};
                  data.result = "01";
                  data.name = "操作失败";
                  return res.status(200).send(data);
                }
              });

            case 2:
              industry = _context3.sent;
              return _context3.abrupt("return", res.status(200).send(industry));

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function (_x7, _x8, _x9) {
      return _ref3.apply(this, arguments);
    };
  }());

  app.get('/salesman/showOrgClass', function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(req, res, next) {
      var industry_id, result;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              industry_id = req.query.industry_id;
              _context4.next = 3;
              return orgCategoryModel.find({ industry_id: industry_id }, { _id: 1, code: 1, name: 1 }, function (err) {
                if (err) {
                  var data = {};
                  data.result = "01";
                  data.name = "操作失败";
                  return res.status(200).send(data);
                }
              });

            case 3:
              result = _context4.sent;
              return _context4.abrupt("return", res.status(200).send(result));

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    return function (_x10, _x11, _x12) {
      return _ref4.apply(this, arguments);
    };
  }());

  app.get('/salesman/showProjects', function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(req, res, next) {
      var _id, category, organization, data, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, project, pro;

      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _id = req.query._id;
              category = req.query.category;
              _context5.next = 4;
              return organizationModel.findOne({ _id: _id }, { projects: 1 }, function (err) {
                if (err) {
                  var _data5 = {};
                  _data5.result = "01";
                  _data5.name = "操作失败";
                  return res.status(200).send(_data5);
                }
              });

            case 4:
              organization = _context5.sent;
              data = [];
              _iteratorNormalCompletion4 = true;
              _didIteratorError4 = false;
              _iteratorError4 = undefined;
              _context5.prev = 9;

              for (_iterator4 = (0, _getIterator3.default)(organization.projects); !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                project = _step4.value;

                if (category == project.category) {
                  pro = {};

                  pro.project = project.name;
                  pro.price = project.price;
                  data.push(pro);
                }
              }
              _context5.next = 17;
              break;

            case 13:
              _context5.prev = 13;
              _context5.t0 = _context5["catch"](9);
              _didIteratorError4 = true;
              _iteratorError4 = _context5.t0;

            case 17:
              _context5.prev = 17;
              _context5.prev = 18;

              if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
              }

            case 20:
              _context5.prev = 20;

              if (!_didIteratorError4) {
                _context5.next = 23;
                break;
              }

              throw _iteratorError4;

            case 23:
              return _context5.finish(20);

            case 24:
              return _context5.finish(17);

            case 25:
              res.status(200).send(data);

            case 26:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this, [[9, 13, 17, 25], [18,, 20, 24]]);
    }));

    return function (_x13, _x14, _x15) {
      return _ref5.apply(this, arguments);
    };
  }());

  function changeSingleDate(date) {
    var month = void 0;
    if ((date.getMonth() + 1).toString().length == 1) {
      month = "0" + (date.getMonth() + 1).toString();
    } else {
      month = (date.getMonth() + 1).toString();
    }

    return date.getYear() + 1900 + "/" + month + "/" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
  }
};