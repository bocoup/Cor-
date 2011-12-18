define("UI", [
  "hbs!template/mainlayout",
  "MVR",
  "board",
  "jquery",
  "underscore",
  "Backbone.LayoutManager"
], function( mainLayout, MVR, Board, $, _, boardTemplate ) {

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
      "#board": new Board.View()
    }
  });

  return UI;

});
