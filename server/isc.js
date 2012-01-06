var net = require("net");
var Emitter = require("eventemitter2").EventEmitter2
var _ = require( "underscore" );
_.str = require('underscore.string')

_.inGroupsOf = function( array, chunk ) {
  return _.toArray(_.groupBy(array, function(item, index) {
    return Math.floor( index /chunk );
  }));
};

// Constructor for ISC Server
module.exports = function(host, port) {
  // Defaults
  this.host = host || "66.98.172.34";
  this.port = port || 1322;

  // Special props
  this.events = new Emitter({
    wildcard: true,
    delimiter: ":"
  });
  this.socket = new net.Socket({ type: "tcp4" });
  this.socket.setNoDelay(true);
  this.socket.on("timeout", function() {
    process.exit("Exiting because of socket timeout!!!!");
  })
  this.socket.on("data", this.onSocketData.bind(this));// this.onSocketData)
};

// Each "buddy" is a "5-tuple", so we have to chunk the message string into groups of 5, 
// and throw away any garbage (sets that don't have 5 items)
// Sample "tuple" 
// 860    ajpiano  a 0 0 
// Rating Username ? ? ?
function processBuddies(message) {
  return _.map(
    _.reject(_.inGroupsOf( message.split(" "), 5), function(b) {
        return b.length != 5;
      }), function(onlineBuddy) {
        return {
        rating: onlineBuddy[0],
        id: onlineBuddy[1],
        username: onlineBuddy[1],
        online: true
      };
    });
}

var serverCommands = {

  CLOSE: function(message) {
    this.events.emit("user:login", { success: false, message: message });
  },

  LOGIN: function(message) {
    this.events.emit("user:login", { success: true, message: message });
  },

  FINGER: function( message ) {
    this.events.emit("player:finger", message)
  },
  BUDDIES: function(message) {
    // ISC UNSEEK - list given upon initial connection
    // BUDDIES ajpiano timbocoup ersherr fulofself /
    // UNSEEK Usernames Space Separated TrailingSlash
    var buddies = message.split(" ");
    buddies.pop();
    this.events.emit("buddies:all", buddies);
  },
  "WHO SET": function(message) {
    // ISC WHO SET - list of online buddies received on initial connection, after entire buddy list is given
    // WHO SET 860 ajpiano a 0 0 1001 ersherr a 0 0 0 adambocoup a 0 0 :
    // WHO SET is the initial command,
    //
    var buddies = processBuddies(message); 
    this.events.emit("buddies:online", buddies);
  },
  "WHO LOGIN": function(message) {
    // ISC WHO LOGIN - message sent when a buddy logs in
    // WHO LOGIN 860 ajpiano a 0 0
    var buddy = processBuddies(message)[0];
    this.events.emit("buddies:login", buddy);
  },
  "WHO CLOSE": function(message) {
    // ISC WHO LOGIN - message sent when a buddy logs out
    // WHO CLOSE 860 ajpiano a 0 0
    var buddy = processBuddies(message)[0];
    buddy.online = false;
    buddy.rating = 0;
    this.events.emit("buddies:logout", buddy);
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
    this.events.emit("player:unseek", unseek);
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

    this.events.emit("player:seek", seek);
  },

  TELL: function(message) {
    // ISC TELL looks like
    // TELL ajpiano  0 hello world 
    // TELL username ? Message
    var raw = message.split(" "),
    tell = {
      username: raw.shift(),
      message: raw.slice(1).join(" ")
    };
    this.events.emit("chat:tell", tell)
  },
  WHO: function(message) {
    this.events.emit("who", { data: message });
  },

  MOVE: function(message) {
    this.events.emit("move", { data: message });
  },

  ASITIS: function(message) {
    this.events.emit("asitis", { data: message });
  },

  MATCH: function(message) {
    this.events.emit("match", { data: message });
  },
  SOUGHT: function(message) {
    console.log("got some soughts!!!", message);
  },
  "PING REPLY": function(message) {
    this.pingReply();
  }

};
// Shorthand it
var ISC = module.exports.prototype;

var filter_regex = /(0 [A-Z\s]{3,})/g;
// Incoming data, part out and funnel to the API
// Messages can contain more than one command (especialyl after login)
// We have to parse out each individual command and pass it to the api if applicable
ISC.onSocketData = function( data ) {
  var data = _.str.trim(data.toString());

  matchedCommands = data.match(filter_regex),

  commands = [],

  self = this;

  if (~data.indexOf("PING")) {
    console.log("---Received Socket Data---")
    console.log("Raw-est socket data:\n", data);
  }

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
    if (command.indexOf("PING") == -1) {
      console.log("Raw command: ", command)
      console.log("CMD: ", cmd);
      console.log("MSG: ", msg);
      console.log("-----------")
    } else {
      console.log("ITS A PING!!!!!");
    }
    if (cmd in serverCommands) {
      serverCommands[cmd].call(self, msg);
    }
  });
}

ISC.login = function(data, done) {
  // Connect to the socket
  this.socket.connect(this.port, this.host, function() {

    // Loggin in like a boss
    this.socket.write("\u000000 LOGIN " + data.username + " " + data.password
        + " 1821 1 133380 " + data.username);

    this.events.once("user:login", function(data) {
      this.sought();
      this.resume();
      done && done();
//     setInterval( this.alive.bind(this), 30 * 1000)
//     this.socket.setKeepAlive(true);
    }.bind(this));

  }.bind(this));
};

_.extend( ISC, {
  //sending an ALIVE signal to the ISC server
  // \u0000\u00070 ALIVE
  alive: function() {
    this.socket.write("\u0000\u00070 ALIVE");
  },
  // Get a list of all current buddies
  // two trailing spaces
  // \u0000\u000b0 BUDDIES  
  buddies: function( data, done ) {
    this.socket.write("\u0000\u000b0 BUDDIES  ");
    this.events.once("asitis", function(foo) {
     console.log(foo); 
    });
  },

  // Getting a user's information 
  // \u0000\u00100 FINGER ajpiano
  finger: function( data, done ) {
    this.socket.write("\u0000\u00130 FINGER "+ data.username);
    this.events.once("asitis", done);
  },
  // Send a ping reply to the ISC
  // \u0000\f0 PING REPLY
  pingReply: function() {
    this.socket.write("\u0000\f0 PING REPLY");
  },
  resume: function() {
    this.socket.write("\u0000\u000e0 RESUME LOGIN");
  },
  // Get the list of players connected (only happens on login, then maintained by client)
  // \u0000\b0 SOUGHT
  sought: function() {
    this.socket.write("\u0000\b0 SOUGHT")
  },
  tell: function( data, done ) {
    this.socket.write("\u0000\u00140 TELL " + data.username + " " + data.message);
    done({success: false, message: "WAT"});
  }
});
