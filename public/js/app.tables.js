var app = angular.module("app.tables",[]);

app.controller("DatepickerDemoCtrl", DatepickerDemoCtrl)
app.controller("tableCtrl",tableCtrl);

function tableCtrl($scope,$filter, $http, $cookies, $route, $window, $filter, Excel, $timeout){
    var init;

    var today = new Date;
    $scope.date = {start: today.setDate(today.getDate()-7), end: new Date()}

    $http({
        method: 'POST',
        url: 'api/report',
        data: {
            start: new Date(today.setDate(today.getDate()-7)),
            end: new Date()
        }
    }).then(function success(res){
        if(res.status == 200){
            // console.log(res)
            var resultData = []
            var grossAmount = 0
            for(var i = 0; i < res.data.data.length; i++){
                
                grossAmount = Number(res.data.data[i].pay) + grossAmount

                res.data.data[i].endTime = $filter('date')(res.data.data[i].endTime, "dd/MM/yyyy")
                res.data.data[i].startTime = $filter('date')(res.data.data[i].startTime, "dd/MM/yyyy")
                res.data.data[i].bookDate = $filter('date')(res.data.data[i].bookDate, "dd/MM/yyyy")

                resultData[i] = {
                    title: res.data.data[i].title,
                    pay: res.data.data[i].pay,
                    status: res.data.data[i].status,
                    bookDate: res.data.data[i].bookDate,
                }
            }
            // $scope.grossAmount = res.data.data[res.data.data.length-1].total
            $scope.grossAmount = grossAmount

            // console.log(grossAmount)

            $scope.filteredStores = resultData
            $scope.stores = resultData
        }else{
            console.log(res.data.errMsg)
        }
    }), function error(){
        console.log(err)
    }

    $scope.stores=[]
    $scope.searchKeywords=""
    $scope.filteredStores=[]
    $scope.row=""

    $scope.grossAmount = ''

    $scope.cari = function(data){
        console.log(data)
        data.start = new Date(data.start)
        // $route.reload()
        $http({
            method: 'POST',
            url: 'api/report',
            data: {
                // start: new Date(today.setDate(today.getDate()-7)),
                start: new Date(data.start.getFullYear(), data.start.getMonth(), data.start.getDate()-7),
                end: new Date()
            }
        }).then(function success(res){
            if(res.status == 200){
                console.log(res)
                var resultData = []
                var grossAmount = 0
                for(var i = 0; i < res.data.data.length; i++){
                    
                    grossAmount = Number(res.data.data[i].pay) + grossAmount

                    res.data.data[i].endTime = $filter('date')(res.data.data[i].endTime, "dd/MM/yyyy")
                    res.data.data[i].startTime = $filter('date')(res.data.data[i].startTime, "dd/MM/yyyy")
                    res.data.data[i].bookDate = $filter('date')(res.data.data[i].bookDate, "dd/MM/yyyy")

                    resultData[i] = {
                        title: res.data.data[i].title,
                        pay: res.data.data[i].pay,
                        status: res.data.data[i].status,
                        bookDate: res.data.data[i].bookDate
                    }
                }
                // $scope.grossAmount = res.data.data[res.data.data.length-1].total
                $scope.grossAmount = grossAmount

                // console.log(grossAmount)

                $scope.filteredStores = resultData
                $scope.stores = resultData
            }else{
                console.log(res.data.errMsg)
            }
        }), function error(){
            console.log(err)
        }
    }
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
    $scope.print = function(divName){
      // console.log($scope.grossAmount)

        var today = new Date()
        var reportDate = $filter('date')(today, "dd/MM/yyyy") +'  ('+ $filter('date')(today, "HH:mm:ss")+ ')'

        var printContents = document.getElementById(divName).innerHTML;
        var popupWin = window.open('', '_blank', 'width=800,height=800');
        // console.log(printContents)
        popupWin.document.open();
        popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + printContents + '</br>'+ 'Total Pemasukan: ' + $scope.grossAmount + '</br>' + 'Tanggal: ' + reportDate +'</body></html>');
        popupWin.document.close();
    }

    $scope.exportData=function(exportable){ // ex: '#my-table'
        var exportHref=Excel.tableToExcel('exportable','testExcel');
            $timeout(function(){location.href=exportHref;},100); // trigger download
    }
};

function DatepickerDemoCtrl($scope) {
    $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function() {
    $scope.dt = null;
  };

  $scope.inlineOptions = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };

  $scope.dateOptions = {
    dateDisabled: disabled,
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 1
  };

  // Disable weekend selection
  function disabled(data) {
    var date = data.date,
      mode = data.mode;
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  }

  $scope.toggleMin = function() {
    $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
    $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
  };

  $scope.toggleMin();

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };

  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.altInputFormats = ['M!/d!/yyyy'];

  $scope.popup1 = {
    opened: false
  };

  $scope.popup2 = {
    opened: false
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events = [
    {
      date: tomorrow,
      status: 'full'
    },
    {
      date: afterTomorrow,
      status: 'partially'
    }
  ];

  function getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  }
};


app.factory('Excel',function($window){
    var uri='data:application/vnd.ms-excel;base64,',
        template='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
        base64=function(s){return $window.btoa(unescape(encodeURIComponent(s)));},
        format=function(s,c){return s.replace(/{(\w+)}/g,function(m,p){return c[p];})};
    return {
        tableToExcel:function(tableId,worksheetName){
          console.log(document.getElementById(tableId).innerHTML)
            var table=document.getElementById(tableId).innerHTML,
                ctx={worksheet:worksheetName,table:table},
                href=uri+base64(format(template,ctx));
                
            return href;
        }
    };
})
