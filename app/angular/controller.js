(function() { 'use strict';
  angular.module('webcam').controller('webcamController', webcamController);
  webcamController.$inject = ['$scope', '$log'];
  function webcamController($scope, $log) {

    Webcam.set({
      flip_horiz: true,

      // live preview size
      // width: 400,
      // height: 300,
      
      // device capture size
      // dest_width: 677,
      // dest_height: 500,
      
      // final cropped size
      crop_width: 500,
      crop_height: 500,
      
      // format and quality
      image_format: 'jpeg',
      jpeg_quality: 90
    });

    /* jshint validthis: true */
    var vm = this;
    vm.config = {
      delay: 0,
      shots: 1,
      countdown: 0,
      viewerWidth: 400,
      viewerHeight: 300,
      outputWidth: 667,
      outputHeight: 500,
      flashFallbackUrl: 'vendors/webcamjs/webcam.swf',
      shutterUrl: 'shutter.mp3',
      flashNotDetectedText: 'Seu browser não atende os requisitos mínimos para utilização da camera. ' +
      'Instale o ADOBE Flash player ou utilize os browsers (Google Chrome, Firefox ou Edge)'
    };

    vm.showButtons = false;
    vm.captureButtonEnable = false;
    vm.progress = 0;

    vm.onCaptureComplete = function(src) {
      $log.log('webcamController.onCaptureComplete : ', src);
      vm.progress = 100;
      var el = document.getElementById('result');
      var img = document.createElement('img');
      img.src = src[vm.config.shots-1];
      img.width = 300;
      img.height = 300;
      el.appendChild(img);
    };
    vm.onError = function(err) {
      $log.error('webcamController.onError : ', err);
      vm.showButtons = false;
    };
    vm.onLoad = function() {
      $log.info('webcamController.onLoad');
      vm.showButtons = true;
    };
    vm.onLive = function() {
      $log.info('webcamController.onLive');
      vm.captureButtonEnable = true;
    };
    vm.onCaptureProgress = function(src, progress) {
      vm.progress = progress;
      var result = {
        src: src,
        progress: progress
      }
      var el = document.getElementById('result');
      var img = document.createElement('img');
      img.src = src;
      img.width = 667;
      img.height = 500;
      el.appendChild(img);
      $log.info('webcamController.onCaptureProgress : ', result);
    };
    vm.capture = function() {
      $scope.$broadcast('ngWebcam_capture'); };
    vm.on = function() {
      $scope.$broadcast('ngWebcam_on');
    };
    vm.off = function() {
      $scope.$broadcast('ngWebcam_off');
      vm.captureButtonEnable = false;
    };
  }
})();