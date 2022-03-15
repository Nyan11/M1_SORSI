const mysql = require('mysql');
const dbConfig = require("../db/dbConfig");
const e = require("express");

const connexion = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password : dbConfig.PASSWORD,
    database : dbConfig.DB,
    connectionLimit: 5
});

connexion.connect((err, connection) => {

    if (err) {
        console.log(JSON.stringify(err, undefined, 2))
    }
    else {
        console.log("DATABASE Connexion succès !")
    }
});

module.exports = connexion;