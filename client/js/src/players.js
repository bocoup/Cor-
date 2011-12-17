define("players", [
  'core'
  'jquery',
  'underscore',
  "hbs!template/login",
], function( Core, $, _, loginTemplate ) {

  var dfd = $.Deferred(),

  Player = Core.Model.extend({
    defaults: {
      username: "",
      position: 1,
      rating: 0,
      provisional: false
    } 
  });


  return _.extend( dfd.promise(), {

  });

})
