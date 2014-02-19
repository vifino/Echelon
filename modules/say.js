//Say function
//Usage: [nick] say [msg]

function start(from,to,bot,config,echexecargs) {
  console.log("Adding listener for say");
  bot.addListener("message", function(from, to, text, message) {
    var nick = config.nick;
    if(text.toLowerCase().substring(0, nick.lenght + 5) == config.nick.toLowerCase() + " say ")
    {
      bot.say(config.channel[0], text.substring(nick.lenght + 6));
    };
  });
}
function execute() {
  // Nothing
}
exports.start = start;
exports.execute = execute;
