var mysql = require('mysql');
var fs = require('fs');

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

// create

// read
var read_file = function(dir) {
  return new Promise(function(resolve, reject) {
    fs.readFile(dir, function(err, data) {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

var query = function(data) {
  return new Promise(function(resolve, reject) {
    con.query(data.toString(), function (err, result, fields) {
      if (err) console.log(err);
      return  resolve(result);
    });
  });
}

exports.read_schedule = function() {
  return read_file('./models/sql/schedule.sql').then(function (data) {
    return query(data.toString());
  }).then(function(result) {
    return result;
  }).catch(function(err) {
    console.error(err);
  });
}
// exports.read_schedule = function() {
//   fs.readFile('./models/sql/schedule.sql', function(err, data) {
//     if (err) throw err;
//     con.query(data.toString(), function (err, result, fields) {
//       if (err) console.log(err);
//       return result;
//     });
//   });
// }

exports.read_standing = function() {
  fs.readFile('./models/sql/standing.sql', function(err, data) {
    if (err) throw err;
    con.query(data.toString(), function (err, result, fields) {
      if (err) console.log(err);
      f_result = result;
    });
  });
}

// update

// delete