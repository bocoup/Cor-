var events = require("events");
var net = require("net");
// Include and bind the Socket.io server to port 1337
var io = require("socket.io").listen(1337);
var services = {
  isc: require("./isc")
};

// Stop errors from crashing the server
//process.on("uncaughtexception", function() { });

io.set("log level", 0);

io.sockets.on("connection", function(socket) {

  // The user will select a service immediately after they connect
  var service;

  // LOGIN
  socket.on("user:login", function(data, done) {
    service = new services[ data.service ]();
    console.log(data);
    service.login( data );
    bindServicePassthrough();
    service.events.once("user:login", function(data) {
      if ( !data.success ) {
        unbindServicePassthrough();
        service.connected = false;
      } else {
        service.connected = true;
      }
      done( data );
    });
  });

  function bindServicePassthrough() {
    service.events.onAny(function(data) {
      socket.emit( this.event, data);
    });
  }

  function unbindServicePassthrough() {
    service.events.removeAllListeners()
  }

  socket.on("buddies:list", function(data, done) {
    service.buddies( data, done )
  });

  socket.on("chat:tell", function(data, done) {
    service.tell( data, done )
  });

  socket.on("player:finger", function(data, done) {
    service.finger( data, done )
  });

});
