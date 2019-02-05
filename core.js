$(document).ready(function(){
  var location
  var Google_key = "AIzaSyDHWaUDzznLDy5iZd_wJiySK5ylyIoTU5A";
  var OpenWeather_key = "1ca61d6cc6645d5d4e8c01f4bcdd3a6d";
  function compileMap() {

    var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery � <a href="http://mapbox.com">Mapbox</a>'

    // Define basemap source URL
    var mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibmdhdmlzaCIsImEiOiJjaXFheHJmc2YwMDdoaHNrcWM4Yjhsa2twIn0.8i1Xxwd1XifUU98dGE9nsQ';

    var basemap = L.tileLayer(mbUrl, {
      id: 'mapbox.streets',
      maxZoom: 19,
      attribution: mbAttr
    });

    var map = L.map('map', {
      layers: [basemap]
    })

    map.setView([20, 30], 4)

    return map
  }

  var map = compileMap()

function createWeatherMap(lat,lng){
  var weatherStations = $.ajax({
    url: "http://api.openweathermap.org/data/2.5/find?lat=" + lat + "&lon=" + lng + "&cnt=30&units=metric&APPID=" + OpenWeather_key,
    dataType: "json",
    async: false
  }).done(function(data) {
    var locations = data.list;

    var markers = new L.MarkerClusterGroup();
    var markerList = [];
    for (var i = 0; i < locations.length; i++) {
      var a = locations[i];
      var marker = L.marker(L.latLng(a.coord.lat, a.coord.lon))
        .bindPopup("<b>Station name: </b>" + a.name + "<br>" +
          "<b>Temperature: </b>" + a.main.temp + "°C" + "<br>" +
          "<b>Humidity: </b>" + a.main.humidity + "%" + "<br>" +
          "<b>Pressure: </b>" + a.main.pressure + "hPa");
      markerList.push(marker);
    }
    markers.addLayers(markerList);
    map.addLayer(markers);
  });
  }

  function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        console.log(pos)
        map.setView([pos.lat, pos.lng], 10)
        createWeatherMap(pos.lat, pos.lng)
      }, function(){
        // If user rejects device geolocation it will use google API
        var geoLocURL = "https://www.googleapis.com/geolocation/v1/geolocate?key=" + Google_key;
        $.post(geoLocURL,
          function(response) {
            var pos = {
              lat: response.location.lat,
              lng: response.location.lng
            }
            console.log(pos)
            map.setView([pos.lat, pos.lng], 10)
            createWeatherMap(pos.lat, pos.lng)
          });
      })
  }

  getCurrentPosition()

  // var weatherStations = $.ajax({
  //   url: "http://api.openweathermap.org/data/2.5/find?lat=" + lat + "&lon=" + lng + "&cnt=30&units=metric&APPID=" + OpenWeather_key,
  //   dataType: "json",
  //   async: true
  // }).done(function(data) {
  //   var locations = data.list;



})
