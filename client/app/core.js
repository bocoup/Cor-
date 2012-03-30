define([
  "jquery",
  "use!underscore"
], function( $, _ ) {

  var dfd = $.Deferred(),

  moduleInterface = {

    // Create a custom object with a nested Views object
    module: function(additionalProps) {
      return _.extend({ Views: {} }, additionalProps);
    }

  };

  dfd.resolve();

  return _.extend( dfd.promise(), moduleInterface );

});
