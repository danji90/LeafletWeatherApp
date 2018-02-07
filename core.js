Google_key = "AIzaSyDQVpoQl_Qs9sX8mElHOOvWKK5_n8HKDFw";

var OpenWeather_key = "1ca61d6cc6645d5d4e8c01f4bcdd3a6d";

function runApp() {
  navigator.geolocation.getCurrentPosition(
    function(position) {
      // If user allows device geolocation it will use the device coordinates
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;

      drawMap(lat, lng)
    },
    function(err) {
      // If user rejects device geolocation it will use google API
      var geoLocURL = "https://www.googleapis.com/geolocation/v1/geolocate?key=" + Google_key;
      $.post(geoLocURL,
        function(response) {
          var lat = response.location.lat;
          var lng = response.location.lng;

          drawMap(lat, lng)
        });
    });
}

function drawMap(lat, lng) {
  var map = L.map('map').setView([lat, lng], 11);

  L.tileLayer('https://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}', {
    maxZoom: 20,
    attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

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

};

runApp()
