/**
 * created by 淡定哥 on 2017/3/6.
 * author: 淡定哥
 * blog: http://ian.wang
 * homepage: http://www.freecto.com
 * 微信号: ianwang003  (购买短信，可以联系淡定哥微信，4.5分一条短信)
 * github: https://github.com/freecto
 *
 */

var request = require('request');
var crypto = require('crypto');

/**
 *
 * 阿里云短信发送接口 nodejs 版本
 * 阿里云短信API官方文档: https://help.aliyun.com/document_detail/44364.html?spm=5176.8195934.507901.11.pLzahV
 * github: https://github.com/freecto
 *
 */
var AliyunSmsUtil = {

    config: {   // (购买短信，可以联系淡定哥微信: ianwang003 ，4.5分一条短信)
        AccessKeyId: "LTAI5efg83spxQYO",  //阿里短信服务所用的密钥ID
        AccessKeySecret: "lqytu24ufPcOMqnXwWqM2JcqdiGvXZ", //阿里短信服务所用的密钥值
        TemplateCode: "SMS_75990311", //阿里短信模板CODE
        SignName: "南京华晟医学", //短信签名名称
        SignatureMethod: "HMAC-SHA1", //签名方式，目前支持HMAC-SHA1
        Version: "2017-05-25", //API版本号，为日期形式：YYYY-MM-DD，本版本对应为2016-09-27
        Action: "SendSms", //操作接口名，系统规定参数，取值：SingleSendSms
        Format: "JSON", //返回值的类型，支持JSON与XML，默认为XML
        SignatureVersion: "1.0" //签名算法版本，目前版本是1.0
    },


//         Format=XML&SignName=%E9%98%BF%E9%87%8C%E4%BA%91%E7%9F%AD%E4%BF%A1%E6%B5%8B%E8%AF%95%E4%B8%93%E7%94%A8&
// SignatureMethod=HMAC-SHA1
// TemplateCode=SMS_71390007
// Signature=%2BexbambPmgIG1MAYwP%2B7GPwz4RM%3D&
// Timestamp=2017-06-26T10%3A20%3A09Z
// TemplateParam=%7B%22customer%22%3A%22junmu%22%7D&
// OutId=yourOutId
// AccessKeyId=LTAIbGaUjbqB7CdA&
// Action=SendSms&
// RegionId=cn-hangzhou&
// SignatureNonce=81fc25c0-5cf9-4c2c-8fc8-994d8ed772b0&
// PhoneNumbers=13291835394&Version=2017-05-25&
// SignatureVersion=1.0 HTTP/1.1

    /**
     * 阿里云短信发送接口
     * @param data  发送短信的参数，请查看阿里云短信模板中的变量做一下调整，格式如：{code:"1234", phone:"13062706593"}
     * @param callback 发送短信后的回调函数
     */
    sendMessage: function (data, callback) {
        let that = this;
        let param = {
            'Action': that.config.Action, //操作接口名，系统规定参数，取值：SingleSendSms
            'SignName': that.config.SignName, //短信签名名称
            'TemplateCode': that.config.TemplateCode, //阿里短信模板CODE
            'Version': that.config.Version, //API版本号，为日期形式：YYYY-MM-DD，本版本对应为2016-09-27
            'Format': that.config.Format, //返回值的类型，支持JSON与XML，默认为XML
            'AccessKeyId': that.config.AccessKeyId, //阿里短信服务所用的密钥ID
            'SignatureMethod': that.config.SignatureMethod,  //签名方式，目前支持HMAC-SHA1
            'SignatureVersion': that.config.SignatureVersion, //签名算法版本，目前版本是1.0
            'SignatureNonce': ""+Math.random(), //唯一随机数，用于防止网络重放攻击。用户在不同请求间要使用不同的随机数值
            'Timestamp': new Date().toISOString(), //日期格式按照ISO8601标准表示，并需要使用UTC时间。格式为YYYY-MM-DDThh:mm:ssZ
            'PhoneNumbers': data.phone, //接受短信的手机号
            'TemplateParam': "{\"customer\":\"xiayoum\"}",//验证码模板里的变量
        };
        param.Signature = this.signParameters(param, that.config.AccessKeySecret);
        console.log("param:",param)
        // let api_url = 'https://sms.aliyuncs.com/';
        let api_url = 'https://dysmsapi.aliyuncs.com/';
        request.post({
            url: api_url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            form: param
        }, function (err, response, data) {
            if (callback) {
               // console.log("response:",response)
                console.log("data:",data)
                console.log("err:",err)
                callback(err, response, data);
            }
        });
    },

    /**
     * 阿里云短信接口， 签名函数
     * @param param 发送短信的参数
     * @param AccessKeySecret 阿里短信服务所用的密钥值
     */
    signParameters: function (param, AccessKeySecret) {
        let param2 = {}, data=[];
        let oa = Object.keys(param).sort();
        for (let i = 0; i < oa.length; i++) {
            let key = oa[i];
            param2[key] = param[key];
        }
        for (let key in param2) {
            data.push(encodeURIComponent(key) + '=' + encodeURIComponent(param2[key]));
        }
        data = data.join('&');
        let StringToSign = 'POST' + '&' + encodeURIComponent('/') + '&' + encodeURIComponent(data);
        AccessKeySecret = AccessKeySecret + '&';
        return crypto.createHmac('sha1', AccessKeySecret).update(new Buffer(StringToSign, 'utf-8')).digest('base64');
    },

    /**
     * 阿里云短信发送，测试函数
     */
    test:function(){
        var data={code:"1234", phone:"18936890561"};
        this.sendMessage(data, function(err, response, data){
            console.log(err, data);
            console.log("sended")
        })
    }

};

module.exports = AliyunSmsUtil;

// 运行该阿里云短信发送函数之前，请做如下修改：
// 1. 请先修改 config 中的4个参数： AccessKeyId， AccessKeySecret，SignName，TemplateCode
// 2. 参考阿里云短信模板， 修改 sendMessage 函数中的 ParamString
//AliyunSmsUtil.test();
