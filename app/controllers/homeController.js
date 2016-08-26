'use strict'
app.controller('homeController', function($scope, $http, util){

	navigator.geolocation.getCurrentPosition(showPosition);

	$scope.model =
	{
		lat : 0,
		lon: 0,
		latlon: null,
		radius:0
	};

	$scope.map = {};

	function showPosition(position) {
		$scope.model.lat = position.coords.latitude;
		$scope.model.lon = position.coords.longitude;
		$scope.model.latlon = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);


		var myOptions={
			center:$scope.model.latlon,zoom:14,
			mapTypeId:google.maps.MapTypeId.ROADMAP,
			mapTypeControl:false,
			navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
		};

		var map = new google.maps.Map(document.getElementById("mapholder"),myOptions);
		var marker=new google.maps.Marker({position:$scope.model.latlon,map:map,title:"Você está Aqui!"});

		getNearbyPlaces();
	}


	function getNearbyPlaces()
	{
		var uri = util.nearbyApi+'&location='+$scope.model.lat+','+$scope.model.lon+'&radius=1000';
		
		return $http({
			method: 'GET',
			url: uri,
			headers:{
				
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		}).success(function(status){
			console.log(status);
		});

		// return $http.get(uri, {headers: {'Access-Control-Allow-Origin': '*'}}).then(function(data){
		// 	console.log(data);
		// });
	}

});