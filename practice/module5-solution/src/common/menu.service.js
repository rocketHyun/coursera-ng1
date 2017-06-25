(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;
  var userInfo = {};

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };


  service.saveUserInfo = function (shortName, firstName, lastName, email, phoneNumber) {
    return $http.get(ApiPath + '/menu_items/' + shortName + '.json').then(function (response) {
      userInfo = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber, phoneNumber,
        myMenu: response.data
      };
      return response.data;
    });
  };

  //TODO
  service.getUserInfo = function(){
    return userInfo;
  };

}



})();
