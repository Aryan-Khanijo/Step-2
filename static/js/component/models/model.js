BE.factory('prepareRoomObject',(
	function(){
		var roomType= function (id, index, $scope){
			angular.extend(this, {
				id: id,
				title: getroomNameTitle(index),
				stripTitle: function(){
					if(this.title.length>16){return this.title.slice(0,16)+"...";}
					else{return this.title;}
				},
				oldPrice: getoldPrice(index),
				newPrice: getrevisedPrice(index),
				roomCount: 0,
				category: getcategory(index),
				totalAmt: function (){return parseInt(this.newPrice.replace(',','')) * this.roomCount},
				dec: function(){
					var id = this.id;
					var room = findItem(id, $scope);
					var qty = room['roomCount'];
					qty = qty - 1;
					if (qty<0){room['roomCount'] = 0;}
					else{
						room['roomCount'] = qty;
						$scope.totalAmt -= strToInt(this.newPrice);
					}
					$scope.showMsg();
				},
				inc: function(){
					var id = this.id;
					var room = findItem(id, $scope);
					var qty = room['roomCount'];
					qty = qty + 1;
					room['roomCount'] = qty;
					$scope.totalAmt += strToInt(this.newPrice);
					$scope.showMsg();
				},
				cross: function(){
					var id = this.id;
					var room = findItem(id, $scope);
					$scope.totalAmt -= this.totalAmt();
					room['roomCount'] = 0;
					$scope.showMsg();
				}
			})
		};

		return roomType;

		function getroomNameTitle(index){
			var roomNameTitleList = ['AC Room Only','AC Room With Breakfast','AC Room With Breakfast and Dinner'];
			return roomNameTitleList[index];
		}

		function getoldPrice(index){
			var oldPriceList = ['14,000','15,000','17,000'];
			return oldPriceList[index];
		}

		function getrevisedPrice(index){
			var revisedPriceList = ['10,500','11,250','12,750'];
			return revisedPriceList[index];
		}

		function getcategory(index){
			var categoryList = ['Semi Deluxe', 'Deluxe', 'Super Deluxe'];
			return categoryList[index];
		}
		
		function strToInt(prStr){
			return parseInt(prStr.replace(',',''))
		}

		function findItem (getid, $scope){
			var item = 0;
			for (item=0;item<$scope.roomData.length;item++){
				if($scope.roomData[item].id==getid){
					return $scope.roomData[item];
				}
			}
		};
	}
))