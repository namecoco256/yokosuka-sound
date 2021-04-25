function geoFindMe() {

  const status = document.querySelector('#status');
  const mapLink = document.querySelector('#map-link');

  mapLink.href = '';
  mapLink.textContent = '';

  function success(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;

    status.textContent = '';
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    
    //追加部分
    var reica_request = new XMLHttpRequest();
    var reica_mapapi = "https://nominatim.openstreetmap.org/search?q=" + latitude + ","+ longitude + "&format=xml&polygon=1&addressdetails=1"
    reica_request.open('GET', reica_mapapi, true);
    reica_request.onload = function () {
      var reica_data = this.response;
      console.log(reica_data);
    }
    reica_request.send();
    //ここまで追加部分
  }

  function error() {
    status.textContent = 'Unable to retrieve your location';
  }

  if(!navigator.geolocation) {
    status.textContent = 'Geolocation is not supported by your browser';
  } else {
    status.textContent = 'Locating…';
    navigator.geolocation.getCurrentPosition(success, error);
  }

}

document.querySelector('#find-me').addEventListener('click', geoFindMe);
