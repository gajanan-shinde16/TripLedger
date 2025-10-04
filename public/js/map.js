console.log(mapToken);
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: listing.geometry.coordinates,//[76.7748, 19.2608], // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 12 // starting zoom
});
    //console.log(listing.geometry.coordinates);
const markerHeight = 50;
const markerRadius = 10;
const linearOffset = 25;
const popupOffsets = {
    'top': [0, 0],
    'top-left': [0, 0],
    'top-right': [0, 0],
    'bottom': [0, -markerHeight],
    'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
    'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
    'left': [markerRadius, (markerHeight - markerRadius) * -1],
    'right': [-markerRadius, (markerHeight - markerRadius) * -1]
};
const marker = new mapboxgl.Marker({color : "red", /*draggable: true */})
    .setLngLat(listing.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({offset: popupOffsets,className: 'my-class',closeOnMove:true}).setHTML(
        `<h4>${listing.title}</h4><p>Exact location will be provided after booking</p>`
    )
    )
    .addTo(map);