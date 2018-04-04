"use strict";

var fs = require("fs"),
    _ = require("lodash"),
    os = require("os");

module.exports = {
    formatDate: function formatDate(text, date) {
        var reg = /yyyy|yy|M+|d+|h+|m+|s+|q+|S|w/g;
        text = text.replace(reg, function (pattern) {
            var result;
            switch (pattern) {
                case "yyyy":
                    result = date.getFullYear();
                    break;
                case "yy":
                    result = date.getFullYear().toString().substring(2);
                    break;
                case "M":
                case "MM":
                    result = date.getMonth() + 1;
                    break;
                case "dd":
                case "d":
                    result = date.getDate();
                    break;
                case "hh":
                case "h":
                    result = date.getHours();
                    break;
                case "mm":
                case "m":
                    result = date.getMinutes();
                    break;
                case "ss":
                case "s":
                    result = date.getSeconds();
                    break;
                case "q":
                    result = Math.floor((date.getMonth() + 3) / 3);
                    break;
                case "S":
                    result = date.getMilliseconds();
                    break;
                case "w":
                    result = "日一二三四五六".charAt(date.getDay());
                    break;
                default:
                    result = "";
                    break;
            }
            if (pattern.length == 2 && result.toString().length == 1) {
                result = "0" + result;
            }
            return result;
        });
        return text;
    },

    getServerInfo: function getServerInfo() {
        var ipv4 = [],
            mac = [];
        var networkInterfaces = os.networkInterfaces();
        for (var key in networkInterfaces) {
            if (networkInterfaces.hasOwnProperty(key)) {
                var interfaces = networkInterfaces[key];
                for (var i = 0; i < interfaces.length; i++) {
                    if (interfaces[i].family == "IPv4" && !interfaces[i].internal) {
                        ipv4.push(interfaces[i].address);
                        mac.push(interfaces[i].mac);
                    }
                }
            }
        }

        return {
            host: os.hostname(),
            ipv4: ipv4,
            mac: mac
        };
    },

    getServerTime: function getServerTime() {
        return this.formatDate("[yyyy.MM.dd hh:mm:ss]", new Date());
    },

    getReqInfo: function getReqInfo(req, data) {
        var info = {
            ___reqTime: new Date(),
            ___reqAddr: req ? req.connection.remoteAddress : ""
        };

        if (!arguments[0]) {
            var schemaBase = {};
            schemaBase["___reqTime"] = Date;
            schemaBase["___reqAddr"] = String;
            return schemaBase;
        }

        if (!arguments[1]) {
            return _.assign(req.body, info);
        } else {
            return _.assign(data, info);
        }
    },

    folderExist: function folderExist(folderDir, ifCreate) {
        fs.stat(folderDir, function (err, stats) {
            if (!err) {
                return true;
            }
            if (err.errno == -2) {
                if (ifCreate) {
                    fs.mkdir(folderDir);
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        });
    }
};