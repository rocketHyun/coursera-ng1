(function(){
'use strict';

angular.module('MyShoppingListApp',[])
.controller('ShoppingList1Controller', ShoppingList1Controller)
.controller('ShoppingList2Controller', ShoppingList2Controller)
// .service('ShoppingListService', ShoppingListService)
// .factory('ShoppingListFactory', ShoppingListFactory)
.provider('ShoppingListService', ShoppingListServiceProvider)
.config(Config);

Config.$inject = ['ShoppingListServiceProvider'];
function Config(ShoppingListServiceProvider) {
  // Save Yaakov from himself
  ShoppingListServiceProvider.defaults.maxItems = 5;
}

ShoppingList1Controller.$inject = ['ShoppingListService'];
function ShoppingList1Controller (ShoppingListService) {
  var list1 = this;

  list1.itemName = "";
  list1.itemQuantity = "";

  list1.addItem = function() {
    ShoppingListService.addItem(list1.itemName, list1.itemQuantity);
  }

  list1.items = ShoppingListService.getItems;

  list1.deleteItem = function (index) {
    ShoppingListService.deleteItem(index);
  };
}


ShoppingList2Controller.$inject = ['ShoppingListService'];
function ShoppingList2Controller (ShoppingListService) {
  var list2 = this;

  list2.itemName = "";
  list2.itemQuantity = "";

  list2.addItem = function() {
    try {
      ShoppingListService.addItem(list2.itemName, list2.itemQuantity);
    } catch (error) {
      list2.errorMessage = error.message;
    }
  }

  list2.items = ShoppingListService.getItems;

  list2.deleteItem = function (index) {
    ShoppingListService.deleteItem(index);
    list2.errorMessage = "";
  };
}

function ShoppingListService(maxItems) {
  var service = this;
  var items = [];

  service.addItem = function (itemName, itemQuantity) {

    if ((maxItems === undefined) || (maxItems !== undefined) && (items.length < maxItems)) {
      var item = {
        name: itemName,
        quantity: itemQuantity
      };
      items.push(item);
    }
    else {
      throw new Error("장바구니 (" + maxItems + "개)가 가득 찼습니다.");
    }
    
  };

  service.getItems = items;

  service.deleteItem = function (index) {
    items.splice(index, 1);
  };
}

// function ShoppingListFactory() {
//   // var factory = function () {
//   //   return new ShoppingListService();
//   // };
//   var factory = {
//     getService: function(maxItems) {
//       return new ShoppingListService(maxItems);
//     }
//   };
//
//   return factory;
// }

function ShoppingListServiceProvider() {
  var provider = this;

  provider.defaults = {
    maxItems: 3
  };

  provider.$get = function() {
    var shoppingList = new ShoppingListService(provider.defaults.maxItems);

    return shoppingList;
  }
}

})();
