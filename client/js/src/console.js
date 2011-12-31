define([
  "hbs!template/console",
  "MVR",
  "jquery",
  "underscore"
], function( consoleTemplate, MVR, $, _ ) {

  var ConsoleView  = MVR.View.extend({
    template: consoleTemplate,
    events: {
      "submit": "submit"
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
