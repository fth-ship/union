var Contacts = new Mongo.Collection('contacts');

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
                })
                .state('contactNew', {
                    url: '/contact/new',
                    templateUrl: 'union-contact-new.ng.html',
                    controller: 'UnionContactNewCtrl'
                });
            
            $urlRouterProvider.otherwise('/');
        }]);

    union
        .controller('UnionCtrl', ['$scope', '$meteor', '$log', function ($scope, $meteor, $log) {
            $log.debug('union controller'); 
            $scope.contacts = $meteor.collection(Contacts).subscribe('contacts');
        }])
        .controller('UnionContactNewCtrl', ['$scope', '$meteor', '$log', function ($scope, $meteor, $log) {
            $log.debug('union contact new controller');
            $scope.form = {};
            $scope.contacts = $meteor.collection(Contacts).subscribe('contacts');
            $scope.addContact = function (form) {
                $log.debug('add contact');
                $scope.contacts.save(form);
                $scope.form = {};
            };
        }]);

    union
        .run(function ($log) {
            $log.debug('running union!');
        });
}

if (Meteor.isServer) {
    Meteor.publish('contacts', function () {
        return Contacts.find({});
    });
}
