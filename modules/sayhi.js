function start() {
  console.log("Adding 'Hello' Listeners")
  bot.addListener("message", function(from, to, text, message) {
    if (text.toLowerCase() == "hello " + config.nick.toLowerCase())
    {
      console.log("Saying hello to user")
      bot.say(config.channel[0], "Hello, "+from+ "." );
    };
  });
}
exports.start = start;
