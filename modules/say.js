//Say function
//Usage: [nick] say [msg]

function start(from,to,bot,config,echexecargs) {
  console.log("Adding listener for say");
  bot.addListener("message", function(from, to, text, message) {
    var nick = config.nick;
    if(text.toLowerCase().indexOf(config.nick.toLowerCase()+" say ") == 0)
      {
        var regEx = new RegExp(config.nick+" say ", "ig");
        var result = text.replace(regEx, "");
       
        bot.say(config.channel[0], text.replace(regEx, ""));
    };
  });
}
function execute() {
  // Nothing
}
exports.start = start;
exports.execute = execute;
