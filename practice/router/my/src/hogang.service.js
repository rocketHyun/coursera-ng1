(function(){
  'use strict';

  angular.module('Hongang')
  .service('ApiService', ApiService);

  ApiService.$inject= ['$http']
  function ApiService($http) {
    var service = this;
    var newsList = [];

    // service.getCompany = function(searchTerm) {
    //   service.getIssue(searchTerm);
    // }

    service.getIssue = function(searchTerm){
      if (searchTerm === undefined) {
        var response = $http({
          method:"GET",
          url:"http://localhost:3000/news"
        });

        newsList = [];

        return response.then(
          function(response){
            var news = response.data;
            for (var i=0; i<news.length;i++){
              newsList.push(news[i]);
            }
            return newsList;
          }
        )
        .catch(function(error){
          console.log("Something went wrong~!")
        });
      } else {
        var response = $http({
          method:"GET",
          url:"http://localhost:3000/news/"+searchTerm
        });

        newsList = [];

        return response.then(
          function(response){
            var news = response.data;
            for (var i=0; i<news.length;i++){
              newsList.push(news[i]);
            }
            return newsList;
          }
        )
        .catch(function(error){
          console.log("Something went wrong~!")
        });

      }
    };

    service.getNews = newsList;


  };
})();
