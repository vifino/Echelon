// Made by vifino
// Don't change anything here!

// Declaring some Vars...
var irc = require("irc");
var fs = require("fs");
var _ = require("underscore");
var config = require("./config");
var modules = [];
var modulestotal = 0;
var currentfile;
var currentmodule;
var modulesloaded = false;
var currentfilewoext;
var currentmoduleauto;
var files;
var bot;
function spawnBot() {
	bot = new irc.Client(config.server, config.nick, {
		channels: config.channel,
		port: config.port,
		realName: config.realName,
		userName: config.nick,
	});
	if (!config.pass == "") {
		bot.say("nickserv", "identify " + config.pass);
	};
};
var modulestarted = [];
	// Some First-Run Configuration
	if (!fs.existsSync("./modules")) {
		fs.mkdirSync("./modules");
}
// Load Additional Modules.
function loadModules() {
	console.log("Searching and loading Modules.");
	files = fs.readdirSync("./modules");
	modulenames = [];
	modulesloaded = false;
	for(var filecount in files){
	if (!files.hasOwnProperty(filecount)) continue;
		modulestotal = modulestotal + 1;
		currentfile = files[filecount];
		currentfilewoext = currentfile.slice(0,-3);
		modules[currentfilewoext] = require("./modules/" + files[filecount]);
		modulenames.push(currentfilewoext);
		currentmodule = modules[currentfilewoext];
		currentmoduleauto = currentmodule["autoload"];
		// console.log(currentmodule);
		// console.log(currentmoduleauto);
		// console.log(_.isFunction(currentmoduleauto));
		// console.log(typeof(currentmoduleauto));
		console.log("Loaded ", currentfilewoext);
		if ( _.isFunction(currentmoduleauto) ) {  //_.isFunction(modules[currentfilewoext].autoload)
			currentmoduleauto(bot, config);
			console.log("Autorun executed in Module "+currentfilewoext);
			modulestarted[currentfilewoext] = true;
		}
		else {
			console.log("Did not autorun Module "+currentfilewoext+". (It is not type 'function')");
			modulestarted[currentfilewoext] = false;
		};
		modulesloaded = true;
};	
console.log("Finished Loading Modules.");
};
// Finished Loading of modules.

// Listen for joins
function basicListeners(bot) {
bot.addListener("join", basicJoin);
bot.addListener("message", basicMessage);
bot.addListener('error', function(message) {
    console.log('error: ', message);
});
}
function basicJoin(channel, who) {
	// Welcome them in if he is not my master!
	if (who == config.botMaster)
	{
		bot.say(channel, "Welcome, Master " + who + ".");
	}
	else if (who == config.nick)
	{
		console.log("Main Programm Loaded.");
	}
};

function basicMessage(from, to, text, message) {
	if (text.toLowerCase() == config.nick.toLowerCase() + " time")
	{
		console.log("User " + from + " Requested Time.");
		var date = new Date();
		var current_hour = date.getHours();
		var current_min = date.getMinutes();
		var current_sec = date.getSeconds();
		
		bot.say(from ,"Current Time: " + current_hour + ":" + current_min + ":" + current_sec);
	}
	else if (text.toLowerCase() == config.nick.toLowerCase() + " logout")
	{
		console.log(from +" requested logout.")
		if (from == config.botMaster) {
			console.log("Request granted.");
			bot.say(from , "Request granted.");
			bot.disconnect("Disconnecting on Admin request.");
		}
		else
		{
			console.log("Request denied.");
			bot.say(from , "Request denied.");
		};
	}
	else if (text.toLowerCase() == config.nick.toLowerCase() + " restart")
	{
		console.log(from +" requested restart..");
		if (from == config.botMaster) {
			console.log("Request granted.");
			bot.say(from , "Request granted.");
			bot.disconnect("Restarting on Admin request.");
			start()
		}
		else
		{
			console.log("Request denied.");
			bot.say(to , "Request denied.");
		};
	}
	else if (text.substring(0,8 + config.nick.length).toLowerCase() == config.nick.toLowerCase() + " execute")
	{
		var echexec = text.substring(9 + config.nick.length); //.toLowerCase();
		var echexecargs = echexec.split(" ");
		console.log(from +" tried to execute " + echexec.toLowerCase());
		if (text.length==(8 + config.nick.length) || echexecargs[0] == "modules") {
			bot.say(from , "Modules ("+modulenames.length+"): " +modulenames.toString());
		}
		else {
			var modulevalid = 0;
			for(var modulecount2 in modulenames){
				if (modulenames[modulecount2] == echexecargs[0]) {
					modulevalid = 1;
					if (!modulestarted[echexecargs[0]]) {
						modules[echexecargs[0]].start(from,to,bot,config,echexecargs);
						modulestarted[echexecargs[0]] = true;
					}
					// console.log(typeof(modules[currentfilewoext].execute));
					if (typeof(modules[currentfilewoext].execute) == "function") {
						modules[echexecargs[0]].execute(from,to,bot,config,echexecargs);
					}
					continue;
				};
			};
			if (modulevalid == 0) {
				console.log("Invalid module.");
				bot.say(from , "'"+echexec.toLowerCase()+ "' is not a valid module. Use 'execute modules' for a list of modules.");
			};
		};
	}
	else {
		console.log(from + " => "+ to + ":" + text);
	};
}
function waitforVarTrue(variable, callback, arg1) {
	if(bot== false) {
			        setTimeout(waitforVarTrue(variable, callback), 50);
	        return;
	}
	else {
		callback(arg1)
	}
	
};
function waitforVarSet(variable, callback) {
	if(bot== ! NaN) {
			        setTimeout(waitforVarTrue(variable, callback), 50);
	        return;
	}
	else {
		callback()
	}
	
};
function start() {
	spawnBot();
	waitforVarSet(bot, loadModules);
	waitforVarTrue(modulesloaded, basicListeners, bot);
};
start()
