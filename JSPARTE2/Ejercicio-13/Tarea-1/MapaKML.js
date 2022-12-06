class MapaKML{
	constructor() {
        
	}

	

	cargarKML(archivo) {
		var archivo = archivo[0];
		var contenido = "";
		var lector = new FileReader();
		lector.onload = function (evento) {
			contenido = lector.result;
			let parser = new DOMParser();
			let xmlDoc = parser.parseFromString(contenido, "text/xml");
			var marcadores = [];
            for (var hijo of xmlDoc.getElementsByTagName('coordinates')) {
                let coords = hijo.textContent.split("\n");
				for (var coordenadas of coords) {
					let coord = coordenadas.split(",");
					if (coord[0] != "") {
						let marcador = {lat: parseFloat(coord[1]), lng: parseFloat(coord[0])};
						marcadores.push(marcador);
					}
				}
			}
				
			var names=[];

            for (var name of xmlDoc.getElementsByTagName('name')) {
				names.push(name.textContent);
			}

        
			var centro = {lat: 40.418889, lng: -3.691944};
			this.mapa = new google.maps.Map(document.getElementsByTagName('main')[0],{zoom: 3,center:centro});

			var i = 0;
			for (i;i<marcadores.length;i++){
				var setMarcadores = new google.maps.Marker({
					position: marcadores[i],
					mapa,
					title: names[i+1],
				});
              
				setMarcadores.setMap(this.mapa);
				
			}
            
		}      
		lector.readAsText(archivo);
	}

    initMap() {
		var centro = {lat: 40.41831, lng: -3.70275};
		this.mapa = new google.maps.Map(document.getElementsByTagName('main')[0],{zoom: 7,center:centro});
	}

   
}
var mapa = new MapaKML();

