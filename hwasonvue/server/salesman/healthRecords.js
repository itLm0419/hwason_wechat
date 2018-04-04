/**
 * Created by win7 on 2017/8/23.
 */
import cardModel from '../util/schema/card';
import loginModel from '../util/schema/login'
import userRecordModel from '../util/schema/userRecord';
import userModel from '../util/schema/user'
import salesmanModel from '../util/schema/salesman'
import util from '../util/common'
 let xlsx = require('node-xlsx');
 var JSZip = require("jszip");
 var fs = require('fs')
module.exports = function(app){
    app.post('/wechat/healthRecord/register',async function(req,res,next){
        let params = req.body.params;
        let cardNo = params.cardNo;
        let password = params.password;
        let name = params.name;
        let IDNo = params.IDNo;
        let salesmanNo = params.salesmanNo;
        let salesmanId = req.cookies.userId;
        if(salesmanId&&!salesmanNo){
            let login = await loginModel.findOne({_id:salesmanId},{userName:1},function (err) {
                if(err){
                    let data = {};
                    data.result = "01";
                    data.name = "操作失败";
                    return res.status(200).send(data);
                }
            });
            salesmanNo = login.userName;
        }else{
            res.cookie('userId',"")
        }
        let userId = "";
        let card = await cardModel.count({cardNo:cardNo,password:password},function(err){
            if(err){
                let data = {};
                data.result = "01";
                data.name = "操作失败";
                return res.status(200).send(data);
            }
        });
        console.log(2);
        if(card == 0){
            let data = {};
            data.result = "02";
            data.name = "卡号或密码不正确";
            return res.status(200).send(data);
        }
        console.log(3);
        let salesman = await loginModel.findOne({userName:salesmanNo},
            {_id:1,userName:1,realName:1,tel:1,department:1},
            function(err){
                if(err){
                    let data = {};
                    data.result = "01";
                    data.name = "操作失败";
                    return res.status(200).send(data);
                }
            });
        if(!salesman){
            let data = {};
            data.result = "03";
            data.name = "健康服务专员工号不存在";
            return res.status(200).send(data);
        }
        let sl = await salesmanModel.findOne({_id:salesman._id},{organization_id:1},function (err) {
            if(err){
                let data = {};
                data.result = "01";
                data.name = "操作失败";
                return res.status(200).send(data);
            }
        })
       salesman.organization_id = sl.organization_id;
        console.log(5);
        let userRecord = await userRecordModel.findOne({cardNo:cardNo},
            {IDNo:1,userId:1,complete:1},function(err){
                if(err){
                    let data = {};
                    data.result = "01";
                    data.name = "操作失败";
                    return res.status(200).send(data);
                }
            });
        console.log(salesman);
        if(userRecord){
            let userRecord2 = await userRecordModel.findOne({cardNo:cardNo,IDNo:IDNo},{userId:1},function (err) {
                if(err){
                    let data = {};
                    data.result = "01";
                    data.name = "操作失败";
                    return res.status(200).send(data);
                }
            });
            if(!userRecord2){
                let data = {};
                data.result = "04";
                data.name = "该卡号已被其他用户使用";
                return res.status(200).send(data);
            }
            if(userRecord.complete){
                let data = {};
                data.result = "05";
                data.name = "用户信息已填写完整";
                return res.status(200).send(data);
            }
            userId = userRecord2.userId;
            await userRecordModel.update({cardNo:cardNo},{$set:{
                name:name,
                organization_id:salesman.organization_id,
                salesman:salesman,
            }},function(err){
                if(err){
                    let data = {};
                    data.result = "01";
                    data.name = "操作失败";
                    return res.status(200).send(data);
                }
            });
            await cardModel.update({cardNo:cardNo},{$set:{
                salesman:salesman,
                organization_id:salesman.organization_id,
                userId:userRecord.userId,
                userName:name,
            }},function (err) {
                if(err){
                    let data = {};
                    data.result = "01";
                    data.name = "操作失败";
                    return res.status(200).send(data);
                }
            });
        }else{
            console.log(11);
            let user = {};
            user = await userModel.findOne({IDNo:IDNo},{_id:1},function(err){
                if(err){
                    let data = {};
                    data.result = "01";
                    data.name = "操作失败";
                    return res.status(200).send(data);
                }
            });
            console.log(12);
            if(!user){
                let userEntity = new userModel({
                    name:name,
                    IDNo:IDNo
                });
                await userEntity.save(function(err,content){
                    if(err){
                        let data = {};
                        data.result = "01";
                        data.name = "操作失败";
                        return res.status(200).send(data);
                    }else {
                        user = content;
                    }
                })
            }
            let userRecordEntity = new userRecordModel({
                cardNo:cardNo,
                password:password,
                organization_id:salesman.organization_id,
                salesman:salesman,
                name:name,
                IDNo:IDNo,
                userId:user._id,
                createTime:new Date()
            });
            await userRecordEntity.save(function(err){
                if(err){
                    let data = {};
                    data.result = "01";
                    data.name = "操作失败";
                    return res.status(200).send(data);
                }
            });
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth();
            let day = date.getDate();
            console.log(salesman);
            await cardModel.update({cardNo:cardNo},{$set:{
                userId:user.id,
                userName:name,
                organization_id:salesman.organization_id,
                salesman:salesman,
                beginTime:new Date(year,month,day),
                endTime:new Date(year+1,month,day),
                cardType:1,
                status:1
            }},function (err) {
                if(err){
                    let data = {};
                    data.result = "01";
                    data.name = "操作失败";
                    return res.status(200).send(data);
                }
            });
            userId = user._id;

        }
        let data = {};
        console.log(userId,2222);
        data.userId = userId;
        data.result = "00";
        data.name = "操作成功";
        res.status(200).send(data);
    })
    app.post("/wechat/healthRecord/step2",async function (req,res,next) {
        let params = req.body.params;
        let sex = params.sex;
        let region = params.region;
        let address = params.address;
        let userId = params.userId;
        let tel = params.tel;
        await userModel.update({_id:userId},{$set:{
            sex:sex,
            tel:tel,
            region:region,
            address:address
        }},function (err) {
            if(err){
                let data = {};
                data.result = "01";
                data.name = "操作失败";
                return res.status(200).send(data);
            }
        })
        await userRecordModel.update({userId:userId},{$set:{
            sex:sex,
            tel:tel,
            region:region,
            address:address
        }},function (err) {
            if(err){
                let data = {};
                data.result = "01";
                data.name = "操作失败";
                return res.status(200).send(data);
            }
        })
        let data = {};
        data.result = "00";
        data.name = "操作成功";
        res.status(200).send(data);
    })
    app.post("/wechat/healthRecord/step3" ,async function (req,res,next) {
        let params = req.body.params;
        let userId = params.userId;
        let relatives = params.relatives;
        // console.log(relatives);
        // relatives = JSON.parse(relatives);
        // console.log(relatives);
        await userRecordModel.update({userId:userId},{$set:{relatives:relatives}},function (err) {
            if(err){
                console.log(err);
                let data = {};
                data.result = "01";
                data.name = "操作失败";
                return res.status(200).send(data);
            }
        });
        for(let relative of relatives){
            let result = await userModel.findOne({IDNo:relative.IDNo},{_id:1},function (err) {
                if(err){
                    console.log(err);
                    let data = {};
                    data.result = "01";
                    data.name = "操作失败";
                    return res.status(200).send(data);
                }
            })
            if(result){
                await cardModel.update({userId:userId},{$push:{familyId:result._id}},function (err) {
                    if(err){
                        console.log(err);
                        let data = {};
                        data.result = "01";
                        data.name = "操作失败";
                        return res.status(200).send(data);
                    }
                })
            }else{
                let userEntity = new userModel({
                    name:relative.name,
                    IDNo:relative.IDNo
                })
               let user =  await userEntity.save(function (err) {
                    if(err){
                        console.log(err);
                        let data = {};
                        data.result = "01";
                        data.name = "操作失败";
                        return res.status(200).send(data);
                    }
                })
                await cardModel.update({userId:userId},{$push:{familyId:user._id}},function (err) {
                    if(err){
                        console.log(err);
                        let data = {};
                        data.result = "01";
                        data.name = "操作失败";
                        return res.status(200).send(data);
                    }
                })
            }
        }
        let data = {};
        data.result = "00";
        data.name = "操作成功";
        res.status(200).send(data);
    })
    app.post("/wechat/healthRecord/step4",async function (req,res,next) {
        let params = req.body.params;
        await userRecordModel.update({userId:params.userId},
            {
                height:params.height,
                weight:params.weight,
                regularTest:params.regularTest,
                recentResidence:params.recentResidence,
                cardioCerebrovascular:params.cardioCerebrovascular
            },function (err) {
                if(err){
                    let data = {};
                    data.result = "01";
                    data.name = "操作失败";
                    return res.status(200).send(data);
                }else{
                    let data = {};
                    data.result = "00";
                    data.name = "操作成功";
                    return res.status(200).send(data);
                }
            })
    })
    app.post("/wechat/healthRecord/step5",async function (req,res,next) {
        let params = req.body.params;
        await userRecordModel.update({userId:params.userId},
            {
                digestiveSystem:params.digestiveSystem,
                respiratorySystem:params.respiratorySystem
            },function (err) {
                if(err){
                    let data = {};
                    data.result = "01";
                    data.name = "操作失败";
                    return res.status(200).send(data);
                }else{
                    let data = {};
                    data.result = "00";
                    data.name = "操作成功";
                    return res.status(200).send(data);
                }
        })
    })
    app.post("/wechat/healthRecord/step6",async function (req,res,next) {
        let params = req.body.params;
        await userRecordModel.update({userId:params.userId},
            {
                endocrine:params.endocrine,
                gynaecopathia:params.gynaecopathia
            },function (err) {
                if(err){
                    let data = {};
                    data.result = "01";
                    data.name = "操作失败";
                    return res.status(200).send(data);
                }else{
                    let data = {};
                    data.result = "00";
                    data.name = "操作成功";
                    return res.status(200).send(data);
                }
            })
    })
    app.post("/wechat/healthRecord/step7",async function (req,res,next) {
        let params = req.body.params;
        await userRecordModel.update({userId:params.userId},
            {
                tumour:params.tumour,
                otherDiseases:params.otherDiseases
            },function (err) {
                if(err){
                    let data = {};
                    data.result = "01";
                    data.name = "操作失败";
                    return res.status(200).send(data);
                }else{
                    let data = {};
                    data.result = "00";
                    data.name = "操作成功";
                    return res.status(200).send(data);
                }
            })
    })

    app.post("/wechat/healthRecord/step8",async function (req,res,next) {
        let params = req.body.params;
        await userRecordModel.update({userId:params.userId},
            {
                familyDiseases:params.familyDiseases,
                health:params.health,
                fatigue:params.fatigue
            },function (err) {
                if(err){
                    let data = {};
                    data.result = "01";
                    data.name = "操作失败";
                    return res.status(200).send(data);
                }else{
                    let data = {};
                    data.result = "00";
                    data.name = "操作成功";
                    return res.status(200).send(data);
                }
            })
    })
    app.post("/wechat/healthRecord/step9",async function (req,res,next) {
        let params = req.body.params;
        await userRecordModel.update({userId:params.userId},
            {
                sleep:params.sleep,
                stayUpLate:params.stayUpLate,
                weightChange:params.weightChange,
                reduceWeight:params.reduceWeight,
                smokeYear:params.smokeYear,
                smokeOneDay:params.smokeOneDay
            },function (err) {
                if(err){
                    let data = {};
                    data.result = "01";
                    data.name = "操作失败";
                    return res.status(200).send(data);
                }else{
                    let data = {};
                    data.result = "00";
                    data.name = "操作成功";
                    return res.status(200).send(data);
                }
            })
    })
    app.post("/wechat/healthRecord/step10",async function (req,res,next) {
        let params = req.body.params;
        let userId = req.cookies.userId
        await userRecordModel.update({userId:params.userId},
            {
                drinkYear:params.drinkYear,
                drinkOneDay:params.drinkOneDay,
                exerciseFrequency:params.exerciseFrequency,
                exerciseTimeOnce:params.exerciseTimeOnce,
                other:params.other,
                complete:true,
            },function (err) {
                if(err){
                    let data = {};
                    data.result = "01";
                    data.name = "操作失败";
                    return res.status(200).send(data);
                }
            });
        let login = {};
        if(userId){
            login = await loginModel.findOne({_id:userId},{role:1},function (err) {
                if(err){
                    let data = {};
                    data.result = "01";
                    data.name = "操作失败";
                    return res.status(200).send(data);
                }
            });
        }
        let data = {};
        data.result = "00";
        data.name = "操作成功";
        if(login){
            data.role = login.role
        }
        return res.status(200).send(data);

    });
    app.get("/wechat/healthRecord/queryInfo",async function (req,res,next) {
        let result = await userRecordModel.findOne({userId:req.query.userId},function (err) {
            if(err){
                let data = {};
                data.result = "01";
                data.name = "操作失败";
                return res.status(200).send(data);
            }
        });
        let card = await cardModel.findOne({userId:req.query.userId},{salesman:1,beginTime:1,endTime:1},function (err) {
            if(err){
                let data = {};
                data.result = "01";
                data.name = "操作失败";
                return res.status(200).send(data);
            }
        });
        let datas = {};
        datas.record = result;
        datas.salesman = card.salesman;
        datas.beginTime = util.dateFormat(card.beginTime,3)
        datas.endTime = util.dateFormat(card.endTime,3)
        datas.cteateTime = util.dateFormat(result.createTime,2)
        res.status(200).send(datas);
    })
    app.get('/wechat/healthRecord/isComplete',async function (req,res,next) {
        let data = userRecordModel.findOne({cardNo:req.query.cardNo},{complete:1},function (err,content) {
            if(err){
                let data = {};
                data.result = "01";
                data.name = "操作失败";
                return res.status(200).send(data);
            }
        });
        res.status(200).send(data.complete)
    });
    app.get('/wechat/healthRecord/showRecords',async function (req,res,next) {
        let userId = req.cookies.userId;
        let pageNo = req.query.pageNo||1;
        let pageSize = req.query.pageSize||20;
        let param = req.query.param;
        let card = await cardModel.find({"salesman._id":userId},{userId:1},function (err) {
            if(err){
                let data = {};
                data.result = "01";
                data.name = "操作失败";
                return res.status(200).send(data);
            }
        })
        let arr = [];
        for(let cd of card){
            arr.push(cd.userId);
        }
        let query = {};
        query.userId = {$in:arr};
        if(param){
            query.$or = [{cardNo:{'$regex':param,'$options':"i"}},{name:{'$regex':param,'$options':"i"}},{IDNo:{'$regex':param,'$options':"i"}}]
        }
        let count = await userRecordModel.count(query,function (err) {
            if(err){
                let data = {};
                data.result = "01";
                data.name = "操作失败";
                return res.status(200).send(data);
            }
        })
        let records = await userRecordModel.find(query,
            {name:1,IDNo:1,sex:1,cardNo:1,createTime:1,complete:1,userId:1},
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
            record.createTime = util.dateFormat(rd.createTime,2);
            record.complete = rd.complete;
            data.push(record)
        }
        let datas = {};
        datas.count = count;
        datas.records = data;
        res.status(200).send(datas);
    });
    app.get("/wechat/healthRecord/step999",async function (req,res,next) {
        // let prefix = "ES";
        // let suffix = 610001;
        // for(let i =0;i<10000;i++){
        //     let cardNo = prefix + suffix.toString();
        //     let pwd = getpwd();
        //     suffix += 1
        //     let cardEntity = new cardModel({
        //         cardNo:cardNo,
        //         password:pwd
        //     });
        //     await cardEntity.save();
        // }
        // res.status(200).send("ss")

        let zip = new JSZip();
        let card = await cardModel.find({}).skip(9999);
        let data = [];
        let head = [];
        head.push("卡号");
        head.push("密码");
        data.push(head);
        for(let cd of card){
            let arr = [];
            arr.push(cd.cardNo);
            arr.push(cd.password);
            data.push(arr);
        }
        var buffer = xlsx.build([
            {
                name: 'sheet1',
                data: data
            }
        ]);
        zip.file("卡号密码.xlsx",buffer);
        zip.generateAsync({type:"nodebuffer"}).then(function (content) {
            fs.writeFile('/home/hwason/temp/report.zip',content,function(err){
                if(err) throw err;
                res.download('/home/hwason/temp/report.zip');
            });
        });
    })

};
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
function getpwd(){
    let num = parseInt(Math.random()*1000000000);
    if(num.toString().length<6){
        return "845166"
    }else{
        return num.toString().substring(0,6)
    }
}
