(function(){

angular.module('myApp', [])
.controller('ShoppingListController', ShoppingListController)
.factory('ShoppingListFactory', ShoppingListFactory)
.directive('shoppingList', ListDirective);

function ListDirective() {
  var ddo = {
    templateUrl: "list.html",
    scope: {
      itemsz: '<myItems',
      title: '@myTitle',
      onRemove: '&removeItem'
    },
    controller: ShoppingListDirectiveController,
    controllerAs: 'list',
    bindToController: true
  }

  return ddo
}

function ShoppingListDirectiveController () {
  var list = this;
  console.log(this.itemsz);

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
  list.title = "쇼핑리스트 입니다!";

  var shoppingList = ShoppingListFactory();

  list.addItem = function() {
    shoppingList.addItem(list.itemName, list.itemQuantity);
  };

  list.getItems = shoppingList.getItems();

  list.deleteItem = function(indexNum) {
    shoppingList.deleteItem(indexNum);
  }
}

function ShoppingListService() {
  var service = this;
  var items = [];

  service.getItems = function() {
    return items;
  };

  service.addItem = function(name, quantity) {
    var item = {
      name: name,
      quantity: quantity
    };

    items.push(item);
  };

  service.deleteItem = function(indexNum) {
    items.splice(indexNum, 1);
  };
}


function ShoppingListFactory() {
    var factory = function() {
      return new ShoppingListService()
    };

    return factory;
}

})();
