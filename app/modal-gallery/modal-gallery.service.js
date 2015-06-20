(function(){
  'use strict';

  angular
    .module('app')
    .factory('ceModalGallery', ceModalGallery);

  function ceModalGallery () {
    var gallery = [],
      imgIndex = 0;

    return {
      close: close,
      getGallery: getGallery,
      getImgIndex: getImgIndex,
      openGallery: openGallery
    };

    function close (){
      var modal = angular.element(document.querySelector('#modal'));
      modal.css({"opacity": "0", "pointer-events": "none"});
      gallery = [];
      imgIndex = 0;
    }

    function getGallery () {
      return gallery;
    }

    function getImgIndex () {
      return imgIndex;
    }

    function openGallery (index,images){
      var modal = angular.element(document.querySelector('#modal'))
      modal.css({"opacity": "1", "pointer-events": "all"});
      gallery = images;
      imgIndex = index;
    }
  }
})();
