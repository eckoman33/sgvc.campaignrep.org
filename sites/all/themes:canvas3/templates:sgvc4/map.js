var map = L.map('map').setView([34.0522, -118.2437], 13);
var mapFeatures = null;
var latestSnap = null;
var services = document.querySelector('#services');
var language = document.querySelector('#language');
var city = document.querySelector('#city');
var control = document.querySelector('#control-box');
var searchForm = document.querySelector('#search-form');



function getMarker(name) {
  return function(feature, latLng) {
    return L.marker(latLng, {
      icon: L.divIcon({
        className: 'marker marker-' + name
      }),
    });
  };
}

function getUsingAJAX(path, onSuccess) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', path);
  xhr.send();
  xhr.onload = function() {
    if (this.readyState === 4) {
      onSuccess(JSON.parse(this.responseText));
    }
  };
}

function clearMap() {
  if (mapFeatures) {
    map.removeLayer(mapFeatures);
  }
}

function resetAll() {
  clearMap();
  language.value = 'all';
  services.value = 'all';
  city.value = 'all';
}

function buildPopUp(feature) {
  var html = [];
  html.push(
    '<h4 style="border-bottom: 1px solid orange; padding-bottom: 8px; color: orange; margin-bottom: 8px;">' +
    feature.properties.agency +
    '</h4>'
  );
  html.push(
    '<div>Services: <strong>' +
    feature.properties.services_1 +
    '</strong></div>'
  );
  html.push(
    '<div>Phone: <strong>' + feature.properties.phone + '</strong></div>'
  );
  html.push(
    '<div>Email: <strong>' + feature.properties.email + '</strong></div>'
  );
  html.push(
    '<div>Website: <strong><a target="_blank" href="' +
    feature.properties.website +
    '">' +
    feature.properties.website +
    '</a></strong></div>'
  );
  html.push(
    '<div>City: <strong>' + feature.properties.city_1 + '</strong></div>'
  );
  html.push(
    '<div>Address: <strong>' + feature.properties.street_add + '</strong></div>'
  );
  html.push(
    '<div>Zip: <strong>' + feature.properties.postal + '</strong></div>'
  );
  html.push(
    '<div>Language(s): <strong>' +
    feature.properties.language_a +
    '</strong></div>'
  );
  html.push(
    '<h5 style="border-bottom: 1px solid orange; padding-bottom: 8px; color: orange; margin-top: 16px; margin-bottom: 8px;">Hours of operation</h5>'
  );
  html.push(
    '<div>Monday: <strong>' + feature.properties.mon_hrs + '</strong></div>'
  );
  html.push(
    '<div>Tuesday: <strong>' + feature.properties.tues_hrs + '</strong></div>'
  );
  html.push(
    '<div>Wednesday: <strong>' + feature.properties.weds_hrs + '</strong></div>'
  );
  html.push(
    '<div>Thursday: <strong>' + feature.properties.thurs_hrs + '</strong></div>'
  );
  html.push(
    '<div>Friday: <strong>' + feature.properties.friday_hrs + '</strong></div>'
  );
  html.push(
    '<div>Saturday: <strong>' + feature.properties.sat_hrs + '</strong></div>'
  );
  html.push(
    '<div>Sunday: <strong>' + feature.properties.sun_hrs + '</strong></div>'
  );
  html.push(
    '<div>Details: <strong>' + feature.properties.hours_of_o + '</strong></div>'
  );

  return html.join('');
}

function pickByLangAndCity(language, city) {
  return function(feature) {
    var hasLanguage = true;
    var hasCity = true;
    if (language !== 'all') {
      hasLanguage = feature.properties.language_a.indexOf(language) >= 0;
    }
    if (city !== 'all') {
      hasCity = feature.properties.city_1.indexOf(city) >= 0;
    }
    return hasCity && hasLanguage;
  };
}

function plotFeatures(data) {
  clearMap();
  mapFeatures = L.geoJSON(data, {
    onEachFeature: function(feature, layer) {
      layer.bindPopup(buildPopUp(feature));
    },
    pointToLayer: getMarker('location'),
  });
  mapFeatures.addTo(map);
  if (data.features.length > 0) {
    map.fitBounds(mapFeatures.getBounds());
  }
}

services.onchange = function() {
  getUsingAJAX(encodeURI('/static/sgvc/map/layer/' + this.value + '.json'), function(data) {
    latestSnap = JSON.parse(JSON.stringify(data));
    var filter = pickByLangAndCity(language.value, city.value);
    data.features = data.features.filter(filter);
    plotFeatures(data);
  });
};

language.onchange = function() {
  if (!latestSnap) {
    return;
  }
  var snap = Object.assign({}, latestSnap);
  var filter = pickByLangAndCity(language.value, city.value);
  snap.features = snap.features.filter(filter);
  plotFeatures(snap);
};

city.onchange = function() {
  if (!latestSnap) {
    return;
  }
  var snap = Object.assign({}, latestSnap);
  var filter = pickByLangAndCity(language.value, city.value);
  snap.features = snap.features.filter(filter);
  plotFeatures(snap);
};

var searchBoxHeight = getComputedStyle(searchForm, null).height;
searchForm.style.height = searchBoxHeight;

control.onclick = function() {
  var current = this.innerText;
  if (current === '-') {
    control.style.backgroundColor = '#1e62d0';
    searchForm.style.height = 0;
    this.innerHTML = '+';
  } else {
    control.style.backgroundColor = '#ff5bb0';
    searchForm.style.height = searchBoxHeight;
    this.innerHTML = '-';
  }
};

// document.querySelector('#content .container').classList.remove('container');
// document.querySelector('#content .content-wrap').classList.remove('content-wrap');
// document.querySelector('#page-title').style.display = 'none';
