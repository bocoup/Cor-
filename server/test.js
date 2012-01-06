var apis = {
  isc: require("./isc")
};

// Create new isc server
var api = new apis["isc"]();

api.login({ user: "timbocoup", pass: "654321" }, function(error) {
  if (error) {
    return console.log("no go");
  }

  console.log("logged in");
});
