function spaStyles(feature) {
  return {
    weight: 1,
    opacity: 1,
    color: '#1B4F72',
    fill: true,
    fillOpacity: 0,
  };
}

function getColor(d) {
  if (d > 700) {
    return '#ff3300';
  }
  if (d > 500) {
    return '#ff471a';
  }
  if (d > 300) {
    return '#ff704d';
  }
  if (d > 200) {
    return '#ff8566';
  }
  if (d > 50) {
    return '#ff9980';
  }
  if (d > 20) {
    return '#ffad99';
  }
  if (d >= 1) {
    return '#ffd6cc';
  }
  return '#ffebe6';
}

function getCHCColor(d) {
  if (d > 700) {
    return '#084594';
  }
  if (d > 500) {
    return '#2171b5';
  }
  if (d > 300) {
    return '#4292c6';
  }
  if (d > 200) {
    return '#6baed6';
  }
  if (d > 50) {
    return '#9ecae1';
  }
  if (d > 20) {
    return '#c6dbef';
  }
  if (d >= 1) {
    return '#eff3ff';
  }
  return '#ffffff';
}

function chcStyle(feature) {
  return {
    weight: 0.5,
    opacity: 1,
    color: '#c3dfef',
    fillOpacity: 0.8,
    fillColor: getCHCColor(feature.properties.totPeople),
  };
}

function chc2017style(feature) {
  return {
    weight: 0.5,
    opacity: 1,
    color: 'white',
    fillOpacity: 0.8,
    fillColor: getColor(feature.properties.SUM_totPeo),
  };
}

var layers = [{
    name: 'Youth CES',
    path: 'youthces.json',
    geo: function(data) {
      return L.geoJSON(data, {
        onEachFeature: function(feature, marker) {
          marker.bindPopup(
            '<h3>' +
            feature.properties.Name +
            '</h3><b>Address: </b>' +
            feature.properties.Address +
            '<br><b>City: </b>' +
            feature.properties.City_1 +
            '<br><b>Phone: </b>' +
            feature.properties.Phone
          );
        },
        pointToLayer: getMarker('youth'),
      });
    },
  },
  {
    name: 'Individual CES',
    path: 'individualCes.json',
    geo: function(data) {
      return L.geoJSON(data, {
        onEachFeature: function(feature, marker) {
          marker.bindPopup(
            '<h3>' +
            feature.properties.Name +
            '</h3><b>Address: </b>' +
            feature.properties.Address +
            '<br><b>City: </b>' +
            feature.properties.City +
            '<br><b>Phone: </b>' +
            feature.properties.Phone
          );
        },
        pointToLayer: getMarker('individual'),
      });
    },
  },
  {
    name: 'SPA Boundaries',
    path: 'spa.json',
    geo: function(data) {
      return L.geoJSON(data, {
        style: spaStyles,
        onEachFeature: function(feature, marker) {
          marker.bindPopup(
            '<h2>' +
            feature.properties.ABBV +
            '</h2><h3>' +
            feature.properties.SPA_NAME +
            '</h3'
          );
        },
      });
    },
  },
  {
    name: 'Hospitals',
    path: 'hospitals.json',
    geo: function(data) {
      return L.geoJSON(data, {
        onEachFeature: function(feature, marker) {
          marker.bindPopup(
            '<h3>' +
            feature.properties.NAME +
            '</h3><b>Address: </b>' +
            feature.properties.ADDRESS +
            '<br><b>City: </b>' +
            feature.properties.CITY +
            '<br><b>License: </b>' +
            feature.properties.LICENSE_CA
          );
        },
        pointToLayer: getMarker('hospital'),
      });
    },
  },
  {
    name: 'Department of Public Social Services',
    path: 'dpss.json',
    geo: function(data) {
      return L.geoJSON(data, {
        onEachFeature: function(feature, marker) {
          marker.bindPopup(
            '<h3>' +
            feature.properties.NAME +
            '</h3><b>Phone: </b>' +
            feature.properties.TELEPHONE +
            '<br><b> City: </b>' +
            feature.properties.CITY
          );
        },
        pointToLayer: getMarker('dpss'),
      });
    },
  },
  {
    name: '2018 Homeless Count by Census Tract',
    path: 'CensusTrect_HC_2018.json',
    geo: function(data) {
      return L.geoJSON(data, {
        style: chcStyle,
        onEachFeature: function(feature, marker) {
          marker.bindPopup(
            '<h3>' +
            feature.properties.CT10 +
            '</h3><br><b>Total Homeless: </b>' +
            feature.properties.totPeople +
            '<br><b>Community: </b>' +
            feature.properties.Community_ +
            '<br><b>Cars: </b>' +
            feature.properties.totCarPeop +
            '<br><b>Vans: </b>' +
            feature.properties.totVanPeop +
            '<br><b>Tents: </b>' +
            feature.properties.totTentPeo +
            '<br><b>Makeshift Shelters: </b>' +
            feature.properties.totMakes_1 +
            '<br><b>Campers: </b>' +
            feature.properties.totCamperP +
            '<br><b>Total Sheltered People: </b>' +
            feature.properties.totSheltPe +
            '<br><b> Total Unsheltered People: </b>' +
            feature.properties.totUnshelt
          );
        },
      });
    },
  },
  {
    name: '2018 Homeless Count by city',
    path: 'cityhc_2018.json',
    geo: function(data) {
      return L.geoJSON(data, {
        style: chc2017style,
        onEachFeature: function(feature, marker) {
          marker.bindPopup(
            '<h3> City: ' +
            feature.properties.City +
            '</h3><br><b>Total Homeless: </b>' +
            feature.properties.SUM_totPeo +
            '<br><b>Total Sheltered Homeless: </b>' +
            feature.properties.SUM_totShe +
            '<br><b>Total Unsheltered Homeless: </b>' +
            feature.properties.SUM_totUns +
            '<br><b>Total People Living in Encampments: </b>' +
            feature.properties.SUM_totE_1 +
            '<br><b>Total People Living in Tents: </b>' +
            feature.properties.SUM_totT_1 +
            '<br><b>Total People Living in Campers: </b>' +
            feature.properties.SUM_totC_2 +
            '<br><b>Total People Living in Vans: </b>' +
            feature.properties.SUM_totV_1 +
            '<br><b>Total People Living in Cars: </b>' +
            feature.properties.SUM_totC_1 +
            '<br><b>Total Encampments during the street count: </b>' +
            feature.properties.SUM_totEnc +
            '<br><b>Total Tents during the street count: </b>' +
            feature.properties.SUM_totTen +
            '<br><b>Total Campers during the street count: </b>' +
            feature.properties.SUM_totCam +
            '<br><b>Total Vans during the street count: </b>' +
            feature.properties.SUM_totVan +
            '<br><b>Total Cars during the street count: </b>' +
            feature.properties.SUM_totCar
          );
        },
      });
    },
  },
  {
    name: '2017 Homeless Count by city',
    path: 'city_hc_2017.json',
    geo: function(data) {
      return L.geoJSON(data, {
        style: chc2017style,
        //style:{fillColor:'#70A470',color:"#70A470",weight:1.5},
        onEachFeature: function(feature, marker) {
          marker.bindPopup(
            '<h3> City: ' +
            feature.properties.City +
            '</h3><br><b>Total Homeless: </b>' +
            feature.properties.SUM_totPeo +
            '<br><b>Total Sheltered Homeless: </b>' +
            feature.properties.SUM_totShe +
            '<br><b>Total Unsheltered Homeless: </b>' +
            feature.properties.SUM_totUns +
            '<br><b>Total People Living in Encampments: </b>' +
            feature.properties.SUM_totE_1 +
            '<br><b>Total People Living in Tents: </b>' +
            feature.properties.SUM_totT_1 +
            '<br><b>Total People Living in Campers: </b>' +
            feature.properties.SUM_totC_2 +
            '<br><b>Total People Living in Vans: </b>' +
            feature.properties.SUM_totV_1 +
            '<br><b>Total People Living in Cars: </b>' +
            feature.properties.SUM_totC_1 +
            '<br><b>Total Encampments during the street count: </b>' +
            feature.properties.SUM_totEnc +
            '<br><b>Total Tents during the street count: </b>' +
            feature.properties.SUM_totTen +
            '<br><b>Total Campers during the street count: </b>' +
            feature.properties.SUM_totCam +
            '<br><b>Total Vans during the street count: </b>' +
            feature.properties.SUM_totVan +
            '<br><b>Total Cars during the street count: </b>' +
            feature.properties.SUM_totCar
          );
        },
      });
    },
  },
];

function fetchLayers(btn) {
  var gisLayer = {};
  var lastKnownLayer = null;
  var count = 0;
  layers.forEach(function(layer) {
    getUsingAJAX(encodeURI('/static/sgvc/map/layer/' + layer.path), function onResult(data) {
      gisLayer[layer.name] = layer.geo(data);
      count++;
      if (lastKnownLayer) {
        lastKnownLayer.remove();
      }
      lastKnownLayer = L.control
        .layers(null, gisLayer, {
          collapsed: false,
          position: 'bottomright',
        })
        .addTo(map);
      if (count === layers.length - 1) {
        setTimeout(function() {
          btn.style.display = 'none';
          alert('All the layers have been downloaded.');
        }, 64);
      }
    });
  });
}

function fetchAllLayers(btn) {
  if (btn.textContent === 'Fetching...') {
    return;
  }
  if (
    window.confirm(
      "Fetching extra map data might cost you money if you're in paid data.\nThis will download extra map data which will increase data usage.\nAre you sure you want to continue?"
    )
  ) {
    btn.textContent = 'Fetching...';
    fetchLayers(btn);
  }
}

document.onreadystatechange = function() {
  if (this.readyState === 'complete') {
    L.tileLayer(
      'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://carto.com/attribution">CARTO</a>',
      }
    ).addTo(map);
    // label layer
    L.tileLayer(
      'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_only_labels/{z}/{x}/{y}.png'
    ).addTo(map);
  }
};
