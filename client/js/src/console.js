define([
  "hbs!template/console",
  "socket",
  "MVR",
  "jquery",
  "underscore"
], function( consoleTemplate, socket, MVR, $, _ ) {

  var ConsoleView  = MVR.View.extend({
    template: consoleTemplate,
    events: {
      "submit": "submit"
    },
    initialize: function() {
      MVR.View.prototype.initialize.call( this );
      socket.on("asitis", _.bind(function(data){
        this.$el.find(".console-messages").append("<li>"+data.data+"</li>")
      },this));
    },
    render: function(layout) {
      return layout(this).render()
    },
    submit: function(e) {
      e.preventDefault();
      console.log(e);
    },
    sendCommand: function() {

    }
  });

  return ConsoleView;

});
