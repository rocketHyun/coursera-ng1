(function(){
  'use strict';

  angular.module('MenuApp')
  .config(Router);

  Router.$inject = ['$stateProvider', '$urlRouterProvider'];
  function Router($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

      $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'src/template/home.template.html'
      })

      .state('categories', {
        url: '/categories',
        templateUrl: 'src/template/categories.template.html',
        controller: "CategoriesController as categories",
        resolve: {
          JsonCategories: ['MenuDataService', function(MenuDataService){
            return MenuDataService.getAllCategories()
                  .then(function(response){
                    return response.data;
                  });
          }]
        }
      })

      .state('items', {
        url: '/{categoryName}/items',
        templateUrl: 'src/template/items.template.html',
        controller: "ItemsController as items",
        resolve: {
          JsonItems: ['MenuDataService', '$stateParams', function(MenuDataService, $stateParams){

            return MenuDataService.getItemsForCategory($stateParams.categoryName)
                  .then(function(response){
                    return response.data.menu_items;
                  });
          }]
        }
      });

  };
})();
