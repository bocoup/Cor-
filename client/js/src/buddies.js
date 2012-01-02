define([
  "hbs!template/buddies",
  "player",
  "socket",
  "MVR",
  "jquery",
  'underscore',
], function( buddiesTemplate, Player, socket, MVR, $, _ ) {

  var ListView = MVR.View.extend({
    template: buddiesTemplate,
    render: function(layout) {
      return layout(this).render();
    }
  });

  return {
    ListView: ListView
  };

})
