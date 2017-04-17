(function () {
'use strict';

// 이름, [디펜던시]
angular.module('myFirstApp', [])

// view model
.controller('myFirstController', function ($scope) {
  $scope.name = "Junghyun";
  $scope.sayHello = function () {
    return "Hello junghyun!";
  }
});

})();
