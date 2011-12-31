define([
  "MVR",
  "jquery",
  'underscore',
], function( MVR, $, _ ) {

  var Player = MVR.Model.extend({
    defaults: {
      username: "",
      position: 1,
      rating: 0,
      provisional: false
    } 
  });

  return Player;

})
