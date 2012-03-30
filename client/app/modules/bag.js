define([
  "modules/Letters",
  "modules/Tile",
  "modules/MVR",
  "jquery",
  "use!underscore",
  "hbs!template/bagCompact",
  "hbs!template/bagPretty"
], function( Letters, Tile, MVR, $, _, bagCompact, bagPretty ) {

    var Bag = MVR.Model.extend({
    initialize: function(options) {
      var letters = this.processTiles( options.letters );
      this.tileCollection = new Tile.Collection( letters );
    },
    processTiles: function( letters ) {
      var arr = _.map( letters, function( parms, letter) {
        var these = [],
        i = parms.q + 1;
        while (--i) {
          these.push({letter: letter, points: parms.p});
        }
        return these;
      });
      return arr.concat.apply( [], arr );
    }
  }),

  BagCompactView = MVR.View.extend({
    template: bagCompact,
    render: function(layout) {
      var view = layout(this);

      bag.tileCollection.each(_.bind(function(tile, index){
        view.insert("ul", new Tile.InBagView( {tile: tile}) );
      },this));

      return view.render();
    }
  }),

  BagPrettyView = MVR.View.extend({
    template: bagPretty,
    render: function(layout) {
      var view = layout(this);
      Letters.collection.each(function(letter, index){
        view.insert( "ul", new Letters.View( {letter: letter} ) );
      },this);
      return view.render()
    }
  }),

  bag = new Bag( {letters: Letters.raw} )

  return {
    bag: bag,
    Pretty: BagPrettyView,
    Compact: BagCompactView
  };

});
