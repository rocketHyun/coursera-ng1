(function(){
"use strict";

angular.module('public')
.controller('UserController', UserController);

UserController.$inject=['MenuService', 'ApiPath'];
function UserController(MenuService, ApiPath) {
  var $ctrl = this;
  $ctrl.firstName = "";
  $ctrl.lastName = "";
  $ctrl.email = "";
  $ctrl.phoneNumber = "";
  $ctrl.menuNumber = "";
  $ctrl.userInfo = MenuService.getUserInfo();
  $ctrl.ApiPath = ApiPath;

  $ctrl.submit = function() {
    MenuService.saveUserInfo($ctrl.menuNumber, $ctrl.firstName, $ctrl.lastName, $ctrl.email, $ctrl.phoneNumber)
    .then(function(response){
      $ctrl.error = "";
      $ctrl.success = "Your information has been saved";
    }, function(response){
      $ctrl.error = "No such menu number exists";
      $ctrl.success = "";
    });
  };

}

})();
