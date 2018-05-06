var express = require('express');
var router = express.Router();
var loginUser = require('../models/login_model');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res, next) {
  loginUser.checkId(req.body, function(message,bool){
      if(bool === true || message.length <= 0){ // ใช้ไม่ได้
          console.log('Error')
          res.send('Error');
      }else{ // ใช้ได้
          req.session.email = message[0]['login_email'];
          console.log(req.session)
          res.send(message);
      }
  })
});

router.get('/logout',function(req,res){
  // console.log(req.session)
	req.session.destroy(function(err) {
		if(err) {
			console.log(err);
		} else {
      // console.log(req.session)
			res.redirect('/');
		}
	});
});

module.exports = router;
