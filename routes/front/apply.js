const express = require('express');
const app = express();
const router = express.Router();

// 連接mySQL
let mysql = require("mysql");
let connect = mysql.createConnection({
    user: 'root',
    port: '3307',
    password: '',
    host: 'localhost',
    database: 'park2'
})
connect.connect(function(error){
    if(error){
        console.log(JSON.stringify(error));
    }
});


// 進駐/取得市集總攤位數
router.get('/market/all/get/', function(req, res) {
    connect.query(
        'select * from market',
        [],
        function (error, data) {
            if(error){
                res.send(JSON.stringify(error));
            }else{
                res.send(JSON.stringify(data));
            }     
        }
    )
})

// 進駐/取得已進駐店家資料
router.get('/store/all/get/', function(req, res) {
    connect.query(
        'select * from store',
        [],
        function (error, data) {
            if(error){
                res.send(JSON.stringify(error));
            }else{
                res.send(JSON.stringify(data));
            }     
        }
    )
})

// 進駐/取得所有市集申請資料
router.get('/market/apply/all/get/', function(req, res) {
    connect.query(
        'select * from market_apply',
        [],
        function (error, data) {
            if(error){
                res.send(JSON.stringify(error));
            }else{
                res.send(JSON.stringify(data));
            }     
        }
    )
})

// 進駐/取得所有店家申請資料
router.get('/store/apply/all/get/', function(req, res) {
    connect.query(
        'select * from store_apply',
        [],
        function (error, data) {
            if(error){
                res.send(JSON.stringify(error));
            }else{
                res.send(JSON.stringify(data));
            }     
        }
    )
})

// 進駐/市集申請進度查詢
router.get('/market/search/get/', function(req, res) {
    connect.query(
        'select * from market_apply where mar_apply_mail = ? and mar_apply_tel = ?',
        [req.query.id, req.query.tel],
        function (error, data) {
            if(error){
                res.send(JSON.stringify(error));
            }else{
                res.send(JSON.stringify(data));
            }     
        }
    )
})

// 進駐/新增店家申請
// router.post('/store/form/post', function(req, res) {
//     connect.query(
//         'insert into store_apply (sto_apply_brand, sto_apply_location, sto_apply_class, sto_apply_name, sto_apply_tel, sto_apply_mail, sto_apply_time, sto_apply_file, sto_apply_sta) values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
//         [req.body.brand, req.body.location, req.body.type, req.body.person, req.body.tel, req.body.mail, req.body.time, req.body.file, req.body.state],
//         function (error, data) {
//             if(error){
//                 res.send(JSON.stringify(error));
//             }else{
//                 res.send(JSON.stringify(data));
//             }     
//         }
//     )
// })

// 進駐/新增市集申請
// router.post('/market/form/post', function(req, res) {
//     connect.query(
//         'insert into market_apply (mar_apply_brand, market_id, mar_apply_class, mar_apply_url, mar_apply_name, mar_apply_tel, mar_apply_mail, mar_apply_count, mar_apply_bill, mar_apply_file, mar_apply_sta, mar_apply_feeinfo) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
//         [req.body.brand, req.body.relation, req.body.type, req.body.url, req.body.person, req.body.tel, req.body.mail, req.body.count, req.body.bill, req.body.file, req.body.state, req.body.fee],
//         function (error, data) {
//             if(error){
//                 res.send(JSON.stringify(error));
//             }else{
//                 res.send(JSON.stringify(data));
//             }     
//         }
//     )
// })

// 進駐/編輯市集申請/重送企劃書
// router.put('/market/form/proposal/edit', function(req, res) {
//     connect.query(
//         'update market_apply set mar_apply_file = ?, mar_apply_sta = ? where mar_apply_id = ?',
//         [req.body.file, req.body.state, req.body.id],
//         function (error, data) {
//             if(error){
//                 res.send(JSON.stringify(error));
//             }else{
//                 res.send(JSON.stringify(data));
//             }     
//         }
//     )
// })

// 進駐/編輯市集申請/匯款帳號後5碼
router.put('/market/form/pay/edit', function(req, res) {
    connect.query(
        'update market_apply set mar_apply_sta = ?, mar_apply_feeinfo = ? where mar_apply_id = ?',
        [req.body.state, req.body.fee, req.body.id],
        function (error, data) {
            if(error){
                res.send(JSON.stringify(error));
            }else{
                res.send(JSON.stringify(data));
            }     
        }
    )
})


module.exports = router