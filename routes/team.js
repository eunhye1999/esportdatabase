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

router.get('/', function(req, res, next) {
  con.query('SELECT team_name AS TEAM FROM team ORDER BY TEAM', function (err, result, fields) {
    if (err) {
      console.error(err);
      res.render('team_index');
    }
    console.log(result);
    res.render('team_index', {"data" : result});
  });
});

module.exports = router;
