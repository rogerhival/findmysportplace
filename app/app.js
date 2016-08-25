'use strict';
var app = angular.module('findmysportplace', ['ui.router', 'angular-loading-bar']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider){
	$locationProvider.html5Mode(true).hashPrefix('!');
	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('/', {
			url: '/',
			templateUrl: '/app/views/home.html',
			controller: 'homeController'
		});
});


app.constant('const', {
	'nearbyApi': 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyDlQpdRR_0vBWk-XAff2hDU8HTApgQ0R-A'
});