Google_key = "AIzaSyDQVpoQl_Qs9sX8mElHOOvWKK5_n8HKDFw";

var OpenWeather_key = "1ca61d6cc6645d5d4e8c01f4bcdd3a6d";

// var map = L.map('map').setView([39.984, -0.044], 13);

//L.marker([39.990043, -0.033516]).addTo(map)
//    .bindPopup('Wank!<br> Easily customizable.');

// function onMapClick(e) {
//     alert("You clicked the map at " + e.latlng);
// }
// map.on('click', onMapClick);

$.post("https://www.googleapis.com/geolocation/v1/geolocate?key="+Google_key,
    function (response) {
        //alert("Lat: "+response.location.lat+" Lon: "+response.location.lng);
        var lat = response.location.lat;
        var lng = response.location.lng;
        var weatherStations = $.ajax({
          url: "http://api.openweathermap.org/data/2.5/find?lat=" + lat + "&lon=" + lng + "&cnt=30&units=metric&APPID=" + OpenWeather_key,
          dataType: "json",
          async:false
          }).done(function(data){
            console.log(data);
            
            var markers = new L.MarkerClusterGroup();
            var markerList = [];
            for (var i = 0; i < weatherStations.length; i++) {
              var a = weatherStations[i];
              var marker = L.marker(L.latLng(a[0], a[1]))
              .bindPopup('Wank!<br> Easily customizable.');
              markerList.push(marker);
            }
          });

        var map = L.map('map').setView([lat, lng], 13);

        L.tileLayer('https://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey={apikey}', {
            attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            apikey: 'a8ef5524faba413cb282ae1c706a44a7',
            maxZoom: 22
        }).addTo(map);
      })

// var markers = new L.MarkerClusterGroup();
// var markerList = [];
// for (var i = 0; i < addressPoints.length; i++) {
//     var a = addressPoints[i];
//     var marker = L.marker(L.latLng(a[0], a[1]))
//     .bindPopup('Wank!<br> Easily customizable.');
//     markerList.push(marker);
// }
//
// markers.addLayers(markerList);
// map.addLayer(markers);
