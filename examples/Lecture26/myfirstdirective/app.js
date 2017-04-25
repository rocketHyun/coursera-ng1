(function(){

angular.module('myFirstDirective',[])
.controller('FirstListController', FirstListController)
.controller('SecondListController', SecondListController)
.factory('ShoppingListFactory', ShoppingListFactory)
.directive('listItemDescription', ListItemDescription)
.directive('listItem', ListItem);

function ListItem() {
  var ddo = {
    templateUrl: 'listItem.html'
  };
  return ddo;
}

function ListItemDescription() {
  var ddo = {
    template: '{{item.name}}({{item.quantity}}개)'
  };

  return ddo;
}

FirstListController.$inject = ['ShoppingListFactory'];
function FirstListController (ShoppingListFactory) {
  var list = this;
  var shoppingList = ShoppingListFactory();

  list.items = shoppingList.getItems();
  list.itemName = "";
  list.itemQuantity = "";

  list.addItem = function() {
    shoppingList.addItem(list.itemName, list.itemQuantity);
  }
}

SecondListController.$inject = ['ShoppingListFactory']
function SecondListController (ShoppingListFactory){
  var list = this;
  var shoppingList = ShoppingListFactory(5);

  list.items = shoppingList.getItems();
  list.itemName = "";
  list.itemQuantity = "";

  list.addItem = function() {
    try {
      shoppingList.addItem(list.itemName, list.itemQuantity);
    } catch (error) {
      list.errorMessage = error.message;
    }
  }
}

function ShoppingListService (maxNum) {
  var service = this;

  var items = [];

  service.addItem = function(itemName, quantity) {
    if ((maxNum === undefined) || (maxNum !== undefined) && (items.length < maxNum)) {
      var item = {
        name: itemName,
        quantity: quantity
      };

      items.push(item);
    }
    else {
      throw new Error("Max items (" + maxNum + ") reached.");
    }
  };

  service.getItems = function () {
    return items;
  };
}

function ShoppingListFactory() {
  var factory = function (maxNum) {
    return new ShoppingListService(maxNum);
  };

  return factory;
}

})();
