(function(){
  'use strict';

  angular.module('Hongang')
  .config(Router);

  Router.$inject = ['$stateProvider', '$urlRouterProvider']
  function Router($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/hotissue');

    $stateProvider
      .state('hotissue', {
        url: '/hotissue',
        templateUrl: 'src/hotIssue/template/hotIssueList.html'
      })

      .state('search',{
        url: '/search/{company}',
        templateUrl: 'src/search/template/search.html',
        controller: 'SearchController as search',
        resolve: {
          foundNews: ['$stateParams', 'ApiService', function($stateParams, ApiService){
            return ApiService.getIssue($stateParams.company);
          }]
        }
      })

      .state('search.detail',{
        url: '/detail/{index}',
        templateUrl: 'src/search/template/description.html'
      });
  };
})();
