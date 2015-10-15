angular
  .module('timerApp')
  .config(
    ['$routeProvider',
      function($routeProvider) {
        $routeProvider
          .when('/', {
            templateUrl: 'app/views/home/index.html',
            module: 'Home',
            controller: 'HomeCtrl'
          })

          .when('/clocking', {
            templateUrl: 'app/views/home/clocking.html',
            module: 'Home',
            controller: 'ClockingCtrl'
          })

          .when('/break', {
            templateUrl: 'app/views/home/break.html',
            module: 'Home',
            controller: 'BreakCtrl'
          });
  }]);
