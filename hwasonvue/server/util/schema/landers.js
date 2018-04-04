/**
 * Created by win7 on 2017/5/15.
 */
var mongoose = require('mongoose');
let mongodb = require('../mongodb.js');

let landerSchema = new mongoose.Schema({
    userName:String,    //账号
    password:String,
    role:String,
    tel:String,
    manager:{
        name:String,        //真实姓名
        organization_id:String
    },
    org_salesman:{           //机构业务员

    },
    hs_salesman:{            //华晟业务员

    },
    nurse:{

    }
})
let landerModel = mongodb.model('landers',landerSchema);

module.exports = landerModel;