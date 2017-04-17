(function (){
  'use strict';

  angular.module('LunchCheck', [])

  .controller('LunchCheckController', LunchChecker);

  LunchChecker.$inject = ['$scope'];

  function LunchChecker ($scope) {
    $scope.lunches = "";
    $scope.message = "";
    $scope.fontColor = "";
    $scope.borderColor = "";

    $scope.verifyLunch = function() {
      var numOfLunch = $scope.lunches.replace(/\s+/g, '').split(',').filter(Boolean).length;

      if (numOfLunch == 0) {
        $scope.message = "Please enter data first"
        $scope.fontColor = "red";
        $scope.borderColor = "border-red";
      }
      else {
        if (numOfLunch <= 3) {
          $scope.message = "Enjoy!";
        }
        else if (numOfLunch > 3) {
          $scope.message = "Too much!!";
        }

        $scope.fontColor = "green";
        $scope.borderColor = "border-green";
      }
    }
  }
})();
