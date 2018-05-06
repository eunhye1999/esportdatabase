var express = require('express');
var router = express.Router();
var session = require('express-session');
var loginUser = require('../models/login_model');
/* GET home page. */
router.get('/', function(req, res, next) {
    
    res.render('./login', {
        'title' : 'Login'
    })
});

router.get('/register', function(req, res, next) {
    res.render('./register', {
        'title' : 'Register'
    })
});

router.post('/register', function(req, res, next) {
    loginUser.insert(req.body, function(message,bool){
        if(bool === true){
            console.log(message)
            res.send(message);
        }else{
            console.log(message)
            res.send(message);
        }
    })
});

// POST PATH /login
// router.post('/',function(req,res){
//     console.log(req.body.email)
//     sess = req.session;
//     console.log(req.session)
//   //In this we are assigning email to sess.email variable.
//   //email comes from HTML page.
//     sess.email = req.body.email;
//     res.end('done');
// });

// router.post('/check', function(req, res, next) {
//     loginUser.checkId(req.body, function(message,bool){
//         if(bool === true || message.length <= 0){ // ใช้ไม่ได้
//             console.log('Error')
//             res.send('Error');
//         }else{ // ใช้ได้
//             // console.log(message)
//             // authen.setMode('admin');
//             // authen.setUser(message[0]['login_id'])
//             res.send(message);
//         }
//     })
// });


module.exports = router;
