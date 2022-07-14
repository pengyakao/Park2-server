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

// 首頁管理/輪播/取得
router.get('/carousel/get', function(req, res){
    connect.query(
        'select * from home_act',
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

// 首頁管理/輪播/新增
router.post('/carousel/post', function(req, res){
    connect.query(
        'insert into home_act (act_id, home_act_sta, home_act_title) values (?, ?, ?)',
        [req.body.relation, req.body.isShow, req.body.title],
        function (error, data) {
            if(error){
                res.send(JSON.stringify(error));
            }else{
                res.send(JSON.stringify(data));
            }
        }
    )
})

// 首頁管理/輪播/編輯
router.put('/carousel/edit', function(req, res){
    connect.query(
        'update home_act set act_id = ?, home_act_sta = ?,  home_act_title =? where home_act_id = ?',
        [req.body.relation, req.body.isShow, req.body.title, req.body.id],
        function (error, data) {
            if(error){
                res.send(JSON.stringify(error));
            }else{
                res.send(JSON.stringify(data));
            }
        }
    )
})

// 首頁管理/輪播/刪除
router.delete('/carousel/delete', function(req, res) {
    connect.query(
        'delete from home_act where home_act_id = ?',
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

// 首頁管理/官方公告/新增
// router.post('/proclamation/post', function(req, res){
//     connect.query(
//         'insert into home_news (home_news_title, home_news_sta, home_news_img, home_news_Sdate, home_news_Edate, home_news_info) values (?, ?, ?, ?, ?, ?)',
//         [req.body.title, req.body.isShow, req.body.img, req.body.startDate, req.body.endDate, req.body.info],
//         function (error, data) {
//             if(error){
//                 res.send(JSON.stringify(error));
//             }else{
//                 res.send(JSON.stringify(data));
//             }
//         }
//     )
// })

// 首頁管理/官方公告/取得
router.get('/proclamation/get', function(req, res){
    connect.query(
        'select * from home_news',
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

// 首頁管理/官方公告/編輯
router.put('/proclamation/edit', function(req, res){
    connect.query(
        'update home_news set home_news_title = ?, home_news_sta = ?, home_news_Sdate = ?, home_news_Edate = ?, home_news_info = ? where home_news_id = ?',
        [req.body.title, req.body.isShow, req.body.startDate, req.body.endDate, req.body.info, req.body.id],
        function (error, data) {
            if(error){
                res.send(JSON.stringify(error));
            }else{
                res.send(JSON.stringify(data));
            }
        }
    )
})

// 首頁管理/官方公告/刪除
router.delete('/proclamation/delete', function(req, res) {
    connect.query(
        'delete from home_news where home_news_id = ?',
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

// 首頁管理/FAQ/新增
router.post('/faq/post', function(req, res){
    connect.query(
        'insert into home_FAQ (home_FAQ_sta, home_FAQ_qu, home_FAQ_ans ) values (?, ?, ?)',
        [req.body.isShow, req.body.question, req.body.answer],
        function (error, data) {
            if(error){
                res.send(JSON.stringify(error));
            }else{
                res.send(JSON.stringify(data));
            }
        }
    )
})


// 首頁管理/FAQ/取得
router.get('/faq/get', function(req, res){
    connect.query(
        'select * from home_FAQ',
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

// 首頁管理/FAQ/編輯
router.put('/faq/edit', function(req, res){
    connect.query(
        'update home_FAQ set home_FAQ_sta = ?, home_FAQ_qu =?, home_FAQ_ans =? where home_FAQ_id = ?',
        [req.body.isShow, req.body.question, req.body.answer, req.body.id],
        function (error, data) {
            if(error){
                res.send(JSON.stringify(error));
            }else{
                res.send(JSON.stringify(data));
            }
        }
    )
})

// 首頁管理/FAQ/刪除
router.delete('/faq/delete', function(req, res) {
    connect.query(
        'delete from home_FAQ where home_FAQ_id = ?',
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



// 首頁管理/跑馬燈/取得
router.get('/marquee/get', function(req, res){
    connect.query(
        'select * from marquee',
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

// 首頁管理/跑馬燈/編輯
router.put('/marquee/edit', function(req, res){
    connect.query(
        'update marquee set marquee_info = ? where marquee_id = ?',
        [req.body.info, req.body.id],
        function (error, data) {
            if(error){
                res.send(JSON.stringify(error));
            }else{
                res.send(JSON.stringify(data));
            }
        }
    )
})


// 首頁管理/輪播/編輯/活動slider
router.put('/carousel/edit/activity', function(req, res){
    connect.query(
        'update activity set act_title = ?, act_is_slider=? where act_id = ? ',
        [req.body.title , req.body.isSlider,req.body.id],
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