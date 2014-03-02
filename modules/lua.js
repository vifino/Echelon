// Lua Module
// It requires nodelua to be installed, or it will fail.

var lua;
var printAllowed = true;
var nodelua;
var botconf;
var ret_value, error;
var err_length;
function setupLua(bot, config) {
	nodelua = require("nodelua");
	lua = new nodelua.LuaState("lua");
	lua.registerFunction("nativeP", function(to, str){
				if (printAllowed) {
                	bot.say(to, "> "  + str);
				}
				else {
					printAllowed = true;
				}
    });
    lua.registerFunction("sayIRC", function(user, message){
                bot.say(user, message);
    });
	lua.registerFunction("actionIRC", function(channel, message) {
				bot.action(channel, message);
	});
	lua.registerFunction("joinIRC", function(channel) {
				bot.join(channel);
	});
	lua.registerFunction("partIRC", function(channel) {
				bot.part(channel);
	});
	lua.registerFunction("resetLua", function() {
				printAllowed = false;
				setupLua(bot, config);
	});
	lua.registerFunction("nope", function(to) {
				bot.say(to, "Nope!")
	});
}

function runLuaCMD(to, bot, command) {
	try	{
		lua.doStringSync(
	        
	       "debug.sethook(function() error(\"Quota exceeded\", 3) end, \"\", 500000) " +
      	   "print = function(str) return nativeP(\"" + to + "\", str) end " +
			"os.exit = function() return nope(\"" + to + "\") end " +
			"os.execute = function() return nope(\"" + to + "\") end " +
			"os.remove = function() return nope(\"" + to + "\") end " +
			"os.rename = function() return nope(\"" + to + "\") end " +
			"io = nil; require = nil; module = nil; dofile = nil; loadfile = nil;"
	    );
	} catch (err) {
		// bot.say(to, "Lua Crashed, making State Reset...");
		setupLua(bot, botconf);
	}
	ret_value;
    var ret_value, error;
	try {
        ret_value = lua.doStringSync(command);
    } catch (err) {
		error = err;
        console.log("Error " + error);
    }
    if (ret_value) {
		for (i in ret_value) {
		   bot.say(to, "> " + ret_value[i]);
		}
    } else if (error) {
        bot.say(to, "> "  + error);

    }
}

function start(from,to,msgto,bot,config,echexecargs) {
	// Nothing
}

function autoload(bot,config) {
	console.log("lua.js started automatically");
	setupLua(bot, config);
	botconf = config;
	bot.addListener("message", function(from, to, text, message){
		if (text.startsWith("->")) {
			var msgto;
			if (to != config.nick) msgto=to; else msgto=from;
			var luaStr = text.substring(2).trim();
			runLuaCMD(msgto, bot, luaStr);
		};

	});
}

String.prototype.startsWith = function(prefix) { // Thanks again Sorroko!
        return this.indexOf(prefix) === 0;
}

function execute() {
	// Nothing
}
exports.start = start;
exports.execute = execute;
exports.autoload = autoload;
