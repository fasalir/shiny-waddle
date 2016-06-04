var app = angular.module('member', ['ui.bootstrap']);

app.controller('memberController', memberController);
app.controller('ModalInstanceCtrl ', ModalInstanceCtrl);

// memberController.$inject = [ '$scope', '$http', '$modal',];

function memberController($scope, $http, $location, $cookies, $uibModal){
    $http({
        method: 'GET',
        url: 'api/member/find',
        headers: {'access-token': $cookies.get('rs-tkn')}
    }).then(function success(res){
        if(res.status == 401){
            $location.path('/index')
        }else{
            $scope.data = res.data.data
        }
        // console.log(res)
    }), function error(err){
        console.log(err)
    }

    $scope.save = function(data, booking){
        // console.log('choices', booking)
        console.log(data)
        var apiUrl
        if(data._id){
            apiUrl = 'api/member/store/'+data._id
        }else{
            apiUrl = 'api/member/store'
        }
        // delete data.status
        // data.booking = $scope.choices;
        $http({
            method: 'POST',
            url: apiUrl,
            data: {
                nama: data.nama || null,
                alamat: data.alamat || null,
                telepon: data.telepon,
                booking: booking,
                status: 'member'
            }
        }).then(function success(res){
            if(res.status == 200){
                // console.log(res)
                $('#myModal').modal('hide');
                
                $scope.data = res.data.data
            }else{
                console.log(res.data.errMsg)
            }
        }), function error(){
            console.log(err)
        }
    }

    $scope.delete = function(data){
        // console.log(data)
        $http({
            method: 'GET',
            url: 'api/member/delete/'+data._id,
            headers: {'access-token': $cookies.get('rs-tkn')}
        }).then(function success(res){
            if(res.status == 200){
                $scope.data = res.data.data
            }else{
                console.log(res.data.errMsg)
            }
        }),function error(err){
            console.log(err)
        }
    }

    $scope.freeForm = function(){
        console.log('free')
        $scope.member = null
        $scope.inputs = null
    }

    $scope.open = function(data){
        console.log(data)
        $scope.member = angular.copy(data)
        $scope.inputs = angular.copy(data.booking)
    }


    $scope.inputs = [];
    $scope.addfield = function () {
        $scope.inputs.push({})
    }
    $scope.delItem = function (item) {
        console.log(item)
        var index = $scope.inputs.indexOf(item);
        $scope.inputs.splice(index, 1);
    }

};


function ModalInstanceCtrl($scope, $http, $location, $cookies){
    console.log('fsfkdsndfkds')
    $scope.items = items;
    $scope.selected = {
        name: $scope.items.name,
        serial: $scope.items.serial
    };

    $scope.ok = function () {
        $modalInstance.close($scope.selected);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}   