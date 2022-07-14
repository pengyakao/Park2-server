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

// 店家/所有店家
router.get('/all/get/', function(req, res) {
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

// 店家/特定店家
router.get('/get/', function(req, res) {
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


module.exports = router