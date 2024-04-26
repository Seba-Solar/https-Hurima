let mysql = require('mysql');

let conexion = mysql.createConnection({
    host: "localhost",
    database: "httpshurima",
    user: "root",
    password: ""
});

conexion.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});