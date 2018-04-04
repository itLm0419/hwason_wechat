/**
 * Created by win7 on 2017/3/14.
 */
'use strict'
let mssql = require('mssql');
let db = {};
let config = {
    user: 'sa',
    password: '123456Root@',
    server: '106.14.239.100',
    database: 'HSZJK',
    port:1433,
    options: {
        encrypt: true // Use this if you're on Windows Azure
    },
    pool: {
        min: 0,
        max: 10,
        idleTimeoutMillis: 3000
    }
}

// db.sql = function (sql, callBack) {
//     var connection = new mssql.Connection(config, function (err) {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         var ps = new mssql.PreparedStatement(connection);
//         ps.prepare(sql, function (err) {
//             if (err){
//                 console.log(err);
//                 return;
//             }
//             ps.execute('', function (err, result) {
//                 if (err){
//                     console.log(err);
//                     return;
//                 }
//
//                 ps.unprepare(function (err) {
//                     if (err){
//                         console.log(err);
//                         callback(err,null);
//                         return;
//                     }
//                     callBack(err, result);
//                 });
//             });
//         });
//     });
// };

db.sql = function (sql){
        return new Promise(function(resolve,reject){
            var connection = new mssql.Connection(config, function (err) {
                if (err) {
                    console.log(err);
                    return;
                }
                var ps = new mssql.PreparedStatement(connection);
                ps.prepare(sql, function (err) {
                    if (err){
                        console.log(err);
                        return;
                    }
                    ps.execute('', function (err, result) {
                        if (err){
                            console.log(err);
                            return;
                        }

                        ps.unprepare(function (err) {
                            if (err){
                                reject(err);
                            }else{
                                resolve(result);
                            }
                        });
                    });
                });
            });
        })
    }

module.exports = db;
