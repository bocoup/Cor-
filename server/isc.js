var net = require("net");
var events = require("events");

// Constructor for ISC Server
module.exports = function(host, port) {
  // Defaults
  this.host = host || "66.98.172.34";
  this.port = port || 1322;

  // Special props
  this.events = new events.EventEmitter();
  this.socket = new net.Socket({ type: "tcp4" });
};

// Shorthand it
var ISC = module.exports.prototype;

ISC.login = function(creds, done) {
  // Connect to the socket
  this.socket.connect(this.port, this.host, function() {

    // Once we get data back lets figure out how to close done
    this.socket.once("data", function(data) {
      data = data.toString();

      return done(data.indexOf("CLOSE") > -1);
    });

    // Loggin in like a boss
    this.socket.write(["\u000000 LOGIN", creds.user, creds.pass, "1821 1 133380",
      creds.user, "\n"].join(" "));

  }.bind(this));
};

// var apis = {
//   isc: require("./isc")
// };
//
// .on("connection", function() {
//   var api = new ISC();
//
//   api.login({ user: "ajpiano", pass: "whateves" }, function(err) {
//
//   });
// });
