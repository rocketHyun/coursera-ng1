(function(){
  'use strict';

  angular.module('UserApp',['ui.router'])
  .service('UsersService', UsersService)
  .controller('UsersController', UsersController)
  .constant('ApiPath', 'http://railsfblogin.herokuapp.com');

    UsersController.$inject=['UsersService'];
    function UsersController(UsersService) {
      var users = this;

      users.email = "";
      users.password = "";
      users.name = "";
      users.allUsers = [];

      users.$onInit = function(){
        UsersService.getUsers();
      };

      users.addUser = function() {
        var newUser = {"email": users.email, "password": users.password, "name": users.name};
        users.allUsers.push(newUser);
        UsersService.addUser(users.email, users.password, users.name)
        .then(function(response){
          console.log(response);
          users.email = "";
          users.password = "";
          users.name = "";
        });
      }

      users.getUsers = function() {
        UsersService.getUsers().then(function(){
          users.allUsers = UsersService.allUsers;
        });
      };

      users.removeUser = function(UserIndex, $index) {
        users.allUsers.splice($index,1);
        UsersService.removeUser(UserIndex)
        .then(function(response){
          console.log(response);
        });
      };

    };

    UsersService.$inject = ['$http', 'ApiPath'];
    function UsersService($http, ApiPath){
      var service = this;

      // service.fbLogin = function() {
      //   var response = $http({
      //     method: "GET",
      //     url: ApiPath + "/users/auth/facebook"
      //   });
      //
      //   return response.
      //
      //
      // };

      service.getUsers = function() {
        var response = $http({
          method: "GET",
          url: ApiPath + "/users.json"
        });
        // return response;
        return response.then(function(res){
          service.allUsers = res.data
        });
      };

      service.getOneUser = function(userId) {

        return $http.get(ApiPath + "/users/" + userId).then(function(response){
          return response;
        });
        // var response = $http({
        //   method: "GET",
        //   url: ApiPath + "/users.json" + userId
        // });
        // return response;
      };

      service.addUser = function(userEmail, userPassword, userName) {
        var UserData = {"user":{"email": userEmail, "password": userPassword, "name": userName}};

        var response = $http({
          method: "POST",
          url: "http://localhost:3000/users",
          data: UserData
        });
        return response;
      }

      service.removeUser = function(index){
        var response = $http({
          method: "DELETE",
          url: "http://localhost:3000/users/"+index
        });
        return response;
      };

      service.updateUser = function(userEmail, userPassword, userName, index){
        var UserData = {"user":{"email": userEmail, "password": userPassword, "name": userName}};

        var response = $http({
          method: "PATCH",
          url: "http://localhost:3000/users/"+index,
          data: UserData
        });
        return response;
      }
    };



})();
