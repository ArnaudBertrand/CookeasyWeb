'use strict';

/**
 * @ngdoc function
 * @name applicationApp.controller:ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the applicationApp
 */
angular.module('applicationApp')
  .controller('PictureUploadCtrl',
    ['$scope', 'Upload', function ($scope,Upload) {
      // Auto upload new pictures
      $scope.$watch('files', function(){
        $scope.uploadFile($scope.files);
      });

      // Upload picture
      $scope.uploadFile = function (files){
        if (files && files.length && $scope.targetUrl) {
          var data = {};
          if($scope.targetTags){
            data.tags = $scope.targetTags;
          }
          for (var i = 0; i < files.length; i++) {
            var file = files[i];
            Upload.upload({
              url: $scope.targetUrl,
              method: 'POST',
              file: files,
              data:data
            }).progress(function (evt) {
              $scope.uploadProgress = parseInt(100.0 * evt.loaded / evt.total);
            }).success(function (data, status, headers, config) {
              if($scope.callback){
                $scope.callback(data.picture);
              }
              $scope.uploadProgress = undefined;
            });
          }
        }
      };
    }]);
