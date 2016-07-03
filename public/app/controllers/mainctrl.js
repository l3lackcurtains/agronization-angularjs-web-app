var main = angular.module('mainCtrl', []);

main.controller("MainController", function($scope, $rootScope, $location,Auth, NgMap, $mdToast,$mdDialog, $mdMedia){
	var main = this;

	// Is Logged In
	main.LoggedIn = Auth.isLoggedIn();

	// Material dialog box
    $scope.showShare = function(ev) {
    $mdDialog.show(
      $mdDialog.alert({
        title: 'Attention',
        template: '<md-content flex layout-padding>'
        +'SHARE ON: <a href="#"socialshare socialshare-provider="twitter" socialshare-text="Agronization Application" socialshare-hashtags="angularjs, angular-socialshare" socialshare-url="https://agronization.herokuapp.com"><i class="fa fa-twitter"></i></a>'
        +'<a href="#"socialshare socialshare-provider="facebook" socialshare-text="Agronization Application" socialshare-hashtags="angularjs, angular-socialshare" socialshare-url="https://agronization.herokuapp.com"><i class="fa fa-facebook"></i></a>'
        +'<a href="#"socialshare socialshare-provider="google" socialshare-text="Agronization Application" socialshare-hashtags="angularjs, angular-socialshare" socialshare-url="https://agronization.herokuapp.com"><i class="fa fa-google"></i></a>'

        +'</md-content>',
        ok: 'Close'
      })
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .ok('Got it!')
        .targetEvent(ev)
    );
  };

      $scope.showClaim = function(ev) {
	    $mdDialog.show(
	      $mdDialog.alert({
	        title: 'Claim Listing',
	        textContent: 'Claim Listing..',
	        ok: 'Close'
	      })
	        .parent(angular.element(document.querySelector('#popupContainer')))
	        .clickOutsideToClose(true)
	        .ok('Got it!')
	        .targetEvent(ev)
	    );
	  };

	// Check if user is Admin or not


	Auth.getUser().then(function(user){
		$scope.currentUser = user;
		if(user.is_admin){
			main.isAdmin = true;
		}else{
			main.isAdmin = false;
		}
	});

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
				$scope.showInfo("Sucessfully Logged In!");
				
			}else{
				$scope.showInfo("Something went wrong");
				main.error = data.message;
			}
		});
	};
	main.doRegister = function(){
		Auth.register(main.registerData.email, main.registerData.password, main.registerData.name)
		.success(function(data){
			if(data.status){
				$scope.showInfo("User Registered");
				$location.path('/login');
			}else{
				$scope.showInfo("Something went wrong.");
				main.error = data.message;
			}
		});
	};

	main.doLogout = function(){
		Auth.logout();
		$location.path('/');
	};

	var last = {
	      bottom: true,
	      top: false,
	      left: false,
	      right: true
	    };
	  main.toastPosition = angular.extend({},last);
	  main.getToastPosition = function() {
	    sanitizePosition();
	    return Object.keys(main.toastPosition)
	      .filter(function(pos) { return main.toastPosition[pos]; })
	      .join(' ');
	  };
	  function sanitizePosition() {
	    var current = main.toastPosition;
	    if ( current.bottom && last.top ) current.top = false;
	    if ( current.top && last.bottom ) current.bottom = false;
	    if ( current.right && last.left ) current.left = false;
	    if ( current.left && last.right ) current.right = false;
	    last = angular.extend({},current);
	  }
	  

	  main.showActionToast = function() {
	    var pinTo = main.getToastPosition();
	    var toast = $mdToast.simple()
	      .textContent('Marked as read')
	      .action('UNDO')
	      .highlightAction(true)
	      .highlightClass('md-accent')// Accent is used by default, this just demonstrates the usage.
	      .position(pinTo);
	    $mdToast.show(toast).then(function(response) {
	      if ( response == 'ok' ) {
	        alert('You clicked the \'UNDO\' action.');
	      }
	    });
	  };
	  $scope.showInfo = function(info) {
	    var pinTo = main.getToastPosition();
	    $mdToast.show(
	      $mdToast.simple()
	        .textContent(info)
	        .position(pinTo )
	        .hideDelay(3000)
	    );
	 };


    $rootScope.$on("showinfo", function(){
       $scope.showInfo();
    });
    $scope.isOpen = false;
      $scope.demo = {
        isOpen: false,
        count: 0,
        selectedDirection: 'left'
      };

});