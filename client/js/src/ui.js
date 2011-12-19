define([
  "hbs!template/mainlayout",
  "MVR",
  "board",
  "rack",
  "jquery",
  "underscore",
  "Backbone.LayoutManager"
], function( mainLayout, MVR, Board, Rack, $, _) {

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
      "#bag-pretty": new Board.Bag.Pretty({el: $("#bag-pretty")[0]}),
      "#bag-compact": new Board.Bag.Compact({el: $("#bag-compact")[0]}),
      "#rack": new Rack.View()
    }
  });

  return UI;

});
