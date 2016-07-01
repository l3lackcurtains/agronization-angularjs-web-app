var auth = angular.module('authService', []);

// Main Authentication service
auth.factory("Auth", function($http, $q, AuthToken){
	var authFactory = {};

	// Login service
	authFactory.login = function(email, password){
		return $http.post('/signin', {
			email: email,
			password: password
		})
		.success(function(data){
			AuthToken.setToken(data.token);
			return data;
		});
	};

	authFactory.register = function(email, password, name){
		return $http.post('/signup', {
			email: email,
			password: password,
			name: name
		}).success(function(data){
			console.log("User Registered..");
			return data;
		});
	};

	// logout
	authFactory.logout = function(){
		AuthToken.setToken();
	};


	// Check if user is Logged In
	authFactory.isLoggedIn = function(){
		if(AuthToken.getToken()){
			return true;
		}else{
			return false;
		}
	};


	// Get User Info
	authFactory.getUser = function(){
		if(AuthToken.getToken() ){
			return $http.get('/api/me').then(function(user){
				return user.data;
			});
		}else{
			return $q.reject({message: "User has Invalid Token."});
		}
	}

	return authFactory;
});

// Token Service
auth.factory("AuthToken", function($window){
	var authTokenFactory = {};

	// Save token in local storage
	authTokenFactory.setToken = function(token){
		if(token){
			$window.localStorage.setItem("token", token);
		} else{
			$window.localStorage.removeItem('token');
		}
	};

	//get Token from localstorage
	authTokenFactory.getToken = function(){
		return $window.localStorage.getItem('token');
	};

	return authTokenFactory;
});


// Interceptor Service
auth.factory('AuthInterceptor', function($q, $location, AuthToken){
	var interceptorFactory = {};

	interceptorFactory.request = function(config){
		var token = AuthToken.getToken();
		if(token){
			config.headers['x-access-token'] = token;
		}
		return config;
	};
	// If There is no token redirect to login page
	interceptorFactory.responseError = function(response){
		if(response.status == 403){
			$location.path('/login');
		}
		return $q.reject(response);
	};
	return interceptorFactory;
});