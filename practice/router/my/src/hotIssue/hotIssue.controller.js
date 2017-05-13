(function(){
  'use strict';

  angular.module('Hongang')
  .controller('HotIssueController', HotIssueController);

  HotIssueController.$inject = ['ApiService']
  function HotIssueController(ApiService) {
    var hotIssue = this;
    hotIssue.search = "";

    hotIssue.$onInit = function() {

      hotIssue.hotNews=[];
      hotIssue.isLoading = true;

      ApiService.getIssue()
      .then(function(response){
        hotIssue.hotNews = response;
        hotIssue.isLoading = false;
      });
    }

    // hotIssue.findNews = function() {
    //
    //   hotIssue.searchNews=[];
    //   hotIssue.isLoading = true;
    //
    //   ApiService.getIssue(hotIssue.search)
    //   .then(function(response){
    //     hotIssue.searchNews = response;
    //     hotIssue.isLoading = false;
    //   });
    // }

  };
})();
