//Calculator
//Usage: [nick] * [number] [operator] [number]
//Crunches numbers into a calculator
//Example: "Echelon, what is 5 * 2?" - " 10! "
var msgto;
function init(bot, config) {
  bot.addListener("message", function(from, to, text, message) {
	if (!(to == config.nick)) {
		//Not PM
		msgto=from;
	}
	else {
		msgto=to;
	};
    var NickIndex = text.toLowerCase().indexOf(config.nick.toLowerCase());
    if (NickIndex==0)
    {
      var input=text.toLowerCase().replace(config.nick.toLowerCase(),"").replace(",","").replace(":","").replace("!","").replace("?","");
      bot.say(msgto, expression(input));
    };
  });
}

function expression (str) {

    var chars = expr.split("");
    var n = [], op = [], index = 0, oplast = true;

    n[index] = "";

    // Parse the expression
    for (var c = 0; c < chars.length; c++) {

        if (isNaN(parseInt(chars[c])) && chars[c] !== "." && !oplast) {
            op[index] = chars[c];
            index++;
            n[index] = "";
            oplast = true;
        } else {
            n[index] += chars[c];
            oplast = false;
        }
    }

    // Calculate the expression
    expr = parseFloat(n[0]);
    for (var o = 0; o < op.length; o++) {
        var num = parseFloat(n[o + 1]);
        switch (op[o]) {
            case "+":
                expr = expr + num;
                break;
            case "-":
                expr = expr - num;
                break;
            case "*":
                expr = expr * num;
                break;
            case "/":
                expr = expr / num;
                break;
        }
    }

    return expr;
}

function start(from,to,msgto,bot,config,echexecargs) {
  console.log("Calculator started manually");
  init(bot, config);
}

function autorun(bot, config) {
  //console.log("Calculator started automatically");
  //init(bot, config);
}

function execute() {
  // Nothing
}
exports.start = start;
exports.execute = execute;
exports.autoload = autorun;
