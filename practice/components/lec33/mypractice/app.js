(function(){
  'use strict';

  angular.module('myComponentApp',[])
  .controller('ShoppingListController', ShoppingListController)
  .service('ListService', ListService)
  .component('listComponent', {
    templateUrl: 'list.html',
    controller: ShoppingComponentController,
    bindings: {
      listTitle: '@',
      allList: '<',
      removeItem: '&'
    }
  });

  function ShoppingComponentController() {
    var $ctrl = this;
    $ctrl.cookiesDetect = function() {
      for (var i=0; i < $ctrl.allList.length; i++) {
        var name = $ctrl.allList[i].name;
        if (name.toLowerCase().indexOf("cookie") !== -1){
          return true;
        }
      }
      return false;
    };

    $ctrl.onRemove = function(index) {
      $ctrl.removeItem({num:index})
    };
  };

  ShoppingListController.$inject=['ListService']
  function ShoppingListController(ListService) {
    var list = this;
    list.title = "컴포넌트 테스트"
    list.itemName = "";
    list.itemQuantity = "";
    list.addItem = function(){
      ListService.itemAdd(list.itemName, list.itemQuantity);
    };

    list.removeItem = function(index){
      list.lastRemoved = list.getList[index].name
      ListService.itemRemove(index);
    };

    list.getList = ListService.getItems();
  };

  function ListService() {
    var service = this;
    var items = [];

    service.itemAdd = function(itemName, itemQuantity) {
      var newItem = {name: itemName, quantity: itemQuantity};
      items.push(newItem);
    };

    service.itemRemove = function(index) {
      items.splice(index,1);
    };

    service.getItems = function(){
      return items;
    };
  };
})();
