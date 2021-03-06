//help function
//Usage: [nick] help
//Displays help about the bot

function initHelp(bot, config) {
	bot.addListener("message", function(from, to, text, message) {
		var msgto;
		if (to != config.nick) msgto=to; else msgto=from;
		if (text.toLowerCase() == config.nick.toLowerCase() + " help")
		{
			//Help function
			console.log("Displaying help to "+from);
			bot.say(msgto, "I am "+config.nick+". I am an IRC bot in Node.JS, my master is "+config.botMaster+".");
			if (from == config.botMaster)
			{
				bot.say(msgto, "Commands: time, execute, logout");
			} else {
				bot.say(msgto, "Commands: time, execute");
			}
		}
	});	
}

function start(from,to,msgto,bot,config,echexecargs) {
	console.log("help.js started manually");
	initHelp(bot, config);
}

function autorun(bot,config) {
	console.log("help.js started automatically");
	initHelp(bot, config);
}

function execute() {
	// Nothing
}
exports.start = start;
exports.execute = execute;
exports.autoload = autorun;
