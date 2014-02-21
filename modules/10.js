var questions;
var GameStarted=false;
var Player="";
var Min=0;
var Max=100;
var lastquestion=0;
var lastvalue=0;

var AlreadyAsked = new Array();

function start(from,to,bot,config,echexecargs) {
    // Do your setup here
    bot.addListener("message", function(from, to, text, message) {
        if (GameStarted && from==Player)
        {
            var Yes=(text.toLowerCase().indexOf("yes")>-1);
            var No=(text.toLowerCase().indexOf("no")>-1);
            if (Yes != No) //XOR
            {
                AlreadyAsked.push(lastvalue);
                if (lastquestion==0)
                {
                    if (Yes) Min=lastvalue;
                    if (No) Max=lastvalue;
                } else {
                    if (Yes)
                    {
                        bot.say(config.channel[0], "Yay, I win.");
                        GameStarted=false;
                        Player="";
                    }
                }
                AskQuestion(bot,config);
            }
            if (text.toLowerCase().indexOf("debug")>-1)
            { //Debug
                bot.say(config.channel[0], "Your number is between "+Min+" and "+Max+".");
            }
        }
    });
}

function AskQuestion(bot,config)
{
    if (questions<=0)
    {
        bot.say(config.channel[0],"Damn it, I lose!");
        GameStarted=false;
    } else {
        questions-=1;
        
        if (Math.abs(Max-Min)<5 || questions<2)
        { //Take a guess
            lastquestion=1;
            var foundnumber=false;
            for (var i=0;i<10;i++)
            {
                lastvalue = Math.floor((Math.random()*(Max-Min))+Min);
                if (AlreadyAsked.indexOf(lastvalue)!=-1)
                {
                    foundnumber=true;
                    break;
                }
            }
            
            if (foundnumber)
            {
                bot.say(config.channel[0],"Question "+questions+": Is your number "+lastvalue+"?");
            } else {
                bot.say(config.channel[0],"CHEATER!");
            }
        } else {
            lastquestion = Math.round(Math.random());
            if (lastquestion==0)
            {
                lastvalue = Math.floor((Math.random()*(Max-Min))+Min);
                bot.say(config.channel[0],"Question "+questions+": Is your number over "+lastvalue+"?");
            }
        }
    }
}

function execute(from,to,bot,config,echexecargs) {
    console.log("10.js started");
    questions=10;
    Min=0;
    Max=100;
    AlreadyAsked = [];
    bot.say(config.channel[0], from +", think of a number between 0 and 100. I will then try to guess it in "+questions+" questions.");
    GameStarted=true;
    Player=from;
    AskQuestion(bot,config);
}

exports.start = start;
exports.execute = execute;
