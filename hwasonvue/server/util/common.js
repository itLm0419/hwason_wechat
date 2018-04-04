/**
 * Created by Bright xia on 2017/6/3.
 */

export default {
    changeSingleDate: function (date) {
        let month;
        if ((date.getMonth() + 1).toString().length == 1) {
            month = "0" + (date.getMonth() + 1).toString();
        } else {
            month = (date.getMonth() + 1).toString();
        }
        let minute = date.getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;

        let hour = date.getHours();
        hour = hour < 10 ? ('0' + hour) : hour;

        return (date.getYear() + 1900) + "/" + month + "/" + date.getDate() + " " + hour + ":" + minute;
    },

    dateFormat: function (date, num) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;
        if (num == 1) {
            return y + '-' + m + '-' + d + ' ' + h + ':' + minute;
        } else if (num == 2) {
            return y + '-' + m + '-' + d
        } else {
            return y + '年' + m + '月' + d
        }

    }
}

