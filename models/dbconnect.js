var mysql      = require('mysql');

var connection = mysql.createConnection({
    host     : 'umabrisfx8afs3ja.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user     : 'vlb6g2x7ak5fwo9k',
    password : 'yf7mgxse0b31uyj6'
});
connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
        console.log('connected : Google clound Mysql');
});
module.exports = connection;
// comman 
// ALTER TABLE movie.actress AUTO_INCREMENT=8;
