'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var crypto = require('crypto');
var fs = require('fs');
var xlsx = require('node-xlsx');
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
  app.get('/sale/manager/showUnCheckedOrg', function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
      var organizations, data, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, organization, org;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return organizationModel.find({ checked: false }, { name: 1, create_time: 1, region: 1 }, function (err) {
                if (err) {
                  var _data = {};
                  _data.result = "01";
                  _data.name = "操作失败";
                  res.status(200).send(_data);
                }
              });

            case 2:
              organizations = _context.sent;
              data = [];
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 7;

              for (_iterator = (0, _getIterator3.default)(organizations); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                organization = _step.value;
                org = {};

                org.name = organization.name;
                org.apply_time = changeSingleDate(organization.create_time);
                org.region = organization.region;
                data.push(org);
              }
              _context.next = 15;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context['catch'](7);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 15:
              _context.prev = 15;
              _context.prev = 16;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 18:
              _context.prev = 18;

              if (!_didIteratorError) {
                _context.next = 21;
                break;
              }

              throw _iteratorError;

            case 21:
              return _context.finish(18);

            case 22:
              return _context.finish(15);

            case 23:
              res.status(200).send(data);

            case 24:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[7, 11, 15, 23], [16,, 18, 22]]);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }());

  app.get('/sale/manager/unCheckedOrgDetail', function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
      var _id, organization, data, project_category, projects, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, project, pro;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _id = req.query._id;
              _context2.next = 3;
              return organizationModel.findOne({ _id: _id }, {
                name: 1,
                region: 1,
                address: 1,
                director_name: 1,
                director_tel: 1,
                receiver_name: 1,
                receiver_tel: 1,
                financial_name: 1,
                financial_tel: 1,
                contactsalesman: 1,
                projects: 1
              }, function (err) {
                if (err) {
                  var _data2 = {};
                  _data2.result = "01";
                  _data2.name = "操作失败";
                  res.status(200).send(_data2);
                }
              });

            case 3:
              organization = _context2.sent;
              data = {};

              data.name = organization.name;
              data.region = organization.region;
              data.address = organization.address;
              data.director_name = organization.director_name;
              data.director_tel = organization.director_tel;
              data.receiver_name = organization.receiver_name;
              data.receiver_tel = organization.receiver_tel;
              data.financial_name = organization.financial_name;
              data.financial_tel = organization.financial_tel;
              data.salesman_name = organization.contactsalesman.salesman_name;
              project_category = [];
              projects = [];
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context2.prev = 20;

              for (_iterator2 = (0, _getIterator3.default)(organization.projects); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                project = _step2.value;

                if (project_category.indexOf(project.category) == -1) {
                  project_category.push(project.category);
                }
                pro = {};

                pro.name = project.name;
                pro.price = project.price;
                projects.push(pro);
              }
              _context2.next = 28;
              break;

            case 24:
              _context2.prev = 24;
              _context2.t0 = _context2['catch'](20);
              _didIteratorError2 = true;
              _iteratorError2 = _context2.t0;

            case 28:
              _context2.prev = 28;
              _context2.prev = 29;

              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }

            case 31:
              _context2.prev = 31;

              if (!_didIteratorError2) {
                _context2.next = 34;
                break;
              }

              throw _iteratorError2;

            case 34:
              return _context2.finish(31);

            case 35:
              return _context2.finish(28);

            case 36:
              data.project_category = project_category;
              data.projects = projects;
              res.status(200).send(data);

            case 39:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[20, 24, 28, 36], [29,, 31, 35]]);
    }));

    return function (_x4, _x5, _x6) {
      return _ref2.apply(this, arguments);
    };
  }());

  app.post('/sale/manager/checkedOrg', function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res, next) {
      var _id, data;

      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _id = req.body.params._id;
              _context3.next = 3;
              return organizationModel.update({ _id: _id }, { $set: { checked: true } }, function (err) {
                if (err) {
                  var _data3 = {};
                  _data3.result = "01";
                  _data3.name = "操作失败";
                  res.status(200).send(_data3);
                }
              });

            case 3:
              data = {};

              data.result = "00";
              data.name = "操作成功";
              res.status(200).send(data);

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

  app.get('/sale/manager/showOrg', function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(req, res, next) {
      var pageNo, pageSize, name, query, data;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              pageNo = req.query.pageNo || 1;
              pageSize = req.query.pageSize || 10;
              name = req.query.name || "";
              query = {
                checked: true,
                name: {
                  $regex: name
                }
              };

              console.log(query);
              _context4.next = 7;
              return util.queryOrg(pageNo, pageSize, query, res);

            case 7:
              data = _context4.sent;

              console.log(data);
              res.status(200).send(data);

            case 10:
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

  app.get('/salesman/showActivities', function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(req, res, next) {
      var name, pageNo, pageSize, begin, end, organizations, arr, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, organization, orgIds, query, dateParam, data;

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
              return organizationModel.find({ name: { $regex: name } }, {
                _id: 1, name: 1 }, function (err) {
                if (err) {
                  var _data4 = {};
                  _data4.result = "01";
                  _data4.name = "操作失败";
                  return res.status(200).send(_data4);
                }
              });

            case 7:
              organizations = _context5.sent;
              arr = [];
              _iteratorNormalCompletion3 = true;
              _didIteratorError3 = false;
              _iteratorError3 = undefined;
              _context5.prev = 12;

              for (_iterator3 = (0, _getIterator3.default)(organizations); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                organization = _step3.value;

                arr.push(organization._id);
              }
              _context5.next = 20;
              break;

            case 16:
              _context5.prev = 16;
              _context5.t0 = _context5['catch'](12);
              _didIteratorError3 = true;
              _iteratorError3 = _context5.t0;

            case 20:
              _context5.prev = 20;
              _context5.prev = 21;

              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }

            case 23:
              _context5.prev = 23;

              if (!_didIteratorError3) {
                _context5.next = 26;
                break;
              }

              throw _iteratorError3;

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
              return util.queryActivities(pageNo, pageSize, query, res);

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

  app.get('/sale/manager/OrgDetail', function () {
    var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(req, res, next) {
      var _id, org, orgCategory, data, project_category, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, project;

      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _id = req.query._id;
              _context6.next = 3;
              return organizationModel.findOne({ _id: _id }, {
                name: 1,
                region: 1,
                address: 1,
                contactsalesman: 1,
                director_name: 1,
                director_tel: 1,
                receiver_name: 1,
                receiver_tel: 1,
                financial_name: 1,
                financial_tel: 1,
                projects: 1,
                industry: 1
              }, function (err) {
                if (err) {
                  var _data5 = {};
                  _data5.result = "01";
                  _data5.name = "操作失败";
                  res.status(200).send(_data5);
                }
              });

            case 3:
              org = _context6.sent;
              _context6.next = 6;
              return orgCategoryModel.findOne({ organization_id: _id }, { _id: 0, name: 1, code: 1 }, function (err) {
                if (err) {
                  var _data6 = {};
                  _data6.result = "01";
                  _data6.name = "操作失败";
                  return res.status(200).send(_data6);
                }
              });

            case 6:
              orgCategory = _context6.sent;
              data = {};

              data.name = org.name;
              data.region = org.region;
              data.address = org.address;
              data.director_name = org.director_name;
              data.director_tel = org.director_tel;
              data.receiver_name = org.receiver_name;
              data.receiver_tel = org.receiver_tel;
              data.financial_name = org.financial_name;
              data.financial_tel = org.financial_tel;
              data.salesman = org.contactsalesman.salesman_name;
              data.industry_name = org.industry.industry_name;
              data.industry_code = org.industry.industry_code;
              data.orgCategory_name = orgCategory.name;
              data.orgCategory_code = orgCategory.code;
              project_category = [];
              _iteratorNormalCompletion4 = true;
              _didIteratorError4 = false;
              _iteratorError4 = undefined;
              _context6.prev = 26;

              for (_iterator4 = (0, _getIterator3.default)(org.projects); !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                project = _step4.value;

                if (project_category.indexOf(project.category) == -1) {
                  project_category.push(project.category);
                }
              }
              _context6.next = 34;
              break;

            case 30:
              _context6.prev = 30;
              _context6.t0 = _context6['catch'](26);
              _didIteratorError4 = true;
              _iteratorError4 = _context6.t0;

            case 34:
              _context6.prev = 34;
              _context6.prev = 35;

              if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
              }

            case 37:
              _context6.prev = 37;

              if (!_didIteratorError4) {
                _context6.next = 40;
                break;
              }

              throw _iteratorError4;

            case 40:
              return _context6.finish(37);

            case 41:
              return _context6.finish(34);

            case 42:
              data.project_category = project_category;
              res.status(200).send(data);

            case 44:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this, [[26, 30, 34, 42], [35,, 37, 41]]);
    }));

    return function (_x16, _x17, _x18) {
      return _ref6.apply(this, arguments);
    };
  }());

  app.get('/sale/manager/showSalesman', function () {
    var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(req, res, next) {
      var data;
      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return loginModel.find({ role: 6 }, { _id: 1, realName: 1 }, function (err) {
                if (err) {
                  var _data7 = {};
                  _data7.result = "01";
                  _data7.name = "操作失败";
                  res.status(200).send(_data7);
                }
              });

            case 2:
              data = _context7.sent;

              res.status(200).send(data);

            case 4:
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

  app.post('/sale/manager/modifyOrg', function () {
    var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(req, res, next) {
      var params, province, city, country, industry, region, procode, organization, code, result, org, flag, data;
      return _regenerator2.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              params = req.body.params;
              _context8.next = 3;
              return provinceModel.findOne({ name: params.province }, { code: 1 }, function (err) {
                if (err) {
                  var _data8 = {};
                  _data8.result = "01";
                  _data8.name = "操作失败";
                  return res.status(200).send(_data8);
                }
              });

            case 3:
              province = _context8.sent;
              _context8.next = 6;
              return cityModel.findOne({ name: params.city, province_id: province._id }, { code: 1 }, function (err) {
                if (err) {
                  var _data9 = {};
                  _data9.result = "01";
                  _data9.name = "操作失败";
                  return res.status(200).send(_data9);
                }
              });

            case 6:
              city = _context8.sent;
              _context8.next = 9;
              return countryModel.findOne({ name: params.country, city_id: city._id }, { code: 1 }, function (err) {
                if (err) {
                  var _data10 = {};
                  _data10.result = "01";
                  _data10.name = "操作失败";
                  return res.status(200).send(_data10);
                }
              });

            case 9:
              country = _context8.sent;
              _context8.next = 12;
              return industryModel.findOne({ name: params.industry.industry_name, code: params.industry.industry_code }, { _id: 1 }, function (err) {
                if (err) {
                  var _data11 = {};
                  _data11.result = "01";
                  _data11.name = "操作失败";
                  return res.status(200).send(_data11);
                }
              });

            case 12:
              industry = _context8.sent;
              region = params.province + params.city + params.country;
              procode = "^" + province.code + city.code + country.code + params.industry.industry_code + params.orgCategory_code;
              _context8.next = 17;
              return organizationModel.find({ code: { '$regex': procode } }, { code: 1 }, function (err) {
                if (err) {
                  var _data12 = {};
                  _data12.result = "01";
                  _data12.name = "操作失败";
                  return res.status(200).send(_data12);
                }
              });

            case 17:
              organization = _context8.sent;

              console.log(procode);
              code = getcode(province.code, city.code, country.code, params.industry.industry_code, params.orgCategory_code, organization);

              console.log(code);
              _context8.next = 23;
              return hwasonModel.findOne({ _id: params.contactsalesman.salesman_id }, { _id: 1, realName: 1, area: 1 }, function (err) {
                if (err) {
                  var _data13 = {};
                  _data13.result = "01";
                  _data13.name = "操作失败";
                  return res.status(200).send(_data13);
                }
              });

            case 23:
              result = _context8.sent;

              console.log(params.contactsalesman.salesman_id, result);
              _context8.next = 27;
              return organizationModel.findOne({ _id: params._id }, { code: 1 }, function (err) {
                if (err) {
                  var _data14 = {};
                  _data14.result = "01";
                  _data14.name = "操作失败";
                  return res.status(200).send(_data14);
                }
              });

            case 27:
              org = _context8.sent;
              flag = false;

              if (code.substr(0, 5) == org.code.substr(0, 5)) {
                code = org.code;
                flag = true;
              }
              _context8.next = 32;
              return organizationModel.update({ _id: params._id }, { $set: {
                  name: params.name,
                  code: code,
                  area: result.area,
                  industry: params.industry,
                  contactsalesman: params.contactsalesman,
                  region: region,
                  address: params.address,
                  director_name: params.director_name,
                  director_tel: params.director_tel,
                  receiver_name: params.receiver_name,
                  receiver_tel: params.receiver_tel,
                  financial_name: params.financial_name,
                  financial_tel: params.financial_tel,
                  projects: params.projects
                } }, function (err) {
                if (err) {
                  var _data15 = {};
                  _data15.result = "01";
                  _data15.name = "操作失败";
                  return res.status(200).send(_data15);
                }
              });

            case 32:
              if (!(flag == false)) {
                _context8.next = 37;
                break;
              }

              _context8.next = 35;
              return orgCategoryModel.update({ organization_id: params._id }, { $pull: { organization_id: params._id } }, function (err) {
                if (err) {
                  var _data16 = {};
                  _data16.result = "01";
                  _data16.name = "操作失败";
                  return res.status(200).send(_data16);
                }
              });

            case 35:
              _context8.next = 37;
              return orgCategoryModel.update({ industry_id: industry._id, code: params.orgCategory_code }, { $addToSet: { organization_id: params._id } }, function (err) {
                if (err) {
                  var _data17 = {};
                  _data17.result = "01";
                  _data17.name = "操作失败";
                  return res.status(200).send(_data17);
                }
              });

            case 37:
              data = {};

              data.result = "00";
              data.name = "操作成功";
              res.status(200).send(data);

            case 41:
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

  app.get('/sale/manager/showReports', function () {
    var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9(req, res, next) {
      var name, pageNo, pageSize, begin, end, organizations, arr, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, organization, orgIds, query, dateParam, sample_status, data;

      return _regenerator2.default.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              name = req.query.name || "";
              pageNo = req.query.pageNo || 1;
              pageSize = req.query.pageSize || 10;
              begin = req.query.begin;
              end = req.query.end;
              _context9.next = 7;
              return organizationModel.find({ name: { $regex: name } }, { _id: 1, name: 1 }, function (err) {
                if (err) {
                  var _data18 = {};
                  _data18.result = "01";
                  _data18.name = "操作失败";
                  return res.status(200).send(_data18);
                }
              });

            case 7:
              organizations = _context9.sent;
              arr = [];
              _iteratorNormalCompletion5 = true;
              _didIteratorError5 = false;
              _iteratorError5 = undefined;
              _context9.prev = 12;

              for (_iterator5 = (0, _getIterator3.default)(organizations); !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                organization = _step5.value;

                arr.push(organization._id);
              }
              _context9.next = 20;
              break;

            case 16:
              _context9.prev = 16;
              _context9.t0 = _context9['catch'](12);
              _didIteratorError5 = true;
              _iteratorError5 = _context9.t0;

            case 20:
              _context9.prev = 20;
              _context9.prev = 21;

              if (!_iteratorNormalCompletion5 && _iterator5.return) {
                _iterator5.return();
              }

            case 23:
              _context9.prev = 23;

              if (!_didIteratorError5) {
                _context9.next = 26;
                break;
              }

              throw _iteratorError5;

            case 26:
              return _context9.finish(23);

            case 27:
              return _context9.finish(20);

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
              _context9.next = 41;
              return util.queryReports(pageNo, pageSize, query, res);

            case 41:
              data = _context9.sent;
              return _context9.abrupt('return', res.status(200).send(data));

            case 43:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, this, [[12, 16, 20, 28], [21,, 23, 27]]);
    }));

    return function (_x25, _x26, _x27) {
      return _ref9.apply(this, arguments);
    };
  }());

  function changeSingleDate(date) {
    return date.getYear() + 1900 + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  }

  function getcode(province_code, city_code, country_code, industry_code, orgCategory_code, organization) {
    if (organization.length == 0) {
      return province_code + city_code + country_code + industry_code + orgCategory_code + "0";
    } else {
      var arr = [];
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = (0, _getIterator3.default)(organization), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var org = _step6.value;

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
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
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