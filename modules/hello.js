//hello command
//Usage: Hello [nick]
//Hello!

var Replylist = [
  "Hello",
  "Hi",
  "Greetings"
];

function helloInit(bot, config) {
  console.log("Adding listener for hello.js");
  bot.addListener("message", function(from, to, text, message) {
    var HelloIndex=text.toLowerCase().indexOf("hello");
    var NickIndex=text.toLowerCase().indexOf(config.nick.toLowerCase());
    if (HelloIndex!=-1 && NickIndex!=-1 && HelloIndex<NickIndex)
    {
      var randomNumber = Math.floor(Math.random()*Replylist.length);
      bot.say(config.channel[0], Replylist[randomNumber]+", "+from+ "." );
    };
  });
}

function start(from,to,bot,config,echexecargs) {
  console.log("Hello started manually");
  helloInit(bot, config);
}

function autorun(bot, config) {
  console.log("Hello started automatically");
  helloInit(bot, config);
}

function execute() {
  // Nothing
}
exports.start = start;
exports.execute = execute;
exports.autoload = autorun;
