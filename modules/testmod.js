function start() {
// Do your setup here
}
function execute(from,to,msgto,bot,config,echexecargs) {
  // When the module is called with "(Nick) execute: (Module)", this gets executed.
	console.log("testmod called");
	console.log("from: "+ from);
	console.log("to: " + to);
	bot.say(to, "Hi I'm the Test Module! My Owner is " + config.botMaster + "." );
}
exports.start = start;
exports.execute = execute;
