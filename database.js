const {Client} = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'NodeJS',
    password: 'POSTJkuvtqpx2007',
    port: 5432,
})
client.connect(function(err) {
    if (err) throw err;
});

module.exports = client;