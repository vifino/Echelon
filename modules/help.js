//help function
//Usage: [nick] help
//Displays help about the bot
	  
function initHelp(bot, config) {
  console.log("Adding listener for help.js");
  bot.addListener("message", function(from, to, text, message) {
    if (text.toLowerCase() == config.nick.toLowerCase() + " help")
      {
      	//Help function
      	console.log("Displaying help to "+from);
      	bot.say(config.channel[0], "Todo - Add info about bot");
      	if (from == config.botMaster)
      	{
      	  bot.say(config.channel[0], "Commands: time, execute, logout");
      	} else {
      	  bot.say(config.channel[0], "Commands: time");
      	}
      }
  });	
}
	  
function start(from,to,bot,config,echexecargs) {
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