var miApp = new Object();

function initApp(){  
    var centro = {lat: 43.3672702, lng: -5.8502461};
    var mapaGeoposicionado = new google.maps.Map(document.getElementsByTagName('main')[0],{
        zoom: 8,
        center:centro,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    
    infoWindow = new google.maps.InfoWindow;
    if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Localización encontrada');
            infoWindow.open(mapaGeoposicionado);
            mapaGeoposicionado.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, mapaGeoposicionado.getCenter());
          });
        } else {
     
          handleLocationError(false, infoWindow, mapaGeoposicionado.getCenter());
        }
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: Ha fallado la geolocalización' :
                              'Error: Su navegador no soporta geolocalización');
        infoWindow.open(mapaGeoposicionado);
      }
      class Load{

        constructor(){

        }

     updateOnlineStatus(msg) {
        var status = document.querySelector("p:nth-of-type(1)");
        var condition = navigator.onLine ? "ONLINE" : "OFFLINE";
        status.setAttribute("class", condition);
        var state = document.querySelector("p:nth-of-type(2)");
        state.innerHTML = condition;
        var log = document.querySelector("p:nth-of-type(3)");
        log.appendChild(document.createTextNode("Event: " + msg + "; status=" + condition + "\n"));
      }
      loaded() {
        this.updateOnlineStatus("load");
        document.body.addEventListener("offline", function () {
          updateOnlineStatus("offline")
        }, false);
        document.body.addEventListener("online", function () {
          updateOnlineStatus("online")
        }, false);
      }
    }

class FS{
constructor(){

}
 fullScreen(element){
    
      if(document.requestFullscreen) {
        element.requestFullscreen();
      } else if(element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if(element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if(element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
      document.getElementById("efs").disabled=false;
      document.getElementById("fs").disabled=true;
    }

    exitFullscreen() {
      if(document.exitFullscreen) {
        document.exitFullscreen();
      } else if(document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if(document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }

      document.querySelector("input:nth-of-type(1)").disabled=false;
      document.querySelector("input:nth-of-type(2)").disabled=true;
    }

}

miApp.initApp = initApp;
var load=new Load();
var fs=new FS();
