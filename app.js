var express = require('express');
var email = require('./app/email/email');
var sms = require('./app/sms/sms');
var async = require('async');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.post('/api/email', function (req, res, next) {
    async.parallel([
      function (callback) {
        email.sendEmail(
          callback,
          'SENDER_EMAIL_ID',//sender email id
          ['RECEIVER_EMAIL_ID'],//receiver email id
          'Subject Line',
          'Text Content',
          '<p style="font-size: 32px;">HTML Content</p>'
        );
      }
    ], function (err, results) {
      res.send({
        success: true,
        message: 'Emails sent',
        successfulEmails: results[0].successfulEmails,
        errorEmails: results[0].errorEmails,
      });
    });
  });

app.post('/api/sms/single', function (req, res){
    let number = req.body.number
    sms.single(number,(message)=>{
        res.send(message);
    });
})

app.post('/api/sms/multiple', function (req, res){
    let numbers= req.body.numbers;
    sms.multiple(numbers,(message)=>{
        res.send(message);
    });
})

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`)
});