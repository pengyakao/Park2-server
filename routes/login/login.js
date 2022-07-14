const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

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
router.post('', function(req, res){
    connect.query(
        'update store_apply set sto_apply_sta = ?, sto_apply_constract = ? where sto_apply_id = ?',
        [req.body.state, req.body.constract, req.body.id],
        function (error, data) {
            if(error){
                res.send(JSON.stringify(error));
            }else{
                res.send(JSON.stringify(data));
            }
        }
    )
})


// const searchDB = async (userAccount, userPassword) => {
//     connect.query(
//         'select * from user where user_account = ? and user_password = ?',
//         [userAccount, userPassword],
//         function (error, data) {
//             if(error){
//                 res.send(JSON.stringify(error));
//             }else{
//                 console.log(data)
//                 // res.send(JSON.stringify(data));
//             }     
//         }
//     )
// }


// module.exports = async (req, res) => {
//     const { account, password } = req.params;
//     const user = await searchDB(account, password);
//     // if (user.password !== password) {
//     //     return res.status(403).json({
//     //         error: 'invalid login'
//     //     });
//     // }
//     delete user.password;

//     const token = jwt.sign(user, process.env.MY_SECRET, {expiresIn: '1h'});
//     res.cookie('token', token, {
//         httpOnly: true,
//         // secure: true,
//         // maxAge: 1000000,
//         // signed: true
//     })
// }
