(function(){
  'use strict';

  angular.module('MenuApp')
  .controller('CategoriesController', CategoriesController);

  CategoriesController.$inject = ['JsonCategories']
  function CategoriesController(JsonCategories) {
    var categories = this;

    categories.allCategories = JsonCategories

  };


})();
