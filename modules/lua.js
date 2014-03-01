var nodelua = require("nodelua");
function setupLua(bot, config) {
	var lua = new nodelua.LuaState("lua");
	lua.registerFunction('nativeP', function(to, str){
                bot.say(to, "> "  + str);
    });
    lua.registerFunction('sayIRC', function(user, message){
                client.say(user, message);
    });
}

function runLuaCMD(command) {
	lua.doStringSync(
        "debug.sethook(function() error(\"Quota exceeded\", 3) end, \"\", 500000) " +
        "print = function(str) return nativeP(\"" + to + "\", str) end "
    );
    var ret_value, error;
	try {
        ret_value = lua.doStringSync(strLua);
    } catch (err) {
        error = err;
        console.log("Error " + err);
    }
    if (ret_value) {
        client.say(to, "> " + ret_value[i]);
    } else if (error) {
        client.say(to, "> "  + error);
    }
}

function start(from,to,msgto,bot,config,echexecargs) {
	// Nothing
}

function autoload(bot,config) {
	console.log("lua.js started automatically");
	setupLua(bot, config);
	bot.addListener("message", function(from, to, text, message){
		if (text.startsWith("->")) {
			var luaStr = message.substring(2).trim();
			runLuaCMD(luaStr);
		};

	});
}

function execute() {
	// Nothing
}
exports.start = start;
exports.execute = execute;
exports.autoload = autoload;
