//Say function
//Usage: [nick] say [msg]

function start(from,to,bot,config,echexecargs) {
  console.log("Adding listener for say");
  bot.addListener("message", function(from, to, text, message) {
    if(text.toLowerCase().substring(0,config.nick.lenght() + 5) == config.nick.toLowerCase() + " say ")
    {
      
      
      bot.say(config.channel[0], text.toLowerCase().substring(config.nick.lenght() + 6));
    };
  });
}
function execute() {
  // Nothing
}
exports.start = start;
exports.execute = execute;
