/**
 * Created by Bright xia on 2017/9/14.
 */
/**
 *
 * @Description 邮件发送
 * 调用方法:sendMail('amor_zhang@qq.com','这是测试邮件', 'Hi Amor,这是一封测试邮件');
 * @Author Amor
 * @Created 2016/04/26 15:10
 * 技术只是解决问题的选择,而不是解决问题的根本...
 * 我是Amor,为发骚而生!
 *
 */

var nodemailer = require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport');

let email={
       service: 'QQ',
        user: '517174331@qq.com',
       // pass: 'Xym6909-',
        pass: 'avyjsdtetouicace',
};

smtpTransport = nodemailer.createTransport(smtpTransport({
    service: email.service,
    auth: {
        user: email.user,
        pass: email.pass
    }
}));

/**
 * @param {String} recipient 收件人
 * @param {String} subject 发送的主题
 * @param {String} html 发送的html内容
 */
var sendMail = function (recipient, subject, html,filename,path) {
    smtpTransport.sendMail({
        from: email.user,
        to: recipient,
        subject: subject,
        html: html,
        attachments:
            {
                filename : filename,
                path: path
            }
    }, function (error, response) {
        if (error) {
            console.log(error);
        }
        console.log('发送成功')
    });
};

module.exports = sendMail;