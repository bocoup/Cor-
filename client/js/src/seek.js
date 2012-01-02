define([
  "hbs!template/seekGraph",
  "player",
  "socket",
  "MVR",
  "jquery",
  'underscore',
], function( graphTemplate, Player, socket, MVR, $, _ ) {

  var Seek = MVR.Model.extend({
    defaults: {
      duration: 25,
      increment: 0
    } 
  }),

  SeekCollection = MVR.Collection.extend({
    model: Seek
  }),

  Graph = MVR.View.extend({
    template: graphTemplate,
    render: function(layout) {
      return layout(this).render();
    }
  });

  return {
    Graph: Graph
  };

})
