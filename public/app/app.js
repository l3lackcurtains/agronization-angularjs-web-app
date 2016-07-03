var app = angular.module('AgroApp', ['ngMap','ngMaterial', 'AgroRoute', '720kb.socialshare', 'mainCtrl', 'dashCtrl', 'authService', 'agroCtrl', 'agroService', 'ngFileUpload']);

app.config(function($httpProvider){
	$httpProvider.interceptors.push("AuthInterceptor");
});
