define([
  "MVR",
  "jquery",
  "use!underscore",
], function( MVR, $, _ ) {

  var Player = MVR.Model.extend({
    defaults: {
      username: "",
      position: 1,
      rating: 0,
      provisional: false
    } 
  }),

  PlayerCollection = MVR.Collection.extend({
    model: Player
  })

  return {
    Player: Player,
    Collection: PlayerCollection
  }

})
