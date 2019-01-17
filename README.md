# Notification-API

## How to install
* Clone the repo
* Run "npm install"

## Starting the api
* Start using "npm start"

## Various modules
#### email :
  * The email module consists of functionalities that assist in sending out emails from the API.
  * For implementing email functionality, [SendGrid](https://sendgrid.com/) is being used.
  * The API key for *SendGrid* has been removed from the repo. It needs to be added back to the file: **app/email/sendgrid_api_key.js**
    * It follows the format like this :
    ```javascript
    var send_grid_api_key = SEND_GRID_API_KEY;
    module.exports = send_grid_api_key;
    ```
    * The **SEND_GRID_API_KEY** needs to be taken from the SendGrid account.

#### sms :
  * The sms module consists of functionalities that assist in sending out SMS from the API.
  * For implementing SMS funcationality, [Twilio](https://www.twilio.com/) is being used.
  * The API key for *Twilio* has been removed from the repo It needs to be added back to the file: **app/sms/twilio_key.js**
    * It follows the format like this :
    ```javascript
    var keys = {
                accountSid : ACCOUNT_SID,
                authToken : AUTHENTICITION_TOKEN
    }
    module.exports = keys;
    ```
    * The **ACCOUNT_SID** as well as the **AUHTENTICATION_TOKEN** needs to be taken from the Twilio account.

**NOTE :** In case of SMS, we get a queued status in the response. This is because of the reason that a **Magic Number** is being used as the **from** number.

## Exposed routes

#### /api/email: For sending emails
###### Request Format 
*Request.body :* 
```javascipt
{
    "fromemail": "test@example.com",
    "toemails" : ["testing@example.com","testing2@example.com"],
    "subject" : "TEST SUBJECT",
    "emailbody" : "<p style=\"font-size: 32px;\">HTML Content</p>"
}
```
###### Response Format
```javascript
{
    "success": true,
    "message": "Emails sent",
}

```
#### /api/sms/single: For sending SMS to a single number.
**Note :** Number needs to be provided in the request body in JSON format.
###### Request Format
*Request.body :* 
```javascript
{
   "number": "123"
} 
```
###### Response Format
```javascript
{
    "accountSid": "ACCOUNT_SID",
    "apiVersion": "2010-04-01",
    "body": "This is a test SMS",
    "dateCreated": "2019-01-16T09:21:51.000Z",
    "dateUpdated": "2019-01-16T09:21:51.000Z",
    "dateSent": null,
    "direction": "outbound-api",
    "errorCode": null,
    "errorMessage": null,
    "from": "+15005550006",
    "messagingServiceSid": null,
    "numMedia": "0",
    "numSegments": "1",
    "price": null,
    "priceUnit": "USD",
    "sid": "SID",
    "status": "queued",
    "subresourceUris": {
        "media": "/2010-04-01/Accounts/ACCOUNT_SID/Messages/SID/Media.json"
    },
    "to": "123",
    "uri": "/2010-04-01/Accounts/ACCOUNT_SID/Messages/SID.json"
}
```


#### /api/sms/multiple: For sending SMS to multiple numbers.
**Note :** Numbers need to be provided in the request body in JSON format.
###### Request Format
*Request.body :* 
```javascript
{
   "numbers": ["123","456"] 
}
```
###### Response Format
```javascript
[
    {
        "accountSid": "ACCOUNT_SID",
        "apiVersion": "2010-04-01",
        "body": "This is a test SMS.",
        "dateCreated": "2019-01-16T09:17:55.000Z",
        "dateUpdated": "2019-01-16T09:17:55.000Z",
        "dateSent": null,
        "direction": "outbound-api",
        "errorCode": null,
        "errorMessage": null,
        "from": "+15005550006",
        "messagingServiceSid": null,
        "numMedia": "0",
        "numSegments": "1",
        "price": null,
        "priceUnit": "USD",
        "sid": "SID",
        "status": "queued",
        "subresourceUris": {
            "media": "/2010-04-01/Accounts/ACCOUNT_SID/Messages/SID/Media.json"
        },
        "to": "123",
        "uri": "/2010-04-01/Accounts/ACCOUNT_SID/Messages/SID.json"
    },
    {
        "accountSid": "ACCOUNT_SID",
        "apiVersion": "2010-04-01",
        "body": "This is a test SMS.",
        "dateCreated": "2019-01-16T09:17:55.000Z",
        "dateUpdated": "2019-01-16T09:17:55.000Z",
        "dateSent": null,
        "direction": "outbound-api",
        "errorCode": null,
        "errorMessage": null,
        "from": "+15005550006",
        "messagingServiceSid": null,
        "numMedia": "0",
        "numSegments": "1",
        "price": null,
        "priceUnit": "USD",
        "sid": "SID",
        "status": "queued",
        "subresourceUris": {
            "media": "/2010-04-01/Accounts/ACCOUNT_SID/Messages/SID/Media.json"
        },
        "to": "456",
        "uri": "/2010-04-01/Accounts/ACCOUNT_SID/Messages/SID.json"
    }
]
```



