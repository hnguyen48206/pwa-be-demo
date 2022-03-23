const mysql = require('mysql');

// Set database connection credentials
const config = {
    host: 'db4free.net',
    user: 'vnptit2',
    password: 'Vnpt@123',
    database: 'sql6478318',
};

// Create a MySQL pool
const pool = mysql.createPool(config);

// Export the pool
module.exports = pool;