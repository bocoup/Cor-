define([
  "MVR",
  "jquery",
  "underscore",
  "hbs!template/tileBagCompact"
], function( MVR, $, _, tileBagCompact ) {


  var Tile = MVR.Model.extend({
    defaults: {
      letter: "A",
      points: 1
    }
  }),

  TileCollection = MVR.Collection.extend({
    model: Tile,
    initialize: function( models, options ) {
      this.each(function(tile, index){
        var o = { tile: tile };
        tile.inBagView = new TileBagView(o);
      },this);
    } 
  }),

  TileRackView = MVR.View.extend({
    
  }),

  TileBoardView = MVR.View.extend({
    
  }),

  TileBagView = MVR.View.extend({
    tagName: "li",
    template: tileBagCompact,
    initialize: function(options) {
      MVR.View.prototype.initialize.call( this );
      this.tile = options.tile;
      this.render();
    },
    render: function() {
      this.$el.html( this.template(this.tile.toJSON()) );
      return this;

    }
  })

  return {
    Model: Tile,
    Collection: TileCollection
  };

});
