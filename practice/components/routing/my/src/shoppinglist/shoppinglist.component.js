(function(){
  'use strict';

  angular.module('ShoppingList')
  .component('listComponent', {
      templateUrl: 'src/shoppinglist/template/shoppinglist.template.html',
      controller: ShoppingListComponentController,
      bindings: {
        items: "<",
        title: "@",
        onRemove: "&"
      }
  });

  ShoppingListComponentController.$inject = ['$rootScope', '$element', '$q', 'WeightLossFilterService']
  function ShoppingListComponentController($rootScope, $element, $q, WeightLossFilterService) {
    var $ctrl = this;
    var totalItems;

    $ctrl.$onInit = function () {
      totalItems = 0;
    };

    $ctrl.$doCheck = function() {
      if ($ctrl.items.length !== totalItems) {
        totalItems = $ctrl.items.length;

        $rootScope.$broadcast('shoppinglist:processing', {on: true});
        var promises = [];

        for (var i = 0; i < $ctrl.items.length; i++) {
          promises.push(WeightLossFilterService.checkName($ctrl.items[i].name));
        }

        $q.all(promises).then(function(result){
          var warningElem =  $element.find('div.error');
          warningElem.slideUp(900);

        })
        .catch(function (result) {
          // Show cookie warning
          var warningElem = $element.find('div.error');
          warningElem.slideDown(900);
        })
        .finally(function () {
          $rootScope.$broadcast('shoppinglist:processing', { on: false });
        });
      }
    }


    $ctrl.removeItem = function(num) {
      $ctrl.onRemove({index:num});
    };
  };


})();
