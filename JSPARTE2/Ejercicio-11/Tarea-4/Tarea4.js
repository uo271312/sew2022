
class Mapa{
    constructor(){

    }
initMap(){
    var oviedo = {lat: 43.3672702, lng: -5.8602461};
    var mapaOviedo = new google.maps.Map(document.getElementsByTagName('main')[0],
    {
        zoom: 8,
        center:oviedo
    });
    var marcador=new google.maps.Marker({
        position:oviedo,
        map:mapaOviedo
    });
   
}
}

var mapa=new Mapa();
