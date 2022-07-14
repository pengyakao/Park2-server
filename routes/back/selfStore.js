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

// 店家自行管理/店家/取得
router.get('/get', function(req, res){
    connect.query(
        'select * from store where sto_id = ?',
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

// 店家自行管理/店家/編輯
router.put('/edit', function(req, res){
    connect.query(
        'update store set sto_img = ?, sto_tel = ?, sto_location = ?, sto_pay1 = ?, sto_pay2 = ?, sto_pay3 = ?, sto_pay4 = ?, sto_pay5 = ?, sto_pay6 = ?, sto_pay7 = ?, sto_mon = ?, sto_tue = ?, sto_wed = ?, sto_thu = ?, sto_fri = ?, sto_sat = ?, sto_sun = ?, sto_fb = ?, sto_ins = ?, sto_line = ?, sto_info = ?, sto_sta = ? where sto_id = ?',
        [req.body.img, req.body.tel, req.body.location, req.body.pay1, req.body.pay2, req.body.pay3, req.body.pay4, req.body.pay5, req.body.pay6, req.body.pay7, req.body.mon, req.body.tue, req.body.wed, req.body.thu, req.body.fri, req.body.sat, req.body.sun, req.body.fb, req.body.ig, req.body.line, req.body.info, req.body.state, req.body.id],
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