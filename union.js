if (Meteor.isClient) {
    var union = angular.module('union', ['angular-meteor', 'ui.router']);
    
    union
        .config(['$urlRouterProvider', '$stateProvider', '$locationProvider', function ($urlRouterProvider, $stateProvider, $locationProvider) {
           $locationProvider.html5Mode(true);  

           $stateProvider
                .state('union', {
                    url: '/',
                    templateUrl: 'union.ng.html',
                    controller: 'UnionCtrl'
                });
            
            $urlRouterProvider.otherwise('/');
        }]);

    union
        .controller('UnionCtrl', ['$scope', '$meteor', '$log', function ($scope, $meteor, $log) {
            $log.debug('union controller'); 
            $scope.message = "testing";
        }]);

    union
        .run(function ($log) {
            $log.debug('running union!');
        });
}

if (Meteor.isServer) {
}
