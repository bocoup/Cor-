define([
  "modules/MVR",
  "jquery",
  "use!underscore",
  "hbs!template/tileBagCompact"
], function( MVR, $, _, tileBagCompact ) {

  var Tile = MVR.Model.extend({
    defaults: {
      letter: "A",
      points: 1
    }
  }),

  TileCollection = MVR.Collection.extend({
    model: Tile
  }),

  TileRackView = MVR.View.extend({
    
  }),

  TileBoardView = MVR.View.extend({
    
  }),

  TileBagView = MVR.View.extend({
    tagName: "li",
    template: tileBagCompact,
    initialize: function(options) {
      this.tile = options.tile;
    },
    serialize: function() {
      return this.tile.toJSON();
    }
  })

  return {
    Model: Tile,
    Collection: TileCollection,
    InBagView: TileBagView
  };

});
