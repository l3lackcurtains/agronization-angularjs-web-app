var testctrl = angular.module('testCtrl', ['ngFileUpload']);


testctrl.controller('MyCtrl',function(Upload){
    var vm = this;
    vm.submit = function(){ 
        if (vm.upload_form.file.$valid && vm.file) { 
            vm.upload(vm.file); 
        }
    }
    vm.upload = function (file) {
        Upload.upload({
            url: '/upload', 
            data:{file: file}
        }).then(function (resp) {
            if(resp.data.status === true){ 
                console.log("Successfully uploaded "+ resp.data.message.filename);
            } else {
                console.log('an error occured');
            }
        }, function (resp) { 
            console.log('Error status: ' + resp.status);
        }, function (evt) { 
            console.log(evt);
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            vm.progress = 'progress: ' + progressPercentage + '% ';
        });
    };
});