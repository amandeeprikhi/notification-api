const accountSid = 'ACcb4d55de1bdc36dd7f278f19f19d8082';
const authToken = '1cfd539bb65073658543d31baae81934';
const client = require('twilio')(accountSid, authToken);

var sms = {

    //To be used when sms is to be sent to a single recepient
    single: function (number,send) {
        client.messages
            .create({
                body: 'This is a test SMS',
                from: '+15005550006', //can be found in the twilio console.
                to: number //the to number, receiver of the SMS.
            })
            .then(message => {
                console.log(message);
                send(JSON.stringify(message));
            }) 
            .done();
    },

    //To be used when sms is to be sent to multiple recepients
    multiple: function (numbersToMessage,send) {
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