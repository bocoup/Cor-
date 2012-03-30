require([
  "core",
  "modules/user",
  "modules/UI",
  "jquery",
  'use!jqueryui',
  'use!serializeObject'
],

function(Core, User, UI, $) {

  $(document).ready(function() {
    UI.render(function(el) {
      $(document.body).html(el);
      User.current.authenticate();
    });
  });

});
