let mysql = require("mysql");
let connection = mysql.createConnection({
    user: 'root',
    port: '3307',
    password: '',
    host: 'localhost',
    database: 'park2'
})
connection.connect();
module.exports = connection;