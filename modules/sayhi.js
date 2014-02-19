function start(from,to,bot,config,echexecargs) {
  console.log("Loading SayHi")
}
function execute() {
  bot.addListener("message", function(from, to, text, message) {
    if (text.toLowerCase() == "hello " + config.nick.toLowerCase())
    {
      console.log("Hello!")
      bot.say(config.channel[0], "Hello, "+from+ "." );
    };
  });
}
exports.start = start;
exports.execute = execute;
