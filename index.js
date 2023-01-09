const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const https = require('https');
const ejs = require('ejs');
const fs = require('fs');

const app = express();
const port = 3000;

app.set('view-engine', 'ejs');
app.use('/static', express.static('public'));

// open our database
let db = new sqlite3.Database('database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to database.');

    db.run(`CREATE TABLE IF NOT EXISTS items(
        id INTEGER PRIMARY KEY, 
        barcode TEXT,
        name TEXT, 
        numberOfItems INTEGER, 
        minimumNumberOfItems INTEGER
    );`);
});

app.get('/', (req, res) => {
    db.all('SELECT * FROM items;', (err, rows) => {
        if (err) {
            res.send('Error selecting items in database. \n' + JSON.stringify(err, 4));
            return;
        }
        res.render('objects-view.ejs', { rows: rows });
    });
});

const options = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
};

https.createServer(options, app).listen(3000);

function cleanup() {
    if (!db) {
        return;
    }

    // close the database connection
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Close the database connection.');
    });

    // reset the db object.
    db = false;

    process.exit();
}

process.on('SIGINT', cleanup);