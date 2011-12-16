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
    log: [],

    write: function(msg) {
      game.socket.write("\000" + msg, "utf8");
    }
  };

  // Incoming data
  game.socket.on("data", function(data) {
    data = data.toString() || "";

    game.log.push(data.toString());

    // Invalid
    if (data.indexOf("CLOSE Invalid password") > -1) {
      game.events.emit("login", null);

    // Success
    } else if (data.indexOf("LOGIN Welcome to the Internet Scrabble Club") > -1) {
      game.events.emit("login", "success");

    // SEEK
    } else if (data.indexOf("UNSEEK") > -1) {
      game.socket.emit("UNSEEK", data.toString(), game.log);

    // UNSEEK
    } else if (data.indexOf("SEEK") > -1) {
      game.socket.emit("SEEK", data.toString(), game.log);
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
    // Example:
    // SET FORMULA 123 456 1 0 0 4
    game.write("SET FORMULA " + data.low + " " + data.high + " 1 0 0 4");
  });

  socket.on("match", function(data) {
    game.write("MATCH " + data.username);
  });
});
