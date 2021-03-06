'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var fs = require('fs');
var loginModel = require('./schema/login');
module.exports = function (app) {
  app.post('/wechat/login', function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
      var userName, password, result;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              userName = req.body.params.userName;
              password = req.body.params.password;

              console.log(userName, password);
              _context.next = 5;
              return loginModel.findOne({ 'userName': userName, 'password': password }, { _id: 1, role: 1 }, function (err) {
                if (err) {
                  var data = {};
                  data.result = "01";
                  data.name = "操作失败";
                  res.status(200).send(data);
                }
              });

            case 5:
              result = _context.sent;

              if (result) {
                _context.next = 10;
                break;
              }

              _context.next = 9;
              return loginModel.findOne({ tel: userName, password: password }, { _id: 1, role: 1 }, function (err) {
                if (err) {
                  var data = {};
                  data.result = "01";
                  data.name = "操作失败";
                  res.status(200).send(data);
                }
              });

            case 9:
              result = _context.sent;

            case 10:
              res.cookie('userId', result._id);
              res.status(200).send(result);

            case 12:
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

  app.post('/wechat/modifyPassword', function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
      var tel, password;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              tel = req.body.data.tel;
              password = req.body.data.password;
              _context2.next = 4;
              return loginModel.update({ tel: tel }, { $set: { password: password } }, function (err) {
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

            case 4:
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