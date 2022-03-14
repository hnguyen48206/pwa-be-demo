const mysql = require('mysql');

// Set database connection credentials
const config = {
    host: 'sql6.freemysqlhosting.net',
    user: 'sql6478318',
    password: 'tE4wp4vCZF',
    database: 'sql6478318',
};

// Create a MySQL pool
const pool = mysql.createPool(config);

// Export the pool
module.exports = pool;