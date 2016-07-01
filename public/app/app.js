var app = angular.module('AgroApp', ['ngMap','ngMaterial', 'AgroRoute', 'mainCtrl', 'dashCtrl', 'authService', 'agroCtrl', 'agroService', 'ngFileUpload']);

app.config(function($httpProvider){
	$httpProvider.interceptors.push("AuthInterceptor");
});
