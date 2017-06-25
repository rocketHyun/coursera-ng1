(function(){
  "use strict";

  angular.module('promise', [])
  .service('PromiseService',PromiseService)
  .controller('PromiseController',PromiseController);

  PromiseService.$inject=['$http'];
  function PromiseService($http) {
    var service = this;

    service.getItems = function() {
      return $http.get('https://hyun-restaurant-server.herokuapp.com/categories.json')
      .then(function (response) {
        return response.data;
      });
    };
  }

  PromiseController.$inject=['PromiseService'];
  function PromiseController(PromiseService) {
    var ctrl = this;
    ctrl.items = ""
    ctrl.getItems = function() {
      // ctrl.items = PromiseService.getItems();
      PromiseService.getItems().then(function(response){
        ctrl.items = response;
      });
    };
  }
})();
