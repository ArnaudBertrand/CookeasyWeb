(function(){
  'use strict';

  angular
    .module('app')
    .directive('pictureUpload', pictureUpload);

  function pictureUpload () {
    return {
      templateUrl: '/widgets/picture-upload.html',
      restrict: 'EA',
      scope: {
        callback: '=',
        targetUrl: '=',
        targetTags: '=',
        imageUploaded: '='
      },
      controller: PictureUploadCtrl,
      controllerAs: 'pictureUpload',
      bindToController: true
    };
  }

  PictureUploadCtrl.$inject = ['$scope','Upload'];
  function PictureUploadCtrl ($scope,Upload) {
    var vm = this;

    vm.uploadFile = uploadFile;

    $scope.$watch(function(){
      return vm.files;
    }, function(){
      uploadFile(vm.files);
    });

    function uploadFile (files){
      if (files && files.length && vm.targetUrl) {
        var data = {};
        if(vm.targetTags){
          data.tags = vm.targetTags;
        }
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          Upload.upload({
            url: vm.targetUrl,
            method: 'POST',
            file: files,
            data:data
          }).progress(function (evt) {
            vm.uploadProgress = parseInt(100.0 * evt.loaded / evt.total);
          }).success(function (data, status, headers, config) {
            if(vm.callback){
              vm.callback(data.picture);
            }
            vm.uploadProgress = undefined;
          });
        }
      }
    }
  }
})();
