
'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mssql = require('mssql');
var db = {};
var config = {
    user: 'sa',
    password: '123456Root@',
    server: '106.14.239.100',
    database: 'HSZJK',
    port: 1433,
    options: {
        encrypt: true },
    pool: {
        min: 0,
        max: 10,
        idleTimeoutMillis: 3000
    }
};

db.sql = function (sql) {
    return new _promise2.default(function (resolve, reject) {
        var connection = new mssql.Connection(config, function (err) {
            if (err) {
                console.log(err);
                return;
            }
            var ps = new mssql.PreparedStatement(connection);
            ps.prepare(sql, function (err) {
                if (err) {
                    console.log(err);
                    return;
                }
                ps.execute('', function (err, result) {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    ps.unprepare(function (err) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
                });
            });
        });
    });
};

module.exports = db;