// import { DEFAULT_ECDH_CURVE } from 'tls';

var CronJob = require('cron').CronJob
var nodemailerSend = require('./nodemailer')
var autoSend = require('./store_autosend')

Date.prototype.reduceHours= function(h){
    this.setHours(this.getHours()-h);
    return this;
}
Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
}
// Date.prototype.reduceMinute = function(m){
//     this.setMinutes(this.getMinutes()-m);
//     return this;
// }

var dictMatch = {}
var matchlist = []
var global = ''

var CronJob_auto = function(){


    checkMatchDuplicate = function(value){
        for(var i=0 ; i < matchlist.length ; i++){      
            if(matchlist[i] === value){return true} // have a data
        }
        matchlist.push(value)
        return false
    }
    createDict = function(data){
        dictnew = {}
        dictnew['hometeam'] = data.hometeam
        dictnew['awayteam'] = data.awayteam
        dictnew['email'] = [ data.email ]
        dictnew['date_start'] = data.date_start
        dictMatch[data.id_match_comp] = dictnew
    }
    repeatDict = function(data){
        dictMatch[data.id_match_comp].email.push(data.email)
    }
    
    this.job = function(minute){
        new CronJob('0 */'+minute+' * * * *', function(){
            console.log('Job1')
            var datenow = new Date()
            // datenow.addHours(7)
            autoSend.selectDate(datenow, function(message ,bool){
                if(bool === true || message.length <= 0){
                    console.log(message)
                }else{
                    console.log(datenow.addHours(7))
                    for(var i=0 ; i < message.length ; i++){
                        if(this.checkMatchDuplicate(message[i].id_match_comp) == false){this.createDict(message[i])}
                        else{this.repeatDict(message[i])}
                    }
                    for(var k in dictMatch){
                        nodemailerSend.setMaillist(dictMatch[k].email)
                        nodemailerSend.setSubject('Esport-kmutnb : '+dictMatch[k].hometeam+' VS '+dictMatch[k].awayteam +' TIME send : '+datenow)
                        nodemailerSend.setText(dictMatch[k].hometeam+' VS '+dictMatch[k].awayteam+' Match will begin at : '+dictMatch[k].date_start)
                        nodemailerSend.sendTransporter(function(message){
                            if( message === 'suscess'){
                                console.log('Finish send message : '+message)
                            }
                        })
                    }
                    for(var i=0 ; i < message.length ; i++){
                        autoSend.delete([message[i]['id_match_comp'],message[i]['email']], function(message ,bool){
                            if(bool === true){
                                console.log(message)
                            }else{
                                console.log('Finish delete : '+message)
                            }
                        });
                    }
                    matchlist = []
                    dictMatch = {}
                }
            })
        },null, true, 'Asia/Bangkok')
    }

}

// var test = new CronJob_auto
// test.job(2)


module.exports = new CronJob_auto;