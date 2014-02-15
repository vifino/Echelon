function start() {
console.log("testmod started")
}
function execute(from,to,bot,config,echexecargs) {
bot.say(config.channel[0], "Hi I'm the Test Module! My Owner is " + config.botMaster + "." );
}
exports.start = start;
exports.execute = execute;
