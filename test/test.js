var mysql = require('mysql');
var assert = require('assert');
var kmutnbDB = require('../index');
const db = new kmutnbDB();

var teamAll0 = [{ TEAM: 'Boston Uprising' },
	{ TEAM: 'Dallas Fuel' },
	{ TEAM: 'Florida Mayhem' },
	{ TEAM: 'Houston Outlaws' },
	{ TEAM: 'London Spitfire' },
	{ TEAM: 'Los Angeles Gladiators' },
	{ TEAM: 'Los Angeles Valiant' },
	{ TEAM: 'New York Excelsior' },
	{ TEAM: 'Philadelphia Fusion' },
	{ TEAM: 'San Francisco Shock' },
	{ TEAM: 'Seoul Dynasty' },
	{ TEAM: 'Shanghai Dragons' } ]

var team = 0
describe('Array', function(){
  before(function(done){
      team = db.getTeam(function(data){
        team = data
        done();
      })
  });

  describe('Test', function(){
    it('The results should be the teamAll.', function(){
      assert.deepEqual(team, teamAll0);

    });
  });

});


