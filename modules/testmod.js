// A basic TestModule
// Usage: Manual execution
// Displays debug info

function execute(from,to,msgto,bot,config,echexecargs) {
	// When the module is called with "(Nick) execute: (Module)", this gets executed.
	console.log("testmod called");
	console.log("from: "+ from);
	console.log("to: " + to);
	console.log("MSG: "+ msgto);
	bot.say(msgto, "Hi I'm the Test Module!" );
	bot.say(msgto, "Master[" + config.botMaster + "], from["+from+"], "+"to["+to+"], "+"msgto["+msgto+"]" );
}
exports.execute = execute;
