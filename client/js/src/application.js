// Require.js allows us to configure shortcut alias
// Their usage will become more apparent futher along in the tutorial.
require.config({
  paths: {
    json2: '../libs/json2',
    jquery: '../libs/jquery.min',
    jqueryui: '../libs/jquery-ui-git',
    underscore: '../libs/underscore',
    Backbone: '../libs/backbone',
    hbs: '../libs/hbs',
    Handlebars: '../libs/Handlebars'
  }
});
require([
  'jquery',
  'underscore',
  'Backbone',
  "hbs!template/login",
  'jqueryui'
], function($, _, Backbone, loginTemplate ){

  var socket = io.connect("ws://localhost:1337");


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
      console.log(obj);
      socket.emit("user:login", obj, function(err, log) {
        console.log(err, log);
      });

    }
  });

  $(document).ready(function(){
    $( new loginView().el ).dialog();
  })
});
