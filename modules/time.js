//Time module
//Usage: [nick] time
//Displays the bot's system time

function start(from,to,bot,config,echexecargs) {
  console.log("Adding listener for time.js");
  bot.addListener("message", function(from, to, text, message) {
    if (text.toLowerCase() == config.nick.toLowerCase() + " time")
	  {
  		console.log("User " + from + " Requested Time.");
  		var date = new Date();
  		var current_hour = date.getHours();
  		var current_min = date.getMinutes();
  		var current_sec = date.getSeconds();
  
  		bot.say(config.channel[0],"Current Time: " + current_hour + ":" + current_min + ":" + current_sec);
		}
  });
}
function execute() {
  // Nothing
}
exports.start = start;
exports.execute = execute;
