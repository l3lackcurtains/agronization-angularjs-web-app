var agroser = angular.module('agroService', []);

agroser.factory('Agro', function($http){

	var agroFactory = {};

	agroFactory.getAgro = function(){
		return $http.get('/api/agro');
	};
	agroFactory.getSingleAgro = function(id){
		return $http.get('/api/agro/'+id);
	};

	agroFactory.getAgros = function(query){
		return $http.get('/api/agros/'+query);
	};

	agroFactory.postAgro = function(name, type, desc, location, phone_number, email, website, location_lat, location_lan, image){

		return $http.post('/api/agro', {
			org_name: name,
			org_type: type,
			org_desc: desc,
			org_location: location,
			org_phone_number: phone_number,
			org_email: email,
			org_website: website,
			org_location_lat: location_lat,
			org_location_lan: location_lan,
			org_image: image
		}).success(function(data){
			console.log("Organization submitted successfully.");
			return data;
		});
	};

	return agroFactory;
});