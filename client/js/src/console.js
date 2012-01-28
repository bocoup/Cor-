define([
  "hbs!template/console",
  "hbs!template/consoleMessage",
  "command",
  "socket",
  "MVR",
  "jquery",
  "use!underscore"
], function( consoleTemplate, consoleMessageTemplate, Command, socket, MVR, $, _ ) {

  var Message = MVR.Model.extend({
    defaults: {
      msg: "",
      type: "normal"
    },
    initialize: function() {
      this.view = new MessageView({ message: this });
    }
  }),

  MessageView = MVR.View.extend({
    tagName: "li",
    template: consoleMessageTemplate,
    initialize: function(options) {
      MVR.View.prototype.initialize.call( this );
      this.message = options.message;
      this.render();
    },
    render: function() {
      this.$el.html( this.template( this.message.toJSON() ) );
      return this;
    }
  }),

  MessageCollection = MVR.Collection.extend({
    model: Message,
    initialize: function( collection, options ) {
      this.listView = new MessageList({ messages: this });
      this.bind("add", function(message) {
        this.listView.$el.append( message.view.el );
      },this);
    }
  }),

  MessageList = MVR.View.extend({
    tagName: "ul"
  })

  ConsoleView  = MVR.View.extend({
    template: consoleTemplate,
    events: {
      "submit": "submit"
    },
    initialize: function() {
      MVR.View.prototype.initialize.call( this );
      _.bindAll(this);
      this.messages = new MessageCollection();

      socket.on("asitis", _.bind(function(data){
        this.messages.add( {msg: data.data} );
      },this));

      socket.on("chat:tell", _.bind(function(data){
        var message = data.username + " tells you: " + data.message;
        this.messages.add( {msg: message, type: "tell"} );
      },this));

    },
    render: function(layout) {
      return layout(this).render().then(_.bind(function() {
        this.$el.find(".console-messages").html( this.messages.listView.el );
        this.$cli = this.$el.find("input[name='command']");
      },this));
    },
    submit: function(e) {
      e.preventDefault();
      var cmd, data = $(e.target).serializeObject();
      if ( data.command ) {
        this.messages.add({ msg: "> "+ data.command, type: "user-entry"})
        cmd = Command( data.command );
        cmd.done(_.bind(function( m ) {
          this.messages.add({ msg: m });
        },this));
        cmd.fail(_.bind(function(m) {
          this.messages.add({ msg: m, type: "error" });
        },this));
        cmd.always(_.bind(function(m) {
          this.$cli.val("");
        },this));
      }
    }
  });

  return ConsoleView;

});
