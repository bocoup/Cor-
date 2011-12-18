define("board", [
  "MVR",
  "jquery",
  "underscore",
  "hbs!template/board"
], function( MVR, $, _, boardTemplate ) {

  var Board = MVR.Model.extend({
    columns: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
    rows: "ABCDEFGHIJKLMNO".split(""),
    toJSON: function() {
      return {
        columns: this.columns,
        rows: this.rows
      }
    }
  }),
  BoardView = MVR.View.extend({
    template: boardTemplate,
    tagName: "table",
    initialize: function() {
      this.board = new Board();
    },
    render: function(layout) {
      return layout(this).render( this.board.toJSON() );
    }
  });

  return {
    View: BoardView
  };

});
