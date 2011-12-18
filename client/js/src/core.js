define("core", [
  "MVR",
  "UI",
  "jquery",
  "underscore",
], function( MVR, UI, $, _) {

  var dfd = $.Deferred(), 
  
  socket = io.connect("ws://localhost:1337");

  moduleInterface = {
    init: function() {
      $(document).ready(function() {
        UI.render(function(el) {
          $(document.body).html(el);
        });
      });
    }
  };

  dfd.resolve();

  return _.extend( dfd.promise(), moduleInterface );

});
