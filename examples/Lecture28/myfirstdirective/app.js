(function(){

angular.module('myFirstDirective',[])
.controller('FirstListController', FirstListController)
.controller('SecondListController', SecondListController)
.factory('ShoppingListFactory', ShoppingListFactory)
.directive('listItemDescription', ListItemDescription)
.directive('listItem', ListItem);

function ListItem() {
  var ddo = {
    scope: {
      list: "=myList",
      title: "@myTitle"
    },
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

  var origTitle = "List1";
  list.title = origTitle + "(" + list.items.length + "개)";

  list.addItem = function() {
    shoppingList.addItem(list.itemName, list.itemQuantity);
    list.title = origTitle + "(" + list.items.length + "개)";
  }

  list.deleteItem = function(indexNum) {
    shoppingList.deleteItem(indexNum);
    list.title = origTitle + "(" + list.items.length + "개)";
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

  list.deleteItem = function(indexNum) {
    shoppingList.deleteItem(indexNum);
    list.title = origTitle + "(" + list.items.length + "개)";
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

  service.deleteItem = function(indexNum) {
    items.splice(indexNum,1);
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
