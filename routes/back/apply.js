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

// 進駐管理/店家申請/取得
router.get('/store/get', function(req, res){
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

// 進駐管理/店家申請/編輯
router.put('/store/edit', function(req, res){
    connect.query(
        'update store_apply set sto_apply_sta = ? where sto_apply_id = ?',
        [req.body.state, req.body.id],
        function (error, data) {
            if(error){
                res.send(JSON.stringify(error));
            }else{
                res.send(JSON.stringify(data));
            }
        }
    )
})

// 進駐管理/店家申請/刪除
router.delete('/store/delete', function(req, res) {
    connect.query(
        'delete from store_apply where sto_apply_id = ?',
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


// 進駐管理/市集申請/取得
router.get('/market/get', function(req, res){
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

// 進駐管理/市集/取得
router.get('/market/list/get', function(req, res){
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

// 進駐管理/市集申請/編輯
router.put('/market/edit', function(req, res){
    connect.query(
        'update market_apply set mar_apply_sta = ? where mar_apply_id = ?',
        [req.body.state, req.body.id],
        function (error, data) {
            if(error){
                res.send(JSON.stringify(error));
            }else{
                res.send(JSON.stringify(data));
            }
        }
    )
})

// 進駐管理/市集申請/刪除
router.delete('/market/delete', function(req, res) {
    connect.query(
        'delete from market_apply where mar_apply_id = ?',
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

// 新增市集
router.post('/market/add', function(req, res) {
    connect.query(
        'insert into market (market_title, market_cnt) values (?, ?)',
        [req.body.title, req.body.count],
        function (error, data) {
            if(error){
                res.send(JSON.stringify(error));
            }else{
                res.send(JSON.stringify(data));
            }     
        }
    )
})




// 新增店家
router.post('/store/add', function(req, res) {
    connect.query(
        'insert into store (sto_apply_id, sto_name, sto_location, sto_class, sto_tel, sto_sta) values (?, ?, ?, ?, ?, ?)',
        [req.body.id, req.body.brand, req.body.location, req.body.type, req.body.tel, req.body.state],
        function (error, data) {
            if(error){
                res.send(JSON.stringify(error));
            }else{
                res.send(JSON.stringify(data));
            }     
        }
    )
})

// 新增帳號
router.post('/account/add', function(req, res) {
    connect.query(
        'insert into user (sto_id, user_account, user_password, user_name, user_level) values (?, ?, ?, ?, ?)',
        [req.body.id, req.body.account, req.body.password, req.body.name, req.body.level],
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