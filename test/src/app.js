(function(){
  'use strict';

  angular.module('UserApp',['ui.router'])
  .service('UsersService', UsersService)
  .controller('UsersController', UsersController)
  .controller('UserShowController', UserShowController)
  .constant('ApiPath', 'http://localhost:3000')
  .config(routeConfig);

  routeConfig.$inject = ['$stateProvider','$urlRouterProvider'];
  function routeConfig($stateProvider,$urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'src/main.html'
      })
      .state('show', {
        url: '/show/{userId}',
        templateUrl: 'src/show.html',
        controller: "UserShowController",
        controllerAs: "user",
        resolve: {
          oneUser: ['UsersService', '$stateParams', function(UsersService, $stateParams){
            return UsersService.getOneUser($stateParams.userId)
                  .then(function(response){
                    return response.data;
                  });
          }]
        }
      });
  }

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
      // .then(function(response){
      //   users.allUsers = response.data;
      //   console.log(response);
      // });
    };

    users.removeUser = function(UserIndex, $index) {
      users.allUsers.splice($index,1);
      UsersService.removeUser(UserIndex)
      .then(function(response){
        console.log(response);
      });
    };

  };

  UserShowController.$inject = ['UsersService','oneUser']
  function UserShowController(UsersService, oneUser) {
    var userShow = this;
    userShow.oneUser = oneUser;

    userShow.updateUser = function($index) {
      console.log("hi");
      // var user = {"email": userShow.oneUser.email, "password": userShow.oneUser.password, "name": userShow.oneUser.name};
      UsersService.updateUser(userShow.oneUser.email, userShow.oneUser.password, userShow.oneUser.name, $index)
      .then(function(response){
        console.log(response);
      });
    };
  }

  UsersService.$inject = ['$http', 'ApiPath'];
  function UsersService($http, ApiPath){
    var service = this;

    // service.allUsers = function() {
    //   service.getUsers
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
