const { Pool } = require('pg');

const pool = new Pool({
    user: 'qgvfgjjekvmotg',
    host: 'ec2-3-219-63-251.compute-1.amazonaws.com',
    database: 'd2ug7tuuosd82e',
    password: '02de6d710af7475c7e836c62889c7600337cc865138e80f77093c5b15b5074d6',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
})

// Export the pool
module.exports = pool;