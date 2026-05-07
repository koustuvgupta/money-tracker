const mysql = require('mysql2');

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '1234',
    database: 'moneytracker'
});

db.connect(err => {
    if (err) {
        console.log('DB connection error:', err);
    }
    else {
        console.log('connected to MySQL');
    }
});

module.exports = db;