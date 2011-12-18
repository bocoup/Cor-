define("UI", [
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
      "#rack": new Rack.View()
    }
  });

  return UI;

});
