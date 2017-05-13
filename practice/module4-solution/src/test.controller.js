(function(){
  'use strict';

  angular.module('MenuApp')
  .controller('TestController', TestController);

  TestController.$inject = ['MenuDataService']
  function TestController (MenuDataService) {
    var test = this;

    test.all = [];

    test.getCategories = function() {
      // MenuDataService.getAllCategories()
      // .then(function(response){
      //   console.log(response);
      //   console.log(response.data);
      // });

      // MenuDataService.getItemsForCategory("L")
      // .then(function(response){
      //   console.log(response);
      //   console.log(response.data);
      // });
    }
  };
})();
