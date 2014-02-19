//hello command
//Usage: Hello [nick]
//Hello!

function start(from,to,bot,config,echexecargs) {
  console.log("Adding listener for SayHi")
  bot.addListener("message", function(from, to, text, message) {
    if (text.toLowerCase() == "hello " + config.nick.toLowerCase())
    {
      console.log("Hello!")
      bot.say(config.channel[0], "Hello, "+from+ "." );
    };
  });
}
function execute() {
  // Nothing
}
exports.start = start;
exports.execute = execute;
