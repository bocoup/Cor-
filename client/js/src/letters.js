define([
  "Tile",
  "MVR",
  "jquery",
  "underscore",
  "hbs!template/letterBagPretty"
], function( Tile, MVR, $, _, letterBagPretty ) {


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

  lettersArray = _.map( letters, function(parms, letter) {
    return {
      letter: letter,
      points: parms.p,
      quantity: parms.q
    }
  }), 

  Letter = Tile.Model.extend({
    defaults: _.extend({
      quantity: 0
    },Tile.Model.prototype.defaults)
  }),

  LetterView = MVR.View.extend({
    tagName: "li",
    template: letterBagPretty,
    initialize: function(options) {
      MVR.View.prototype.initialize.call( this );
      this.letter = options.letter;
      this.render();
    },
    render: function() {
      this.$el.html( this.template(this.letter.toJSON()) );
      return this;
    }
  })

  LetterCollection = MVR.Collection.extend({
    model: Letter,
    initialize: function( models, options ){
      this.each(function(letter, index){
        var o = { letter: letter};
        letter.inBagView = new LetterView(o);
      },this);
    }
  });

  return {
    raw: letters,
    collection: new LetterCollection( lettersArray )
  };

});
