define([
  "hbs!template/auth",
  "player",
  "socket",
  "MVR",
  "jquery",
  "underscore"
], function( authTemplate, Player, socket, MVR, $, _ ) {

  var User = Player.Player.extend({
    defaults: _.extend({
      password: ""
    }),
    authenticate: function() {
      var authView = new AuthView();
    }
  }),
  
  AuthView = MVR.View.extend({
    template: authTemplate,
    events: {
      "submit": "submit"
    },
    initialize: function() {
      MVR.View.prototype.initialize.call(this);
      this.render();
    },
    render: function() {
      this.$el.html( this.template() );
      this.$form = this.$el.find("form");
      this.$pane = this.$el.find(".error-pane");
      this.$el.dialog({
        title: "Connect to ISC",
        close: _.bind(function() {
          this.$el.dialog("destroy");
          this.remove();
        },this),
        buttons: {
          "Connect": _.bind(function(){
            this.$form.submit();
          }, this),
          "Cancel": _.bind(function(){
            this.$el.dialog("close");
          },this),
        }
      });
      return this;
    },
    submit: function(e) {
      e.preventDefault();
      this.$pane.empty();
      var obj = this.$form.serializeObject();
      socket.emit("user:login", obj, _.bind(function(data) {
        if ( data.success ) {
          this.$el.dialog("close");
        } else {
          this.$pane.text( data.message );
        }
      },this));

    }
  }),

  ProfileView = MVR.View.extend({
    
  }),

  currentUser = new User;

  return {
    current: currentUser,
    ProfileView: ProfileView
  }

});
