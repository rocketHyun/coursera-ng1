(function(){
  'use strict';

  angular.module('MenuApp')
  .controller('ItemsController', ItemsController);

  ItemsController.$inject = ['MenuDataService', 'JsonItems'];
  function ItemsController (MenuDataService, JsonItems) {
    var items = this;

    items.allItems = JsonItems;
  };

})();
