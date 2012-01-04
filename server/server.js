var events = require("events");
var net = require("net");
var _ = require( "underscore" );
_.str = require('underscore.string')

_.inGroupsOf = function( array, chunk ) {
  return _.toArray(_.groupBy(array, function(item, index) {
    return Math.floor( index /chunk );
  }));
};


// Include and bind the Socket.io server to port 1337
var io = require("socket.io").listen(1337);

io.set("log level", 0);

// When a socket connects, establish API
io.sockets.on("connection", function(socket) {
  // Create a new game socket to handle this request
  // and events handler
  var game = {
    socket: new net.Socket({ type: "tcp4" }),
    events: new events.EventEmitter(),

    write: function(msg) {
      game.socket.write("\000" + msg, "utf8");
    },
    
    // Custom API overrides
    // Rewrite to use write
    api: {

      CLOSE: function(message) {
        game.events.emit("close", { success: false, data: message });
      },

      LOGIN: function(message) {
        game.events.emit("login", { success: true, data: message });
      },

      BUDDIES: function(message) {
        // ISC UNSEEK - list given upon initial connection
        // BUDDIES ajpiano timbocoup ersherr fulofself /
        // UNSEEK Usernames Space Separated TrailingSlash
        var buddies = message.split(" ");
        buddies.pop();
        socket.emit("buddies", buddies);
      },
      UNSEEK: function(message) {
        // ISC UNSEEK
        // UNSEEK fooman 
        // UNSEEK Username
        var raw = message.split(" "),
        unseek = {
          id: raw[0],
          username: raw[0]
        };
        socket.emit("unseek", unseek);
      },

      SEEK: function(message) {
        // ISC Seek looks like
        // SEEK 868    fooman   0           30        0         1     1 0             0 
        // SEEK Rating Username DictionaryID Duration Increment Rated ? ChallengeType BeginningOfAsitis
        var seek = {},
        raw = message.split(" ");
        
        seek.rating = raw[0];
        seek.username = raw[1];
        seek.dictionary = raw[2];
        seek.duration = raw[3];
        seek.increment = raw[4];
        seek.rated = raw[5];
        // don't know what 6 is yet
        seek.challenge = raw[7];
        seek.id = seek.username;
        console.log("emitting SEEK", seek)

        socket.emit("seek", seek);
      },

      WHO: function(message) {
        game.events.emit("who", { data: message });
      },

      MOVE: function(message) {
        game.socket.emit("move", { data: message });
      },

      ASITIS: function(message) {
        socket.emit("asitis", { data: message });
      },

      MATCH: function(message) {
        game.socket.emit("match", { data: message });
      }

    }
  };

  var filter_regex = /(0 [A-Z\s]{3,})/g;
  // Incoming data, part out and funnel to the API
  // Messages can contain more than one command (especialyl after login)
  // We have to parse out each individual command and pass it to the api if applicable
  game.socket.on("data", function(data) {
    var data = _.str.trim(data.toString());

    matchedCommands = data.match(filter_regex),

    commands = [];

    console.log("---Received Socket Data---")
    console.log("Raw-est socket data:\n", data);

    matchedCommands.forEach(function(cmd, i){
      var c = "",
      mydex = data.indexOf( cmd ),
      nextdex = data.indexOf( matchedCommands[i+1] );
      if (!matchedCommands[i+1]) {
        c = data.slice(mydex);
      } else {
        c = data.substring(mydex, nextdex);
      }
      commands.push(c.replace(/^0\s/,""));
    });

    commands.forEach(function(command, i) {
      var cmd, msg, arr = command.split(" ");
      cmd = arr.shift();
      if( arr[0] && arr[0].match(/[A-Z]{3,}/)) {
        cmd += " " + arr.shift();
      }
      msg = arr.join(" ");
      console.log("Raw command: ", command)
      console.log("CMD: ", cmd);
      console.log("MSG: ", msg);
      console.log("-----------")
      if (cmd in game.api) {
        game.api[cmd](msg);
      }
    });
  });

  // LOGIN
  socket.on("user:login", function(data, done) {
    var username = data.username;
    var password = data.password;

    game.socket.connect(1322, "66.98.172.34", function() {
      game.write("00 LOGIN " + data.username + " " + data.password
        + " 1821 1 133380 " + data.username);
    });

    game.events.on("login", function(status) {
      socket.emit("asitis", status);
      done(status, game.log);
    });
  });

  socket.on("formula:set", function(data) {
    // // min, max, established, contributory, fairplay, unfinished
    game.write("SET FORMULA " + data.min + " " + data.max + " "
      + data.established + " " + data.contributory + " " + data.fairplay
      + " " + data.unfinished);
  });

  socket.on("match", function(data) {
    game.write("MATCH " + data.username);
  });
});
