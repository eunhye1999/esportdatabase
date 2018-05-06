var connection = require('./dbconnect')

var match_comp = function(){

    this.selectAll_map = function(callback){
        sql = 'SELECT * FROM iwq0p73ejy9ndsnk.map'
        connection.query(sql, function (error, results, fields) {
            if(error) {
                callback(error,true)
            } else{
                console.log('PASS : %s',sql)
                callback(results,false);
            }
        });
    };

    this.selectAll_team = function(callback){
        sql = 'SELECT * FROM iwq0p73ejy9ndsnk.team'
        connection.query(sql, function (error, results, fields) {
            if(error) {
                callback(error,true)
            } else{
                console.log('PASS : %s',sql)
                callback(results,false);
            }
        });
    };

    this.select_name = function(id,callback){
        sql = "SELECT math.id_match_comp ,math.home_team as id_homeTeam, Hometeam.team_name as Hometeam ,math.away_team as id_awayTeam, Awayteam.team_name as Awayteam ,math.t_start , math.date_start "+
        "FROM iwq0p73ejy9ndsnk.match_comp as math "+
        "INNER JOIN iwq0p73ejy9ndsnk.team as Hometeam ON (math.home_team = Hometeam.id_team) "+
        "INNER JOIN iwq0p73ejy9ndsnk.team as Awayteam ON (math.away_team = Awayteam.id_team) WHERE math.id_match_comp=" 
        connection.query(sql+id, function (error, results, fields) {
            if(error) {
                callback(error,true)
            } else{
                console.log('PASS : %s',sql)
                callback(results,false);
            }
        });
        //- {
        //- id_match_comp: 16,
        //- id_homeTeam: 12,
        //- Hometeam: 'Shanghai Dragons',
        //- id_awayTeam: 2,
        //- Awayteam: 'Los Angeles Valiant',
        //- t_start: '10.00',
        //- date_start: '25-4-2020' 
        //- } 
    };

    this.selectAll_name = function(callback){
        sql = "SELECT math.id_match_comp ,math.home_team as id_homeTeam, Hometeam.team_name as Hometeam ,math.away_team as id_awayTeam, Awayteam.team_name as Awayteam ,math.t_start , math.date_start "+
        "FROM iwq0p73ejy9ndsnk.match_comp as math "+
        "INNER JOIN iwq0p73ejy9ndsnk.team as Hometeam ON (math.home_team = Hometeam.id_team) "+
        "INNER JOIN iwq0p73ejy9ndsnk.team as Awayteam ON (math.away_team = Awayteam.id_team) "+
        "ORDER BY math.date_start" 
        connection.query(sql, function (error, results, fields) {
            if(error) {
                callback(error,true)
            } else{
                console.log('PASS : %s',sql)
                callback(results,false);
            }
        });
        //- {
        //- id_match_comp: 16,
        //- id_homeTeam: 12,
        //- Hometeam: 'Shanghai Dragons',
        //- id_awayTeam: 2,
        //- Awayteam: 'Los Angeles Valiant',
        //- t_start: '10.00',
        //- date_start: '25-4-2020' 
        //- } 
    };

    this.selectAll_name_date = function(date,callback){
        sql = "SELECT math.id_match_comp ,math.home_team as id_homeTeam, Hometeam.team_name as Hometeam ,math.away_team as id_awayTeam, Awayteam.team_name as Awayteam ,math.t_start , math.date_start "+
        "FROM iwq0p73ejy9ndsnk.match_comp as math "+
        "INNER JOIN iwq0p73ejy9ndsnk.team as Hometeam ON (math.home_team = Hometeam.id_team) "+
        "INNER JOIN iwq0p73ejy9ndsnk.team as Awayteam ON (math.away_team = Awayteam.id_team) "+
        "WHERE math.date_start > ? "+
        "ORDER BY math.date_start" 
        console.log(sql)
        connection.query(sql,[date], function (error, results, fields) {
            if(error) {
                callback(error,true)
            } else{
                console.log('PASS : %s',sql)
                callback(results,false);
            }
        });
        //- {
        //- id_match_comp: 16,
        //- id_homeTeam: 12,
        //- Hometeam: 'Shanghai Dragons',
        //- id_awayTeam: 2,
        //- Awayteam: 'Los Angeles Valiant',
        //- t_start: '10.00',
        //- date_start: '25-4-2020' 
        //- } 
    };

    this.selectAll = function(callback){
        sql = 'SELECT * FROM iwq0p73ejy9ndsnk.match_comp'
        connection.query(sql, function (error, results, fields) {
            if(error) {
                callback(error,true)
            } else{
                console.log('PASS : %s',sql)
                callback(results,false);
            }
        });
    };

    this.selectlastID = function(callback){
        sql = 'SELECT * FROM iwq0p73ejy9ndsnk.match_comp ORDER BY id_match_comp DESC LIMIT 1'
        connection.query(sql, function (error, results, fields) {
            if(error) {
                callback(error,true)
            } else{
                console.log('PASS : %s',sql)
                callback(results[0].id_match_comp,false);
            }
        });
    };
        
    this.insert = function(body,callback){
        // sql = "INSERT INTO movie.login_user VALUES ('"+body['login_id']+"', '"+body['login_pass']+"', '"+body['login_email']+"');"
        sql = "INSERT INTO iwq0p73ejy9ndsnk.match_comp (home_team, away_team, t_start, date_start) VALUES ('"+body['home_team']+"', '"+body['away_team']+"', '"+body['t_start']+"', '"+body['date_start']+"');"
        connection.query(sql, function (error, results, fields) {
            if(error) {
                callback(error,true)
            } else{
                console.log('PASS : %s',sql)
                callback('success',false)
            }
            // connected!
        });
    };

    this.update = function(body,callback){
        var head = 'UPDATE iwq0p73ejy9ndsnk.match_comp SET ',tail = ' WHERE id_match_comp=',mid = '';
        for(var key in body){
            if(key !=  'id' && body[key] != ''){
                var mid = mid+key+'="'+body[key]+'",'
            }
        }
        var sql = head+mid.slice(0, -1)+tail+body.id
        console.log(sql)
        connection.query(sql, function (error, results, fields) {
            if(error) {
                callback(error,true)
            } else{
                console.log('PASS : %s',sql)
                callback('success',false)
            }
            // connected!
        });
    }

    this.delete = function(id,callback){
        sql = "DELETE FROM iwq0p73ejy9ndsnk.match_comp WHERE id_match_comp=";
        connection.query(sql+id, function (error, results, fields) {
            if(error) {
                callback(error,true)
            } else{
                console.log('PASS : %s',sql+id)
                callback('success',false)
            }
            // connected!
        });
    };

}

// var test = new match_comp;
// dataUpdate = {
//     "id"  : "17",
//     "home_team": "3",
//     "away_team": "4",
//     "t_start" : "08.30",
//     "date_start": "25-1-2111"
// }
// dataMatch_comp={
//     'home_team':'3',
//     'away_team':'4',
//     't_start':'08.30',
//     'date_start':'25-4-2040'
// }
// dataMatch_comp = {
//     "home_team":"3",
//     "away_team":"5",
//     "time_satrt":"08.30",
//     "date_start":"2018-05-02"
// }

// test.insert(dataMatch_comp,function(message,bool){
//     if(bool === true || message.length <= 0){ // ใช้ไม่ได้
//         console.log('Error')
//     }else{ // ใช้ได้
//         console.log(message)
//     }
// })
// test.update(dataUpdate,function(message,bool){
//     if(bool === true || message.length <= 0){ // ใช้ไม่ได้
//         console.log(bool)
//         console.log('Error')
//     }else{ // ใช้ได้
//         console.log(message)
//     }
// })
// id = 18
// test.delete(id,function(message,bool){
//     if(bool === true || message.length <= 0){ // ใช้ไม่ได้
//         console.log(bool)
//         console.log('Error')
//     }else{ // ใช้ได้
//         console.log(message)
//     }
// })

// test.selectAll_name_date('2018-05-05T15:00',function(results,bool){
//     if(bool === true){ // ใช้ไม่ได้
//         console.log('Error')
//     }else{ // ใช้ได้
//         console.log(results)
        
//     }
// })
// test.selectlastID(function(message1,bool1){
//     if(bool1 === true){
//         console.log(message1)
//     }else{
//         console.log('insert map_comp : '+message1)
//     }

// })

module.exports = new match_comp;