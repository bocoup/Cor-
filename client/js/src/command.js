define([
  "socket",
  "jquery",
  "underscore"
], function( socket, $, _ ) {

  function notYetImplemented( parms, dfd, cmd ) {
    dfd.reject("Command '"+cmd+"' is not yet implemented.");
  };

  var commands = {
    "abort": notYetImplemented,
    "accept": notYetImplemented,
    "adjourn": notYetImplemented,
    "adjourned": notYetImplemented,
    "allobservers": notYetImplemented,
    "ask": notYetImplemented,
    "assess": notYetImplemented,
    "broadcast": notYetImplemented,
    "best": notYetImplemented,
    "buddies": function( parms, dfd) {
      socket.emit("buddies:list", _.bind(function(data) {
        // Assuming failure because taht's all the server is sending back right now
        dfd.resolve( data.message );
      },this));
    }, 
    "chat": notYetImplemented,
    "challenge": notYetImplemented,
    "change": notYetImplemented,
    "channel": notYetImplemented,
    "check": notYetImplemented,
    "clear": notYetImplemented,
    "connect": notYetImplemented,
    "date": notYetImplemented,
    "decline": notYetImplemented,
    "definition": notYetImplemented,
    "delete": notYetImplemented,
    "disconnect": notYetImplemented,
    "examine": notYetImplemented,
    "finger": function( username, dfd ) {
      if ( !username.length ) {
        dfd.reject("You must specify a user");
      } else {
        socket.emit("player:finger", {username: username},  _.bind(function(data) {
          // Assuming failure because taht's all the server is sending back right now
          dfd.resolve( data.message );
        },this));
      }
    },
    "games": notYetImplemented,
    "help": notYetImplemented,
    "history": notYetImplemented,
    "import": notYetImplemented,
    "kibitz": notYetImplemented,
    "lagstats": notYetImplemented,
    "list": notYetImplemented,
    "library": notYetImplemented,
    "match": notYetImplemented,
    "message": notYetImplemented,
    "move": notYetImplemented,
    "noplay": notYetImplemented,
    "notify": notYetImplemented,
    "observe": notYetImplemented,
    "pass": notYetImplemented,
    "pending": notYetImplemented,
    "personal": notYetImplemented,
    "ping": notYetImplemented,
    "play": notYetImplemented,
    "pool": notYetImplemented,
    "rematch": notYetImplemented,
    "report": notYetImplemented,
    "resign": notYetImplemented,
    "resume": notYetImplemented,
    "say": notYetImplemented,
    "seek": notYetImplemented,
    "set": notYetImplemented,
    "sfilter": notYetImplemented,
    "shout": notYetImplemented,
    "shuffle": notYetImplemented,
    "sought": notYetImplemented,
    "tell": function( parms, dfd ) {
      var raw = parms.split(" ");
      if ( raw.length < 2 ) {
        dfd.reject("You must specify a message");
      } else {
        var data = {
          username: raw.shift(),
          message: raw.join(" ")
        };
        socket.emit("chat:tell", data, _.bind(function(data) {
          // Assuming failure because taht's all the server is sending back right now
          dfd.reject( data.message );
        },this));
      }
    },
    "unexamine": notYetImplemented,
    "unmatch": notYetImplemented,
    "unobserve": notYetImplemented,
    "unseek": notYetImplemented,
    "uptime": notYetImplemented,
    "vars": notYetImplemented,
    "whisper": notYetImplemented,
    "who": notYetImplemented
  },

  commandNames = _.keys( commands );

  function fuzzyMatch( str ) {
    var test = new RegExp("^"+str);
    return _.filter( commandNames, function(cmd, index) {
      return cmd.match( test );
    });
  }

  function Command(string) {
    var dfd = $.Deferred(),
    arr = string.split(" "),
    cmd = arr.shift().toLowerCase(),
    parms = arr.join(" ");
    console.group("Command issued")
    console.log("Command:", cmd );
    console.log("Parms:", parms );
    if ( commands[cmd] ) {
      commands[cmd]( parms, dfd, cmd );
    } else {
      var fuzzy = fuzzyMatch( cmd );
      if (fuzzy.length == 1) {
        commands[ fuzzy[0] ]( parms, dfd, fuzzy[0] )
      } else if (fuzzy.length >= 2) {
        dfd.reject("Ambiguous command! Matched: " + fuzzy.join(", ").toUpperCase() );
      } else {
        dfd.reject("No such command '"+cmd+"'");
      }
    }
    console.groupEnd();
    return dfd.promise();
  }

  return Command;

});
