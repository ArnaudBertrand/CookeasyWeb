'use strict';

/**
 * @ngdoc service
 * @name applicationApp.UploadPictureService
 * @description
 * # UploadPictureService
 * Factory in the applicationApp.
 */
angular.module('applicationApp')
  .factory('UploadPictureService', function () {
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
  });
