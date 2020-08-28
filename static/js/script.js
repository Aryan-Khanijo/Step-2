var roomNameTitleList = ['AC Room Only','AC Room With Breakfast','AC Room With Breakfast and Dinner'];
var oldPriceList = ['14,000','15,000','17,000'];
var revisedPriceList = ['10,500','11,250','12,750'];
var detIndex = 0;
var roomData = [];
var roomId = 0;
var totalAmt = 0;
var id = 0;
formatter = new Intl.NumberFormat('en-US');

$("document").ready(function (){
	function roomType(title, oldPrice, newPrice){
		this.id = ++id;
		this.title = title;
		this.oldPrice = oldPrice;
		this.newPrice = newPrice;
		this.roomCount = 0;
		this.category = "Semi Deluxe";
	}
	function findPosition(getid){
		var item = 0;
		for (item=0;item<roomData.length;item++){
			if(roomData[item]["id"]==getid){
				return item;
			}
		}
	}
	function createRoomDOM(detDataItem){
		var divContent = $(`<div class="type"></div>`);
		var divRoomName =$(`<div class="room-name-container">
								<p class="room-name title">
									${detDataItem.title}
								</p>
								<p class="details">
									<a href="#" class="view-more details">view details</a>
								</p>
							</div>`);
		var countContainer = $(`<div class="room-count-container">
									<div class="group">
										<button class="counter inc" id="${detDataItem.id}"><i class="fa fa-plus-circle" aria-hidden="true"></i></button>
										<p class="room-count" id="acroomcount">${detDataItem.roomCount}</p>
										<button class="counter dec" id="${detDataItem.id}"><i class="fa fa-minus-circle" aria-hidden="true"></i></button>
									</div>
									<p class="applied-offer">
										*Applied <span class="offer-code">SUMMER25</span>
									</p>    
								</div>`);
		var priceContainer = $(`<div class="price">
									<p class="extra-info">
										<strike>INR ${detDataItem.oldPrice}</strike> <i class="fa fa-info-circle" aria-hidden="true"></i>
									</p>
									<p class="new-price title">
										<i class="fa fa-rupee"></i>${detDataItem.newPrice} <span class="per">/night</span>
									</p>
									<p class="extra-info">
										Non-Refundable <i class="fa fa-info-circle" aria-hidden="true"></i>
									</p>
								</div>`);
		var hrTag = $(`<hr class="ruler">`);
		divContent.append(divRoomName);
		divContent.append(countContainer);
		divContent.append(priceContainer);
		divContent.append(hrTag);
		
		return divContent;
	
	}

	function createPriceDOM(listItem){
		var x = "";
		if(listItem.title.length>16){
			var x = "...";
		}
		var price = $(`<div class="layout-row" style="padding-bottom: 15px !important;">
							<div class="layout-column flex-33">
								<div class="format-text">${listItem.category}</div>
								<div class="small light">${listItem.title.slice(0,16)}${x}</div>
							</div>
							<div class="align-center flex layout-column">
								<div class="light info">
									x${listItem.roomCount}
								</div>
							</div>
							<div class="flex-33 layout-column">
								<div id="${listItem.id}" class="cross align-right">INR ${listItem.newPrice}</div>
							</div>
						</div>`);
		return price;
	}

	function loadpricedata(){
		var item;
		var totalPrice = 0;
		$("#price-table").html("");
		for(item=0;item<3;item++){
			if(roomData[item]["roomCount"]!=0){
				var price = createPriceDOM(roomData[item]);
				totalPrice += parseInt(roomData[item]['newPrice'].replace(',','')) * parseInt(roomData[item]["roomCount"]); 
				$("#price-table").append(price);
			}
		}
		totalAmt = totalPrice;
		$("#price-cont").html(`INR ${formatter.format(totalAmt)}`);
	}

	function loadroomdata(){
		var item;
		$("#room-type").html("");
		for(item=0;item<3;item++){
			var room = createRoomDOM(roomData[item]);
			$("#room-type").append(room);
		}
		loadpricedata();
		$(".dec").click(function (){
			var id = $(this).attr("id");
			var pos = findPosition(id);
			var qty = roomData[pos]['roomCount'];
			qty = qty - 1;
			if (qty<0)
			{
				roomData[pos]['roomCount'] = 0;
			}
			else
			{
				roomData[pos]['roomCount'] = qty;
			}
			loadroomdata();
		})
		$(".inc").click(function (){
			var id = $(this).attr("id");
			var pos = findPosition(id);
			var qty = roomData[pos]['roomCount'];
			qty = qty + 1;
			roomData[pos]['roomCount'] = qty;
			loadroomdata();
		})
		$(".cross").after().click(function(){
			var id = $(this).attr("id");
			var pos = findPosition(id);
			roomData[pos]['roomCount'] = 0;
			loadroomdata();
		})
		if(totalAmt===0){
			$("#price-cont").html(`INR 0`);
			$("#price-table").html(`<span class="light">No Room Selected</span>`);
			$("#price-table").removeClass("price-table");
		}
		else{
			$("#price-table").addClass("price-table");
		}
	}

	for(detIndex=0;detIndex<3;detIndex++){
		var room = new roomType(roomNameTitleList[detIndex], 
			oldPriceList[detIndex], revisedPriceList[detIndex]);
		roomData.push(room);
	}
	loadroomdata();
})