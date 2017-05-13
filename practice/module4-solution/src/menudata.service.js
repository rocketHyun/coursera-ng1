(function(){
  'use strict';

  angular.module('data')
  .service('MenuDataService',MenuDataService);

  MenuDataService.$inject = ['$http'];
  function MenuDataService($http) {
    var menudata = this;

    // getting all categories
    // returns promise
    menudata.getAllCategories = function() {
      var response = $http({
        method: "GET",
        url: "https://davids-restaurant.herokuapp.com/categories.json"
      });
      return response;
    };

    menudata.getItemsForCategory = function (categoryShortName) {
      var response = $http({
        method: "GET",
        url: "https://davids-restaurant.herokuapp.com/menu_items.json?",
        params: { category: categoryShortName }
      });
      return response;
    };


  };
})();
