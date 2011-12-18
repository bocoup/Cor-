define("board", [
  "MVR",
  "jquery",
  "underscore",
  "hbs!template/board"
], function( MVR, $, _, boardTemplate ) {

  var columns = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
  rows = "ABCDEFGHIJKLMNO".split(""),
  bonuses = {
    DL: "A4,A12,C7,C9,D1,D8,D15,G3,G7,G9,G13,H4,H12,I3,I7,I9,I13,L1,L8,L15,M7,M9,O4,O12".split(","),
    DW: "B2,B14,C3,C13,D4,D12,E5,E11,H8,K5,K11,L4,L12,M3,M13,N2,N14".split(","),
    TL: "B6,B10,F2,F6,F10,F14,J2,J6,J10,J14,N6,N10".split(","),
    TW: "A1,A8,A15,H1,H15,O1,O8,O15".split(",")
  },
  getBonus = function( cellId ) {
    var bonus = false;
    _.each( bonuses, function(cells, bType) {
      if ( ~_.indexOf( cells, cellId ) ) {
        bonus = bType;
        return false;
      }
    });
    return bonus;
  }
  spaces = (function() {
    return _.map(rows, function(row, index) {
      return _.map(columns, function(col, dex) {
        var id = row + col;
        return {
          id: id,
          row: row,
          column: col,
          bonus: getBonus( id )
        }
      });
    });
  })(),


  Space = MVR.Model.extend({
    defaults: {
      row: "A",
      column: "1",
      bonus: false
    }
  }),

  SpaceCollection = MVR.Collection.extend({
    model: Space
  }),

  SpaceView = MVR.View.extend({
    events: {
      "focus a": "setActive",
      "blur a": "setInactive",
      keydown: "keydown"
    },
    initialize: function( options ) {
      MVR.View.prototype.initialize.call( this );
      this.space = options.space;
    },
    setActive: function(e) {
      this.$el.addClass("active-space")
    },
    setInactive: function(e) {
      this.$el.removeClass("active-space")
    },
    keydown: function(e) {
      e.preventDefault();
      e.stopPropagation();

      var kc = $.ui.keyCode,
      $t = $(e.currentTarget);

      switch (e.keyCode) {
        case kc.LEFT:
          $t.prev().find("a").focus();
          break;
        case kc.RIGHT:
          $t.next().find("a").focus();
          break;
        case kc.UP:
          $t.parent().prev().children().eq( this.space.get("column")-1 ).focus().find("a").focus();
          break;
        case kc.DOWN:
          $t.parent().next().children().eq( this.space.get("column")-1 ).focus().find("a").focus();
          break;
      }
    },
  }),

  Board = MVR.Model.extend({
    columns: columns,
    spaces: spaces,
    toJSON: function() {
      return { spaces: this.spaces }
    },
    initialize: function() {
      this.spaceCollection = new SpaceCollection( this.spaces.concat.apply( [], this.spaces) );
    }
  }),

  BoardView = MVR.View.extend({
    template: boardTemplate,
    tagName: "table",
    initialize: function() {
      MVR.View.prototype.initialize.call( this );
      this.board = new Board();
    },
    render: function(layout) {
      return layout(this).render( this.board.toJSON() ).then(_.bind(function() {
        this.$el.find(".board-space").each(_.bind(function(i, el){
          var space = this.board.spaceCollection.get( $(el).attr("data-id") );
          space.view = new SpaceView({space: space, el: el})
        },this));
      },this));
    }
  });

  return {
    View: BoardView
  };

});
