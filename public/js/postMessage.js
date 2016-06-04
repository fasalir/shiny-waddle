var app = angular.module('postMessage', []);

app.controller('messageCtrl', msgController);

function msgController($scope, $http, $location, $route, $filter){
    var init;

    $scope.post = function(data){
        $http({
            method: 'POST',
            url: 'api/message/post',
            data: data
        }).then(function success(res){
            if(res.status == 200){
                console.log(res.data.data)
                $route.reload()
                // $scope.data = res.data.data
            }else{
                console.log(res.data.errMsg)
            }
        }), function error(){
            console.log(err)
        }
    }

    $scope.stores=[]
    $scope.searchKeywords=""
    $scope.filteredStores=[]
    $scope.row=""

    $http({
        method: 'GET',
        url: 'api/message/list'
    }).then(function success(res){
        if(res.status == 200){
            console.log(res.data.data)
            $scope.filteredStores = res.data.data
            $scope.stores = res.data.data
        }else{
            console.log(res.data.errMsg)
        }
    })

    $scope.select=function(page){
        var end,start
        start=(page-1)*$scope.numPerPage
        end=start+$scope.numPerPage
        $scope.currentPageStores=$scope.filteredStores.slice(start,end)
        // console.log('halaman', $scope.filteredStores.slice(start,end))
    }
    $scope.onFilterChange=function(){
        $scope.select(1)
        $scope.currentPage=1
        $scope.row=""
    }
    $scope.onNumPerPageChange=function(){
        $scope.select(1)
        $scope.currentPage=1
    }
    $scope.onOrderChange=function(){
        $scope.select(1)
        $scope.currentPage=1
    }
    $scope.search=function(){
        $scope.filteredStores=$filter("filter")($scope.stores,$scope.searchKeywords)
        $scope.onFilterChange()
    }
    $scope.order=function(rowName){
        $scope.row!==rowName?($scope.row=rowName,$scope.filteredStores=$filter("orderBy")($scope.stores,rowName),$scope.onOrderChange()):void 0
    }
    $scope.numPerPageOpt=[3,5,10,20]
    $scope.numPerPage=$scope.numPerPageOpt[2]
    $scope.currentPage=1
    $scope.currentPageStores=[]
    init=function(){
        $scope.search()
        $scope.select($scope.currentPage)
    }
    init();
};