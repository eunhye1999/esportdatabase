var connection = require('../models/dbconnect')

var map_comp = function(){

    this.selectMapIdMatch = function(id,callback){
        var sql = "SELECT mc.match_comp , mc.map as id_map, m.map_name , mc.round , mc.home_score , mc.away_score " +
        "FROM iwq0p73ejy9ndsnk.map_comp as mc "+
        "INNER JOIN iwq0p73ejy9ndsnk.map as m ON (mc.map = m.id_map) "+
        "Where mc.match_comp = ?;"
        console.log(sql)
        // var sql = 'SELECT * FROM iwq0p73ejy9ndsnk.map_comp Where match_comp = ?'
        connection.query(sql,[id], function (error, results, fields) {
            if(error) {
                callback(error,true)
            } else{
                console.log('PASS : %s',sql)
                callback(results,false);
            }
        });
    };

    this.multi_insert = function(str,callback){
        var sql = "INSERT INTO iwq0p73ejy9ndsnk.map_comp (match_comp, map, round) VALUES "
        // var sql = "INSERT INTO iwq0p73ejy9ndsnk.match_comp (home_team, away_team, t_start, date_start) VALUES ('"+body['home_team']+"', '"+body['away_team']+"', '"+body['t_start']+"', '"+body['date_start']+"');"
        console.log(sql+str)
        connection.query(sql+str, function (error, results, fields) {
            if(error) {
                callback(error,true)
            } else{
                console.log('PASS : %s',sql+str)
                callback('success',false)
            }
            // connected!
        });
    };

    this.multi_update = function(ary,callback){
        var sql = "UPDATE iwq0p73ejy9ndsnk.map_comp "+
        "SET home_score = (case when round = '1' then ? "+
                             "when round = '2' then ? "+
                             "when round = '3' then ? "+
                             "when round = '4' then ? end),"+
            "away_score = (case when round = '1' then ? "+
                             "when round = '2' then ? "+
                             "when round = '3' then ? "+
                             "when round = '4' then ? end) "+
        "WHERE match_comp = ?;"
        console.log(ary)
        connection.query(sql, ary, function (error, results, fields) {
            if(error) {
                callback(error,true)
            } else{
                console.log('PASS : UPdate %s',sql)
                callback('success',false)
            }
            // connected!
        });
    }

    this.delete = function(id,callback){
        var sql = "DELETE FROM iwq0p73ejy9ndsnk.map_comp WHERE match_comp= ?";
        connection.query(sql, [id], function (error, results, fields) {
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
// var test = new map_comp()
// dataupdate = {
//     "hr1" : "8",
//     "hr2" : "7",
//     "hr3" : "6",
//     "hr4" : "5",
//     "hr5" : "4",
//     "hr6" : "3",
//     "hr7" : "2",
//     "hr8" : "1",
//     "id_match_comp" : "92"
// }
// test.multi_update(dataupdate, function(message ,bool){
//     if(bool === true){console.log('Error')}
//     else{
//         console.log('success')
//     }
// })
// test.selectMapIdMatch(92, function(message ,bool){
//     if(bool === true){console.log(message)}
//     else{
//         console.log(message)
//     }
// })

module.exports = new map_comp;
