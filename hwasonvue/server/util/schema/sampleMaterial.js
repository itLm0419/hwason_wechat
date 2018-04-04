/**
 * Created by win7 on 2017/5/19.
 * 物料明细
 */
var mongoose = require('mongoose');
let mongodb = require('../mongodb.js');

let sampleMaterialSchema = new mongoose.Schema({
    organization_id:String,
    state:String,               //申请：1，审批完成：2，发货完成：3
    apply_date:Date,            //申请日期
    applicant:String,           //申请人id
    send_date:Date,            //发货日期
    courier_number:String,     //快递单号
    courier_company:String,    //快递公司
    sender:{id:String,Name:String,tel:String},            //发货人
    receiver:{id:String,name:String,tel:String},           //接收人
    ymlxgjjcyhxk:Number,    //幽门螺旋杆菌检测仪呼吸卡
    nsjn:Number,            //尿素胶囊
    ycxsyjmxycjrq:Number,   //一次性使用静脉血样采集容器
    ycxczg:Number,          //一次性采血针
    sld:Number,             //手拎袋
    cy:Number,              //彩页
    zj:Number,              //展架
    jcplsqd:Number,         //检测批量申请单
    tjxmdjbyzqtzs:Number,   //体检项目登记表与知情通知书
    txm:Number,             //条形码
    hsf:Number,             //护士服
    ymd:Number,             //压脉带
    sgj:Number,             //试管架
    fp:Number,              //方盘
    wp:Number,              //弯盘
    ycxyyzd:Number,         //一次性医用中单
    ycxkz:Number,           //一次性口罩
    ycxst:Number,           //一次性手套
    mq:Number,              //棉签
    lqh:Number,             //利器盒
    ljd:Number,             //垃圾袋
    zfd:Number,             //自封袋
    dfxdy:Number,           //碘伏消毒液
    pfxdy:Number,           //皮肤消毒液
    lsexdy:Number,          //来苏尔消毒液
    pf:Number,              //屏风
    lxj:Number,             //离心机
    ymlxgjjcy:Number,       //幽门螺旋杆菌检测仪
    qm:Number,              //卷码
    bg:Number,              //报告
    xcybqd:Number,          //现场样本清单
    bd:Number               //冰袋
})

let sampleMaterialModel = mongodb.model('sampleMaterial',sampleMaterialSchema,'sampleMaterial');

module.exports = sampleMaterialModel;
