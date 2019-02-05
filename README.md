# MeteoGeo

## Description
This simple mobile application uses a user's location to load weather stations in the vicinity.
The user can choose to use the exact device location by allowing to use the current location when prompted. If rejected the app uses the Google Geolocation API to approximate the device location using the current network specifications.
After geolocation the app loads data from the Weather API provided by OpenWeatherMap to access the closest stations.   
The stations are visualised on a map and can be clicked for further information about stations and the phenomena they measure.

## Applied technologies
This mobile application uses the following technologies:
- [jQuery](https://jquery.com/)
- [jQuery Mobile](https://jquerymobile.com/)
- [Leaflet](https://leafletjs.com/)
- [Leaflet MarkerCluster](https://github.com/Leaflet/Leaflet.markercluster)
- [Google Geolocation](https://developers.google.com/maps/documentation/javascript/examples/map-geolocation)
- [Google Geolocation API](https://developers.google.com/maps/documentation/geolocation/intro)
- [Mapbox](https://www.mapbox.com/)
- [OpenWeatherMap](https://openweathermap.org/api)

## Usage
Clone repository:
```
git clone https://github.com/danji90/LeafletWeatherApp
```

Access the cloned directory and run index.html in your web browser.

## Demo
Please try the [demo](https://danji90.github.io/LeafletWeatherApp/)

## Author
Daniel Marsh-Hunn ([al373405@uji.es](mailto:al373405@uji.es))
