var apis = {
  isc: require("./isc")
};

// Create new isc server
var api = new apis["isc"]();

api.login({ username: "coretest", password: "123456" }, function(error) {
  if (error) {
    return console.log("no go");
  }
  setTimeout(function() {
    api.buddies({username: "ajpiano", message: "hi"}, function() {
    console.log("wat");
  });
  }, 500);

  setTimeout(function() {
    api.tell({username: "ajpiano", message: "hi"}, function() {
    console.log("wat");
  });
  }, 100);

  console.log("logged in");
});
