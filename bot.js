console.log('Olá, estou iniciando... :)');
console.log('\n');
console.log("######## ########  ##     ## ######## ######## ######## ");
console.log("   ##    ##     ## ##     ## ##       ##          ##    ");
console.log("   ##    ##     ## ##     ## ##       ##          ##    ");
console.log("   ##    ########  ##     ## ######   ######      ##    ");
console.log("   ##    ##   ##   ##     ## ##       ##          ##    ");
console.log("   ##    ##    ##  ##     ## ##       ##          ##    ");
console.log("   ##    ##     ##  #######  ######## ########    ##    ");

const Twit = require('twit');
const T = new Twit({
	consumer_key: "LYQzN3McLoPSjDmeKniH55Jaa",
	consumer_secret: "3nzNkG47DCh1ZjEMEMrSzQTv2iKzejlTDnQHsE5lfY5IFxMJz9",
	access_token: 	"981181512405073921-3tKA7EFfiqnjhudDMN34vmLruHARjVC",
	access_token_secret: "e1OHaoep4AW55xns3tJT0SvZLLbIvJt7KsZlvBCExaXqF"
});

const stream = T.stream('statuses/filter', { track: ['trueetbot.de', 'trueet'] });


  T.get('account/verify_credentials', { skip_status: true })
  .catch(function (err) {
    console.log('Ocorreu um erro, me reinicie por favor :(', err.stack)
  })
  .then(function (result) {
    // `result` is an Object with keys "data" and "resp".
    // `data` and `resp` are the same objects as the ones passed
    // to the callback.

    // console.log('data', result.data);

    let labelsCheck = ["@Lgustavo_19", "Corinthiano"];
    let labelsresponse = "Olá, ###. É falso que @Lgustavo_19 seja Corinthiano. Fui alertado pela galera do Trueet e a informação verdadeira está aqui: www.oglobo.globo.com.br/. Comece a usar o Trueet em www.trueet.com.br e não caia mais nessa!";

    T.get('friends/list', { screen_name: 'lgjuliao' },  function (err, data, response) {
        // let idTeste = data.ids[2];
        // console.log(idTeste);
        // T.get('users/show', { user_id: idTeste },  function (err, data, response) {
        //     console.log(data);
        // })
        // console.log(data);
        let users = data.users;
        console.log("\n");
        console.log('Olá, seus amigos são:');
        console.log("\n");
        //friends
        for (var user in users) {
            let actualUser = users[user];
            console.log(actualUser.name);
        }
        console.log("\n");
        console.log('Estou iniciando a varredura - Time do coração...');
        console.log("\n");

        let counterTotal = 0;
        let counterFound = 0;
        
        for (var user in users) {
            let actualUser = users[user];
            //pega último tweet - teste
            if(actualUser.status){
                // console.log(actualUser.status['text'] + "\n");
                const sizeLabels = labelsCheck.length;
                var check = checkVeracity(actualUser.status['text'], labelsCheck, sizeLabels, "@"+actualUser.screen_name);

                if(check){
                    console.log(labelsresponse.replace("###","@"+actualUser.screen_name)+"\n");
                    counterFound++;
                }
                counterTotal++;
            }
        }
        
        console.log("Foram varridos "+counterTotal+" usuários e encontrados apenas "+counterFound+" Fake News");

    });

    function checkVeracity(str, labelsCheck, sizeLabels, mention){      
        let counter = 0;
        labelsCheck.forEach(function (item, index, array) {
            // console.log(item);
            if(str.indexOf(item)!==-1){
                counter++;
            }
        });
        if(counter > (sizeLabels/2)){
            return true;
        }
        // else if(counter == (sizeLabels/2)){
        //     return "Pode ser Fake News";
        // }else{
        //     return "Não parece ser Fake News";
        // }
    }

  })