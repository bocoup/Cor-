define([
  "hbs!template/mainlayout",
  "modules/buddies",
  "modules/console",
  "modules/seek",
  "modules/board",
  "modules/rack",
  "modules/user",
  "modules/MVR",
  "jquery",
  "use!underscore",
  "use!Backbone.LayoutManager"
], function( mainLayout, Buddies, Console, Seek, Board, Rack, User, MVR, $, _) {

  Backbone.LayoutManager.configure({
    fetch: function(name) {
      return name;
    },

    render: function(template, context) {
      return template(context);
    }
  });

var UI = new Backbone.LayoutManager({
    template: mainLayout,
    views: {
      "#board": new Board.View(),
      "#console": new Console({el: $("#console")[0]}),
      "#seek-graph": Seek.graph,
      "#buddies":  new Buddies.Manager({el: $("#buddies")[0]}),
      "#bag-pretty": new Board.Bag.Pretty({el: $("#bag-pretty")[0]}),
      "#bag-compact": new Board.Bag.Compact({el: $("#bag-compact")[0]}),
      "#rack": new Rack.View()
    }
  });

  return UI;

});
