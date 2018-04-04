'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');

function readdir(src) {
    return new _promise2.default(function (resolved, rejected) {
        fs.readdir(src, function (err, files) {
            if (err) {
                rejected(err);
            } else {
                resolved(files);
            }
        });
    });
}

function lstat(src) {
    return new _promise2.default(function (resolved, rejected) {
        fs.lstat(src, function (err, stats) {
            if (err) {
                rejected(err);
            } else {
                resolved(stats);
            }
        });
    });
}

function addPromiseDone() {
    _promise2.default.prototype.done = function (onFulfilled, onRejected) {
        this.then(onFulfilled, onRejected).catch(function (reason) {
            setTimeout(function () {
                throw reason;
            }, 0);
        });
    };
}

module.exports = function () {
    addPromiseDone();
    return {
        readdir: readdir,
        lstat: lstat
    };
};