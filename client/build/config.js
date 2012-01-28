// This is a JavaScript file, you can define any functions you would like in
// here.
config.init({

  clean: {
    folder: "dist/"
  },

  lint: {
    files: ["build/config.js", "js/src/*.js"]
  },

  concat: {
    "dist/debug/index.js": ["dist/debug/templates.js", "dist/debug/index.js"]
  },

  watch: {
    files: ["app/**/*", "assets/**/*"],
    tasks: "lint:files requirejs",
    
    min: {
      files: "<watch:files>",
      tasks: "default min mincss"
    }
  },

  mincss: {
    "dist/release/style.css": ["assets/css/**/*.css"]
  },

  min: {
    "dist/release/application.js": ["dist/debug/index.js"],
    "dist/release/require.js": ["assets/js/libs/require.js"]
  },

  server: {
    debug: {
      folders: {
        "app": "dist/debug",
        "app/templates": "app/templates"
      }
    },

    release: {
      files: {
        "app/config.js": "app/config.js",
        "js/src/application.js": "dist/release/application.js"
      },

      folders: {
        "app": "dist/release",
        "app/templates": "app/templates",
        "assets/css": "dist/release",
        "js/libs": "js/libs"
      }
    }
  },
  requirejs: {
    mainConfigFile: "js/src/application.js",
    name: "application"
  }

});

// Run the following tasks...
task.registerTask("default", "clean lint requirejs concat");
