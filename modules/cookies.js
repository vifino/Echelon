//Cookie counter

var cookies = 0;

function start(from,to,bot,config,echexecargs) {
  console.log("I hope you have cookies enabled")
  bot.addListener("message", function(from, to, text, message) {
    bot.say(config.channel[0], "I hope you have cookies enabled");
    if (text.toLowerCase() == config.nick.toLowerCase()+ " +cookie")
    {
      cookies += 1;
    } elseif (text.toLowerCase() == config.nick.toLowerCase()+ " -cookie")
      cookies -= 1;
    {
    
    } elseif (text.toLowerCase() == config.nick.toLowerCase()+ " cookies")
    {
      if (cookies>0)
      {
        bot.say(config.channel[0], "I have "+cookies+" cookies!");
      } elseif (cookies<0)
      {
        bot.say(config.channel[0], "I'm in debt, I owe "+(-cookies)+" cookies...");
      } else {
        bot.say(config.channel[0], "I don't have any cookies.");
      }
    }
  });
}
function execute() {
  // Nothing
}
exports.start = start;
exports.execute = execute;
