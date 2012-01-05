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
      this.buddy.bind("change", this.render, this)
      this.render();
    },
    render: function() {
      this.$el.html( this.template( this.buddy.toJSON() ) )
    }
  }),

  BuddyCollection = MVR.Collection.extend({
    model: Buddy
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
    buddies: new BuddyCollection(), 
    initialize: function() {
      MVR.View.prototype.initialize.call(this);
      _.bindAll( this );

      function findAndSetBuddy(buddy) {
        var b = this.buddies.get( buddy.id );
        if ( b ) {
          b.set( buddy );
        }
      }

      this.buddies.bind("change", function(){
        this.queueRender();
      },this);

      socket.on("buddies:all", _.bind(function(buddyNames) {
        this.buddies.reset( BuddyCollection.namesToModels(buddyNames) );
      },this));

      socket.on("buddies:online", _.bind(function(buddies) {
        _.each(buddies, findAndSetBuddy, this);
        this.queueRender();
      },this));

      socket.on("buddies:login", _.bind( findAndSetBuddy, this));
      socket.on("buddies:logout", _.bind( findAndSetBuddy, this));

    },
    queueRender: _.debounce(function(){
      this.render();
    },50),
    render: function(layout) {
      return layout(this).render().then(_.bind(function() {
        this.onlineBuddiesList = new BuddyListView({
          el: this.$el.find(".online-buddies")[0], 
          online: true,
          buddies: this.buddies
        });
        this.offlineBuddiesList = new BuddyListView({
          el: this.$el.find(".offline-buddies")[0], 
          online: false,
          buddies: this.buddies
        });
      },this))
    }
  });

  // A static method for converting an array of simple user names to Buddy models
  BuddyCollection.namesToModels = function(names) {
    return _.map( names, function(name, index){
      return { username: name, id: name };
    })
  };

  return {
    Manager: Manager
  };

})
