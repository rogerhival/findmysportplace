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
	var infowindow;

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

		infowindow = new google.maps.InfoWindow();

		$scope.map = new google.maps.Map(document.getElementById("mapholder"),myOptions);
		//var marker=new google.maps.Marker({position:$scope.model.latlon,map:$scope.map,title:"Você está Aqui!"});

		getNearbyPlaces();
	}


	function getNearbyPlaces()
	{
		var service = new google.maps.places.PlacesService($scope.map);
		var request = {
			location: new google.maps.LatLng($scope.model.lat, $scope.model.lon),
			radius: '100000',
			name: 'Quadra de Futebol'
		};

		service.nearbySearch(request, callback);
	}

	function callback(results, status) {
		console.log('status : ' + status);
		console.dir(results);
		if (status == google.maps.places.PlacesServiceStatus.OK) {
			for (var i = 0; i < results.length; i++) {
				var place = results[i];
				createMarker(results[i]);
			}
		}
	}

	function createMarker(place) {

		var placeLoc = place.geometry.location;
		var marker = new google.maps.Marker({
			map: $scope.map,
			position: place.geometry.location
		});

		google.maps.event.addListener(marker, 'click', function() {
			infowindow.setContent(place.name);
			infowindow.open($scope.map, this);
		});
	}

});