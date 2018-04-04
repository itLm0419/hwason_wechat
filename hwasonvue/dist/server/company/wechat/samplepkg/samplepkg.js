'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var samplePackageModel = require('../../../util/schema/samplePackage');
var sampleMaterialModel = require('../../../util/schema/sampleMaterial');

module.exports = function (app) {
  app.post('/wechat/samplepkg/apply', function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
      var param, organization_id, samplePackageEntity;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              param = req.body;
              organization_id = req.cookies.userId;
              samplePackageEntity = samplePackageModel({
                organization_id: organization_id,
                packages: param.packages,
                apply_date: param.apply_date,
                state: 1,
                send_date: null,
                courier_number: '',
                courier_company: '',
                sender: null,
                contact: '',
                receiver: null
              });
              _context.next = 5;
              return samplePackageEntity.save(function (err) {
                if (err) {
                  var data = {};
                  data.result = "01";
                  data.name = "操作失败";
                  return res.status(200).send(data);
                } else {
                  var _data = {};
                  _data.result = "00";
                  _data.name = "操作成功";
                  return res.status(200).send(_data);
                }
              });

            case 5:
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

  app.get('/wechat/samplepkg/deliverydetaillist', function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
      var organization_id, date, time;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              organization_id = req.cookies.organization_id;
              date = new Date();
              time = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
              _context2.next = 5;
              return samplePackageModel.find({ organization_id: organization_id, state: 3, send_date: { $gte: time } }, {
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
                  return res.status(200).send(data);
                } else {
                  return res.status(200).send(content);
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
};