(function(){
  'use strict';

angular.module('myApp',[])
.controller('ShoppingListController', ShoppingListController)
.controller('ShoppingListDirectiveController', ShoppingListDirectiveController)
.factory('ShoppingListFactory', ShoppingListFactory)
.directive('shoppingList', ShoppingListDirective);

function ShoppingListDirective() {
  var ddo = {
    templateUrl: 'shoppingList.html',
    scope: {
      itemsz: '<myItems',
      titlez: '@title'
    },
    controller: 'ShoppingListDirectiveController as list',
    bindToController: true
  };

  return ddo;
}

function ShoppingListDirectiveController() {
  var list = this;
  console.log(this);

  list.cookiesInList = function () {
    for (var i = 0; i < list.itemsz.length; i++) {
      var name = list.itemsz[i].name;
      if (name.toLowerCase().indexOf("cookie") !== -1) {
        return true;
      }
    }

    return false;
  };

}

ShoppingListController.$inject = ['ShoppingListFactory']
function ShoppingListController(ShoppingListFactory) {
  var list = this;

  list.itemName = "";
  list.itemQuantity = "";
  list.title = "MY SHOPPING LIST!!!!"

  var shoppingList = ShoppingListFactory();
  list.items = shoppingList.getItems();
  list.addItem = function() {
     shoppingList.addItem(list.itemName, list.itemQuantity);
  };
  list.deleteItem = function(indexNum) {
    shoppingList.deleteItem(indexNum);
  }
};

function ShoppingListService(maxNum) {
  var service = this;
  var items = [];

  service.getItems = function() {
    return items;
  }

  service.addItem = function(itemName, itemQuantity) {
    if ((maxNum === undefined) || (maxNum !== undefined) && (items.length < maxNum)) {
      var item = {
        name: itemName,
        quantity: itemQuantity
      };
      items.push(item);
    } else {
      throw new Error("최대 상품 개수 (" + maxNum + "개)에 도달했습니다.");
    }
  };

  service.deleteItem = function(indexNum) {
    items.splice(indexNum,1);
  };
}

function ShoppingListFactory() {
  var factory = function (maxNum) {
    return new ShoppingListService(maxNum);
  };

  return factory;
}

})();
