(function(){
  'use strict';

  angular
    .module('app')
    .directive('ceModalGallery', ceModalGallery);

  function ceModalGallery () {
    return {
      templateUrl: 'widgets/modal-gallery/modal-gallery.tpl.html',
      restrict: 'EA',
      controller: ModalGalleryCtrl,
      controllerAs: 'mw',
      bindToController: true
    };
  }

  ModalGalleryCtrl.$inject = ['$scope','ceModalGallery'];

  function ModalGalleryCtrl ($scope,ceModalGallery) {
    /* jshint validthis: true */
    var vm = this;
    var gallery = [];
    var imgIndex = 0;

    vm.close = ceModalGallery.close;
    vm.isFirstImage = isFirstImage;
    vm.isLastImage = isLastImage;
    vm.nextPicture = nextPicture;
    vm.previousPicture = previousPicture;

    $scope.$watch(function(){
       return ceModalGallery.getGallery();
     },
     function(res){
       gallery = res;
       setPicture();
     });

    $scope.$watch(function(){
        return ceModalGallery.getImgIndex();
      },
      function(cur){
        imgIndex = cur;
        setPicture();
      });

    function isFirstImage (){
      return imgIndex === 0;
    }

    function isLastImage (){
      return imgIndex+1 == gallery.length;
    }

    function nextPicture (){
      if(imgIndex+1 < gallery.length){
        imgIndex++;
        vm.currentPicture = gallery[imgIndex].url;
      }
    }

    function previousPicture (){
      if(imgIndex>0){
        imgIndex--;
        vm.currentPicture = gallery[imgIndex].url;
      }
    }

    function setPicture(){
      if(gallery.length){
        vm.currentPicture = imgIndex+1 <= gallery.length ? gallery[imgIndex].url : null;
      }
    }
  }
})();
