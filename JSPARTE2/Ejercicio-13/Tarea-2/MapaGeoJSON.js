class MapaJSON {
    constructor() {

    }

    initMap() {
        this.map = new google.maps.Map(document.getElementsByTagName('main')[0],
            {
                center: new google.maps.LatLng(43.3672702, -5.8502461),
                zoom: 9,
            });
    }


    leerArchivo(archivo) {

        let file = archivo[0]

        if (!file.name.endsWith(".geojson")) {
            alert('No es un archivo compatibe, ha de ser .geojson')
            return
        }


        this.lector = new FileReader();
        this.lector.onload = this.leerJSON.bind(this);
        this.lector.readAsText(file);


    }

    leerJSON(event) {
        this.initMap();
        var geoJSON = $.parseJSON(event.currentTarget.result);
        console
        this.map.data.addGeoJson(geoJSON);
        this.coordenadasMarcadores(geoJSON);
    }

    coordenadasMarcadores(geoJSON) {
        for (var i = 0; i < geoJSON.features.length; i++) {
            var lat = geoJSON.features[i].geometry.coordinates[1];
            var lon = geoJSON.features[i].geometry.coordinates[0];
            var nombre = geoJSON.features[i].properties.name;



            this.infoWindow = new google.maps.InfoWindow;
            var pos = {
                lat: parseFloat(lat),
                lng: parseFloat(lon)
            };
            this.infoWindow.setPosition(pos);
            this.infoWindow.setContent(nombre);
            this.infoWindow.open(this.map);
        }
    }

}
var mapa = new MapaJSON();

