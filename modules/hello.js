//hello command
//Usage: Hello [nick]
//Hello!

var Replylist = [
  "Hello",
  "Hi",
  "Greetings",
  "Ohia",
  "Hai",
  "Oh, Hello",
  "Heyho",
  "Sup",
  "Nice to meet you",
  "What's up, ",
  "Why hello there, ",
  "Good day, "
];

var listenfor = ["hello","hi","hey","sup","ohia","heyho","hai"]

function helloInit(bot, config) {
	console.log("Adding listener for hello.js");
	bot.addListener("message", function(from, to, text, message) {
		var msgto;
		if (to != config.nick) msgto=to; else msgto=from;
		var NickIndex=text.toLowerCase().indexOf(config.nick.toLowerCase());
		var index=-1;
		for (var i=0;i<listenfor.length;i++)
		{
			var iof=text.toLowerCase().indexOf(listenfor[i].toLowerCase());
			if (iof==0)
			{
				index=iof;
				break;
			}
		}
		
		if (index!=-1 && NickIndex!=-1 && index<NickIndex)
		{
			var randomNumber = Math.floor(Math.random()*Replylist.length);
			bot.say(msgto, Replylist[randomNumber]+", "+from+ "." );
		};
	});
}

function start(from,to,msgto,bot,config,echexecargs) {
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
