define("rack", [
  "MVR",
  "jquery",
  "underscore",
  "hbs!template/rack"
], function( MVR, $, _, rackTemplate ) {

  var Rack = MVR.Model.extend({
    tileQty: Array(7),
    toJSON: function() {
      return {
        tileQty: this.tileQty
      }
    }
  }),

  RackView = MVR.View.extend({
    template: rackTemplate,
    tagName: "table",
    initialize: function() {
      this.rack = new Rack();
    },
    render: function(layout) {
      return layout(this).render( this.rack.toJSON() );
    }
  });

  return {
    View: RackView
  };

});

