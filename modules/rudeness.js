//rudeness module
//usage: rude word [nick]
//rude word here.

var replies = [
	"Go fall down a hole",
	"You STFU",
	"You're a retard"
];

function rudeMod(bot, config) {
	console.log("Adding listener for rude.js");
	bot.addListener("message", function(from, to, text, message) {
		var fwordIndex = text.toLowerCase().indexOf("Fuck you");
		var damnIndex = text.toLowerCase().indexOf("Damn you");
		var stfuIndex = text.toLowerCase().indexOf("STFU");
		var nickIndex = text.toLowerCase().indexOf(config.nick.toLowerCase());
		
		var index = -1;
		
		if (fwordIndex != -1)
			index = fwordIndex;
		if (damnIndex != -1)
			index = damnIndex;
		if (stfuIndex != -1)
			index = stfuIndex;
			
		if (index != -1 && nickIndex != -1 && index < nickIndex)
		{
			var randNumber = Math.floor(Math.random()*replies.length);
			bot.say(config.channel[0], replies[randNumber] + ", " + from + ".");
		}
	});
}

function start(from, to, bot, config, echexecargs) {
	console.log("Rude started manually");
	rudeMod(bot, config);
}

function autorun(bot, config) {
	console.log("Rude started automatically");
	rudeMod(bot, config);
}

function execute() {
	//nothing
}

exports.start = start;
exports.execute = execute;
exports.autoload = autorun;
