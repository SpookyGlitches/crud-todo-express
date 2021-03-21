const mysql = require('mysql2');
 
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.getConnection((err,conn) => {
    if(err)
        throw err
    else
        pool.releaseConnection(conn)
})

module.exports = pool
