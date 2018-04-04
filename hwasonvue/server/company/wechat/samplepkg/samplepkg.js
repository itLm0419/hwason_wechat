'use strict'
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
let samplePackageModel = require('../../../util/schema/samplePackage');
let sampleMaterialModel = require('../../../util/schema/sampleMaterial');

module.exports = function (app) {
// / 确定申请
  app.post('/wechat/samplepkg/apply', async function (req, res, next) {
    let param = req.body;
    let organization_id = req.cookies.userId;
    let samplePackageEntity = samplePackageModel({
      organization_id: organization_id,
      packages: param.packages,
      apply_date: param.apply_date,
      state: 1,
      send_date:null,
      courier_number:'',
      courier_company:'',
      sender:null,
      contact:'',
      receiver:null
    });
    await samplePackageEntity.save(function (err) {
      if (err) {
        let data = {};
        data.result = "01";
        data.name = "操作失败";
        return res.status(200).send(data);
      } else {
        let data = {};
        data.result = "00";
        data.name = "操作成功";
        return res.status(200).send(data);
      }
    });
  });

// 物料明细
  app.get('/wechat/samplepkg/deliverydetaillist', async function (req, res, next) {
    let organization_id = req.cookies.organization_id;
    let date = new Date();
    let time = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
    await samplePackageModel.find({organization_id: organization_id, state: 3, send_date: {$gte: time}},
      {
        _id: 1,
        send_date: 1,       //发货日期
        courier_number: 1,  //快递单号
        sender: 1,          //发货人
        contact: 1,         //联系方式
        receiver: 1,        //接收人
      },
      function (err, content) {
        if (err) {
          let data = {};
          data.result = "01";
          data.name = "操作失败";
          return res.status(200).send(data);
        } else {
          return res.status(200).send(content);
        }
      })
  });
}


