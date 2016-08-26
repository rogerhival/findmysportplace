'use strict';
var app = angular.module('findmysportplace', ['ui.router', 'angular-loading-bar']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider){
	$locationProvider.html5Mode(true).hashPrefix('!');
	$urlRouterProvider.otherwise('/');
	$httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
	$stateProvider
		.state('/', {
			url: '/',
			templateUrl: '/app/views/home.html',
			controller: 'homeController'
		});
});


app.constant('util', {
	'nearbyApi': 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyB_FQh4b_aR2wi_eKWgGrumPnuEYoB6f4s'
});