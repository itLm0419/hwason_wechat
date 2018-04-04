'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    changeSingleDate: function changeSingleDate(date) {
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
    },

    dateFormat: function dateFormat(date, num) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        var d = date.getDate();
        d = d < 10 ? '0' + d : d;
        var h = date.getHours();
        h = h < 10 ? '0' + h : h;
        var minute = date.getMinutes();
        minute = minute < 10 ? '0' + minute : minute;
        if (num == 1) {
            return y + '-' + m + '-' + d + ' ' + h + ':' + minute;
        } else if (num == 2) {
            return y + '-' + m + '-' + d;
        } else {
            return y + '年' + m + '月' + d;
        }
    }
};