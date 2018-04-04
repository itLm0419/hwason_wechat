'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _organizations = require('../util/schema/organizations');

var _organizations2 = _interopRequireDefault(_organizations);

var _provinces = require('../util/schema/provinces');

var _provinces2 = _interopRequireDefault(_provinces);

var _industry = require('../util/schema/industry');

var _industry2 = _interopRequireDefault(_industry);

var _projects = require('../util/schema/projects');

var _projects2 = _interopRequireDefault(_projects);

var _hwason = require('../util/schema/hwason');

var _hwason2 = _interopRequireDefault(_hwason);

var _login = require('../util/schema/login');

var _login2 = _interopRequireDefault(_login);

var _activities = require('../util/schema/activities');

var _activities2 = _interopRequireDefault(_activities);

var _salesman = require('../util/schema/salesman');

var _salesman2 = _interopRequireDefault(_salesman);

var _orgCategory = require('../util/schema/orgCategory');

var _orgCategory2 = _interopRequireDefault(_orgCategory);

var _cities = require('../util/schema/cities');

var _cities2 = _interopRequireDefault(_cities);

var _counties = require('../util/schema/counties');

var _counties2 = _interopRequireDefault(_counties);

var _userActivities = require('../util/schema/userActivities');

var _userActivities2 = _interopRequireDefault(_userActivities);

var _user = require('../util/schema/user');

var _user2 = _interopRequireDefault(_user);

var _util = require('../util2');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (app) {
  app.post('/salesman/addOrg', function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
      var params, province, city, country, industry, region, procode, organization, code, selesman_id, result, contactsalesman, organization_id, org, flag, ognzt, userName, lg, loginEntity, login, organizationEntity, _org, data;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              params = req.body.params;
              _context.next = 3;
              return _provinces2.default.findOne({ name: params.province }, { code: 1 }, function (err) {
                if (err) {
                  var _data = {};
                  _data.result = "01";
                  _data.name = "操作失败";
                  return res.status(200).send(_data);
                }
              });

            case 3:
              province = _context.sent;
              _context.next = 6;
              return _cities2.default.findOne({ name: params.city, province_id: province._id }, { code: 1 }, function (err) {
                if (err) {
                  var _data2 = {};
                  _data2.result = "01";
                  _data2.name = "操作失败";
                  return res.status(200).send(_data2);
                }
              });

            case 6:
              city = _context.sent;
              _context.next = 9;
              return _counties2.default.findOne({ name: params.country, city_id: city._id }, { code: 1 }, function (err) {
                if (err) {
                  var _data3 = {};
                  _data3.result = "01";
                  _data3.name = "操作失败";
                  return res.status(200).send(_data3);
                }
              });

            case 9:
              country = _context.sent;
              _context.next = 12;
              return _industry2.default.findOne({ name: params.industry.industry_name, code: params.industry.industry_code }, { _id: 1 }, function (err) {
                if (err) {
                  var _data4 = {};
                  _data4.result = "01";
                  _data4.name = "操作失败";
                  return res.status(200).send(_data4);
                }
              });

            case 12:
              industry = _context.sent;
              region = params.province + params.city + params.country;
              procode = "^" + province.code + city.code + country.code + params.industry.industry_code + params.orgCategory_code;
              _context.next = 17;
              return _organizations2.default.find({ code: { '$regex': procode } }, { code: 1 }, function (err) {
                if (err) {
                  var _data5 = {};
                  _data5.result = "01";
                  _data5.name = "操作失败";
                  return res.status(200).send(_data5);
                }
              });

            case 17:
              organization = _context.sent;
              code = getcode(province.code, city.code, country.code, params.industry.industry_code, params.orgCategory_code, organization);
              selesman_id = req.cookies.userId;
              _context.next = 22;
              return _hwason2.default.findOne({ _id: selesman_id }, { _id: 1, realName: 1, area: 1 });

            case 22:
              result = _context.sent;
              contactsalesman = {};

              contactsalesman.salesman_id = result._id;
              contactsalesman.salesman_name = result.realName;
              organization_id = void 0;

              if (!params._id) {
                _context.next = 43;
                break;
              }

              _context.next = 30;
              return _organizations2.default.findOne({ _id: params._id }, { code: 1 }, function (err) {
                if (err) {
                  var _data6 = {};
                  _data6.result = "01";
                  _data6.name = "操作失败";
                  return res.status(200).send(_data6);
                }
              });

            case 30:
              org = _context.sent;
              flag = false;

              if (code.substr(0, 5) == org.code.substr(0, 5)) {
                code = org.code;
                flag = true;
              }
              _context.next = 35;
              return _organizations2.default.update({ _id: params._id }, { $set: {
                  name: params.name,
                  code: code,
                  area: result.area,
                  industry: params.industry,
                  contactsalesman: contactsalesman,
                  region: region,
                  address: params.address,
                  director_name: params.director_name,
                  director_tel: params.director_tel
                } }, function (err) {
                if (err) {
                  var _data7 = {};
                  _data7.result = "01";
                  _data7.name = "操作失败";
                  return res.status(200).send(_data7);
                }
              });

            case 35:
              if (!(flag == false)) {
                _context.next = 40;
                break;
              }

              _context.next = 38;
              return _orgCategory2.default.update({ organization_id: params._id }, { $pull: { organization_id: params._id } }, function (err) {
                if (err) {
                  var _data8 = {};
                  _data8.result = "01";
                  _data8.name = "操作失败";
                  return res.status(200).send(_data8);
                }
              });

            case 38:
              _context.next = 40;
              return _orgCategory2.default.update({ industry_id: industry._id, code: params.orgCategory_code }, { $addToSet: { organization_id: params._id } }, function (err) {
                if (err) {
                  var _data9 = {};
                  _data9.result = "01";
                  _data9.name = "操作失败";
                  return res.status(200).send(_data9);
                }
              });

            case 40:
              organization_id = params._id;
              _context.next = 66;
              break;

            case 43:
              _context.next = 45;
              return _organizations2.default.find({}, { manager_id: 1 }, function (err) {
                if (err) {
                  var _data10 = {};
                  _data10.result = "01";
                  _data10.name = "操作失败";
                  res.status(200).send(_data10);
                }
              }).sort({ create_time: -1 }).limit(1);

            case 45:
              ognzt = _context.sent;
              userName = void 0;

              if (!(ognzt.length == 0)) {
                _context.next = 51;
                break;
              }

              userName = "hs100001";
              _context.next = 55;
              break;

            case 51:
              _context.next = 53;
              return _login2.default.findOne({ _id: ognzt[0].manager_id }, { userName: 1 }, function (err) {
                if (err) {
                  var _data11 = {};
                  _data11.result = "01";
                  _data11.name = "操作失败";
                  res.status(200).send(_data11);
                }
              });

            case 53:
              lg = _context.sent;

              userName = "hs" + (parseInt(lg.userName.substr(-6)) + 1).toString();

            case 55:
              loginEntity = new _login2.default({
                userName: userName,
                password: "888888",
                role: 2
              });
              _context.next = 58;
              return loginEntity.save(function (err) {
                if (err) {
                  var _data12 = {};
                  _data12.result = "01";
                  _data12.name = "操作失败";
                  res.status(200).send(_data12);
                };
              });

            case 58:
              login = _context.sent;
              organizationEntity = new _organizations2.default({
                name: params.name,
                code: code,
                manager_id: login._id,
                area: result.area,
                industry: params.industry,
                create_time: new Date(),
                contactsalesman: contactsalesman,
                region: region,
                address: params.address,
                director_name: params.director_name,
                director_tel: params.director_tel,
                notice_status: 0,
                checked: false
              });
              _context.next = 62;
              return organizationEntity.save(function (err) {
                if (err) {
                  var _data13 = {};
                  _data13.result = "01";
                  _data13.name = "操作失败";
                  return res.status(200).send(_data13);
                }
              });

            case 62:
              _org = _context.sent;

              organization_id = _org._id;
              _context.next = 66;
              return _orgCategory2.default.update({ industry_id: industry._id, code: params.orgCategory_code }, { $addToSet: { organization_id: organization_id } }, function (err) {
                if (err) {
                  var _data14 = {};
                  _data14.result = "01";
                  _data14.name = "操作失败";
                  return res.status(200).send(_data14);
                }
              });

            case 66:
              data = {};

              data.result = "00";
              data.name = "操作成功";
              data.organization_id = organization_id;
              res.status(200).send(data);

            case 71:
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

  app.post('/salesman/modifyOrg2', function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
      var params;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              params = req.body.params;
              _context2.next = 3;
              return _organizations2.default.update({ _id: params._id }, {
                $set: {
                  receiver_name: params.receiver_name,
                  receiver_tel: params.receiver_tel,
                  financial_name: params.financial_name,
                  financial_tel: params.financial_tel
                }
              }, function (err) {
                if (err) {
                  var data = {};
                  data.result = "01";
                  data.name = "操作失败";
                  return res.status(200).send(data);
                } else {
                  var _data15 = {};
                  _data15.result = "02";
                  _data15.name = "操作成功";
                  return res.status(200).send(_data15);
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

  app.post('/salesman/modifyOrg3', function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res, next) {
      var params;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              params = req.body.params;
              _context3.next = 3;
              return _organizations2.default.update({ _id: params._id }, {
                $set: {
                  projects: params.projects
                }
              }, function (err) {
                if (err) {
                  var data = {};
                  data.result = "01";
                  data.name = "操作失败";
                  return res.status(200).send(data);
                } else {
                  var _data16 = {};
                  _data16.result = "02";
                  _data16.name = "操作成功";
                  return res.status(200).send(_data16);
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

  app.get('/salesman/queryStep3', function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(req, res, next) {
      var _id, organization, data, category, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, project;

      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _id = req.query._id;
              _context4.next = 3;
              return _organizations2.default.findOne({ _id: _id }, { projects: 1 }, function (err) {
                if (err) {
                  var _data17 = {};
                  _data17.result = "01";
                  _data17.name = "操作失败";
                  return res.status(200).send(_data17);
                }
              });

            case 3:
              organization = _context4.sent;
              data = {};

              data.projects = organization.projects;
              category = [];
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context4.prev = 10;

              for (_iterator = (0, _getIterator3.default)(organization.projects); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                project = _step.value;

                if (category.indexOf(project.category) == -1) {
                  category.push(project.category);
                }
              }
              _context4.next = 18;
              break;

            case 14:
              _context4.prev = 14;
              _context4.t0 = _context4['catch'](10);
              _didIteratorError = true;
              _iteratorError = _context4.t0;

            case 18:
              _context4.prev = 18;
              _context4.prev = 19;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 21:
              _context4.prev = 21;

              if (!_didIteratorError) {
                _context4.next = 24;
                break;
              }

              throw _iteratorError;

            case 24:
              return _context4.finish(21);

            case 25:
              return _context4.finish(18);

            case 26:
              data.category = category;
              res.status(200).send(data);

            case 28:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this, [[10, 14, 18, 26], [19,, 21, 25]]);
    }));

    return function (_x10, _x11, _x12) {
      return _ref4.apply(this, arguments);
    };
  }());

  app.get('/salesman/queryStep2', function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(req, res, next) {
      var _id, data;

      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _id = req.query._id;
              _context5.next = 3;
              return _organizations2.default.findOne({ _id: _id }, {
                receiver_name: 1,
                receiver_tel: 1,
                financial_name: 1,
                financial_tel: 1
              }, function (err) {
                if (err) {
                  var _data18 = {};
                  _data18.result = "01";
                  _data18.name = "操作失败";
                  return res.status(200).send(_data18);
                }
              });

            case 3:
              data = _context5.sent;

              res.status(200).send(data);

            case 5:
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

  app.get('/salesman/queryStep1', function () {
    var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(req, res, next) {
      var _id, organization, orgCategory, data;

      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _id = req.query._id;
              _context6.next = 3;
              return _organizations2.default.findOne({ _id: _id }, {
                region: 1,
                name: 1,
                industry: 1,
                address: 1,
                director_name: 1,
                director_tel: 1
              });

            case 3:
              organization = _context6.sent;
              _context6.next = 6;
              return _orgCategory2.default.findOne({ organization_id: organization._id }, { _id: 0, name: 1, code: 1 }, function (err) {
                if (err) {
                  var _data19 = {};
                  _data19.result = "01";
                  _data19.name = "操作失败";
                  return res.status(200).send(_data19);
                }
              });

            case 6:
              orgCategory = _context6.sent;
              data = {};

              data.region = organization.region;
              data.name = organization.name;
              data.industry_code = organization.industry.industry_code;
              data.industry_name = organization.industry.industry_name;
              data.address = organization.address;
              data.director_name = organization.director_name;
              data.director_tel = organization.director_tel;
              data.orgCategory_name = orgCategory.name;
              data.orgCategory_code = orgCategory.code;
              res.status(200).send(data);

            case 18:
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

  app.get('/salesman/queryOrg', function () {
    var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(req, res, next) {
      var pageNo, pageSize, salesman_id, name, query, data;
      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              pageNo = req.query.pageNo || 1;
              pageSize = req.query.pageSize || 10;
              salesman_id = req.cookies.userId;
              name = req.query.name || "";
              query = {
                "contactsalesman.salesman_id": salesman_id,
                name: { '$regex': name }
              };
              _context7.next = 7;
              return _util2.default.queryOrg(pageNo, pageSize, query, res);

            case 7:
              data = _context7.sent;
              return _context7.abrupt('return', res.status(200).send(data));

            case 9:
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

  app.get('/salesman/showActivities', function () {
    var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(req, res, next) {
      var salesman_id, name, pageNo, pageSize, begin, end, organizations, arr, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, organization, orgIds, query, dateParam, data;

      return _regenerator2.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              salesman_id = req.cookies.userId;
              name = req.query.name || "";
              pageNo = req.query.pageNo || 1;
              pageSize = req.query.pageSize || 10;
              begin = req.query.begin;
              end = req.query.end;
              _context8.next = 8;
              return _organizations2.default.find({ "contactsalesman.salesman_id": salesman_id, name: { $regex: name } }, {
                _id: 1, name: 1 }, function (err) {
                if (err) {
                  var _data20 = {};
                  _data20.result = "01";
                  _data20.name = "操作失败";
                  return res.status(200).send(_data20);
                }
              });

            case 8:
              organizations = _context8.sent;
              arr = [];
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context8.prev = 13;

              for (_iterator2 = (0, _getIterator3.default)(organizations); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                organization = _step2.value;

                arr.push(organization._id);
              }
              _context8.next = 21;
              break;

            case 17:
              _context8.prev = 17;
              _context8.t0 = _context8['catch'](13);
              _didIteratorError2 = true;
              _iteratorError2 = _context8.t0;

            case 21:
              _context8.prev = 21;
              _context8.prev = 22;

              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }

            case 24:
              _context8.prev = 24;

              if (!_didIteratorError2) {
                _context8.next = 27;
                break;
              }

              throw _iteratorError2;

            case 27:
              return _context8.finish(24);

            case 28:
              return _context8.finish(21);

            case 29:
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
              _context8.next = 39;
              return _util2.default.queryActivities(pageNo, pageSize, query, res);

            case 39:
              data = _context8.sent;
              return _context8.abrupt('return', res.status(200).send(data));

            case 41:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, this, [[13, 17, 21, 29], [22,, 24, 28]]);
    }));

    return function (_x22, _x23, _x24) {
      return _ref8.apply(this, arguments);
    };
  }());

  app.post('/salesman/addOrgSalesmen', function () {
    var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9(req, res, next) {
      var salesmen, organization_id, exist, success, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, salesman, login, loginEntity, result, salesmanEntity, data;

      return _regenerator2.default.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              salesmen = req.body.params.salesmen;
              organization_id = req.body.params.organization_id;
              exist = [];
              success = [];
              _iteratorNormalCompletion3 = true;
              _didIteratorError3 = false;
              _iteratorError3 = undefined;
              _context9.prev = 7;
              _iterator3 = (0, _getIterator3.default)(salesmen);

            case 9:
              if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                _context9.next = 29;
                break;
              }

              salesman = _step3.value;
              _context9.next = 13;
              return _login2.default.findOne({ userName: salesman.userName }, function (err) {
                if (err) {
                  var _data21 = {};
                  _data21.result = "01";
                  _data21.name = "操作失败";
                  return res.status(200).send(_data21);
                }
              });

            case 13:
              login = _context9.sent;

              if (login) {
                _context9.next = 25;
                break;
              }

              loginEntity = new _login2.default({
                userName: salesman.userName,
                password: "123456",
                role: 1,
                realName: salesman.realName
              });
              _context9.next = 18;
              return loginEntity.save(function (err) {
                if (err) {
                  var _data22 = {};
                  _data22.result = "01";
                  _data22.name = "操作失败";
                  return res.status(200).send(_data22);
                }
              });

            case 18:
              result = _context9.sent;
              salesmanEntity = new _salesman2.default({
                _id: result._id,
                organization_id: organization_id,
                realName: result.realName
              });
              _context9.next = 22;
              return salesmanEntity.save(function (err) {
                if (err) {
                  var _data23 = {};
                  _data23.result = "01";
                  _data23.name = "操作失败";
                  return res.status(200).send(_data23);
                }
              });

            case 22:
              success.push(salesman);
              _context9.next = 26;
              break;

            case 25:
              exist.push(salesman);

            case 26:
              _iteratorNormalCompletion3 = true;
              _context9.next = 9;
              break;

            case 29:
              _context9.next = 35;
              break;

            case 31:
              _context9.prev = 31;
              _context9.t0 = _context9['catch'](7);
              _didIteratorError3 = true;
              _iteratorError3 = _context9.t0;

            case 35:
              _context9.prev = 35;
              _context9.prev = 36;

              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }

            case 38:
              _context9.prev = 38;

              if (!_didIteratorError3) {
                _context9.next = 41;
                break;
              }

              throw _iteratorError3;

            case 41:
              return _context9.finish(38);

            case 42:
              return _context9.finish(35);

            case 43:
              data = {};

              data.result = "00";
              data.exist = exist;
              data.success = success;
              data.name = "操作成功";
              res.status(200).send(data);

            case 49:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, this, [[7, 31, 35, 43], [36,, 38, 42]]);
    }));

    return function (_x25, _x26, _x27) {
      return _ref9.apply(this, arguments);
    };
  }());

  app.get('/salesman/showOrgs', function () {
    var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10(req, res, next) {
      var userId, data;
      return _regenerator2.default.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              userId = req.cookies.userId;
              _context10.next = 3;
              return _organizations2.default.find({ "contactsalesman.salesman_id": userId }, { name: 1 }, function (err) {
                if (err) {
                  var _data24 = {};
                  _data24.result = "01";
                  _data24.name = "操作失败";
                  return res.status(200).send(_data24);
                }
              });

            case 3:
              data = _context10.sent;

              res.status(200).send(data);

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

  app.get('/salesman/showReports', function () {
    var _ref11 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee11(req, res, next) {
      var salesman_id, name, pageNo, pageSize, begin, end, organizations, arr, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, organization, orgIds, query, dateParam, sample_status, aa;

      return _regenerator2.default.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              salesman_id = req.cookies.userId;
              name = req.query.name || "";
              pageNo = req.query.pageNo || 1;
              pageSize = req.query.pageSize || 10;
              begin = req.query.begin;
              end = req.query.end;
              _context11.next = 8;
              return _organizations2.default.find({ "contactsalesman.salesman_id": salesman_id, name: { $regex: name } }, { _id: 1, name: 1 }, function (err) {
                if (err) {
                  var data = {};
                  data.result = "01";
                  data.name = "操作失败";
                  return res.status(200).send(data);
                }
              });

            case 8:
              organizations = _context11.sent;
              arr = [];
              _iteratorNormalCompletion4 = true;
              _didIteratorError4 = false;
              _iteratorError4 = undefined;
              _context11.prev = 13;

              for (_iterator4 = (0, _getIterator3.default)(organizations); !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                organization = _step4.value;

                arr.push(organization._id);
              }
              _context11.next = 21;
              break;

            case 17:
              _context11.prev = 17;
              _context11.t0 = _context11['catch'](13);
              _didIteratorError4 = true;
              _iteratorError4 = _context11.t0;

            case 21:
              _context11.prev = 21;
              _context11.prev = 22;

              if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
              }

            case 24:
              _context11.prev = 24;

              if (!_didIteratorError4) {
                _context11.next = 27;
                break;
              }

              throw _iteratorError4;

            case 27:
              return _context11.finish(24);

            case 28:
              return _context11.finish(21);

            case 29:
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
              _context11.next = 42;
              return _util2.default.queryReports(pageNo, pageSize, query, res);

            case 42:
              aa = _context11.sent;
              return _context11.abrupt('return', res.status(200).send(aa));

            case 44:
            case 'end':
              return _context11.stop();
          }
        }
      }, _callee11, this, [[13, 17, 21, 29], [22,, 24, 28]]);
    }));

    return function (_x31, _x32, _x33) {
      return _ref11.apply(this, arguments);
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

  function getcode(province_code, city_code, country_code, industry_code, orgCategory_code, organization) {
    if (organization.length == 0) {
      return province_code + city_code + country_code + industry_code + orgCategory_code + "0";
    } else {
      var arr = [];
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = (0, _getIterator3.default)(organization), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var org = _step5.value;

          var tail = org.code.substr(-1);
          var num = parseInt(tail);
          var flag = isNaN(num);
          if (flag) {
            arr.push(tail.charCodeAt());
          } else {
            arr.push(num);
          }
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      var numMax = Math.max.apply(null, arr) + 1;
      if (numMax == 10) {
        numMax = 65;
      }
      if (numMax < 10) {
        return province_code + city_code + country_code + industry_code + orgCategory_code + numMax.toString();
      } else {
        return province_code + city_code + country_code + industry_code + orgCategory_code + String.fromCharCode(numMax);
      }
    }
  }
};