'use strict';

/**
 * @ngdoc function
 * @name applicationApp.controller:ModalWindowCtrl
 * @description
 * # ModalWindowCtrl
 * Controller of the applicationApp
 */
angular.module('applicationApp')
  .controller('ModalWindowCtrl', ['$scope', 'ModalWindow',
    function ($scope, ModalWindow) {
      // Current image displayed
      $scope.currentPicture;
      // Gallery
      var gallery = [];
      // Image index
      var imgIndex = 0;

      // Watch for gallery change
      $scope.$watch(function(){
         return ModalWindow.getGallery();
       },
       function(res){
         gallery = res;
         setPicture();
       });

      // Watch for image index
      $scope.$watch(function(){
          return ModalWindow.getImgIndex();
        },
        function(cur){
          imgIndex = cur;
          setPicture();
        });

      // Close the modal window
      $scope.close = function(){
        ModalWindow.close();
      }

      // Check if image is the first of the gallery
      $scope.isFirstImage = function (){
        return imgIndex == 0;
      }

      $scope.isLastImage = function (){
        return imgIndex+1 == gallery.length;
      }

      // Go to next picture
      $scope.nextPicture = function(){
        if(imgIndex+1 < gallery.length){
          imgIndex++;
          $scope.currentPicture = gallery[imgIndex].url;
        }
      }

      // Go to previous picture
      $scope.previousPicture = function(){
        if(imgIndex>0){
          imgIndex--;
          $scope.currentPicture = gallery[imgIndex].url;
        }
      }

      // Set current picture
      function setPicture(){
        if(gallery.length){
          $scope.currentPicture = imgIndex+1 <= gallery.length ? gallery[imgIndex].url : null;
        }
      }
  }]);
