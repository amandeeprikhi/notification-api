var express = require('express');
var email = require('./app/email');
debugger;
var async = require('async');
// import { read } from 'fs';
const app = express();

console.log(email.sendEmail);

app.get('/api', (req, res) => {
    res.status(200).send({
        success: 'true',
        message: 'CSV file written!',
        excel: excel.excel()
    })
});

app.get('/read', (req, res) => {
    res.status(200).send({
        success: 'true',
        message: 'EXCEL file read!',
        excel: excel.read()
    })
});

app.get('/write', (req, res) => {
    res.status(200).send({
        success: 'true',
        message: 'CSV file created!',
        excel: excel.write()
    })
});

app.post('/api/send', function (req, res, next) {
    async.parallel([
      function (callback) {
        email.sendEmail(
          callback,
          'aman5dav@gmail.com',
          ['amandeeprikhi@gmail.com'],
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

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`)
});