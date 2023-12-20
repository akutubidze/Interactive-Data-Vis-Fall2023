var map = L.map("map").setView([40.776676, -73.971321], 12);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 25,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// let layerGroup = L.layerGroup().addTo(map);

// // create markers
// L.marker().addTo(layerGroup);

let showingArtworks = true;

const select = document.getElementById("artworks-filter");

console.log(select);

select.addEventListener("input", (e) => {
  console.log(e.target.value);
  showingArtworks = !showingArtworks;

  $(".leaflet-marker-icon").remove();
  $(".leaflet-popup").remove();

  drawMap();
});

let mapData = null;

d3.json("POPS.json", d3.autoType).then((data) => {
  console.log("ocations", data);
  mapData = data;
  drawMap();
});

function drawMap() {
  const locations = mapData.features
    .map((feature) => {
      return {
        location: [feature.properties.latitude, feature.properties.longitude],
        name: feature.properties.bldg_name,
        time: 22,
        amen_reqd: feature.properties.amen_reqd,
      };
    })
    .filter((loc) => Boolean(loc.name))
    .filter((loc) => {
      if (
        loc.amen_reqd == "null" ||
        loc.amen_reqd === "Null" ||
        !loc.amen_reqd ||
        loc.amen_reqd === "None"
      ) {
        return false;
      }

      return true;
    })
    .filter((loc) => {
      if (showingArtworks) {
        return true;
      }

      const amens = loc.amen_reqd;

      if (amens === "None") {
        return false;
      }

      if (!amens) {
        return false;
      }

      return !amens.includes("Artwork");
    });

  console.log("ocations", locations);

  locations.forEach(function (locationObj) {
    L.marker(locationObj.location).addTo(map).bindPopup(`
                <h2>${locationObj.name} </h2>
                <p>${locationObj.amen_reqd}</p>
       
                `);
  });

  $("#locations").html("");

  locations.forEach(function (publicspace, index) {
    $("#locations").append(
      `<option value="${publicspace.location}"> ${index + 1}. ${
        publicspace.name
      }</option>`
    );
  });

  document.getElementById("locations").addEventListener("input", (e) => {
    console.log(e.target.value);

    // Map Zoom logic
    const locationArr = e.target.value.split(",");
    map.panTo(locationArr);
    map.setZoom(18);
  });
}
