(function(){
  'use strict';

  angular
    .module('app')
    .filter('ageFromDob',ageFromDob)
    .filter('formatImg',formatImg)
    .filter('numberFixedLen', numberFixedLen)
    .filter('orderObjectBy', orderObjectBy)
    .filter('range', range)
    .filter('secondsToDateTime', secondsToDateTime);

  function ageFromDob(){
    return function(dob){
      var ageDifMs = Date.now() - dob;
      var ageDate = new Date(ageDifMs);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
  }

  function formatImg(){
    return function(img,w,h){
      return 'http://res.cloudinary.com/hqk7wz0oa/image/upload/c_fill,h_'+h+',w_'+w+'/'+img+'.jpg';
    }
  }

  function numberFixedLen () {
    return function(n, len) {
      var num = parseInt(n, 10);
      len = parseInt(len, 10);
      if (isNaN(num) || isNaN(len)) {
          return n;
      }
      num = ''+num;
      while (num.length < len) {
          num = '0'+num;
      }
      return num;
    };
  }

  function orderObjectBy (){
    return function (items, field, order) {
      var filtered = [];
      angular.forEach(items, function(item) {
        filtered.push(item);
      });
      filtered.sort(function (a, b) {
        return (a[field] > b[field] ? 1 : -1);
      });
      if(order === -1) filtered.reverse();
      return filtered;
    };
  }

  function range(){
    return function (val, range) {
      range = parseInt(range);
      for (var i=0; i<range; i++)
        val.push(i);
      return val;
    };
  }

  function secondsToDateTime (){
    return function(seconds) {
      var d = new Date(0,0,0,0,0,0,0);
      d.setSeconds(seconds);
      return d;
    };
  }
})();
