(function(){
  'use strict';

angular.module('MyListApp',[])
.controller('ListController', ListController)
.provider('ListService', ListServiceProvider);

ListController.$inject = ['ListServiceProvider']
function ListController(ListServiceProvider) {
  var list = this;

  list.items = [];
  list.itemName = "";
  list.itemQuantity = "";

  list.maxItem = 5;

  list.addItem = function (){
    if (list.items.length < list.maxItem) {
      list.errorMessage = ""
      var add = {
        name: list.itemName,
        quantity: list.itemQuantity
      }
      list.items.push(add);
    }
    else{
      list.errorMessage = "최대 개수(" + list.maxItem + ")에 도달했습니다!"
    }
  }

  list.deleteItem = function(itemIndex){
    list.errorMessage = ""
    list.items.splice(itemIndex, 1);
  }
};

function ListService(maxItems) {
  var service = this;

  var items = [];

  service.addItem = function (itemName, itemQuantity) {
    if ((maxItmes === undefined) ||
        (maxItems !== undefined) && (items.length < maxItems)) {
      var item = {
        name: itemName,
        quantity: itemQuantity
      };
      items.push(item);
    }
    else{
      throw new Error("Max items (" + maxItems + ") reached.");
    }
  };

  service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return items;
  };
}

function ListServiceProvider() {
  var provider = this;

  provider.defaults = {
    maxItems: 10
  };

  provider.$get = function() {
    var List = new ListService(provider.defaults.maxItems);

    return List;
  };
}

})();
