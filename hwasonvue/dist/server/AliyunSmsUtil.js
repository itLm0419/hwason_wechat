'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var request = require('request');
var crypto = require('crypto');

var AliyunSmsUtil = {

    config: {
        AccessKeyId: "LTAI5efg83spxQYO",
        AccessKeySecret: "lqytu24ufPcOMqnXwWqM2JcqdiGvXZ",
        TemplateCode: "SMS_75990311",
        SignName: "南京华晟医学",
        SignatureMethod: "HMAC-SHA1",
        Version: "2017-05-25",
        Action: "SendSms",
        Format: "JSON",
        SignatureVersion: "1.0" },

    sendMessage: function sendMessage(data, callback) {
        var that = this;
        var param = {
            'Action': that.config.Action,
            'SignName': that.config.SignName,
            'TemplateCode': that.config.TemplateCode,
            'Version': that.config.Version,
            'Format': that.config.Format,
            'AccessKeyId': that.config.AccessKeyId,
            'SignatureMethod': that.config.SignatureMethod,
            'SignatureVersion': that.config.SignatureVersion,
            'SignatureNonce': "" + Math.random(),
            'Timestamp': new Date().toISOString(),
            'PhoneNumbers': data.phone,
            'TemplateParam': "{\"customer\":\"xiayoum\"}" };
        param.Signature = this.signParameters(param, that.config.AccessKeySecret);
        console.log("param:", param);

        var api_url = 'https://dysmsapi.aliyuncs.com/';
        request.post({
            url: api_url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            form: param
        }, function (err, response, data) {
            if (callback) {
                console.log("data:", data);
                console.log("err:", err);
                callback(err, response, data);
            }
        });
    },

    signParameters: function signParameters(param, AccessKeySecret) {
        var param2 = {},
            data = [];
        var oa = (0, _keys2.default)(param).sort();
        for (var i = 0; i < oa.length; i++) {
            var key = oa[i];
            param2[key] = param[key];
        }
        for (var _key in param2) {
            data.push(encodeURIComponent(_key) + '=' + encodeURIComponent(param2[_key]));
        }
        data = data.join('&');
        var StringToSign = 'POST' + '&' + encodeURIComponent('/') + '&' + encodeURIComponent(data);
        AccessKeySecret = AccessKeySecret + '&';
        return crypto.createHmac('sha1', AccessKeySecret).update(new Buffer(StringToSign, 'utf-8')).digest('base64');
    },

    test: function test() {
        var data = { code: "1234", phone: "18936890561" };
        this.sendMessage(data, function (err, response, data) {
            console.log(err, data);
            console.log("sended");
        });
    }

};

module.exports = AliyunSmsUtil;