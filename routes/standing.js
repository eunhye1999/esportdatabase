var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var fs = require('fs');
// var esport_model = require('../models/esports_model')

var con = mysql.createConnection({
  host: "104.154.66.105",
  user: "root",
  password: "overwatchleague",
  database: "owl_db_schema"
}, function(err) {
  if (err) throw err;
  con.connect(function(err) {
    if (err) throw err;
    console.log('owl_db_schema connected');
  });
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  fs.readFile('./models/sql/standing.sql', function(err, data) {
    if (err) console.error(err);
    con.query(data.toString(), function (err, result, fields) {
      if (err) {
        console.error(err);
        res.render('standing_index');
      }
      res.render('standing_index', {"data" : result});
    });
  });
});

module.exports = router;
