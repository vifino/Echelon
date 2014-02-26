var questions;
var GameStarted=false;
var Player="";
var Min=0;
var Max=100;
var msgto;
var lastquestion=0;
var lastvalue=0;

function start(bot,config) {
    // Do your setup here
    bot.addListener("message", function(from, to, text, message) {
        if (to != config.nick) msgto=to; else msgto=from;
        if (GameStarted && from==Player)
        {
            var Yes=(text.toLowerCase().indexOf("yes")>-1);
            var No=(text.toLowerCase().indexOf("no")>-1);
            if (Yes != No) //XOR
            {
                var IsLower = (lastvalue<Min+((Max-Min)/2));
                if (lastquestion==0)
                {
                    if (IsLower)
                    {
                        if (Yes) Max=lastvalue;
                        if (No) Min=lastvalue;
                    }
                } else if (lastquestion==1) {
                    if (IsLower)
                    {
                        if (Yes) Min=lastvalue;
                        if (No) Max=lastvalue;
                    }
                } else if (lastquestion==2) {
                    if (Yes)
                    {
                        bot.say(msgto , "Yay, I win.");
                        GameStarted=false;
                        Player="";
                    };
                };
                AskQuestion(bot, msgto);
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
    if (questions<=0) {
        bot.say(msgto,"Damn it, I lose!");
        GameStarted=false;
    } else {
        questions-=1;
        
        if (Math.abs(max-min)<5 || questions<2) { //Take a guess
            lastquestion=2;
            lastvalue = Math.floor((Math.random()*(Max-Min))+Min);
            bot.say(msgto,"Question "+questions+": Is your number "+lastvalue+"?");
        } else {
            lastquestion = Math.round(Math.random());
            if (lastquestion==0)
            {
                lastvalue = Math.floor((Math.random()*((Max*0.5)-Min))+Min);
                bot.say(msgto,"Question "+questions+": Is your number under "+lastvalue+"?");
            } else {
                lastvalue = Math.floor((Math.random()*(Max-(Min*0.5)))+(Min*0.5));
                bot.say(msgto, "Question "+questions+": Is your number over "+lastvalue+"?");
            }
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
