function start() {
// Do your setup here:
console.log("testmod started")
}
function execute(from,to,bot,config,echexecargs) {
// When the module is called with "(Nick) execute: (Module)", this gets executed.
bot.say(config.channel[0], "Hi I'm the Test Module! My Owner is " + config.botMaster + "." );
}
exports.start = start;
exports.execute = execute;
