(function(){
  'use strict';

  angular.module('ShoppingList')
  .factory('ShoppingListFactory', ShoppingListFactory);

  function ShoppingListFactory() {
    var factory = function (maxItems) {
      return new ShoppingListService(maxItems)
    };

    return factory;
  }

  function ShoppingListService(maxItems) {
    var service = this;
    var items = [];

    service.addItem = function(itemName, itemQuantity) {
      if((maxItems === undefined)||(maxItems !== undefined) && (items.length < maxItems)) {
        var item = {
          name: itemName,
          quantity: itemQuantity
        };
        items.push(item);
      } else {
        throw new Error("최대 개수(" + maxItems +")에 도달했습니다.")
      }
    };

    service.removeItem = function(num) {
      items.splice(num,1);
    };

    service.getItems = function() {
      return items;
    }
  }
})();
