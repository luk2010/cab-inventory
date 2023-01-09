const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const app = express();
const port = 3000;

// open our database
let db = new sqlite3.Database('database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to database.');
});

app.get('/', (req, res) => {
    
});

app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
});

function cleanup() {
    // close the database connection
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Close the database connection.');
    });
}

process.on('exit', cleanup);
process.on('SIGINT', cleanup);