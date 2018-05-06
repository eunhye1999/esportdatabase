var express = require('express');
var router = express.Router();

var match_comp = require('../models/math_comp');
var map_comp = require('../models/map_comp')
var autoSend = require('../test/store_autosend');

Date.prototype.reduceHours= function(h){
    this.setHours(this.getHours()-h);
    return this;
}

router.get('/', function(req, res, next) {
  sess = req.session;
  var ary = []
  if(sess.email) {
      // var d = new Date(new Date().toLocaleString())
      var d = new Date(new Date())
      var month = parseInt(d.getMonth())+1
      var day = parseInt(d.getDate())
      if(month < 10){
      month = '0'+String(month)
      }
      if (day < 10){
        day = '0'+String(day)
      }

      var dnow = d.getFullYear()+'-'+month+'-'+day+'T'+d.getHours()+':'+d.getMinutes()+':'+d.getMilliseconds() 
      match_comp.selectAll_name_date(dnow,function(results,bool1){
        if(bool1 === true){ // ใช้ไม่ได้
            console.log('Error')
        }else{ // ใช้ได้
          // console.log(results)
          console.log(dnow)
          autoSend.selectID(sess.email,function(message,bool){
            if(bool === true){ // ใช้ไม่ได้
              console.log('Error')
            }else{ // ใช้ได้
              for(var i=0 ; i<message.length ;i++){
                ary.push(message[i].match_id)
              }
              res.render('./admin', {
                "title" : "User",
                'mode' : true,
                'user' : sess.email,
                "allteam" : results,
                "autosend" : ary
              })
            }
          })
        }
      })
  } else {
      res.render('./admin', {
        "title":"User",
        'user' : 'Please login'
      })
  }
});

router.get('/show', function(req, res, next) {
    console.log(req.session.email)
    // sess = req.session;
    if(req.session.email){
        match_comp.selectAll_name(function(results,bool){
            if(bool === true){ // ใช้ไม่ได้
                console.log('Error')
            }else{ // ใช้ได้
                res.render('./adminMode', {
                    "title":"Admin Only !!!!!!!!!!!",
                    // 'mode' : 'admin',
                    // 'user' : sess.email
                    'mode' : true,
                    "allteam":results
                  })
                // console.log(results)
            }
        })
    }else{res.send('ต้อง Login ก่อนนะจะ')}
});

router.get('/add', function(req, res){
    if(req.session.email){
        match_comp.selectAll_team(function(team,bool){
            if(bool === true){ // ใช้ไม่ได้
                console.log('Error')
            }else{ // ใช้ได้
                console.log('pass : team')
                match_comp.selectAll_map(function(map,bool1){
                    if(bool1 === true){ // ใช้ไม่ได้
                        console.log('Error')
                    }else{ // ใช้ได้
                        console.log('pass : map')
                        res.render('./adminAdd', {
                            'title' : 'Add a Match Compentitive',
                            "allteam":team,
                            'mode' : true,
                            "allmap":map
                        })
                    }
                })
            }
        })
    }else{res.send('ต้อง Login ก่อนนะจะ')}
});

router.get('/show/:id', function(req, res){
    if(req.session.email){
        match_comp.select_name(req.params.id,function(results,bool){
            // console.log(results)
            if(bool === true){ // ใช้ไม่ได้
                console.log('Error')
            }else{ // ใช้ได้
                // res.send(results); 
                console.log('Pass : selectIDname')
                map_comp.selectMapIdMatch(req.params.id, function(results1,bool1){
                    if(bool1 === true || results1.length <= 0){ // ใช้ไม่ได้
                        console.log('Error')
                    }else{
                        console.log('Pass : selectIDmatch')
                        // console.log(results1)
                        res.render('./adminUpdate', {
                            'title' : 'Update a Match Compentitive',
                            "team":results[0],
                            'mode' : true,
                            "map_comp": results1
                        })
                    }
                })
            }
        })
    }else{res.send('ต้อง Login ก่อนนะจะ')}
});

// route POST for add a star to Mysql 
router.post('/add', function(req, res){
    var ary = [req.body['r1'],req.body['r2'],req.body['r3'],req.body['r4']]
    match_comp.insert(req.body,function(message,bool){
        if(bool === true){ // ใช้ไม่ได้
            console.log('Error')
        }else{ // ใช้ได้
            console.log('Pass : insert match')
            var str = ''
            match_comp.selectlastID(function(result,bool1){
                if(bool1 === true){
                    console.log(result)
                }else{
                    console.log(result)
                    for(var i=0 ; i < 4 ; i++){
                        str = str + "('" +result+ "','" +ary[i]+ "','" +(i+1)+ "'),"
                    }
                    str = str.slice(0, -1)
                    console.log(str)
                    map_comp.multi_insert(str, function(message1,bool2){
                        if(bool2 === true){
                            console.log('Error')
                            res.send('Error');
                        }else{
                            console.log('insert map_comp : '+message1)
                            res.send('success');
                        }
                    })
                }
            })
        }
    })
});

router.delete('/show/:id', function(req, res){

    map_comp.delete(req.params.id,function(message,bool){
        if(bool === true){ // ใช้ไม่ได้
            res.send(message); 
            console.log('Error')
        }else{ // ใช้ได้
            console.log('Pass Delete map_comp ID')
            match_comp.delete(req.params.id, function(message1,bool1){
                if(bool1 === true){ // ใช้ไม่ได้
                    res.send(message1); 
                    console.log('Error')
                }else{ // ใช้ได้
                    console.log('Pass Delete match_comp ID')
                    res.send(message1); 
                }
            })
        }
    })
});

router.post('/show/update', function(req, res){
    var j = 0
    var update_match = {}
    var update_map = []
    for(var k in req.body){
        if(j<8){update_map.push(req.body[k])}
        else{update_match[k] = req.body[k]}
        j+=1
    }
    match_comp.update(update_match,function(message,bool){
        
        if(bool === true){ // ใช้ไม่ได้
            res.send('Error'); 
            console.log(message)
        }else{ // ใช้ได้
            console.log('Pass : update Match')
            update_map.push(req.body['id'])
            map_comp.multi_update(update_map, function(message1 ,bool1){
                if(bool1 === true){
                    console.log(message1)
                    res.send('Error')
                }else{
                    console.log('Pass : update Map')
                    res.send(message1); 
                }
            })
        }
    })
});

router.post('/auto', function(req, res){
    console.log('auto send : '+req.body.email)
    for(var k in req.body){
        if(k === 'match_id[]'){var ary = req.body[k]}
    }
    if(ary.length > 0){
        autoSend.deleteEmail(req.body.email, function(message ,bool){
            if(bool === true){
                console.log('Error')
                res.send('Error');
            }else{
                console.log('success Delete')
                match_comp.selectAll(function(results,bool){
                    var str = ""
                    if(bool === true || results.length <= 0){ // ใช้ไม่ได้
                        console.log('Error')
                        res.send('Error');
                    }else{ // ใช้ได้
                        console.log('success Select')
                        for(var i=0 ; i<results.length ; i++){
                            if(ary.indexOf(results[i].id_match_comp.toString()) != -1){
                                var date = new Date(results[i].date_start);
                                date.reduceHours(1)
                                var date_temp = date.getFullYear()+'-'+(parseInt(date.getMonth())+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getMilliseconds()
                                str = str + "('" +results[i].id_match_comp+ "','" +req.body.email+ "','" +date_temp+ "'),"
                            }
                        }
                        str = str.slice(0, -1)
                        // console.log(str)
                        autoSend.multi_insert(str, function(message ,bool){
                            if(bool === true){
                                console.log(message)
                                res.send('Error');
                            }else{
                                console.log('insert : '+message)
                                res.send('success');
                            }
                        })  
                    }
                })
            }
        })
    }else{
        console.log('no data in array')
        autoSend.deleteEmail(req.body.email, function(message ,bool){
            if(bool === true){
                console.log('Error')
                res.send('Error cuz no data in auto store')
            }else{
                res.send('success')
            }
        })
    }
    
});

module.exports = router;