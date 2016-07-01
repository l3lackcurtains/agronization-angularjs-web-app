var dash = angular.module('dashCtrl', []);

dash.controller("DashController", function(Agro, $scope, $location, $window){

	var dash = this;
    dash.showInfo = function(info) {
            $scope.$parent.showInfo(info);
        }

	dash.agroData = {};
	// Get Agro info in dashboard
	Agro.getAllAgro().success(function(data){
		dash.agroData = data.message;
	});

	// Delete Agro info in dashboard
	dash.dashDel = function(id){
		Agro.delAgro(id).success(function(data){
            dash.showInfo("Deleted Successfully.");
		});
	};

	dash.doPutAgro = function(id, name, type, desc, location, ph_no, email, website, lat, lan, image){
            Agro.putAgro(id, name, type, desc, location, ph_no, email, website, lat, lan, image)
            .success(function(data){
                if(data.status){
                    dash.showInfo("Agriculture data edited Successfully.");
                }else{
                    dash.error = data.message;
                    dash.showInfo("Something went wrong. Try again.");
                }
            });
        };

    dash.doApproveAgro = function(id, status, name, type, desc, location){
        Agro.approveAgro(id, status, name, type, desc, location)
            .success(function(data){
                if(data.status){
                    //dash.showInfo("Agriculture data Approved Successfully.");
                }else{
                    dash.error = data.message;
                    console.log(data);
                    dash.showInfo("Something went wrong. Try again.");
                }
            });
    }

});