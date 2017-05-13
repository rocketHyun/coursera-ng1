(function(){
  'use strict';

  angular.module('Hongang')
  .component('loadingComponent', {
    templateUrl: 'src/loading/template/loading.html',
    bindings: {
      isLoading: '<'
    }
  });

})();
