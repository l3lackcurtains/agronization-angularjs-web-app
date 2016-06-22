var main = angular.module('mainCtrl', []);

main.controller("MainController", function($rootScope, $location, Auth, NgMap){
	var main = this;

	// Is Logged In
	main.LoggedIn = Auth.isLoggedIn();

	$rootScope.$on('$routeChangeStart', function(){
		main.LoggedIn = Auth.isLoggedIn();

		Auth.getUser()
		.then(function(data){
			main.user = data;
		});
	});

	main.doLogin = function(){
		Auth.login(main.loginData.email, main.loginData.password)
		.success(function(data){
			Auth.getUser()
				.then(function(data){
					main.user = data;
				});
			if(data.status){
				$location.path('/');
			}else{
				main.error = data.message;
			}
		});
	};
	main.doRegister = function(){
		Auth.register(main.registerData.email, main.registerData.password, main.registerData.name)
		.success(function(data){
			if(data.status){
				$location.path('/login');
			}else{
				main.error = data.message;
			}
		});
	};

	main.doLogout = function(){
		Auth.logout();
		$location.path('/');
	};

});