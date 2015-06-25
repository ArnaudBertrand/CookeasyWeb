(function (){
  'use strict';

  angular
    .module('app')
    .controller('ViewProfileCtrl', ViewProfileCtrl);

  ViewProfileCtrl.$inject = [];

  function ViewProfileCtrl () {
    var vm = this;

    vm.profile = {
      'username': 'Johnny',
      'description': 'I love to eat bananas they are so good !',
      'level': 0,
      'location': 'Kingston',
      'dob': Date.now(),
      'activities': [
        {
          date: Date.now(),
          title: "Arnaud posted a comment in Magic recipe",
          content: {
            text: 'This was an amazing recipe, I\'m looking forward to do it again'
          }
        },
        {
          date: Date.now(),
          title: "Arnaud like a recipe",
          content: {
            title: 'Magic recipe',
            picture: 'http://res.cloudinary.com/hqk7wz0oa/image/upload/c_fill,h_400,w_400/easewg2bn4wtqg37h7lq'
          }
        }
      ],
      'picture': 'http://res.cloudinary.com/hqk7wz0oa/image/upload/c_fill,h_400,w_400/easewg2bn4wtqg37h7lq'
    };
  }
})();
