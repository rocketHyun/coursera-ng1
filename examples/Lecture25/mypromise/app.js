(function(){
'use strict';

angular.module('RestaurantApp',[])
.controller('CategoryListController', CategoryListController)
.service('MenuCategoriesService', MenuCategoriesService);

CategoryListController.$inject = ['MenuCategoriesService'];
function CategoryListController(MenuCategoriesService) {
  var category = this;

  var promise = MenuCategoriesService.getMenuCategories();

  promise.then(function(response){
    category.list = response.data;
  })
  .catch(function(error){
    console.log("Something went wrong!")
  });

  category.logMenuItems = function (shortName) {
    var promise = MenuCategoriesService.getCategoryMenus(shortName)

    promise.then(function(response){
      console.log(response.data)
    })
    .catch(function(error){
      console.log(error)
    });
  }

}

MenuCategoriesService.$inject = ['$http'];
function MenuCategoriesService ($http) {
  var service = this;

  service.getMenuCategories = function() {
    var response = $http({
      method: "GET",
      url:"http://davids-restaurant.herokuapp.com/categories.json"
    });

    return response;
  };

  service.getCategoryMenus = function(shortName){
    var response = $http({
      method: "GET",
      url:"http://davids-restaurant.herokuapp.com/menu_items.json",
      params: {
        category: shortName
      }
    });

    return response;
  };
}

})();
