var connection = require('../models/dbconnect')

var autoSend = function(){

    this.selectID = function(date,callback){
        sql = "SELECT * FROM iwq0p73ejy9ndsnk.store_autosend WHERE email = ?"
        connection.query(sql,[date], function (error, results, fields) {
            if(error) {
                callback(error,true)
            } else{
                console.log('PASS : %s'+date,sql)
                callback(results,false)
            }
        });
    }

    this.selectDate = function(date,callback){
        sql = "SELECT math.id_match_comp ,store.email, teanHome.team_name as hometeam, teamAway.team_name as awayteam, math.date_start "+
        "FROM iwq0p73ejy9ndsnk.store_autosend as store "+
        "INNER JOIN iwq0p73ejy9ndsnk.match_comp as math ON (store.match_id = math.id_match_comp) "+
        "INNER JOIN iwq0p73ejy9ndsnk.team as teanHome ON (teanHome.id_team = math.home_team) "+
        "INNER JOIN iwq0p73ejy9ndsnk.team as teamAway ON (teamAway.id_team = math.away_team) "+
        "WHERE store.datetime_send <= ?" 
        connection.query(sql,[date], function (error, results, fields) {
            if(error) {
                callback(error,true)
            } else{
                console.log('PASS : %s'+date,sql)
                callback(results,false)
            }
        });
    }

    this.selectTime = function(body,callback){
        sql = "SELECT * FROM iwq0p73ejy9ndsnk.store_autosend where datetime_send<=?";
        connection.query(sql,[body['datetime_now']], function (error, results, fields) {
            if(error) {
                callback(error,true)
            } else{
                console.log('PASS : %s',sql)
                callback(results,false)
            }
        });
    };

    this.delete = function(ary,callback){
        sql = "DELETE FROM iwq0p73ejy9ndsnk.store_autosend WHERE match_id=? and email=?;";
        connection.query(sql,ary, function (error, results, fields) {
            if(error) {
                callback(error,true)
            } else{
                console.log('PASS : %s',sql)
                callback('success',false)
            }
        });
    }
    this.deleteEmail = function(ary,callback){
        sql = "DELETE FROM iwq0p73ejy9ndsnk.store_autosend WHERE email=?;";
        connection.query(sql,ary, function (error, results, fields) {
            if(error) {
                callback(error,true)
            } else{
                console.log('PASS : %s',sql)
                callback('success',false)
            }
        });
    }

    this.insert = function(body,callback){
        sql = "INSERT INTO iwq0p73ejy9ndsnk.store_autosend (match_id,email,datetime_send) VALUES (?,?,?)";
        connection.query(sql,[body['match_id'],body['email'],body['datetime_send']], function (error, results, fields) {
            if(error) {
                callback(error,true)
            } else{
                console.log('PASS : %s',sql)
                callback('success',false)
            }
        });
    }
    this.multi_insert = function(str,callback){
        sql = "INSERT INTO iwq0p73ejy9ndsnk.store_autosend (match_id,email,datetime_send) VALUES ";
        connection.query(sql+str, function (error, results, fields) {
            if(error) {
                callback(error,true)
            } else{
                console.log('PASS : %s',sql)
                callback('success',false)
            }
        });
    }

}

// var test = new autoSend;

// var datenow = new Date().toLocaleString()

datetime_now = '2018-05-03 01:30:00'
dateinsert = {
    'match_id':'65',
    'datetime_start':'2018-05-03 12:00:00',
    'email':'db5810091@gmail.com',
    'before_time':'1',
    'datetime_send':'2018-05-03 11:00:00'
}
// test.insert(dateinsert, function(message ,bool){
//     if(bool === true){
//         console.log(message)
//         // res.send('Error');
//     }else{
//         console.log(message)
//         // res.send(message);
//     }
// })
// test.delete(['56','db5810091@gmail.com'], function(message ,bool){
//     if(bool === true){
//         console.log(message)
//         // res.send('Error');
//     }else{
//         console.log(message)
//         // res.send(message);
//     }
// })
// test.selectDate(datetime_now, function(message ,bool){
//     if(bool === true || message.length <= 0){
//         console.log(message)
//         // res.send('Error');
//     }else{
//         console.log(message)
//         // res.send(message);
//     }
// })
// test.selectID('db5810091@gmail.com', function(message ,bool){
//     if(bool === true || message.length <= 0){
//         console.log(message)
//         // res.send('Error');
//     }else{
//         console.log(message)
//         // res.send(message);
//     }
// })

module.exports = new autoSend;