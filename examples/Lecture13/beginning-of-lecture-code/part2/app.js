(function () {
'use strict';

angular.module('MsgApp', [])
.controller('MsgController', MsgController)
.filter('custom', customFilter)
.filter('custom2', custom2Filter);

MsgController.$inject = ['$scope'];
function MsgController($scope) {
  $scope.stateOfBeing = "hungry";
  var msg = "Yaakov likes to eat healthy snacks at night!";

  $scope.sayMessage = function () {
    return msg;
  };

  $scope.feedYaakov = function () {
    $scope.stateOfBeing = "fed";
  };
}

function customFilter() {
  return function(input, target, replace) {
    input = input || "";
    input = input.replace(target, replace);
    return input;
  };
}

function custom2Filter() {
  return function(input, target, replace) {
    input = input || "";
    input = input.replace(target, replace);
    return input;
  };
}

})();
