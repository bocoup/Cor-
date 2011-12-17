define("core", [
  "hbs!template/mainlayout",
  "jquery",
  "underscore",
  "Backbone",
  "Backbone.LayoutManager"
], function( mainLayout, $, _, Backbone) {

  var dfd = $.Deferred(),

  socket = io.connect("ws://localhost:1337");

  Model = Backbone.Model,

  View = Backbone.View.extend({
    cleanup: function() {
    },
    remove: function() {
      this.cleanup();
      Backbone.View.prototype.remove.call(this);
    }
  }),

  Router = Backbone.Router,

  UI = new Backbone.LayoutManager({
    template: mainLayout
  }),

  dfd.resolve();

  return _.extend( dfd.promise(), {
    Model: Model,
    View: View,
    Router: Router,
    init: function() {
      $(document).ready(function() {
// This works
        $(document.body).html( mainLayout() );
// But this doesn't
//        UI.render(function(el) {
//          $(document.body).html(el);
//        });
      });
    }
  });

})
