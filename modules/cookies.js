//Cookie counter

var cookies = 0;

function start(from,to,bot,config,echexecargs) {
  console.log("I hope you have cookies enabled");
  bot.say(config.channel[0], "I hope you have cookies enabled");
  bot.addListener("message", function(from, to, text, message) {
    if (text.toLowerCase().indexOf(config.nick.toLowerCase()+ " +") == 0)
    {
      var regEx = new RegExp(config.nick+" +", "ig");
      var add = parseFloat(text.replace(regEx, ""));
      if (add==NaN)
      {
        bot.say(config.channel[0], "Thats not a number...");
      } else {
        cookies += add;
      }
    }
    else if (text.toLowerCase().indexOf(config.nick.toLowerCase()+ " -") == 0)
    {
      var regEx = new RegExp(config.nick+" -", "ig");
      var add = parseFloat(text.replace(regEx, ""));
      if (add==NaN)
      {
        bot.say(config.channel[0], "Thats not a number...");
      } else {
        cookies -= add;
      }
    } 
    else if (text.toLowerCase() == config.nick.toLowerCase()+ " cookies")
    {
      if (cookies>0)
      {
        bot.say(config.channel[0], "I have "+cookies+" cookies!");
      } 
      else if (cookies<0)
      {
        bot.say(config.channel[0], "I'm in debt, I owe "+(-cookies)+" cookies...");
      } 
      else if (cookies==NaN) {
        bot.say(config.channel[0], "My cookies are broken, they are NaN.");
        console.log("Resetting cookie counter");
        cookies=0;
      } else {
        bot.say(config.channel[0], "I don't have any cookies.");
      }
    }
  });
}
function execute() {
  //Reset cookie counter
  cookies=0;
}
exports.start = start;
exports.execute = execute;
