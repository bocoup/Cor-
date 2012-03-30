require([
  "core",
  "modules/MVR",
  "modules/UI",
  "jquery",
  'use!jqueryui',
  'use!serializeObject'
],

function(Core, MVR, UI, $) {

  $(document).ready(function() {
    UI.render(function(el) {
      $(document.body).html(el);
      User.current.authenticate();
    });
  });

});
