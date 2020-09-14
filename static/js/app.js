var BE = angular.module('NewApp', ['ngMaterial']);

BE.controller('AppCtrl', [
	"$scope",
	"prepareRoomObject",
	function($scope, prepareRoomObject) {
		$scope.roomData = [];
		$scope.totalAmt = 0;
		$scope.zero = 0;
		var id = 0;
		formatter = new Intl.NumberFormat('en-US');
		$scope.msg = ""

		$scope.displayAmt = function(){return "INR " + formatter.format($scope.totalAmt);}

		$scope.amt = function(){return $scope.totalAmt;}

		$scope.showMsg = function(){
			if($scope.totalAmt>0){$scope.msg="";}
			else{$scope.msg="No Room Selected";}
		}

		function init(){
			var detIndex = 0;
			for(detIndex=0;detIndex<3;detIndex++){
				var room = new prepareRoomObject(++id, detIndex, $scope);
				$scope.roomData.push(room);
			}
			$scope.showMsg();
		}

		init();
	}
]);