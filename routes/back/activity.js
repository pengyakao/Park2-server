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


// 活動管理/活動/取得
router.get('/get', function(req, res){
    connect.query(
        'select * from activity',
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

// 活動管理/活動/新增
// router.post('/post', function(req, res){
//     connect.query(
//         'insert into activity (act_title, act_Sdate, act_Edate, act_Stime, act_Etime, acr_org, acr_orgimg, act_location, act_class, act_quests, act_info, act_img ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
//         [req.body.title, req.body.startDate, req.body.endDate, req.body.startTime, req.body.endTime, req.body.organizer, req.body.organizerImg, req.body.location, req.body.type, req.body.quests, req.body.info, req.body.mainImg],
//         function (error, data) {
//             if(error){
//                 res.send(JSON.stringify(error));
//             }else{
//                 res.send(JSON.stringify(data));
//             }
//         }
//     )
// })

// 活動管理/活動/編輯
router.put('/edit', function(req, res){
    connect.query(
        'update activity set act_title = ?, act_Sdate = ?, act_Edate = ?, act_Stime = ?, act_Etime = ?, acr_org = ?, act_location = ?, act_class = ?, act_guests = ?, act_info = ? , act_sta = ?, act_is_slider = ? where act_id = ? ',
        [req.body.title, req.body.startDate, req.body.endDate, req.body.startTime, req.body.endTime, req.body.organizer, req.body.location, req.body.type, req.body.guests, req.body.info, req.body.isShow, req.body.isSlider, req.body.id],
        function (error, data) {
            if(error){
                res.send(JSON.stringify(error));
            }else{
                res.send(JSON.stringify(data));
            }
        }
    )
})

// 活動管理/活動/刪除
router.delete('/delete', function(req, res) {
    connect.query(
        'delete from activity where act_id = ?',
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