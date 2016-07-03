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
			templateUrl: "views/listing-agro.html"
		})
		.when('/agriculture/event/:id/:name', {
			templateUrl: "views/listing-event.html"
		})
		.when('/dashboard', {
			templateUrl: "views/admin/dashboard.html"
		})
		.when('/404', {
			templateUrl: "views/404.html"
		})
		.otherwise({ redirectTo: '/404' });

	$locationProvider.html5Mode(true);
});
