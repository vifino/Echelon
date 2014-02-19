//help function
//Usage: [nick] help
//Displays help about the bot
	  
function start(from,to,bot,config,echexecargs) {
  console.log("Adding listener for SayHi")
  bot.addListener("message", function(from, to, text, message) {
    if (text.toLowerCase() == config.nick.toLowerCase() + " help")
    	  {
      		//Help function
      		console.log("Displaying help")
      		bot.say(config.channel[0], "Todo - Add info about bot";
      		if (from == config.botMaster)
      		{
      		  bot.say(config.channel[0], "Commands: time, execute, logout";
      		} else {
      		  bot.say(config.channel[0], "Commands: time";
      		}
    	  }
  });
}
function execute() {
  // Nothing
}
exports.start = start;
exports.execute = execute;
