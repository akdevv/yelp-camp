// map config
mapboxgl.accessToken = mapboxToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 10 // starting zoom
});

// adding map pin
new mapboxgl.Marker({ color: 'red' })
    .setLngLat(campground.geometry.coordinates)
    .addTo(map);
