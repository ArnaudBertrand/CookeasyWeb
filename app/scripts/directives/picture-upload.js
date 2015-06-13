'use strict';

/**
 * @ngdoc directive
 * @name applicationApp.directive:pictureUpload
 * @description
 * # pictureUplaod
 */
angular.module('applicationApp')
  .directive('pictureUpload', function () {
    return {
      templateUrl: 'views/picture-upload.html',
      restrict: 'E',
      scope: {
        callback: '=',
        targetUrl: '=',
        targetTags: '=',
        imageUploaded: '='
      }
    };
  });
