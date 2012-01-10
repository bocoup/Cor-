define([],function() {
  return window.io ? io.connect("ws://localhost:1337") : {
    on: function() {},
    off: function() {}
  };
});
