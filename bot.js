console.log('Olá, estou iniciando... :)');

const Twit = require('twit');
const T = new Twit({
	consumer_key: "LYQzN3McLoPSjDmeKniH55Jaa",
	consumer_secret: "3nzNkG47DCh1ZjEMEMrSzQTv2iKzejlTDnQHsE5lfY5IFxMJz9",
	access_token: 	"981181512405073921-3tKA7EFfiqnjhudDMN34vmLruHARjVC",
	access_token_secret: "e1OHaoep4AW55xns3tJT0SvZLLbIvJt7KsZlvBCExaXqF"
});

const stream = T.stream('statuses/filter', { track: ['trueetbot.de', 'trueet'] });

T.post('statuses/update', { status: 'Vamos tc?' }, function(err, data, response) {
    console.log(data)
})