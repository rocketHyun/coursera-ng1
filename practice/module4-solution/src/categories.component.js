(function(){
  'use strict';

  angular.module('MenuApp')
  .component('categoriesComponent', {
    templateUrl: "src/template/categoryLists.template.html",
    bindings: {
      list: '<'
    }
  });

})();
