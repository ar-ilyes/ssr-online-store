const mysql = require("mysql2");

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '15022004',
    database: 'emarket',
    waitForConnections: true,
    connectionLimit: 10, // Adjust the connection limit as needed
    queueLimit: 0,
});
module.exports=pool.promise();