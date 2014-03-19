// Made by vifino
// Don't change anything here!

// Declaring some Vars...
var irc = require("irc");
var fs = require("fs");
var _ = require("underscore");
var path = require("path");
var config = require(path.resolve(__dirname, "config.js"));
var moduledir = path.resolve(__dirname, "modules/")
var moduleBlacklist;
var moduleBlacklistPath = path.resolve(__dirname, "moduleBlacklist.txt");
var moduleOrder;
var moduleOrderPath = path.resolve(__dirname, "moduleOrder.txt");
var modules = [];
var modulestotal = 0;
var moduleNamesOrdered = [];
var currentfile;
var currentmodule;
var modulesloaded = false;
var currentfilewoext;
var currentmoduleauto;
var files;
var bot;
var msgto;
var moduleBlacklistCount = 0;
function spawnBot() {
	bot = new irc.Client(config.server, config.nick, {
		channels: config.channel,
		port: config.port,
		realName: config.realName,
		userName: config.nick,
		floodProtection: true,
	 	floodProtectionDelay: 500,
	});
	if (!config.pass == "") {
		bot.say("nickserv", "identify " + config.pass);
	};
};
var modulestarted = [];
	// Some First-Run Configuration
	if (!fs.existsSync(moduledir)) {
		fs.mkdirSync(moduledir);
	if (!fs.existsSync(moduleBlacklistPath)) {
		fs.writeFileSync(moduleBlacklistPath, "")
	}
}
// Load Additional Modules.
function loadModules() {
	console.log("Searching and loading Modules.");
	files = [];
	files = fs.readdirSync(moduledir);
	modules = [];
	modulenames = [];
	currentmodule;
	currentmoduleauto;
	modulesloaded = false;
	currentfilewoext;
	currentfile;
	var doneSorting = false;
	if (!fs.existsSync(moduleOrderPath)) {
		var orderString = "";
		for (var i in files) {
			orderString = orderString + files[i] + "\n";
		}
		fs.writeFileSync(moduleOrderPath, orderString)
	}
	moduleBlacklist = fs.readFileSync(moduleBlacklistPath).toString().split("\n");
	moduleOrder = fs.readFileSync(moduleOrderPath).toString().split("\n");
	for (var filecount in files) {
		for (var i in moduleOrder) {
			if (moduleOrder[i] == files[filecount]) {
				moduleNamesOrdered.push(files[filecount])
			}
		}
	}
	for (var i in moduleNamesOrdered){
		modulestotal = modulestotal + 1;
		currentfile = moduleNamesOrdered[i];
		currentfilewoext = currentfile.slice(0,-3);
		var moduleBlacklistCurrent;
		if (!files.hasOwnProperty(filecount)) continue;
		for (var itemBlacklist in moduleBlacklist) {
			if (moduleBlacklist[itemBlacklist] == currentfile) {
				moduleBlacklistCurrent == true;					moduleBlacklistCount == moduleBlacklistCount + 1;
			}
		}
		if (!moduleBlacklistCurrent) {
			modules[currentfilewoext] = require(path.resolve(moduledir,moduleNamesOrdered[i]));
			modulenames.push(currentfilewoext);
			currentmodule = modules[currentfilewoext];
			currentmoduleauto = currentmodule["autoload"];
			console.log("Loaded ", currentfilewoext);
			if ( _.isFunction(currentmoduleauto) ) {  //_.isFunction(modules[currentfilewoext].autoload)
				currentmoduleauto(bot, config);
				console.log("Autorun executed in Module " + currentfilewoext);
				modulestarted[currentfilewoext] = true;
			}
			else {
				console.log("Did not autorun Module "+currentfilewoext+". (It is not type 'function')");
				modulestarted[currentfilewoext] = false;
			};
		}
		
	};	
	modulesloaded = true;
	console.log("Finished Loading Modules.");
	console.log("Loaded " + modulestotal + " Modules.");
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
	var msgto;
	if (to != config.nick) msgto=to; else msgto=from;
	if (text.toLowerCase() == config.nick.toLowerCase() + " time")
	{
		console.log("User " + from + " Requested Time.");
		var date = new Date();
		var current_hour = date.getHours();
		var current_min = date.getMinutes();
		var current_sec = date.getSeconds();
		
		bot.say(msgto ,"Current Time: " + current_hour + ":" + current_min + ":" + current_sec);
	}
	else if (text.toLowerCase() == config.nick.toLowerCase() + " logout")
	{
		console.log(from +" requested logout.")
		if (from == config.botMaster) {
			console.log("Request granted.");
			bot.say(msgto , "Request granted.");
			bot.disconnect("Disconnecting on Admin request.");
		}
		else
		{
			console.log("Request denied.");
			bot.say(msgto , "Request denied.");
		};
	}
	else if (text.toLowerCase() == config.nick.toLowerCase() + " restart")
	{
		console.log(from +" requested restart..");
		if (from == config.botMaster) {
			console.log("Request granted.");
			bot.say(msgto , "Request granted.");
			bot.disconnect("Restarting on Admin request.");
			start()
		}
		else
		{
			console.log("Request denied.");
			bot.say(msgto , "Request denied.");
		};
	}
	else if (text.substring(0,8 + config.nick.length).toLowerCase() == config.nick.toLowerCase() + " execute")
	{
		var echexec = text.substring(9 + config.nick.length); //.toLowerCase();
		var echexecargs = echexec.split(" ");
		console.log(from +" tried to execute " + echexec.toLowerCase());
		if (text.length==(8 + config.nick.length) || echexecargs[0] == "modules") {
			bot.say(msgto , "Modules ("+modulenames.length+"): " +modulenames.toString());
		}
		else {
			var modulevalid = 0;
			for(var modulecount2 in modulenames){
				if (modulenames[modulecount2] == echexecargs[0]) {
					modulevalid = 1;
					if (!modulestarted[echexecargs[0]]) {
						msgto = to;
						modules[echexecargs[0]].start(from,to,msgto,bot,config,echexecargs);
						modulestarted[echexecargs[0]] = true;
					}
					// console.log(typeof(modules[currentfilewoext].execute));
					if (typeof(modules[currentfilewoext].execute) == "function") {
						modules[echexecargs[0]].execute(from,to,msgto,bot,config,echexecargs);
					}
					continue;
				};
			};
			if (modulevalid == 0) {
				console.log("Invalid module.");
				bot.say(msgto , "'"+echexec.toLowerCase()+ "' is not a valid module. Use 'execute modules' for a list of modules.");
			};
		};
	}
	else {
		console.log(from + " => "+ to + ":" + text);
	};
};
function waitforVarTrue(variable, callback, arg1) {
	if(bot == false) {
		setTimeout(waitforVarTrue(variable, callback), 50);
		return;
	}
	else {
		callback(arg1)
	}
	
};
function waitforVarSet(variable, callback) {
	if(!isNaN(bot)) {
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