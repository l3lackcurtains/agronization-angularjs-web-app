var dash = angular.module('dashCtrl', []);

dash.controller("DashController", function(Agro, $scope, $location, $window){

	var dash = this;
    dash.showInfo = function(info) {
            $scope.$parent.showInfo(info);
        }

	dash.agroData = {};
    dash.eventData = {};
	// Get Agro info in dashboard
	Agro.getAllAgro().success(function(data){
		dash.agroData = data.message;
	});

    Agro.getAllEvent().success(function(data){
        dash.eventData = data.message;
    });

	// Delete Agro info in dashboard
	dash.agroDel = function(id){
		Agro.delAgro(id).success(function(data){
            dash.showInfo("Deleted Successfully.");
		});
	};

    dash.eventDel = function(id){
        Agro.delEvent(id).success(function(data){
            dash.showInfo("Deleted Successfully.");
        });
    };

	dash.doPutAgro = function(id, name, type, desc, location, ph_no, email, website, lat, lan, image, approve){
            Agro.putAgro(id, name, type, desc, location, ph_no, email, website, lat, lan, image, approve)
            .success(function(data){
                if(data.status){
                    dash.showInfo("Agriculture data edited Successfully.");
                }else{
                    dash.error = data.message;
                    dash.showInfo("Something went wrong. Try again.");
                }
            });
        };

    dash.doPutEvent = function(id, name, type, desc, location, time, ph_no, email, website, lat, lan, image, approve){
            Agro.putEvent(id, name, type, desc, location, time, ph_no, email, website, lat, lan, image, approve)
            .success(function(data){
                if(data.status){
                    dash.showInfo("Event data edited Successfully.");
                }else{
                    dash.error = data.message;
                    dash.showInfo("Something went wrong. Try again.");
                    console.log(data);
                }
            });
        };


});