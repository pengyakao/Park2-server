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

// 首頁/輪播
router.get('/all/activity/get/', function(req, res) {
    // res.cookie("test", "TKey")
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

// 首頁/公告
router.get('/all/proclamation/get/', function(req, res) {
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

// 首頁/FAQ
router.get('/all/faq/get/', function(req, res) {
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

// 首頁/跑馬燈
router.get('/all/marquee/get/', function(req, res) {
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

module.exports = router