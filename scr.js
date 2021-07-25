document.getElementById("count").textContent = localStorage.getItem("countsave");
const button = document.getElementById("button");
const yn = document.getElementById("yn");

var yokosukaSE = new Audio("sounds/yokosuka.mp3");
var automode = false;
var autorefresh;
var reica_continuing = localStorage.getItem('buttonsave');

if (localStorage.getItem("countsave") == null){
  document.getElementById("count").textContent = 0
}

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
          localStorage.setItem('buttonsave', false);
        yn.style.backgroundColor = "#8b2d47";
      }
      else {
        console.log("you are in yokosuka!");
        yn.textContent = "you are in yokosuka!";
        yn.style.backgroundColor = "#2D478B";
        if (!reica_continuing) {
          document.getElementById("count").textContent ++
          localStorage.setItem('countsave', document.getElementById("count").textContent);
          reica_continuing = true;
          localStorage.setItem('buttonsave', true);
					currentTime = 0;
          yokosukaSE.muted = false;
          yokosukaSE.play();
          stop();
        };
      };
    };
    reica_request.send();
  };
  function error() {
    yn.textContent = 'Unable to retrieve your location';
    console.log("Unable");
  }

  if(!navigator.geolocation) {
    yn.textContent = 'Geolocation is not supported by your browser';
  } else {
    status.textContent = 'Locating…';
    navigator.geolocation.getCurrentPosition(success, error);
  }

}

button.onmousedown = function() {
  
  yokosukaSE.muted = true;
  yokosukaSE.play();
  stop();
  currentTime = 0;
  
  if (automode) {
    clearInterval(autorefresh);
    automode = false;
    document.getElementById("button").style.backgroundColor = "#FF0000";
    document.getElementById("button").textContent = "OFF";
    console.log("turned off");
  }else {
    //geoFindMe()
    autorefresh = setInterval(geoFindMe, 10000)
    automode = true
    document.getElementById("button").style.backgroundColor = "#00FF00";
    document.getElementById("button").textContent = "ON";
    console.log("turned on");
    console.log(autorefresh);
  };
};


//document.querySelector('#find-me').addEventListener('click', geoFindMe);


