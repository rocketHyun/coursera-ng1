(function(){
  'use strict';

  angular.module('ShoppingList')
  .controller('ShoppingListController', ShoppingListController);


  ShoppingListController.$inject = ['ShoppingListFactory']
  function ShoppingListController(ShoppingListFactory) {
    console.log("크크");
    var list = this;

    var shoppingList = ShoppingListFactory();

    list.items = shoppingList.getItems();
    var origTitle = "Shopping List #1";
    list.title = origTitle + " (" + list.items.length + " 개) ";

    list.itemName = "";
    list.itemQuantity = "";

    list.addItem = function() {
      shoppingList.addItem(list.itemName, list.itemQuantity);
      list.title = origTitle + " (" + list.items.length + " 개 )";
    };

    list.removeItem = function (index) {
      this.lastRemoved = "Last item removed was " + this.items[index].name;
      shoppingList.removeItem(index);
      this.title = origTitle + " (" + this.items.length + " 개 )";
    };

  }

})();
