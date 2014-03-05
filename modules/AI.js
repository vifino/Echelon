// Experimental AI

var fs = require("fs");
var path = require('path').dirname(require.main.filename);
var luaEnabled;

function AIInit(bot, config) {
	if (fs.exists(path + "/modules/lua.js")) {
		lua = require(path + "/modules/lua.js")
		lua.setupLua(bot, config, "ai.js");
		luaEnabled = true;
	}
	else {
		luaEnabled = false;
	};
	console.log("Adding listener for hello.js");
	bot.addListener("message", function(from, to, text, message) {
		var msgto;
		if (to != config.nick) msgto=to; else msgto=from;
		AICall(msgto, text)
	});
}

function start(from,to,msgto,bot,config,echexecargs) {
	console.log("AI started manually");
	AIInit(bot, config);
}

function autoload(bot, config) {
	console.log("AI started automatically");
	AIInit(bot, config);
}

function execute() {
	// Nothing
}
function AICall(msgto, text) {

}

function readAnswers(filename){
	var file = fs.readFileSync(path + "/AIAnswers/" + filename);
	var fileContent = file.split("\n");
	var answerNumber = Math.floor(Math.random()*(fileContent.length-1)
	for (var i in fileContent) {
		if (fileContent[i].IndexOf("$") == 0) {
			readAnswers(path + "/AIAnswers/" + fileContent[i].substring(1), Math.floor(Math.random()*(fileContent.length-1))
		}
		else if (fileContent[i].IndexOf(">") == 0 && luaEnabled) {
			return lua.runLuaCMD("ai.js", fileContent[i].substring(1))
		}
		else if (i == answerNumber) {
			return fileContent[i].substring(1);
		}
	};
}

exports.start = start;
exports.execute = execute;
exports.autoload = autoload;
