(function(){
  'use strict';

  angular.module('MenuApp')
  .component('itemsComponent', {
    templateUrl: "src/template/itemLists.template.html",
    bindings: {
      list: "<"
    }
  });

})();
