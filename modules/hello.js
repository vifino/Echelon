//hello command
//Usage: Hello [nick]
//Hello!

function helloInit(bot, config) {
  console.log("Adding listener for hello.js");
  bot.addListener("message", function(from, to, text, message) {
    if (text.toLowerCase().replace(",","".replace(".","").replace("!","")) == "hello " + config.nick.toLowerCase())
    {
      console.log("Hello!")
      bot.say(config.channel[0], "Hello, "+from+ "." );
    };
  });
}

function start(from,to,bot,config,echexecargs) {
  console.log("Hello started manually");
  helloInit(bot, config);
}

function autorun(bot, config) {
  console.log("Hello started automatically");
  helloInit(bot, config);
}

function execute() {
  // Nothing
}
exports.start = start;
exports.execute = execute;
exports.autorun = autorun;
