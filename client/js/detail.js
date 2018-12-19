app.controller('detail', function($scope, service) {
  
	$scope.details = service.currenthoteldetails
	$scope.star = new Array($scope.details.rating) 


 })