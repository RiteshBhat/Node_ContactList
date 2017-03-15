var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http){
	var refresh = function() {
	$http.get('/contactlist').then(function(response){
		console.log("I got the response");
		console.log(response.data);
		$scope.contactlist=response.data;
		$scope.contact = '';
	});
};
	// 	person1 = {
	// 	name: "Sherlock",
	// 	email: "sherlocked@email.com",
	// 	number: "9856789956"
	// };

	// person2 = {
	// 	name: "John",
	// 	email: "johm@watson.com",
	// 	number: "9689784560"
	// };

	// person3 = {
	// 	name: "Lestrade",
	// 	email: "lestrade@email.com",
	// 	number: "9845623122"
	// };

	// var contactlist = [person1, person2, person3];
	// 	$scope.contactlist = contactlist;

	refresh();
	$scope.addContact = function() {
		console.log($scope.contact);
		$http.post('/contactlist', $scope.contact).then(function(response) {
			console.log(response);
			refresh();
		});

	};

	$scope.remove = function(id){
		console.log(id);
		$http.delete('/contactlist/' + id).then(function(response) {
			refresh();
		});
	};

	$scope.edit = function(id) {
		console.log(id);
		$http.get('/contactlist/' + id).then(function(response) {
			$scope.contact = response.data;
		});
	};

	$scope.update = function(id) {
		console.log($scope.contact._id);
		$http.put('/contactlist/' + $scope.contact._id, $scope.contact).then(function(response){
			refresh();
		})
	};

	$scope.deselect = function() {
		$scope.contact = '';
	};
}])