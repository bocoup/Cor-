define([
  "jquery",
  "use!backbone"
], function( $, Backbone ) {

  var Model = Backbone.Model,

  Collection = Backbone.Collection,

  View = Backbone.View,

  Router = Backbone.Router;

  return {
    Model: Model,
    View: View,
    Collection: Collection,
    Router: Router
  };

});
