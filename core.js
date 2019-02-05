$(document).ready(function(){
  // var Google_key = "AIzaSyDQVpoQl_Qs9sX8mElHOOvWKK5_n8HKDFw";
  // var OpenWeather_key = "1ca61d6cc6645d5d4e8c01f4bcdd3a6d";
  function compileMap() {
    var basemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    var map = L.map('map', {
      layers: [basemap]
    })
    map.setView([20, 30], 4)
    return map
  }

  var map = compileMap()

  function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        console.log(pos)
        map.setView([pos.lat, pos.lng], 12)
      }), function(){
        console.log("User rejected geolocation!")
      }
  }
  getCurrentPosition()

})
