var questions;
var GameStarted = false;
var Player = "";
var Min = 0;
var Max = 100;
var lastquestion = 0;
var lastvalue = 0;
var Timeout;
var Last=0;

function start(from, to, msgto, bot, config, echexecargs) {
    // Do your setup here
    bot.addListener("message", function (from, to, text, message) {
        var msgto;
        if (to != config.nick) msgto = to;
        else msgto = from;
        if (GameStarted && from == Player) {
            var Yes = (text.toLowerCase().indexOf("yes") > -1);
            var No = (text.toLowerCase().indexOf("no") > -1);
            if (Yes != No) //XOR
            {
                if (lastquestion == 1) {
                    if (Yes) Min = lastvalue;
                    if (No) Max = lastvalue+1;
                } else if (lastquestion == 2) {
                    if (Yes) {
                        bot.say(msgto, "Yay, I win.");
                        GameStarted = false;
                        Player = "";
                    };
                };
                if (Min > Max || Last>100 || Last<0) {
                    bot.say(msgto, "You're cheating");
                    GameStarted = false;
                    Player = "";
                }
                if (GameStarted) {
                    AskQuestion(bot, msgto);
                }
            };
        };
    });
};

function AskQuestion(bot, msgto) {
    if (questions <= 1) {
        bot.say(msgto, "Damn it, I lose!");
        GameStarted = false;
    } else {
        questions -= 1;

        if (Math.abs(Max - Min) < questions*2 || questions < 2) { //Take a guess
            lastquestion = 2;
            if (Min>Last) Last = Min;
            lastvalue = Last;
            bot.say(msgto, "Question " + questions + ": Is your number " + lastvalue + "?");
            Last+=1;
        } else {
            lastquestion = 1;
            lastvalue = Math.floor((Math.random() * (Max - Min)) + Min);
            bot.say(msgto, "Question " + questions + ": Is your number over " + lastvalue + "?");
        }
    }
}

function execute(from, to, msgto, bot, config, echexecargs) {
    console.log("10.js started by " + from);
    var date = new Date();
    if (!GameStarted || date > Timeout) {
        questions = 10;
        Min = 0;
        Max = 100;
        Last = Min;
        bot.say(msgto, from + ", think of a number between 0 and 100. I will then try to guess it in " + questions + " questions.");
        GameStarted = true;
        var Timeout = new Date(date.getTime() + (60 * 60000));
        Player = from;
        AskQuestion(bot, msgto);
    } else {
        bot.say(msgto, "I am currently in a game with " + Player + ". The game will expire in 1 minute.")
    }
};

exports.start = start;
exports.execute = execute;
