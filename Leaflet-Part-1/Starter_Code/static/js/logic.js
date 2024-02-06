let myMap = L.map("map", {
    center: [100, 100],
    zoom: 10, 
  });
  let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);


d3.json(url).then(function (data) {

  let radiusScale = d3.scaleQuantize()
  .domain([0, 10]) 
  .range([10,20,30]);

    let markers = L.layerGroup();

    for (let i = 0; i < data.features.length; i++) {
  
      let location = data.features[i].geometry;
      if (data.features[i].geometry) {
        let d = data.features[i].geometry.coordinates[2];   

        let circleMarker = L.circleMarker([location.coordinates[1], location.coordinates[0]], {
            radius: radiusScale(data.features[i].properties.mag),
            fillOpacity: 0.7,
            color: 'white',
            weight: 1
          });

        if(d >80){
            circleMarker.setStyle({fillColor: "#f70505"})
        }
        else if(d >60){
            circleMarker.setStyle({fillColor: "#f51d1d"})
        } 
        else if(d >40){
            circleMarker.setStyle({fillColor: "#ad2b2b"})
        } 
        else if(d >20){
            circleMarker.setStyle({fillColor: "#823131"})
        } 
        else if(d > 10){
            circleMarker.setStyle({fillColor: "#703535"})
        } 
        else{
            circleMarker.setStyle({fillColor: "#2e1d1d"})
        } 
          
        circleMarker.bindPopup(`<strong>Magnitude:</strong> ${data.features[i].properties.mag}
            <br><strong>Location:</strong> ${data.features[i].properties.place}<br><strong>Depth:</strong> ${d}`);
          markers.addLayer(circleMarker);
        }
      }
    myMap.addLayer(markers);
  
});