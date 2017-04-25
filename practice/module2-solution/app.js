(function() {
  'use strict';
  angular.module('ShoppingListCheckOff',[])
  .controller('ToBuyController',ToBuyController)
  .controller('AlreadyBoughtController',AlreadyBoughtController)
  .service('ShoppingListCheckOffService',ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;
    toBuy.lists = ShoppingListCheckOffService.getBuyList();
    toBuy.buy =  function(indexNum) {
      ShoppingListCheckOffService.buy(indexNum);
    }
  };

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var alBought = this;
    alBought.lists = ShoppingListCheckOffService.getAlBoughtList();
  };

  // ShoppingListCheckOffService.$inject = [];
  function ShoppingListCheckOffService() {
    var service = this;
    var toBuyList = [
      {name:"cookies", quantity:10},
      {name:"chips", quantity:5},
      {name:"marshmellow", quantity:8},
      {name:"fruit by the foot", quantity:3},
      {name:"doritos", quantity:2}
    ];
    var alBoughtList = [];

    service.buy = function(indexNum) {
      alBoughtList.push(toBuyList[indexNum]);
      toBuyList.splice(indexNum, 1);
    }

    service.getBuyList = function() {
      return toBuyList;
    }

    service.getAlBoughtList = function() {
      return alBoughtList;
    }
  };

})();
