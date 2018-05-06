var express = require('express');
var router = express.Router();
var session = require('express-session');
// var authen = require('../authentication/authen')

router.get('/', function(req, res, next) {
  // console.log(session)
  res.render('index', {
    title: 'Esport'
  });
});


module.exports = router;
