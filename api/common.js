const sqlite3 = require('sqlite3');
const open = require('sqlite').open;
const config = require("../config");
const path = require('path');

sqlite3.verbose()

// make connection to sqlite3 database
async function initialiseDb() {
    return open({
        filename: config.connectionString,
        driver: sqlite3.Database
    })
}

module.exports = {
    initialiseDb
};