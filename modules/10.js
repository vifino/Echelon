var questions;
var GameStarted=false;
var Player="";
var Min=0;
var Max=100;
var lastquestion=0;
var lastvalue=0;

function start(from, to,msgto , bot, config, echexecargs) {
    // Do your setup here
    bot.addListener("message", function(from, to, text, message) {
        var msgto;
        if (to != config.nick) msgto=to; else msgto=from;
        if (GameStarted && from==Player)
        {
            var Yes=(text.toLowerCase().indexOf("yes")>-1);
            var No=(text.toLowerCase().indexOf("no")>-1);
            if (Yes != No) //XOR
            {
                if (lastquestion==1) {
                    if (Yes) Min=lastvalue;
                    if (No) Max=lastvalue;
                } else if (lastquestion==2) {
                    if (Yes)
                    {
                        bot.say(msgto , "Yay, I win.");
                        GameStarted=false;
                        Player="";
                    };
                };
                if (Min==Max)
                {
                    bot.say(msgto, "You're cheating");
                    GameStarted=false;
                    Player="";
                }
                if (GameStarted)
                {
                    AskQuestion(bot, msgto);
                }
            };
            if (text.toLowerCase().indexOf("debug")>-1)
            { //Debug
                bot.say(msgto, "Your number is between "+Min+" and "+Max+".");
            };
        };
    });
};

function AskQuestion(bot, msgto)
{
    if (questions<=1) {
        bot.say(msgto,"Damn it, I lose!");
        GameStarted=false;
    } else {
        questions-=1;
        
        if (Math.abs(Max-Min)<5 || questions<2) { //Take a guess
            lastquestion=2;
            lastvalue = Math.floor((Math.random()*(Max-Min))+Min);
            bot.say(msgto,"Question "+questions+": Is your number "+lastvalue+"?");
        } else {
            lastquestion=1;
            lastvalue = Math.floor((Math.random()*(Max-Min))+Min);
            bot.say(msgto,"Question "+questions+": Is your number over "+lastvalue+"?");
        }
    }
}

function execute(from,to,msgto,bot,config,echexecargs) {
    console.log("10.js started by "+from);
    questions=10;
    Min=0;
    Max=100;
    bot.say(msgto, from +", think of a number between 0 and 100. I will then try to guess it in "+questions+" questions.");
    GameStarted=true;
    Player=from;
    AskQuestion(bot, msgto);
};

exports.start = start;
exports.execute = execute;
