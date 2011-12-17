var events = require("events"); var net = require("net");
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

      UNSEEK: function(message) {
        game.events.emit("unseek", { data: message });
      },

      SEEK: function(message) {
        game.events.emit("seek", { data: message });
      },

      WHO: function(message) {
        game.events.emit("who", { data: message });
      },

      MOVE: function(message) {
        game.socket.emit("move", { data: message });
      },

      ASITIS: function(message) {
        game.socket.emit("asitis", { data: message });
      },

      MATCH: function(message) {
        game.socket.emit("match", { data: message });
      }

    }
  };

  // Incoming data, part out and funnel to the API
  game.socket.on("data", function(data) {
    var parts, command, message;

    data = data.toString();

    if (data) { 
      parts = data.split(" ");
      command = parts.unshift();
      message = parts.join(" ");
    }

    if (command in game.api) {
      game.api[command](message);
    }
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
