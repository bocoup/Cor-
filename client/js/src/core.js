define([
  "user",
  "MVR",
  "UI",
  "jquery",
  "underscore",
], function( User, MVR, UI, $, _) {

  var dfd = $.Deferred(),
  
//  socket = io.connect("ws://192.168.3.100:1337"),

  moduleInterface = {
    init: function() {
      $(document).ready(function() {
        UI.render(function(el) {
          $(document.body).html(el);
          User.current.authenticate();
        });
      });
    }
  };

  dfd.resolve();

  return _.extend( dfd.promise(), moduleInterface );

});
