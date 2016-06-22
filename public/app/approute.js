var route = angular.module('AgroRoute', ['ngRoute']);


route.config(function($routeProvider, $locationProvider){
	$routeProvider
		.when('/', {
			templateUrl: "views/home.html"
		})
		.when('/login', {
			templateUrl: "views/login.html"
		})
		.when('/register', {
			templateUrl: "views/register.html"
		})
		.when('/agriculture', {
			templateUrl: "views/listings.html"
		})
		.when('/agriculture/search/:query', {
			templateUrl: "views/search.html"
		})
		.when('/submit-listings', {
			templateUrl: "views/submit-listings.html"
		})
		.when('/test', {
			templateUrl: "views/test.html"
		})
		.when('/agriculture/:id/:name', {
			templateUrl: "views/listing.html"
		})
		.otherwise({ redirectTo: '/' });

	$locationProvider.html5Mode(true);
});
