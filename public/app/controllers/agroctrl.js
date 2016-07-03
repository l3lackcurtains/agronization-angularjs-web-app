var agroctrl = angular.module('agroCtrl', ['ngFileUpload']);
// var geocoder = new google.maps.Geocoder;

agroctrl.controller('AgroController', function(Agro, $scope, $location){
    var agroGet = this;

	agroGet.agroMarker_lat = [];
	agroGet.agroMarker_lan = [];
	agroGet.agroData = {};
    agroGet.eventData = {};
    agroGet.agro_query = '';

	Agro.getAgro().success(function(data){
		agroGet.agroData = data;
	});

    Agro.getEvent().success(function(data){
        agroGet.eventData = data;
    });

    agroGet.doSearch = function(){
        if(agroGet.agro_query == ''){
             $location.path('/agriculture');
        }else{
            $location.path('/agriculture/search/'+ agroGet.agro_query);
        }
    };

    agroGet.gotoAgroDetail = function(id, name){
        $location.path('/agriculture/'+id+'/'+name);
    };
    agroGet.gotoEventDetail = function(id, name){
        $location.path('/agriculture/event/'+id+'/'+name);
    };

});

agroctrl.controller('AgroSearchController', function($scope,  Agro, $routeParams, $location, $http){
    var agroGet = this;
    agroGet.query = $routeParams.query;
    agroGet.agro_query = '';

    Agro.getAgros($routeParams.query).success(function(data){
        agroGet.agrosData = data;
    });

    Agro.getEvents($routeParams.query).success(function(data){
        agroGet.eventsData = data;
    });

    agroGet.gotoAgroDetail = function(id, name){
        $location.path('/agriculture/'+id+'/'+name);
    };
    agroGet.gotoEventDetail = function(id, name){
        $location.path('/agriculture/event/'+id+'/'+name);
    };

    agroGet.doSearch = function(){
        if(agroGet.agro_query == ''){
             $location.path('/agriculture');
        }else{
            $location.path('/agriculture/search/'+ agroGet.agro_query);
        }
    };
});

agroctrl.controller('AgroSingleController', function($scope,  Agro, $routeParams){
    var agroSingleGet = this;
    Agro.getSingleAgro($routeParams.id).success(function(data){
        agroSingleGet.agroData = data;
    });
    Agro.getSingleEvent($routeParams.id).success(function(data){
        agroSingleGet.eventData = data;
    });

});


agroctrl.controller('AgroPostController',function(Upload, $scope, Agro, NgMap, $location){
    var agroPost = this;
    agroPost.agroData = {};
    agroPost.eventData = {};

    agroPost.showInfo = function(info) {
            $scope.$parent.showInfo(info);
        }

    agroPost.submitImg = function(){
        if (agroPost.agroPost_form.image.$valid && agroPost.file) { 
            agroPost.upload(agroPost.file);
        }
    }
    agroPost.submitDoc = function(){ 
        if (agroPost.agroPost_form.doc.$valid && agroPost.doc) { 
            agroPost.uploaddoc(agroPost.doc); 
            console.log(agroPost.doc);
        }
    }
    agroPost.upload = function (file) {
        Upload.upload({
            url: '/upload', 
            data:{file: file}
        }).then(function (resp) {
            if(resp.data.status === true){ 
                var img_url = $location.protocol() + "://" + $location.host() + ":" + $location.port()+ "/uploads/"+ resp.data.message.filename;
                agroPost.agroData.image = img_url;
            } else {
                console.log('an error occured');
            }
        }, function (resp) { 
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            agroPost.progress = progressPercentage;
        });
    };

    agroPost.uploaddoc = function (file) {
        Upload.upload({
            url: '/upload', 
            data:{file: file}
        }).then(function (resp) {
            if(resp.data.status === true){ 
                var doc_url = $location.protocol() + "://" + $location.host() + ":" + $location.port()+ "/uploads/"+ resp.data.message.filename;
                agroPost.agroData.doc = doc_url;
            } else {
                console.log('an error occured');
            }
        }, function (resp) { 
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            //var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        });
    };


    NgMap.getMap().then(function(map) {
        agroPost.map = map;
      });

    agroPost.placeChanged = function() {
        agroPost.place = this.getPlace();
        agroPost.map.setCenter(agroPost.place.geometry.location);
        agroPost.markerPos = agroPost.place.geometry.location;

        agroPost.agroData.location = agroPost.place.formatted_address;

        agroPost.eventData.location = agroPost.place.formatted_address;

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
                };

                agroPost.agroData.location_lat = pos.lat;
                agroPost.agroData.location_lan = pos.lng; 

                agroPost.eventData.location_lat = pos.lat;
                agroPost.eventData.location_lan = pos.lng;    
            });
          }

        NgMap.getMap().then(function(map) {
            agroPost.map = map;
        });
      };

    agroPost.dosmth = function(e) {
        var marker = new google.maps.Marker({position: e.latLng});
        var pos = e.latLng.toString();
        pos = pos.split(","); 
        mlat = pos[0].split("(");
        mlng = pos[1].split(")");
        lat = mlat[1];
        lng = mlng[0];

        agroPost.agroData.location_lat = lat;
        agroPost.agroData.location_lan = lng;

        agroPost.eventData.location_lat = lat;
        agroPost.eventData.location_lan = lng;
    }
   
    // Post Agro Data

        agroPost.doPostAgro = function(){
    		Agro.postAgro(agroPost.agroData.name, agroPost.agroData.type,
                agroPost.agroData.desc, agroPost.agroData.location,
                agroPost.agroData.phone_number, agroPost.agroData.email,
                agroPost.agroData.website, agroPost.agroData.location_lat,
                agroPost.agroData.location_lan, agroPost.agroData.image, agroPost.agroData.doc, $scope.$parent.currentUser._id, $scope.$parent.currentUser.name)
    		.success(function(data){
    			if(data.status){
    				$location.path('/');
                    agroPost.showInfo("Agriculture data submitted Successfully.");
    			}else{
    				agroPost.error = data.message;
                    agroPost.showInfo("Something went wrong. Try again.");
    			}
    		});
    	};




        // Post Event Datas
        agroPost.doPostEvent = function(){
            Agro.postEvent(agroPost.eventData.name, agroPost.eventData.type,
                agroPost.eventData.desc, agroPost.eventData.time,  agroPost.eventData.location,
                agroPost.eventData.phone_number, agroPost.eventData.email,
                agroPost.eventData.website, agroPost.eventData.location_lat,
                agroPost.eventData.location_lan, agroPost.eventData.image, $scope.$parent.currentUser._id, $scope.$parent.currentUser.name)
            .success(function(data){
                if(data.status){
                    $location.path('/');
                    agroPost.showInfo("Event data submitted Successfully.");
                }else{
                    agroPost.error = data.message;
                    agroPost.showInfo("Something went wrong. Try again.");
                }
            });
        };

});
