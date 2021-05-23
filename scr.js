const count = document.getElementById("count").textContent;
//↑何回横須賀に入ったか
const button = document.getElementById("button");
//↑ボタン
const yn = document.getElementById("yn");
//↑横須賀にいるかどうか
var automode = false;

var reica_continuing = false;
function geoFindMe() {

  /*const status = document.querySelector('#status');
  const mapLink = document.querySelector('#map-link');

  mapLink.href = '';
  mapLink.textContent = '';*/

  function success(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;

    /*status.textContent = '';
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;*/
    
    //issue#5
    var reica_request = new XMLHttpRequest();
    var reica_mapapi = "https://nominatim.openstreetmap.org/search?q=" + latitude + ","+ longitude + "&format=json&polygon=1&addressdetails=1"
    reica_request.open('GET', reica_mapapi, true);
    reica_request.onload = function () {
      var reica_data = this.response;
      console.log(reica_data);
      console.log(reica_data.lastIndexOf("横須賀市"));
      if (reica_data.lastIndexOf("横須賀市") == -1) {
        console.log("you are not in yokosuka!")
        yn.textContent = "you are not in yokosuka!";
          reica_continuing = false;
      }
      else {
        console.log("you are in yokosuka!");
        yn.textContent = "you are in yokosuka!";
        if (!reica_continuing) {
          document.getElementById("count").textContent ++
          reica_continuing = true;
        };
      };
    };
    reica_request.send();
  };
    //issue#5
  function error() {
    //status.textContent = 'Unable to retrieve your location';
  }

  if(!navigator.geolocation) {
    //status.textContent = 'Geolocation is not supported by your browser';
  } else {
    status.textContent = 'Locating…';
    navigator.geolocation.getCurrentPosition(success, error);
  }

}

button.onmousedown = function() {
  if (automode) {
    clearInterval(autorefresh);
    automode = false;
    document.getElementById("button").style.backgroundColor = "#FF0000";
    document.getElementById("button").textContent = "OFF";
    console.log("turned off");
  }else {
    var autorefresh = setInterval(geoFindMe(), 50)
    automode = true
    document.getElementById("button").style.backgroundColor = "#00FF00";
    document.getElementById("button").textContent = "ON";
    console.log("turned on");
    console.log(autorefresh);
  };
};


//document.querySelector('#find-me').addEventListener('click', geoFindMe);


