var keys = require('./twilio_key');
const client = require('twilio')(keys.accountSid, keys.authToken);

var sms = {
    send :function (numbersToMessage,send) {
        let messages =[];
        let len = numbersToMessage.length;
        let counter = 1;
            numbersToMessage.forEach(function (number) {
                client.messages.create({
                        body: 'This is a test SMS.',
                        from: '+15005550006',
                        to: number
                    })
                    .then((message) => {
                        counter++;
                        messages.push(message)
                        if(counter > len){
                            send(messages);
                        }
                    })
                    .done();   
                })    
    }
}

module.exports = sms;
