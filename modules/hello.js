//hello command
//Usage: Hello [nick]
//Hello!

function helloInit(bot, config) {
    console.log("Adding listener for SayHi")
  bot.addListener("message", function(from, to, text, message) {
    if (text.toLowerCase().replace(",","".replace(".","").replace("!","")) == "hello " + config.nick.toLowerCase())
    {
      console.log("Hello!")
      bot.say(config.channel[0], "Hello, "+from+ "." );
    };
  });
}

function start(from,to,bot,config,echexecargs) {
  helloInit(bot, config);
}

function autorun(bot, config) {
  helloInit(bot, config);
}

function execute() {
  // Nothing
}
exports.start = start;
exports.execute = execute;
