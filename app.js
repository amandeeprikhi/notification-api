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
          req.body.fromemail,//sender email id
          req.body.toemails,//receiver email ids
          req.body.subject,
          'Text Content',
          req.body.emailbody
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

app.post('/api/sms', function (req, res){
    let numbers= req.body.numbers;
    sms.send(numbers,(message)=>{
        res.send(message);
    });
})

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`)
});