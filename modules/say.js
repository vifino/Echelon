//Say function
//Usage: [nick] say [msg]

function start(from,to,bot,config,echexecargs) {
  console.log("Adding listener for say")
  bot.addListener("message", function(from, to, text, message) {
    if(text.toLowerCase().indexOf(config.nick.toLowerCase()+" say ") == 0)
    {
      bot.say(config.channel[0], text.replace(config.nick.toLowerCase()+" say ",""));
    };
  });
}
function execute() {
  // Nothing
}
exports.start = start;
exports.execute = execute;
