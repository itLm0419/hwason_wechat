'use strict';

module.exports = function (app) {

    app.post('/downloadxym', function (req, res, next) {
        console.log("downloading");
        res.download('./test.js');
    });
};