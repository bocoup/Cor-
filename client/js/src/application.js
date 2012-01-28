// Require.js allows us to configure shortcut alias
// Their usage will become more apparent futher along in the tutorial.
require.config({
  paths: {
    template: "../../template",
    json2: '../libs/json2',
    jquery: '../libs/jquery',
    jqueryui: '../libs/jquery-ui-git',
    serializeObject: '../libs/jquery.ba-serializeobject',
    underscore: '../libs/underscore',
    Backbone: '../libs/backbone',
    "Backbone.LayoutManager": '../libs/backbone.layoutmanager',
    hbs: '../libs/hbs',
    Handlebars: '../libs/Handlebars',
    use: "../libs/use"
  },
  use: {
    Backbone: {
      deps: ["use!underscore", "jquery"],
      attach: "Backbone"
    },

    underscore: {
      attach: "_"
    },

    "Backbone.LayoutManager": {
      deps: ["use!Backbone"]
    },

    serializeObject: {
      deps: ["jquery"]
    },

    jqueryui: {
      deps: ["jquery"]
    }
  }
});
require([
  'core',
  'use!jqueryui',
  'use!serializeObject'
], function( Core ){
  Core.always( Core.init );
});
