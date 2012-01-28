define([
  "hbs!template/seek",
  "hbs!template/seekGraph",
  "player",
  "socket",
  "MVR",
  "jquery",
  "use!underscore"
], function( seekTemplate, graphTemplate, Player, socket, MVR, $, _ ) {

  var Seek = MVR.Model.extend({
    defaults: {
      duration: 25,
      increment: 0
    } ,
    initialize: function() {
      this.view = new SeekView({seek: this});
    }
  }),

  SeekView = MVR.View.extend({
    template: seekTemplate,
    tagName: "li",
    initialize: function(options) {
      MVR.View.prototype.initialize.call( this );
      this.seek = options.seek;
      this.render();
    },
    render: function() {
      this.$el.html( this.template( this.seek.toJSON() ) );
      return this;
    }
  }),

  SeekCollection = MVR.Collection.extend({
    model: Seek,
    initialize: function() {
      MVR.Collection.prototype.initialize.call( this );
      socket.on("player:seek", _.bind(function(data) {
        this.add( data );
      },this));
      socket.on("player:unseek", _.bind(function(data){
        this.remove( data.id );
      },this));
    },
  }),

  Graph = MVR.View.extend({
    template: graphTemplate,
    initialize: function() {
      MVR.View.prototype.initialize.call( this );
      seeks.bind("add", _.bind(function(seek) {
        this.$el.find("ul").append( seek.view.el );
      },this));
      seeks.bind("remove", _.bind(function(seek) {
        seek.view.remove();
      },this));
    },
    render: function(layout) {
      return layout(this).render();
    }
  }),

  seeks = new SeekCollection,
  graph = new Graph;

  return {
    graph: graph
  };

})
