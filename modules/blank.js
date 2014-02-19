//blank function
//Usage: [nick]
//Will say something random to user if a blank message was said. Usually to confirm the bot is active.
//EG: "Echelon" - "You said my name"

var Replylist = [
  "Yes?",
  "Hello!",
  "You want something?",
  "Sup",
  "Thats my name",
  "What do you need?"
];

function start(from,to,bot,config,echexecargs) {
  console.log("Adding listener for blank.js");
  bot.addListener("message", function(from, to, text, message) {
    if (text.toLowerCase() == config.nick.toLowerCase())
     {
       var randomNumber = Math.floor(Math.random()*textArray.length);
       bot.say(config.channel[0], Replylist[randomNumber]);
     }
  });
}
function execute() {
  // Nothing
}
exports.start = start;
exports.execute = execute;
