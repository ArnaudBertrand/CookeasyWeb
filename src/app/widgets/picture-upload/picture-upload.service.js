(function(){
  'use strict';

  angular
    .module('app')
    .factory('pictureUploadService', pictureUploadService);

  function pictureUploadService () {
    var services = {};
    var pictureUrl;

    // Get gallery images
    services.getPictureUrl = function() {
      return pictureUrl;
    };

    // Get current image index
    services.setPictureUrl = function(url) {
      pictureUrl = url;
    };

    return services;
  }
})();
