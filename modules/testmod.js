function start(from,to,bot,config,echexecargs) {
// Do your setup here
}
function execute() {
  // When the module is called with "(Nick) execute: (Module)", this gets executed.
  console.log("testmod called");
  bot.say(config.channel[0], "Hi I'm the Test Module! My Owner is " + config.botMaster + "." );
}
exports.start = start;
exports.execute = execute;
