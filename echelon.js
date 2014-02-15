// Made by vifino
// Don't change anything here!

// Declaring some Vars...
var irc = require("irc");
var fs = require("fs");
var config = require("./config");
var bot = new irc.Client(config.server, config.nick, {
	channels: config.channel,
	port: config.port,
	realName: config.realName,
	userName: config.nick,
});
if (!config.pass == "") {
	bot.say("nickserv", "identify " + config.pass);
};
var modulestarted = [];
// Some First-Run Configuration
if (!fs.existsSync("./modules")) {
	fs.mkdirSync("./modules");
}
// Load Additional Modules.
var modules = [];
var modulestotal = 0;
console.log("Searching and loading Modules.");
var files = fs.readdirSync("./modules");
var modulenames = [];
for(var filecount in files){
	if (!files.hasOwnProperty(filecount)) continue;
	modulestotal = modulestotal + 1;
	var currentfile = files[filecount]
	console.log(currentfile);
	var currentfilewoext = currentfile.slice(0,-3);
	console.log(currentfilewoext);
	modules[currentfilewoext] = require("./modules/" + files[filecount]);
	modulenames.push(currentfilewoext);
	modulestarted[currentfilewoext] = false;
	console.log("Loaded ", currentfilewoext);
};
console.log("Finished Loading Modules.")
// Finished Loading of modules.

// Listen for joins
bot.addListener("join", function(channel, who) {
	// Welcome them in if he is not my master!
	if (who == config.botMaster)
	  {
	bot.say(config.channel[0], "Welcome, Master " + who + ".");
	  }
	else if (who == config.nick)
	  {
	console.log("Main Programm Loaded.");
	  }
});

bot.addListener("message", function(from, to, text, message) {
	if (text.toLowerCase() == config.nick.toLowerCase() + " time")
	  {
		console.log("User " + from + " Requested Time.");
		var date = new Date();
	var current_hour = date.getHours();
	var current_min = date.getMinutes();
	var current_sec = date.getSeconds();
		bot.say(config.channel[0],"Current Time: " + current_hour + ":" + current_min + ":" + current_sec)
	  }
	else if (text.toLowerCase() == config.nick.toLowerCase() + " logout")
	  {
		console.log(from +" requested logout.")
		if (from == config.botMaster) {
			console.log("Request granted.");
			bot.say(config.channel[0], "Request granted.");
			bot.disconnect("Logging Out on Admin request.");
		}
		else {
		console.log("Request denied.");
		bot.say(config.channel[0], "Request denied.");
		};
	  }
	else if (text.substring(0,10 + config.nick.length).toLowerCase() == config.nick.toLowerCase() + " execute: ") {
		var echexec = text.substring(10 + config.nick.length).toLowerCase();
		var echexecargs = echexec.split(" ");
		console.log(from +" tried to execute " + echexec);
		if (echexecargs[0] == "modules") {
			bot.say(config.channel[0], "Currently Available Modules:");
			bot.say(config.channel[0], modulenames.toString());
		}
		else {
			var modulevalid = 0;
			for(var modulecount2 in modulenames){
				if (modulenames[modulecount2] == echexecargs[0]) {
					modulevalid = 1;
					if (!modulestarted[echexecargs[0]]) {
						modules[echexecargs[0]].start();
						modulestarted[echexecargs[0]] = true;
					}
					modules[echexecargs[0]].execute(from,to,bot,config,echexecargs);
					continue;
				};
			};
			if (modulevalid = 0) {
			console.log("No Valid Command.");
			bot.say(config.channel[0], "No Valid Command.");
			};
		};
	  }
	else {
		console.log(from + ": " + text);
	  };
});
