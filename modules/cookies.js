//Cookie counter

var cookies = 0;
function start(from,to,msgto,bot,config,echexecargs) {
	console.log("I hope you have cookies enabled");
	bot.say(msgto, "I hope you have cookies enabled");
	bot.addListener("message", function(from, to, text, message) {
		var msgto;
		if (to != config.nick) msgto=to; else msgto=from;
		if (text.toLowerCase().indexOf(config.nick.toLowerCase()+ " +") == 0)
		{
			var regEx = new RegExp(config.nick+" +", "ig");
			var add = parseFloat(text.replace(regEx, ""));
			if (!isNaN(add) && add>0)
			{
				bot.action(msgto, "gets "+add+" cookies.");
				cookies += add;
			}
	    	}
	    	else if (text.toLowerCase().indexOf(config.nick.toLowerCase()+ " -") == 0)
	    	{
			var regEx = new RegExp(config.nick+" -", "ig");
			var add = parseFloat(text.replace(regEx, ""));
			if (!isNaN(add) && add>0)
			{
				bot.action(msgto, "has "+add+" Cookies stolen.");
				cookies -= add;
			}
		}
		else if (text.toLowerCase().indexOf(config.nick.toLowerCase()+ " *") == 0)
		{
			var regEx = new RegExp(config.nick+" *", "ig");
			var add = parseFloat(text.replace(regEx, ""));
			if (!isNaN(add) && add>0)
			{
				bot.action(msgto, "'s cookies got multiplied by "+add+".");
				cookies *= add;
			}
		} 
		else if (text.toLowerCase().indexOf(config.nick.toLowerCase()+ " /") == 0)
		{
			var regEx = new RegExp(config.nick+" /", "ig");
			var add = parseFloat(text.replace(regEx, ""));
			if (!isNaN(add) && add>0)
			{
				if (cookies!=0)
				{
					bot.action(msgto, "'s cookies got divided by "+add+".");
					cookies /= add;
				} else {
					bot.say(msgto, "I will not divide by zero.");
				}
			}
		} 
		else if (text.toLowerCase() == config.nick.toLowerCase()+ " cookies")
		{
			if (cookies>0)
			{
				bot.say(msgto, "I have "+cookies+" cookies!");
			} 
			else if (cookies<0)
			{
				bot.say(msgto, "I'm in debt, I owe "+(-cookies)+" cookies...");
			} 
			else if (isNaN(cookies)) {
				bot.say(msgto, "My cookies are broken, they are NaN.");
				console.log("Resetting cookie counter");
				cookies=0;
			} else {
				bot.say(msgto, "I don't have any cookies.");
			}
		}
	});
}
function execute() {
	//Reset cookie counter
	cookies=0;
}
exports.start = start;
exports.execute = execute;
