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
    var HiIndex=text.toLowerCase().indexOf("hi");
    var HeyIndex=text.toLowerCase().indexOf("hey");
    var NickIndex=text.toLowerCase().indexOf(config.nick.toLowerCase());
    
    var index=-1;
    if (HelloIndex!=-1) index=HelloIndex;
    if (HiIndex!=-1) index=HiIndex;
    if (HeyIndex!=-1) index=HeyIndex;
    
    if (index!=-1 && NickIndex!=-1 && index<NickIndex)
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
