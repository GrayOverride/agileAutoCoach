var SlackBot = require('slackbots');
var fs = require('fs');

if (fs.existsSync('./env.json')) {
  var env = require("./env.json")
}else {
  var env = process.env;
}

// create a bot
var bot = new SlackBot({
  token: env.token,
  name: 'coachBot'
});

var chooseOne = function(input, callback){
  console.log(input);
    if (input) {
      var array = input.split('or');
      var arrSize = array.length;
      var selected = Math.floor((Math.random() * arrSize) + 0);
      callback(array[selected])

    }
}

bot.on('start', function() {
    // more information about additional params https://api.slack.com/methods/chat.postMessage
    var params = {
        icon_emoji: ':robot_face:'
    };


    // define channel, where bot exist. You can adjust it there https://my.slack.com/services
    //bot.postMessageToChannel('ziggy', 'meow meow!', params);

    // define existing username instead of 'user_name'
    bot.postMessageToUser('vandamm', 'meow!', params);

    // define private group instead of 'private_group', where bot exist
    //bot.postMessageToGroup('private_group', 'meow!', params);

    bot.on('message', function(data) {
      var thisBot = bot.self.id;
        // all ingoing events https://api.slack.com/rtm
        if (data.bot_id) {
            return
        };

        if (data.text) {
            console.log(data.text.toLowerCase())
            if (data.text.toLowerCase().indexOf('coachbot') > -1 || data.text.indexOf(thisBot) > -1) {
              var message = data.text.toLowerCase();
              var parsed = message.replace(/coachbot/gi, "");
              console.log(parsed);
              if (parsed.indexOf('decide')>-1){
                var list = parsed.replace(/decide/gi, "");
                chooseOne(list, function(result){
                    bot.postMessageToChannel('ziggy ', result, params);
                })
              }
              //  bot.postMessageToUser('vandamm', 'hello you', params);
            };
        }


    })

});
