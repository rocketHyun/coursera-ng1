(function(){
'use strict';

angular.module('MyShoppingListApp',[])
.controller('ShoppingListAddController', ShoppingListAddController)
.controller('ShoppingListShowController', ShoppingListShowController)
.service('ShoppingListService', ShoppingListService);

ShoppingListAddController.$inject = ['ShoppingListService'];
function ShoppingListAddController (ShoppingListService) {
  var itemAdder = this;

  itemAdder.itemName = "";
  itemAdder.itemQuantity = "";

  itemAdder.addItem = function() {
    ShoppingListService.addItem(itemAdder.itemName, itemAdder.itemQuantity);
  }
}

ShoppingListShowController.$inject = ['ShoppingListService'];
function ShoppingListShowController (ShoppingListService) {
  var showList = this;

  showList.items = ShoppingListService.getItems;

  showList.deleteItem = function (index) {
    ShoppingListService.deleteItem(index);
  };
}

function ShoppingListService() {
  var service = this;
  var items = [];

  service.addItem = function (itemName, itemQuantity) {
    var item = {
      name: itemName,
      quantity: itemQuantity
    };
    items.push(item);
  };

  service.getItems = items;

  service.deleteItem = function (index) {
    items.splice(index, 1);
  };
}

})();
