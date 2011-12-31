define([
  "hbs!template/mainlayout",
  "console",
  "board",
  "rack",
  "user",
  "MVR",
  "jquery",
  "underscore",
  "Backbone.LayoutManager"
], function( mainLayout, Console, Board, Rack, User, MVR, $, _) {

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
      "#bag-pretty": new Board.Bag.Pretty({el: $("#bag-pretty")[0]}),
      "#bag-compact": new Board.Bag.Compact({el: $("#bag-compact")[0]}),
      "#rack": new Rack.View()
    }
  });

  return UI;

});
