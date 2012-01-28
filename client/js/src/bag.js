define([
  "Letters",
  "Tile",
  "MVR",
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
      return layout(this).render().then(_.bind(function() {
        this.list = this.$el.find("ul");
        bag.tileCollection.each(_.bind(function(tile, index){
         tile.inBagView.$el.appendTo( this.list )
        },this))
      },this));
    }
  }),

  BagPrettyView = MVR.View.extend({
    template: bagPretty,
    render: function(layout) {
      return layout(this).render().then(_.bind(function() {
        this.list = this.$el.find("ul");
        Letters.collection.each(function(letter, index){
         letter.inBagView.$el.appendTo( this.list )
        },this);
      },this));
    }
  }),

  bag = new Bag( {letters: Letters.raw} )

  return {
    bag: bag,
    Pretty: BagPrettyView,
    Compact: BagCompactView
  };

});
