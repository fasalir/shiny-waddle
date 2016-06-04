var app = angular.module('loginApp', [
		
	]);

app.controller('loginCtrl', function($scope, $http, $location, $cookieStore){
	$scope.name = "john";

	$scope.login = function(){
		console.log("haloooo")
		$http({
			method: 'POST',
			url: '/api/login',
			data: {
				username: $scope.username,
				password: $scope.password
			}
		}).then(function success(res){
			console.log("test")
			if(res.status == 200){
				$cookieStore.put("rs-tkn", res.data.token)
				// $cookies.put('tk', res.data.token)
				$location.path('/dashboard')
			}else{
				console.log("gagal login")
			}
			console.log(res)
		}, function error(err){
			console.log(err)
		})
	}
})