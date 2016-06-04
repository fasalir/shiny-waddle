var app = angular.module('booking', []);

app.controller('bookingController', bookingController);

function bookingController($scope, $http, $location, $cookies, $filter){

    $scope.names = [1, 2, 3, 4, 5, 6, 7, 8];

    $http({
        method: 'GET',
        url: 'api/adm-panel/booking/find',
        headers: {'access-token': $cookies.get('rs-tkn')}
    }).then(function success(res){
        if(res.status == 401){
            $location.path('/index')
        }else{
            for (var i = 0; i < res.data.data.length; i++) {
                // res.data.data[i].startTime = $filter('date')(res.data.data[i].startTime, "dd/MM/yyyy") +'  ('+ $filter('date')(res.data.data[i].startTime, "HH:mm:ss")+ ')'
                // res.data.data[i].endTime = $filter('date')(res.data.data[i].endTime, "dd/MM/yyyy") +' ('+ $filter('date')(res.data.data[i].endTime, "HH:mm:ss")+ ')'
            };
            $scope.data = res.data.data
        }
        // console.log(res)
    }), function error(err){
        console.log(err)
    }

    $scope.delete = function(data){
        $http({
            method: 'GET',
            url: 'api/booking/delete/'+data._id,
            headers: {'access-token': $cookies.get('rs-tkn')}
        }).then(function success(res){
            console.log(res)
            $scope.data = res.data.data
        }),function error(err){
            console.log(err)
        }
    }
    $scope.save = function(data){
        delete data.__v
        delete data.status
        delete data.bookDate
        if (data.allDay == null)
            delete data.allDay
        else
            data.allDay = data.allDay
        // var a = new Date(data.startTime.getFullYear(), data.startTime.getMonth(), data.startTime.getDate() + data.startTime.getDay(), 0, data.startTime.getMinutes() + data.startTime.getMinutes());
        // var b = new Date(data.endTime.getFullYear(), data.endTime.getMonth(), data.endTime.getDate() + data.endTime.getDay(), 0, data.endTime.getMinutes() + data.endTime.getMinutes());

        console.log(data)
        var apiUrl
        if(data._id){
            apiUrl = 'api/booking/create/'+data._id
        }else{
            apiUrl = 'api/booking/create'
        }
        $http({
            method: 'POST',
            url: apiUrl,
            data: data
        }).then(function success(res){
            if(res.status == 200){
                // console.log(res)
                $('#myModal').modal('hide');
                
                $scope.data = res.data.data
                $scope.book = null
            }else{
                console.log(res.data.errMsg)
            }
        }), function error(){
            console.log(err)
        }
    }


    $scope.edit = function(data){
        console.log(data)
        $scope.book = angular.copy(data)
    }

    $scope.addBook = function(){
        $scope.book = null
    }
};