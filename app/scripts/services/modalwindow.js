'use strict';

/**
 * @ngdoc service
 * @name applicationApp.ModalWindow
 * @description
 * # ModalWindowService
 * Factory in the applicationApp.
 */
angular.module('applicationApp')
  .factory('ModalWindow', function () {
    var services = {};
    var gallery = [];
    var imgIndex = 0;

    // Close modal window
    services.close = function (){
      var modal = angular.element(document.querySelector('#modal'));
      modal.css({"opacity": "0", "pointer-events": "none"});
    };

    // Get gallery images
    services.getGallery = function() {
      return gallery;
    };

    // Get current image index
    services.getImgIndex = function() {
      return imgIndex;
    };

    // Open a gallery modal window
    services.openGallery = function(index,images){
      var modal = angular.element(document.querySelector('#modal'))
      modal.css({"opacity": "1", "pointer-events": "all"});
      gallery = images;
      imgIndex = index;
    };

    return services;
  });
