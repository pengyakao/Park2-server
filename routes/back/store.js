const express = require('express');
const router = express.Router();

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


// 店家管理/店家/取得
router.get('/get', function(req, res){
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

// 店家管理/店家申請/取得
router.get('/apply/get', function(req, res){
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

// 店家管理/店家/新增
// router.post('/post', function(req, res){
//     connect.query(
//         'insert into store (sto_name, sto_class, sto_img, sto_tel, sto_location, sto_pay1, sto_pay2, sto_pay3, sto_pay4, sto_pay5, sto_pay6, sto_pay7, sto_mon, sto_tue, sto_wed, sto_thu, sto_fri, sto_sat, sto_sun, sto_fb, sto_ins, sto_line, sto_info, sto_sta, sto_main, sto_first_img ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
//         [req.body.name, req.body.type, req.body.img, req.body.tel, req.body.location, req.body.pay1, req.body.pay2, req.body.pay3, req.body.pay4, req.body.pay5, req.body.pay6, req.body.pay7, req.body.mon, req.body.tue, req.body.wed, req.body.thu, req.body.fri, req.body.sat, req.body.sun, req.body.fb, req.body.ig, req.body.line, req.body.info, req.body.state, req.body.isMain, req.body.firstImg],
//         function (error, data) {
//             if(error){
//                 res.send(JSON.stringify(error));
//             }else{
//                 res.send(JSON.stringify(data));
//             }
//         }
//     )
// })

// 店家管理/店家/編輯/內頁/無檔案
router.put('/edit', function(req, res){
    connect.query(
        'update store set sto_name = ?, sto_tel = ?, sto_pay1 = ?, sto_pay2 = ?, sto_pay3 = ?, sto_pay4 = ?, sto_pay5 = ?, sto_pay6 = ?, sto_pay7 = ?, sto_thu = ?, sto_fri = ?, sto_sat = ?, sto_sun = ?, sto_fb = ?, sto_ins = ?, sto_line = ?, sto_info = ?, sto_sta = ?, where sto_id = ?',
        [req.body.name, req.body.tel, req.body.pay1, req.body.pay2, req.body.pay3, req.body.pay4, req.body.pay5, req.body.pay6, req.body.pay7, req.body.thu, req.body.fri, req.body.sat, req.body.sun, req.body.fb, req.body.ig, req.body.line, req.body.info, req.body.state, req.body.id],
        function (error, data) {
            if(error){
                res.send(JSON.stringify(error));
            }else{
                res.send(JSON.stringify(data));
            }
        }
    )
})
router.put('/edit', function(req, res){
    console.log('hello')
    connect.query(
        'update store set sto_name = ?, sto_class = ?, sto_tel = ?, sto_thu = ?, sto_fri = ?, sto_sat = ?, sto_sun = ?, sto_fb = ?, sto_ins = ?, sto_info = ?, sto_main = ?  where sto_id = ?',
        [req.body.name, req.body.type, req.body.tel, req.body.thu, req.body.fri, req.body.sat, req.body.sun, req.body.fb, req.body.ig, req.body.info, req.body.isMain, req.body.id],
        function (error, data) {
            if(error){
                res.send(JSON.stringify(error));
            }else{
                res.send(JSON.stringify(data));
            }
        }
    )
})

// 店家管理/店家/刪除
router.delete('/delete', function(req, res) {
    connect.query(
        'delete from store where sto_id = ?',
        [req.query.id],
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