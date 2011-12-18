define([
  "Tile",
  "MVR",
  "jquery",
  "underscore"
], function( Tile, MVR, $, _ ) {


  var letters = {
    " ": {p: 0, q: 2},
    "A": {p: 1, q: 9},
    "B": {p: 3, q: 2},
    "C": {p: 3, q: 2},
    "D": {p: 2, q: 4},
    "E": {p: 1, q: 12},
    "F": {p: 4, q: 2},
    "G": {p: 2, q: 3},
    "H": {p: 4, q: 2},
    "I": {p: 1, q: 9},
    "J": {p: 8, q: 1},
    "K": {p: 5, q: 1},
    "L": {p: 1, q: 4},
    "M": {p: 3, q: 2},
    "N": {p: 1, q: 6},
    "O": {p: 1, q: 8},
    "P": {p: 3, q: 2},
    "Q": {p: 10, q: 1},
    "R": {p: 1, q: 6},
    "S": {p: 1, q: 4},
    "T": {p: 1, q: 6},
    "U": {p: 1, q: 4},
    "V": {p: 4, q: 2},
    "W": {p: 4, q: 2},
    "X": {p: 8, q: 1},
    "Y": {p: 4, q: 2},
    "Z": {p: 10, q: 1}
  },

  Bag = MVR.Model.extend({
    initialize: function(options) {
      var letters = this.processLetters( options.letters );
      this.tileCollection = new Tile.Collection( letters );
    },
    processLetters: function( letters ) {
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
    
  }),

  BagPrettyView = MVR.View.extend({
    
  });


  return {
    bag: new Bag( {letters: letters} ),
    Pretty: BagPrettyView,
    Compact: BagCompactView
  };

});
