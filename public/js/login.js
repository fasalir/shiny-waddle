var app = angular.module('loginApp', []);

app.controller('loginCtrl', function($scope, $http, $window, $location, $cookieStore, $cookies, datasuccess, $route){
 //console.log($cookieStore.get('rs-tkn'))
if($cookieStore.get('rs-tkn')===undefined){
  console.log($cookieStore.get('rs-tkn')==undefined)
  $scope.isLoggedIn = false
  $scope.showPanel = false;
}else{
  $scope.isLoggedIn = true
  $scope.showPanel = true;
}
 // $scope.test = 'adasdsadadadadads';
    var self = this;
    self.handler = datasuccess;
    datasuccess.asdf();
    // console.log(datasuccess.data
        
	$scope.showModal = false;
    $scope.buttonClicked = "";
    $scope.toggleModal = function(btnClicked){
        console.log($scope.buttonClicked)
        $scope.buttonClicked = btnClicked;
        $scope.showModal = !$scope.showModal;
    };

    $scope.logout = function(){
        $cookies.remove("rs-tkn");
        $window.location.reload()
    }

	$scope.login = function(){
		$http({
			method: 'POST',
			url: '/api/login',
			data: {
				username: $scope.username,
				password: $scope.password
			}
		}).then(function success(res){

			if(res.status == 200){
                $scope.isLoggedIn = true
				$cookieStore.put("rs-tkn", res.data.token);
                $('#loginApp').modal('hide');

				$location.path('/index')
			}else{
				console.log("gagal login")
			}
			$window.location.reload()
			console.log(res)
		}, function error(err){
			console.log(err)
		})
	}
})

app.factory('datasuccess', function(){
    var self;
    return self = {
          data :function(data) {
            self.data = data;
            console.log(self.data);
            return self.data;
          },
          asdf: function() {
            self.token = "token";
            // console.log(self.token);
          }
              
      }
})

app.directive('modal', function () {
    return {
        template: '<div class="modal fade">' + 
                '<div class="modal-dialog">' + 
                    '<div class="modal-content">' + 
                        '<div class="modal-header">' + 
                            '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + 
                            '<h4 class="modal-title">{{ buttonClicked }} clicked!!</h4>' + 
                        '</div>' + 
                    '<div class="modal-body" ng-transclude></div>' + 
                '</div>' + 
            '</div>' + 
        '</div>',
        restrict: 'E',
        transclude: true,
        replace:true,
        scope:true,
        link: function postLink(scope, element, attrs) {
            scope.$watch(attrs.visible, function(value){
                if(value == true)
                    //console.log('show')
                    $(element).modal('show');
                else
                    //console.log('hide')
                    $(element).modal('hide');
            });

            $(element).on('shown.bs.modal', function(){
                scope.$apply(function(){
                    scope.$parent[attrs.visible] = true;
                });
            });

            $(element).on('hidden.bs.modal', function(){
                scope.$apply(function(){
                    scope.$parent[attrs.visible] = false;
                });
            });
        }
    };
});