var app = angular.module('AgroApp', ['ngMap','AgroRoute', 'mainCtrl', 'authService', 'agroCtrl', 'agroService', 'ngFileUpload']);

app.config(function($httpProvider){
	$httpProvider.interceptors.push("AuthInterceptor");
});

