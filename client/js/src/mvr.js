define("MVR", [
  "jquery",
  "Backbone",
], function( $, Backbone ) {

  var Model = Backbone.Model,

  View = Backbone.View.extend({
    initialize: function() {
      Backbone.View.prototype.initialize.call( this );
      this.$el = $(this.el);
    },
    cleanup: function() {
    },
    remove: function() {
      this.cleanup();
      Backbone.View.prototype.remove.call(this);
    }
  }),

  Router = Backbone.Router;

  return {
    Model: Model,
    View: View,
    Router: Router
  };

});
