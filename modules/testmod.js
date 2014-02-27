// A basic TestModule
var msgto;
function start() {
// Do your setup here
}
function execute(from,to,msgto,bot,config,echexecargs) {
  // When the module is called with "(Nick) execute: (Module)", this gets executed.
	console.log("testmod called");
	console.log("from: "+ from);
	console.log("to: " + to);
	console.log("MSG: "+ msgto);
	bot.say(msgto, "Hi I'm the Test Module! Extra info here" );
	bot.say(msgto, "Master[" + config.botMaster + "], from["+from+"], "+"to["+to+"], "+"msgto["+msgto+"]" );
}
exports.start = start;
exports.execute = execute;
