var connection = require('./dbconnect')

var loginUser = function(){

    this.insert = function(body,callback){
        sql = "INSERT INTO iwq0p73ejy9ndsnk.users (login_id, login_email, login_pass) VALUES (?, ?, ?);"
        // sql = "INSERT INTO movie.login_user VALUES ('"+body['login_id']+"', '"+body['login_pass']+"', '"+body['login_email']+"');"
        connection.query(sql,[body['login_id'],body['login_email'],body['login_pass']], function (error, results, fields) {
            if(error) {
                callback(error,true)
            } else{
                console.log('PASS : %s',sql)
                callback('success',false)
            }
            // connected!
        });
    };

    this.checkId = function(body,callback){
        sql = "SELECT * FROM iwq0p73ejy9ndsnk.users WHERE login_email='"+body['login_email']+"' and login_pass='"+body['login_pass']+"'";
        console.log(sql)
        sql = "SELECT * FROM iwq0p73ejy9ndsnk.users WHERE login_email= ? and login_pass= ? ;";
        connection.query(sql,[body['login_email'],body['login_pass']], function (error, results, fields) {
            if(error) {
                callback(error,true)
            } else{
                console.log('PASS : %s',sql)
                callback(results,false)
            }
            // connected!
        });
    };
}

// var test = new loginUser;
// dataInser={
//     'login_id':'taptop019',
//     'login_pass':'tt054202249',
//     'login_email':'top@gmail.com'
// }
// dataID={
//     'login_id':'toptape019',
//     'login_pass':'tt054202249',
// }
// // test.insert(dataInser)
// test.checkId(dataID,function(message,bool){
//     if(bool === true || message.length <= 0){ // ใช้ไม่ได้
//         console.log('Error')
//     }else{ // ใช้ได้
//         console.log(message)
//     }
// })


module.exports = new loginUser;