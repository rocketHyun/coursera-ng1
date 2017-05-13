(function(){
  'use strict'
  angular.module('shoppingComponents',[])
  .controller('ShoppingController',ShoppingController)
  .service('ShoppingService', ShoppingService)
  .component('shoppingList', {
    templateUrl: 'list.html',
    controller: ShoppingComponentController,
    bindings: {
      listName: '@',
      lists: '<',
      onRemove: '&'
    }
  });

  function ShoppingComponentController() {
    var $ctrl = this;

    $ctrl.cookiesInList = function() {
      for (var i =0; i < $ctrl.lists.length; i++) {
        var name = $ctrl.lists[i].name;
        if (name.toLowerCase().indexOf("cookie") !== -1) {
          return true;
        }
      }

      return false;
    };

    $ctrl.remove = function(index) {
      $ctrl.onRemove({id:index})
    }
  }

  ShoppingController.$inject=['ShoppingService']
  function ShoppingController(ShoppingService) {
    var list = this;
    list.title = "component based list!";
    list.itemName ="";
    list.itemQuantity = "";
    list.addList = function() {
      ShoppingService.addItem(list.itemName, list.itemQuantity);
    };
    list.getList = ShoppingService.getItems();
    list.removeList = function(num) {
      ShoppingService.removeItem(num);
    };
  };

  function ShoppingService() {
    var service = this;
    var items = []
    service.addItem = function(itemName, itemQuantity) {
      var newList = {
        name: itemName,
        quantity: itemQuantity
      };
      items.push(newList);
    }

    service.getItems = function() {
      return items;
    }

    service.removeItem = function(index) {
      items.splice(index,1);
    }
  };
})();
