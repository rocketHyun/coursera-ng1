(function(){
  'use strict';

  angular.module('Hongang')
  .controller('SearchController',SearchController);

  SearchController.$inject = ['foundNews']
  function SearchController(foundNews){

    var search = this;

    search.getNews = foundNews;
  };

})();
