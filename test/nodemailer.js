var nodemailer = require('nodemailer');

var nodemailerSend = function(){

    const userSend = 'a5810091a@gmail.com'
    const gmail_clientId = '821028968239-04k17spk20kbemuqkd2h8o32arn61lj0.apps.googleusercontent.com'
    const gmail_clientSecret = 'SWGcTDEy4jvhQMShgu934DIC'
    const gmail_refreshToken = '1/XpFf8livZLEsgqafubIMFq2ZFRdpTgxw2fHkrJ5gjbE'
    var maillist = ''
    var mail_subject = ''
    var mail_text = ''

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: "OAuth2",
          user: userSend,
          clientId: gmail_clientId,
          clientSecret: gmail_clientSecret,
          refreshToken: gmail_refreshToken
        }
    });

    this.setMaillist = function(ary){
        var stringemail = ''
        for(var i=0 ; i<ary.length ; i++){
            stringemail = stringemail+ary[i]+','
        }
        maillist = stringemail.slice(0, -1)
    }

    this.setText = function(text){
        mail_text = text
    }

    this.setSubject = function(text){
        mail_subject = text
    }

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    this.sendTransporter= function(callback){
        var mailOptions = {
            from: 'Esport-kmutnb <'+userSend+'>',
            to: maillist,
            subject: mail_subject,
            text: mail_text
        };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              callback(error)
            } else {
              callback('suscess')
            }
            maillist = ''
            mail_subject = ''
            mail_text = ''
        });
    }
}

module.exports = new nodemailerSend;