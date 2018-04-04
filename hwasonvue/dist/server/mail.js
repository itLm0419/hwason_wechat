'use strict';

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var email = {
    service: 'QQ',
    user: '517174331@qq.com',

    pass: 'imsesvshcvbicafi'
};

smtpTransport = nodemailer.createTransport(smtpTransport({
    service: email.service,
    auth: {
        user: email.user,
        pass: email.pass
    }
}));

var sendMail = function sendMail(recipient, subject, html, filename, path) {
    smtpTransport.sendMail({
        from: email.user,
        to: recipient,
        subject: subject,
        html: html,
        attachments: {
            filename: filename,
            path: path
        }

    }, function (error, response) {
        if (error) {
            console.log(error);
        }
        console.log('发送成功');
    });
};

module.exports = sendMail;