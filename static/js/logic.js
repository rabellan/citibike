// let newYorkCoords = [40.73, -74.0059];
// let mapZoomLevel = 12;

// Create the createMap function.


  // Create the tile layer that will be the background of our map.


  // Create a baseMaps object to hold the lightmap layer.


  // Create an overlayMaps object to hold the bikeStations layer.


  // Create the map object with options.


  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.

// Create the createMarkers function.

  // Pull the "stations" property from response.data.

  // Initialize an array to hold the bike markers.

  // Loop through the stations array.
    // For each station, create a marker, and bind a popup with the station's name.

    // Add the marker to the bikeMarkers array.

  // Create a layer group that's made from the bike markers array, and pass it to the createMap function.


// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
 //////////////////////////////


// Define the URL for the Citi Bike station information endpoint.
const citiBikeURL = "https://gbfs.citibikenyc.com/gbfs/en/station_information.json";

// Create the createMap function.
function createMap(bikeStations) {
  // Create the tile layer that will be the background of our map.
  const lightmap = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "OpenStreetMap contributors",
    maxZoom: 18
  });

  // Create a baseMaps object to hold the lightmap layer.
  const baseMaps = {
    "Light Map": lightmap
  };

  // Create an overlayMaps object to hold the bikeStations layer.
  const overlayMaps = {
    "Bike Stations": bikeStations
  };

  // Create the map object with options.
  const myMap = L.map("map-id", {
    center: [40.73, -74.0059],
    zoom: 12,
    layers: [lightmap, bikeStations]
  });

  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}

// Create the createMarkers function.
function createMarkers(response) {
  // Pull the "stations" property from response.data.
  const stations = response.data.stations;

  // Initialize an array to hold the bike markers.
  const bikeMarkers = [];

  // Loop through the stations array.
  stations.forEach(station => {
    // For each station, create a marker, and bind a popup with the station's name and capacity.
    const bikeMarker = L.marker([station.lat, station.lon])
      .bindPopup(`<h3>${station.name}</h3><hr><p>Capacity: ${station.capacity}</p>`);

    // Add the marker to the bikeMarkers array.
    bikeMarkers.push(bikeMarker);
  });

  // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
  const bikeStations = L.layerGroup(bikeMarkers);

  // Call the createMap function with the bikeStations layer.
  createMap(bikeStations);
}

// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
d3.json(citiBikeURL).then(createMarkers);
