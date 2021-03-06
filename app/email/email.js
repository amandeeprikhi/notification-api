var helper = require('sendgrid').mail;
var async = require('async');
var SEND_GRID_API_KEY = require('./sendgrid_api_key');

var sendEmail = {
  sendEmail:  function (
    parentCallback,
    fromEmail,
    toEmails,
    subject,
    textContent,
    htmlContent
  ) {
    const errorEmails = [];
    const successfulEmails = [];
    console.log(SEND_GRID_API_KEY);
    const sg = require('sendgrid')(SEND_GRID_API_KEY);
    async.parallel([
      function (callback) {
        // Add to emails
        for (let i = 0; i < toEmails.length; i += 1) {
          // Add from emails
          const senderEmail = new helper.Email(fromEmail);
          // Add to email
          const toEmail = new helper.Email(toEmails[i]);
          // HTML Content
          const content = new helper.Content('text/html', htmlContent);
          const mail = new helper.Mail(senderEmail, subject, toEmail, content);
          var request = sg.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: mail.toJSON()
          });
          sg.API(request, function (error, response) {
            console.log('SendGrid');
            if (error) {
              console.log('Error response received');
            }
            console.log(response.statusCode);
            console.log(response.body);
            console.log(response.headers);
          });
        }
        // return
        callback(null, true);
      }
    ], function (err, results) {
      console.log('Done');
    });
    parentCallback(null, {
      successfulEmails: successfulEmails,
      errorEmails: errorEmails,
    });
  }
}

module.exports = sendEmail;