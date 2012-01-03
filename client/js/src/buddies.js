define([
  "hbs!template/buddies",
  "hbs!template/buddyListPlayer",
  "player",
  "socket",
  "MVR",
  "jquery",
  'underscore',
], function( buddiesTemplate, buddyListPlayerTemplate, Player, socket, MVR, $, _ ) {

  var Buddy = Player.Player.extend({
    defaults: _.extend({
      online: false
    }, Player.Player.prototype.defaults),
    initialize: function() {
      this.view = new BuddyView( {buddy: this} );
    }
  }),

  BuddyView = MVR.View.extend({
    tagName: "li",
    template: buddyListPlayerTemplate,
    initialize: function(options) {
      MVR.View.prototype.initialize.call(this);
      this.buddy = options.buddy;
      this.render();
    },
    render: function() {
      this.$el.html( this.template( this.buddy.toJSON() ) )
    }
  }),

  BuddyCollection = MVR.Collection.extend({
    model: Buddy,
    initialize: function( collection, options) {
      if ( options.buddyNames ) {
        this.add(_.map( options.buddyNames, function(name, index){
          return { username: name };
        }));
      }
    }
  }),

  BuddyListView = MVR.View.extend({
    tagName: "ul",
    online: false,
    initialize: function(options) {
      MVR.View.prototype.initialize.call(this);
      this.buddies = options.buddies;
      this.online = options.online;
      this.render();
    },
    render: function() {
      this.buddies.each(function(buddy, i) {
        if ( this.online == buddy.get("online") ) {
          this.$el.append( buddy.view.el );
        }
      },this);
    }
  }),
  
  Manager = MVR.View.extend({
    template: buddiesTemplate,
    initialize: function() {
      MVR.View.prototype.initialize.call(this);
      socket.on("buddies", _.bind(function(buddyNames) {
        this.buddies = new BuddyCollection([], {buddyNames: buddyNames})
        this.render();
      },this));
    },
    render: function(layout) {
      return layout(this).render().then(_.bind(function() {
        if ( this.buddies ) {
          this.offlineBuddiesList = new BuddyListView({
            el: this.$el.find(".offline-buddies")[0], 
            online: false,
            buddies: this.buddies
          });
        }
      },this))
    }
  });

  return {
    Manager: Manager
  };

})
