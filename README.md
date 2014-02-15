Echelon
=======

Echelon is a IRC bot in Node.JS. It is Event-driven and expandable via Modules, also written in Node.JS.
They can permanently loaded and can add events.

If you want to develop a Module, just make a file with the ".js" extension and implement at least two Functions:

1. start()
  The "start" function should be your initialisation of things you need, because when the module is not used, it shouldn't
  do anything. The "start" function has no arguments and only gets called once.
  
2. execute(from,to,bot,config,echexecargs)
  The "execute" function is your main action. It has five arguments:
    1. from
      The one who issued the command.
      
    2. to
      The one who received the message. This should be the Bot's Name if the bot received a private message.
    3. bot
      This is the IRC Object. issue normal IRC commands.
    4. config
      The config has six Variables: channel(Array, one object.) , server (String) , port (Number) , nick (String) , 
      realName (String) and the botMaster (String, The Admin of that Bot.). Most of them are self-explanatory.
    5. echexecargs
      The array of Arguments when the Module is called: "Echelon execute: (module) (arg1) (arg2) (arg3) ..."
      The "Echelon execute: " part is not casesensitive, the arguments are.

Requirements:

Node.JS and the irc Module.
