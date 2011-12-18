define([
  "MVR",
  "jquery",
  "underscore"
], function( MVR, $, _ ) {


  var Tile = MVR.Model.extend({
    defaults: {
      letter: "A",
      points: 1
    }
  }),

  TileCollection = MVR.Collection.extend({
    model: Tile,
    initialize: function( models, options ) {

    } 
  }),

  TileRackView = MVR.View.extend({
    
  }),

  TileBoardView = MVR.View.extend({
    
  }),

  TileBagView = MVR.View.extend({
    
  })

  return {
    Model: Tile,
    Collection: TileCollection,
    inRack: TileRackView,
    onBoard: TileBoardView,
    inBag: TileBagView
  };

});
