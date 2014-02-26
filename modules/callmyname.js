//blank function
//Usage: [nick]
//Will say something random to user if a blank message was said. Usually to confirm the bot is active.
//EG: "Echelon" - "You said my name"
var msgto;
var Replylist = [
  "Yes?",
  "Hello!",
  "You want something?",
  "Sup",
  "Thats my name",
  "What do you need?"
];
var msgto;
function init(bot,config) {
  console.log("Adding listener for blank.js");
  bot.addListener("message", function(from, to, text, message) {
	if (!(to == config.nick)) {
		//Not PM
		msgto=from;
	}
	else {
		msgto=to;
	};
    if (text.toLowerCase().replace(",","").replace(".","").replace("!","") == config.nick.toLowerCase())
     {
       var randomNumber = Math.floor(Math.random()*Replylist.length);
       bot.say(msgto, Replylist[randomNumber]);
     }
  });
}

function start(from,to,msgto,bot,config,echexecargs) {
  console.log("callmyname.js started manually");
  init(bot,config);
}

function autorun(bot,config)
{
  console.log("callmyname.js started automatically");
  init(bot,config);
}

function execute() {
  // Nothing
}
exports.start = start;
exports.execute = execute;
exports.autoload = autorun;