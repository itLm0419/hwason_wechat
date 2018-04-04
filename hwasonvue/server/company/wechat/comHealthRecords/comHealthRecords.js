/**
 * Created by Bright xia on 2017/8/28.
 */

'use strict'
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
import common from "../../../util/common.js"
import sendMail from "../../../mail.js"
//let moment=require('moment')
let cardModel = require('../../../util/schema/card');
let userModel = require('../../../util/schema/user');
let userRecordModel = require('../../../util/schema/userRecord');
import xlsx from 'node-xlsx';
let fs = require('fs');
var JSZip = require("jszip");


module.exports = function (app) {
    app.get('/wechat/company/sendEmailRecords',async function (req,res,next) {
        let param = req.query.CNI;
        let begin = req.query.beginTime;
        let email = req.query.email;
        let end = req.query.endTime;
        let department = req.query.department;
        let organization_id = req.cookies.userId;
        let head = ["部门","业务员姓名","业务员工号","姓名","年龄","身份证","性别","卡号","建档时间","客户联系方式","客户地址"];
        let query = {};
        query.organization_id = organization_id;
        if(param&&param!='undefined'){
            query.$or = [{cardNo:{'$regex':param,'$options':"i"}},{name:{'$regex':param,'$options':"i"}},{IDNo:{'$regex':param,'$options':"i"}}]
        }
        let dateParam = {};
        if(begin){
            dateParam.$gte = begin;
        }
        if(end){
            dateParam.$lte = end;
        }
        if(dateParam.hasOwnProperty("$gte")||dateParam.hasOwnProperty("$lte")){
            query.createTime = dateParam;
        }
        if(department){
            query['salesman.department'] = department
        }
        let data = [];
        let records = await userRecordModel.find(query,
            {name:1,IDNo:1,sex:1,cardNo:1,salesman:1,complete:1,userId:1,createTime:1,tel:1,address:1})
        data.push(head);
        for(let rd of records){
            let arr = [];
            arr.push(rd.salesman.department);
            arr.push(rd.salesman.realName);
            arr.push(rd.salesman.userName);
            arr.push(rd.name);
            arr.push(getAgeByIDNo(rd.IDNo));
            arr.push(rd.IDNo);
            arr.push(rd.sex);
            arr.push(rd.cardNo);
            arr.push(common.dateFormat(rd.createTime,2));
            arr.push(rd.tel);
            arr.push(rd.address);
            data.push(arr);
        }
        var buffer = xlsx.build([
            {
                name: 'sheet1',
                data: data
            }
        ]);
        fs.writeFile('/home/hwason/temp/records.xlsx',buffer,function(err){
            if(err){
                console.log(err);
                throw err
            } ;
            sendMail(email,'健康档案', '健康档案','健康档案.xlsx',"/home/hwason/temp/records.xlsx");
        });
        let datas = {};
        datas.name = "操作成功";
        datas.result = "00";
        res.status(200).send(datas);

    });
    app.get('/wechat/company/showRecordsOrg',async function (req,res,next) {
        let pageNo = req.query.pageNo||1;
        let pageSize = req.query.pageSize||20;
        let param = req.query.CNI;
        let begin = req.query.beginTime;
        let end = req.query.endTime;
        let department = req.query.department;
        let query = {};
        let organization_id = req.cookies.userId;
        query.organization_id = organization_id;
        if(param&&param!='undefined'){
            query.$or = [{cardNo:{'$regex':param,'$options':"i"}},{name:{'$regex':param,'$options':"i"}},{IDNo:{'$regex':param,'$options':"i"}}]
        }
        let dateParam = {};
        if(begin){
            dateParam.$gte = begin;
        }
        if(end){
            dateParam.$lte = end;
        }
        if(dateParam.hasOwnProperty("$gte")||dateParam.hasOwnProperty("$lte")){
            query.createTime = dateParam;
        }
        if(department&&department!='undefined'){
            query['salesman.department'] = department
        }
        console.log(query);
        let count = await userRecordModel.count(query,function (err) {
            if(err){
                let data = {};
                data.result = "01";
                data.name = "操作失败";
                return res.status(200).send(data);
            }
        });
        let records = await userRecordModel.find(query,
            {name:1,IDNo:1,sex:1,cardNo:1,salesman:1,complete:1,userId:1},
            function (err) {
                if(err){
                    let data = {};
                    data.result = "01";
                    data.name = "操作失败";
                    return res.status(200).send(data);
                }
            }).skip((pageNo-1)*pageSize).limit(parseInt(pageSize));
        let data = [];
        for(let rd of records){
            let record = {};
            record.name = rd.name;
            record.userId = rd.userId;
            record.age = getAgeByIDNo(rd.IDNo);
            record.sex = rd.sex;
            record.cardNo = rd.cardNo;
            record.salesman = rd.salesman;
            record.complete = rd.complete;
            data.push(record)
        }
        let datas = {};
        datas.count = count;
        datas.records = data;
        res.status(200).send(datas);
    });
    //按部门统计健康档案（卡）激活数
    app.get('/wechat/company/HRecordByDepartment', async function (req, res, next) {
        let organization_id = req.cookies.userId;
        let date = new Date();
        let begintime = new Date(date.getFullYear(), date.getMonth() , date.getDate());
        let endtime = new Date(date.getFullYear(), date.getMonth(), date.getDate()+1);
        let count_total =await cardModel.aggregate(
            [
                {$match : {organization_id: organization_id}},
                {$group:  { _id: {'department':"$salesman.department"}, count: { $sum: 1 }}},
                {$sort:   {"count" : -1}}
            ]);
        let today_total =await cardModel.aggregate(
            [
                {$match : {organization_id: organization_id,beginTime: {$gte:begintime,$lt:endtime}}},
                {$group:  { _id: {'department':"$salesman.department"}, count: { $sum: 1 }}},
                {$sort:   {"count" : -1}}
            ]);
        console.log(count_total,today_total,22222222)
        if(count_total.length ==0)
        {
            let data={};
            return res.status(200).send(data)
        }
        let data=new Array();
        let i,j;
        for(i=0;i<count_total.length;i++) {
            //data=new Array();
            let statistics = {};
            let pro = "";
            statistics.department=count_total[i]._id.department;
            statistics.total_number = count_total[i].count;
            for (j = 0; j < today_total.length; j++) {
                if (today_total[j]._id.department == count_total[i]._id.department) {
                    statistics.today_number = today_total[j].count;
                    break;
                }
                if (j == today_total.length)
                    statistics.today_number = 0;
            }
            if(today_total.length==0) statistics.today_number=0;
            statistics.other_number = statistics.total_number - statistics.today_number;
             data.push(statistics)
        }
        return res.status(200).send(data)
    });

    //按业务员统计健康档案（卡）激活数
    app.get('/wechat/company/HRecordBySalesman', async function (req, res, next) {
        let organization_id = req.cookies.userId;

        let date = new Date();
        let beginTime = new Date(date.getFullYear(), date.getMonth() , date.getDate());
        let endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate()+1);
        let count_total =await cardModel.aggregate(
            [
                {$match : {organization_id: organization_id}},
               //  {$project: {'salesman.realName':1,'salesman.department':1} },
                {$group:  { _id: {'id':'$salesman._id','realName':'$salesman.realName','department':'$salesman.department'}, count: { $sum: 1 }}},
                // {$project: {'salesman.realName':1,'salesman.department':1} },
                {$sort:   {"count" : -1}}
            ]);
        let today_total =await cardModel.aggregate(
            [
                {$match : {organization_id: organization_id,beginTime: {$gte:beginTime,$lt:endTime}}},
                {$group:  { _id: {'id':'$salesman._id','realName':'$salesman.realName','department':'$salesman.department'}, count: { $sum: 1 }}},
               // {$project: {'salesman.realName':1,'salesman.department':1} },
                {$sort:   {"count" : -1}}
            ]);
        if(count_total.length ==0)
        {
            let data={};
            return res.status(200).send(data)
        }
        let data=new Array();
        let i,j;
        for(i=0;i<count_total.length;i++) {
            //data=new Array();
            let statistics = {};

            statistics.name=count_total[i]._id.realName;
            statistics.department=count_total[i]._id.department;
            statistics.total_number = count_total[i].count;
            for (j = 0; j < today_total.length; j++) {

                if (today_total[j]._id.id == count_total[i]._id.id) {
                    statistics.today_number = today_total[j].count;
                    break;
                }
                if (j == today_total.length)
                    statistics.today_number = 0;
            }
            if(today_total.length ==0) statistics.today_number = 0;
            data.push(statistics)

        }
        return res.status(200).send(data)



    });

    app.get('/wechat/company/getTotalNum', async function (req, res, next) {
        let organization_id = req.cookies.userId;
        let totalNum = await cardModel.count({organization_id: organization_id},
            function (err) {
                if(err){
                    let data = {};
                    data.result = "01";
                    data.name = "操作失败";
                    return res.status(200).send(data);
                }
            });
        let data={};
         data.value=totalNum;

        res.status(200).send(data);

    });


    //健康卡详情
    app.get('/wechat/company/HRecordDetailList', async function (req, res, next) {
        let organization_id = req.cookies.userId;
        let numOfPage=8;
        let num=req.query.pageNumber * numOfPage;
        let data=[],dataAll={};
        let userArray=new Array();

        console.log("pages",numOfPage)
        console.log("num",num)
       let users = await cardModel.find({organization_id: organization_id},
            {
                _id: 1,
                userId:1,
                cardNo: 1,
                salesman: 1,
                status: 1
            }).skip(num).limit(numOfPage).sort({beginTime:-1});

        if(users.length==0) {
            dataAll.data=[];
            dataAll.end=true;
            return res.status(200).send(data);
        }

        for(let x in users){
            userArray.push(users[x].userId)
        }
        console.log("userArray",userArray)
        let result2 = await userRecordModel.find({'userId':{$in: userArray}},
            {userId:1,name:1,sex:1,IDNo:1,complete:1},function (err) {
                if(err){
                    let data = {};
                    data.result = "01";
                    data.name = "操作失败";
                    res.status(200).send(data);
                    return ;
                }
            }).sort({createTime:-1});

         console.log("result2",result2)

        for(let i=0;i<users.length;i++)
        {
            let k;

            for(k=0;k<result2.length;k++)
            {
                if(users[i].userId==result2[k].userId)
                    break;
            }

            console.log("k",k,users[i].userId)
            let user={};
            user.name=result2[k].name;
            user.sex=result2[k].sex;
            let birthday=new Date(result2[k].IDNo.substr(6,4)+'/'+result2[k].IDNo.substr(10,2)+'/'+result2[k].IDNo.substr(12,2))
            user.age=new Date().getFullYear()-new Date(birthday).getFullYear();
            user.salesmanName=users[i].salesman.realName;
            user.salesmanUseraccount=users[i].salesman.userName;
            user.cardNo=users[i].cardNo;
            user.userId=result2[k].userId;
            if(result2[k].complete)
                user.complete='已完成';
            else
                user.complete='未完成';
            data.push(user);

        }
        dataAll.data=data;
        if(users.length<8)
            dataAll.end=true;
        else dataAll.end=false;
        console.log("dataAll",dataAll)

        return res.status(200).send(dataAll)



    });

    //查询卡号，名字，业务员工号
    app.get('/wechat/company/HRecordDetailListInfo', async function (req, res, next) {
        let organization_id = req.cookies.userId;
        let info=req.query.info;
        let num=req.query.pageNumber*8;
        let userArray=new Array();
        let data=[],dataAll={};
        array[0]={cardNo: {$regex: info}};
        array[1]={'salesman.userName': {$regex:info}};
        array[2]={'userName': {$regex: info}};

        let users = await cardModel.find({organization_id: organization_id},
            {
                _id: 1,
                userId:1,
                cardNo: 1,
                salesman: 1,
                status: 1
            }).or(array).skip(num).limit(8).sort({beginTime:-1});
        if(users.length==0) {
            dataAll.data=[];
            dataAll.end=true;
            return res.status(200).send(data);
        }
        for(let x in users){
            userArray.push(users[x].userId)
        }


        let result2 = await userRecordModel.find({'userId':{$in: userArray}},
            {userId:1,name:1,sex:1,IDNo:1,complete:1},function (err) {
                if(err){
                    let data = {};
                    data.result = "01";
                    data.name = "操作失败";
                    res.status(200).send(data);
                    return ;
                }
            }).sort({createTime:-1});


        for(let i=0;i<users.length;i++)
        {
            let k;

            for(k=0;k<result2.length;k++)
            {
                if(users[i].userId==result2[k].userId)
                    break;
            }


            let user={};
            user.name=result2[k].name;
            user.sex=result2[k].sex;
            let birthday=new Date(result2[k].IDNo.substr(6,4)+'/'+result2[k].IDNo.substr(10,2)+'/'+result2[k].IDNo.substr(12,2))
            user.age=new Date().getFullYear()-new Date(birthday).getFullYear();
            user.salesmanName=users[i].salesman.realName;
            user.salesmanUseraccount=users[i].salesman.userName;
            user.cardNo=users[i].cardNo;
            user.userId=result2[k].userId;
            if(result2[k].complete)
                user.complete='已完成';
            else
                user.complete='未完成';
            data.push(user);

        }
        dataAll.data=data;
        if(users.length<8)
            dataAll.end=true;
        else dataAll.end=false;
        return res.status(200).send(dataAll)


    });


    // //查询卡号，名字，业务员工号
    // app.get('/wechat/company/HRecordDetailListInfo', async function (req, res, next) {
    //     let organization_id = req.cookies.userId;
    //     let info=req.query.info;
    //     let num=req.query.pageNumber*8;
    //     let array=new Array();
    //     let end=false;
    //     let data=[];
    //
    //     console.log("info",info)
    //     console.log("organization_id",organization_id)
    //
    //      array[0]={cardNo: {$regex: info}};
    //      array[1]={'salesman.userName': {$regex:info}};
    //      array[2]={'userName': {$regex: info}};
    //
    //    let users = await cardModel.find({organization_id: organization_id},
    //         {
    //             _id: 1,
    //             userId:1,
    //             cardNo: 1,
    //             salesman: 1,
    //             status: 1,
    //
    //         }).or(array).skip(num).limit(8).sort({beginTime:-1});
    //
    //    //  console.log("users",users)
    //
    //       if(users.length==0) {
    //           data.users=[];
    //           data.end=true;
    //           return res.status(200).send(data);
    //       }
    //
    //
    //
    //     for(let i=0;i<users.length;i++)
    //     {
    //         let result = await userModel.findOne({'_id':users[i].userId},
    //             {name:1,sex:1,IDNo:1},function (err) {
    //                 if(err){
    //                     let data = {};
    //                     data.result = "01";
    //                     data.name = "操作失败";
    //                     res.status(200).send(data);
    //                     return ;
    //                 }
    //             });
    //         let user={};
    //         user.name=result.name;
    //         user.sex=result.sex;
    //         let birthday=new Date(result.IDNo.substr(6,4)+'/'+result.IDNo.substr(10,2)+'/'+result.IDNo.substr(12,2))
    //         user.age=new Date().getFullYear()-new Date(birthday).getFullYear();
    //         user.salesmanName=users[i].salesman.realName;
    //         user.salesmanUseraccount=users[i].salesman.userName;
    //         user.cardNo=users[i].cardNo;
    //         if(users[i].complete)
    //             user.complete='已完成';
    //         else
    //             user.complete='未完成';
    //         data.push(user);
    //
    //     }
    //     console.log(data)
    //     return res.status(200).send(data)
    //
    //
    // });

    //查询按照时间段和部门
    app.get('/wechat/company/HRecordDetailListDate', async function (req, res, next) {
        let organization_id = req.cookies.userId;
        let startDate=req.query.startDate;
        let endDate=req.query.endDate;
        let department=req.query.department;
        let num=req.query.pageNumber*8;
        let userArray=new Array();
        let end=false;
        let data=[],dataAll={};

        //console.log("info",info)
        console.log("organization_id",organization_id)
        let query={};
        query.organization_id=organization_id;

        if(startDate !='')
       {
           let date={};
           date.$gte=startDate;
           date.$lt=endDate;
           query.beginTime=date;
       }
       if(department !='')
       {
         //  let dept={};
          // dept.department=department;
           query["salesman.department"]=department;
       }
        let users = await cardModel.find(query,
            {
                _id: 1,
                userId:1,
                cardNo: 1,
                salesman: 1,
                status: 1

            }).skip(num).limit(8).sort({beginTime:-1});

        console.log("users",users)

        if(users.length==0) {
            dataAll.data=[];
            dataAll.end=true;
            return res.status(200).send(data);
        }

        for(let x in users){
            userArray.push(users[x].userId)
        }

       let result2 = await userRecordModel.find({'userId':{$in: userArray}},
            {userId:1,name:1,sex:1,IDNo:1,complete:1},function (err) {
                if(err){
                    let data = {};
                    data.result = "01";
                    data.name = "操作失败";
                    res.status(200).send(data);
                    return ;
                }
            }).sort({createTime:-1});


        for(let i=0;i<users.length;i++)
        {
            let k;

            for(k=0;k<result2.length;k++)
            {
                if(users[i].userId==result2[k].userId)
                    break;
            }


            let user={};
            user.name=result2[k].name;
            user.sex=result2[k].sex;
            let birthday=new Date(result2[k].IDNo.substr(6,4)+'/'+result2[k].IDNo.substr(10,2)+'/'+result2[k].IDNo.substr(12,2))
            user.age=new Date().getFullYear()-new Date(birthday).getFullYear();
            user.salesmanName=users[i].salesman.realName;
            user.salesmanUseraccount=users[i].salesman.userName;
            user.cardNo=users[i].cardNo;
            user.userId=result2[k].userId;
            if(result2[k].complete)
                user.complete='已完成';
            else
                user.complete='未完成';
            data.push(user);

        }

        console.log(data)
        dataAll.data=data;
        if(users.length<8)
            dataAll.end=true;
        else dataAll.end=false;
        return res.status(200).send(dataAll)


    });

    // //查询按照时间段和部门
    // app.get('/wechat/company/HRecordDetailListDate', async function (req, res, next) {
    //     let organization_id = req.cookies.userId;
    //     let startDate=req.query.startDate;
    //     let endDate=req.query.endDate;
    //     let department=req.query.department;
    //     let num=req.query.pageNumber*8;
    //     let array=new Array();
    //     let end=false;
    //     let data=[];
    //
    //     //console.log("info",info)
    //     console.log("organization_id",organization_id)
    //     let query={};
    //     query.organization_id=organization_id;
    //
    //     if(startDate !='')
    //     {
    //         let date={};
    //         date.$gte=startDate;
    //         date.$lt=endDate;
    //         query.beginTime=date;
    //     }
    //     if(department !='')
    //     {
    //         //  let dept={};
    //         // dept.department=department;
    //         query["salesman.department"]=department;
    //     }
    //     console.log("query",query)
    //     let users = await cardModel.find(query,
    //         {
    //             _id: 1,
    //             userId:1,
    //             cardNo: 1,
    //             salesman: 1,
    //             status: 1,
    //
    //         }).skip(num).limit(8).sort({beginTime:-1});
    //
    //     console.log("users",users)
    //
    //     if(users.length==0) {
    //         data.users=[];
    //         data.end=true;
    //         return res.status(200).send(data);
    //     }
    //
    //
    //     for(let i=0;i<users.length;i++)
    //     {
    //         let result = await userModel.findOne({'_id':users[i].userId},
    //             {name:1,sex:1,IDNo:1},function (err) {
    //                 if(err){
    //                     let data = {};
    //                     data.result = "01";
    //                     data.name = "操作失败";
    //                     res.status(200).send(data);
    //                     return ;
    //                 }
    //             });
    //         let user={};
    //         user.name=result.name;
    //         user.sex=result.sex;
    //         let birthday=new Date(result.IDNo.substr(6,4)+'/'+result.IDNo.substr(10,2)+'/'+result.IDNo.substr(12,2))
    //         user.age=new Date().getFullYear()-new Date(birthday).getFullYear();
    //         user.salesmanName=users[i].salesman.realName;
    //         user.salesmanUseraccount=users[i].salesman.userName;
    //         user.cardNo=users[i].cardNo;
    //         if(users[i].complete)
    //             user.complete='已完成';
    //         else
    //             user.complete='未完成';
    //         data.push(user);
    //
    //     }
    //     console.log(data)
    //     return res.status(200).send(data)
    //
    //
    // });



    //导出下载数据--发送邮件
    app.get('/wechat/company/HRecordMail', async function (req, res, next) {
        let organization_id = req.cookies.userId;
        let startDate=req.query.startDate;
        let endDate=req.query.endDate;
        let department=req.query.department;
        let userArray=new Array();
        let head = ["部门","业务员姓名","业务员工号","姓名","年龄","身份证","性别","卡号"];
        let data=[];

        //console.log("info",info)
        console.log("organization_id",organization_id)
        let query={};
        query.organization_id=organization_id;

        if(startDate !='')
        {
            let date={};
            date.$gte=startDate;
            date.$lt=endDate;
            query.beginTime=date;
        }
        if(department !='')
        {
            //  let dept={};
            // dept.department=department;
            query["salesman.department"]=department;
        }
        console.log("query",query)
        let users = await cardModel.find(query,
            {
                _id: 1,
                userId:1,
                cardNo: 1,
                salesman: 1,
                status: 1,

            }).sort({beginTime:-1});

        console.log("users",users)

        for(let x in users){
            userArray.push(users[x].userId)
        }

        data.push(head);


        let result = await userModel.find({'_id':{$in: userArray}},
            {_id:1,name:1,sex:1,IDNo:1},function (err) {
                if(err){
                    let data = {};
                    data.result = "01";
                    data.name = "操作失败";
                    res.status(200).send(data);
                    return ;
                }
            }).sort({createTime:-1});

        for(let i=0;i<users.length;i++)
        {

            let user={};

            let k;

            for(k=0;k<result.length;k++)
            {
                if(users[i].userId==result[k]._Id)
                    break;
            }
            user.salesmanDept=users[i].salesman.department;
            user.salesmanName=users[i].salesman.realName;
            user.salesmanUseraccount=users[i].salesman.userName;
            user.name=result[k].name;

            let birthday=new Date(result[k].IDNo.substr(6,4)+'/'+result[k].IDNo.substr(10,2)+'/'+result[k].IDNo.substr(12,2))
            user.age=new Date().getFullYear()-new Date(birthday).getFullYear();
            user.IDNo=result[k].IDNo;
            user.sex=result[k].sex;
            user.cardNo=users[i].cardNo;
            data.push(user);

        }


       // let zip = new JSZip();



            // for(let user of data){
            //     let arr = [];
            //
            //     arr.push(user.department);
            //     arr.push(user.salesmanName);
            //     arr.push(user.salesmanUseraccount);
            //     arr.push(user.name);
            //     arr.push(user.age);
            //     arr.push(user.IDNo);
            //     arr.push(user.sex);
            //     data.push(arr);
            // }
            var buffer = xlsx.build([
                {
                    name: 'sheet1',
                    data: data
                }
            ]);
        let str=(Math.ceil(Math.random()*1000)).toString();
        let path='e:\\report'+str+'.xlsx';
        let file_name='report'+str+'.xlsx';
       console.log("filename",file_name)
            fs.writeFile(file_name,buffer,function(err){
        // fs.writeFile('/home/hwason/report.xlsx',buffer,function(err){
                if(err) throw err;
            //    res.download('/home/hwason/report.xlsx');
            sendMail('517174331@qq.com','这是测试邮件', 'Hi Amor,这是一封测试邮件',file_name,path);
            });
        });



    //导出下载数据
    app.post('/wechat/company/HRecordUpload2', async function (req, res, next) {

            res.download('e:\\report.xlsx');
        sendMail('amor_zhang@qq.com','这是测试邮件', 'Hi Amor,这是一封测试邮件');

        });




    //获取部门信息--从card表
    app.get('/wechat/company/HRecordDepartment', async function (req, res, next) {
        let organization_id = req.cookies.userId;
        let startDate=req.query.startDate;
        let endDate=req.query.endDate;
        let department=req.query.department;
        let num=req.query.pageNumber*8;
        let array=new Array();
        let end=false;
        let data=[];

        //console.log("info",info)
        console.log("organization_id",organization_id)

       let dept = await cardModel.distinct("salesman.department",
            {
                organization_id: organization_id

            });

        console.log("dept",dept)
        return res.status(200).send(dept)


    });

}
function getAgeByIDNo(IDNo) {
    if(IDNo.length == 18){
        let birthdayYear = parseInt(IDNo.substr(6,4))
        let nowYear = (new Date()).getFullYear()
        return nowYear - birthdayYear
    }else if(IDNo.length == 15){
        let birthdayYear = parseInt(19+IDNo.substr(6,2))
        let nowYear = (new Date()).getFullYear()
        return nowYear - birthdayYear
    }
}