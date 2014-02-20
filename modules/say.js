//Say function
//Usage: [nick] say [msg]

function initSay(bot, config)
{
    console.log("Adding listener for say");
  bot.addListener("message", function(from, to, text, message) {
    if(text.toLowerCase().indexOf(config.nick.toLowerCase()+" say ") == 0)
    {
      var regEx = new RegExp(config.nick+" say ", "ig");
      bot.say(config.channel[0], text.replace(regEx, ""));
    };
  });
}

function start(from,to,bot,config,echexecargs) {
  console.log("say.js started manually")
  initSay(bot, config);
}

function autorun(bot,config) {
  console.log("say.js started automatically")
  initSay(bot, config);
}

function execute() {
  // Nothing
}
exports.start = start;
exports.execute = execute;
exports.autoload = autorun;
