var agroser = angular.module('agroService', []);

agroser.factory('Agro', function($http){

	var agroFactory = {};
	// agro
	agroFactory.getAgro = function(){
		return $http.get('/api/agro');
	};
	agroFactory.getAllAgro = function(){
		return $http.get('/api/allagro');
	};
	agroFactory.delAgro = function(id){
		return $http.delete('/api/agro/'+id);
	};
	agroFactory.getSingleAgro = function(id){
		return $http.get('/api/agro/'+id);
	};

	agroFactory.getAgros = function(query){
		return $http.get('/api/agros/'+query);
	};

	//event
	agroFactory.getEvent = function(){
		return $http.get('/api/event');
	};
	agroFactory.getAllEvent = function(){
		return $http.get('/api/allevent');
	};
	agroFactory.delEvent = function(id){
		return $http.delete('/api/event/'+id);
	};
	agroFactory.getSingleEvent = function(id){
		return $http.get('/api/event/'+id);
	};

	agroFactory.getEvents = function(query){
		return $http.get('/api/events/'+query);
	};
	
	

	agroFactory.postAgro = function(name, type, desc, location, phone_number, email, website, location_lat, location_lan, image, doc, user_id, posted_by){

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
			org_image: image,
			org_doc: doc,
			user_id: user_id,
			posted_by: posted_by
		}).success(function(data){
			console.log("Organization submitted successfully.");
			return data;
		});
	};

	agroFactory.postEvent = function(name, type, desc, time, location, phone_number, email, website, location_lat, location_lan, image, user_id, posted_by){

		return $http.post('/api/event', {
			ev_name: name,
			ev_type: type,
			ev_desc: desc,
			ev_time: time,
			ev_location: location,
			ev_phone_number: phone_number,
			ev_email: email,
			ev_website: website,
			ev_location_lat: location_lat,
			ev_location_lan: location_lan,
			ev_image: image,
			user_id: user_id,
			posted_by: posted_by
		}).success(function(data){
			console.log("Organization submitted successfully.");
			return data;
		});
	};

	agroFactory.putAgro = function(id, name, type, desc, location, phone_number, email, website, location_lat, location_lan, image, approve){

		return $http.put('/api/agro/'+id, {
			org_name: name,
			org_type: type,
			org_desc: desc,
			org_location: location,
			org_phone_number: phone_number,
			org_email: email,
			org_website: website,
			org_location_lat: location_lat,
			org_location_lan: location_lan,
			org_image: image,
			is_approved: approve
		}).success(function(data){
			return data;
		});
	};

	agroFactory.putEvent = function(id, name, type, desc, location, time,  phone_number, email, website, location_lat, location_lan, image, approve){

		return $http.put('/api/event/'+id, {
			ev_name: name,
			ev_type: type,
			ev_desc: desc,
			ev_location: location,
			ev_time: time,
			ev_phone_number: phone_number,
			ev_email: email,
			ev_website: website,
			ev_location_lat: location_lat,
			ev_location_lan: location_lan,
			ev_image: image,
			is_approved: approve
		}).success(function(data){
			console.log("Event Edited successfully.");
			return data;
		});
	};
	return agroFactory;
});