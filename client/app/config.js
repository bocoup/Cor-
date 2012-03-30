require.config({

  deps: ["main"],

  paths: {
    json2: '../assets/js/libs/json2',
    jquery: '../assets/js/libs/jquery',
    jqueryui: '../assets/js/libs/jquery-ui-git',
    serializeObject: '../assets/js/plugins/jquery.ba-serializeobject',
    underscore: '../assets/js/libs/underscore',
    backbone: '../assets/js/libs/backbone',
    "Backbone.LayoutManager": '../assets/js/plugins/backbone.layoutmanager',
    hbs: '../assets/js/libs/hbs',
    Handlebars: '../assets/js/libs/Handlebars',
    use: "../assets/js/plugins/use"
  },
  use: {
    backbone: {
      deps: ["use!underscore", "jquery"],
      attach: "Backbone"
    },

    underscore: {
      attach: "_"
    },

    "Backbone.LayoutManager": {
      deps: ["use!backbone"]
    },

    serializeObject: {
      deps: ["jquery"]
    },

    jqueryui: {
      deps: ["jquery"]
    }
  }
});
