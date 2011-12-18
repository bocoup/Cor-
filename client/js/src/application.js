// Require.js allows us to configure shortcut alias
// Their usage will become more apparent futher along in the tutorial.
require.config({
  paths: {
    json2: '../libs/json2',
    jquery: '../libs/jquery.min',
    jqueryui: '../libs/jquery-ui-git',
    underscore: '../libs/underscore',
    Backbone: '../libs/backbone',
    "Backbone.LayoutManager": '../libs/backbone.layoutmanager',
    hbs: '../libs/hbs',
    Handlebars: '../libs/Handlebars'
  }
});
require([
  'core',
  'jqueryui'
], function( Core ){
  Core.always( Core.init );
  /*
  var loginView = Backbone.View.extend({
    template: loginTemplate,
    events: {
      "submit": "submit"
    },
    initialize: function() {
      this.render();
    },
    render: function() {
      $(this.el).html( this.template() );
      return this;
    },
    submit: function(e) {
      e.preventDefault();
      var obj = {
        username: $(this.el).find("[name='username']").val(),
        password: $(this.el).find("[name='password']").val()
      };
      socket.emit("user:login", obj, function(err, log) {
        console.log(err, log);
      });

    }
  });


  */
});
