// Require.js allows us to configure shortcut alias
// Their usage will become more apparent futher along in the tutorial.
require.config({
  paths: {
    template: "../../template",
    json2: '../libs/json2',
    jquery: '../libs/jquery.min',
    jqueryui: '../libs/jquery-ui-git',
    serializeObject: '../libs/jquery.ba-serializeobject',
    underscore: '../libs/underscore',
    Backbone: '../libs/backbone',
    "Backbone.LayoutManager": '../libs/backbone.layoutmanager',
    hbs: '../libs/hbs',
    Handlebars: '../libs/Handlebars'
  }
});
require([
  'core',
  'jqueryui',
  'serializeObject'
], function( Core ){
  Core.always( Core.init );
});
