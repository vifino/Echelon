function start(from,to,bot,config,echexecargs) {
  bot.addListener("message", function(from, to, text, message) {
    if (text.toLowerCase() == "hello " + config.nick.toLowerCase())
    {
      bot.say(config.channel[0], "Hello, "+from+ "." );
    };
  });
}
function execute() {
  // Nothing
}
exports.start = start;
