﻿

var app = angular.module('app', [
    'ngRoute',
    'ngTouch',
    'ui.grid',
    'ui.bootstrap',
    'ui.calendar',
    'LocalStorageModule',
    'iMentor.directives'
])

app.config(['$routeProvider', '$locationProvider', '$httpProvider',
    function ($routeProvider, $locationProvider, $httpProvider)
    {
        $routeProvider
            .when('/', { templateUrl: 'home/home', controller: 'homeCtrl' })
            .when('/Login', { templateUrl: 'home/login', controller: 'loginCtrl' })
            .when('/Calendar', { templateUrl: 'home/calendar', controller: 'calendarCtrl' })
            .when('/ManageUsers', { templateUrl: 'Manage/manageUsers', controller: 'manageUsersCtrl' })
            .when('/ManageListings', { templateUrl: 'Manage/manageListings', controller: 'manageListingsCtrl' })
        
            .when('/EditListing/:listingId', { templateUrl: 'Manage/editListing', controller: 'editListingCtrl' })
            .when('/EditUser/:userId', { templateUrl: 'Manage/editUser', controller: 'editUserCtrl' })

            .otherwise({ redirectTo: '/' });

        $locationProvider.html5Mode(false).hashPrefix('!');

        // Globally turn off caching of all data calls
        // Initialize headers
        $httpProvider.defaults.headers.get = $httpProvider.defaults.headers.get || {};

        // Set no cache items
        $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Tue, 01 Jan 1980 1:00:00 GMT';
        $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
        $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
    }
]);

app.run(['$rootScope',
    function($rootScope) {
        $rootScope.currentListing = null;
    }
]);


var serviceBase = 'https://localhost:44300/';
//var serviceBase = 'http://imast.azurewebsites.net/';
app.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase,
    clientId: 'ngAuthApp'
});
