//Rudeness module

var replies = [
	"Fuck off",
	"You STFU",
	"Watch the sass",
	"Go pick on someone else"
];

var listenfor = [
	"fuck you",
	"damn you",
	"stfu",
	"fuck off"
]

function Init(bot, config) {
	console.log("Adding listener for rude.js");
	bot.addListener("message", function(from, to, text, message) {
		var reply=false;
		for (var i=0;i<listenfor.length;i++)
		{
			if (text.toLowerCase().indexOf(listenfor[i].toLowerCase())!=-1)
			{
				reply=true;
				break;
			}
		}
		if (reply && text.toLowerCase().indexOf(config.nick.toLowerCase())!=-1)
		{
			var randNumber = Math.floor(Math.random()*replies.length);
			bot.say(config.channel[0], replies[randNumber] + ", " + from + ".");
		}
	});
}

function start(from, to, bot, config, echexecargs) {
	console.log("Rudeness.js started manually");
	Init(bot, config);
}

function autorun(bot, config) {
	console.log("Rudeness.js started automatically");
	Init(bot, config);
}

function execute() {
	//nothing
}

exports.start = start;
exports.execute = execute;
exports.autoload = autorun;
