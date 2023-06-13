class Convertidor {

	constructor(xmlFile) {
		this.xmlFile = xmlFile;
		this.xmlDoc = null;

	}
	convertir() {
		$.ajax({
			dataType: "xml",
			url: "xml/rutas.xml",
			success: function (data) {
				this.xmlDoc = data;
				this.generarHtml();
			}, error: function (data) {
				console.log("Error al cargar el archivo xml");
			}
		});
	}

	generarHtml() {
		const rutas = this.xmlDoc.getElementsByTagName("ruta");
		let html = "";

		for (let i = 0; i < rutas.length; i++) {
			const ruta = rutas[i];
			const nombre = ruta.getElementsByTagName("nombre")[0].textContent;
			const tipo = ruta.getElementsByTagName("tipo")[0].textContent;
			const medioTransporte = ruta.getElementsByTagName("medio_transporte")[0].textContent;
			const duracion = ruta.getElementsByTagName("duracion")[0].textContent;
			const agencia = ruta.getElementsByTagName("agencia")[0].textContent;
			const descripcion = ruta.getElementsByTagName("descripcion")[0].textContent;
			const personasAdecuadas = ruta.getElementsByTagName("personas_adecuadas")[0].textContent;
			const lugarInicio = ruta.getElementsByTagName("lugar_inicio")[0].textContent;
			const direccionInicio = ruta.getElementsByTagName("direccion_inicio")[0].textContent;
			const longitudInicio = ruta.getElementsByTagName("longitud")[0].textContent;
			const latitudInicio = ruta.getElementsByTagName("latitud")[0].textContent;
			const altitudInicio = ruta.getElementsByTagName("altitud")[0].textContent;
			const referenciasBibliografia = ruta.getElementsByTagName("referencia");
			const recomendacion = ruta.getElementsByTagName("recomendacion")[0].textContent;
			const hitos = ruta.getElementsByTagName("hito");


			html += "<section><ul>";
			html += "<li>Nombre: " + nombre + "</li>";
			html += "<li>Tipo: " + tipo + "</li>";
			html += "<li>Medio de transporte: " + medioTransporte + "</li>";
			html += "<li>Duración: " + duracion + "</li>";
			html += "<li>Agencia: " + agencia + "</li>";
			html += "<li>Descripción: " + descripcion + "</li>";
			html += "<li>Personas adecuadas: " + personasAdecuadas + "</li>";
			html += "<li>Lugar de inicio: " + lugarInicio + "</li>";
			html += "<li>Dirección de inicio: " + direccionInicio + "</li>";
			html += "<li>Coordenadas de inicio:";
			html += "<ul>";
			html += "<li>Longitud: " + longitudInicio + "</li>";
			html += "<li>Latitud: " + latitudInicio + "</li>";
			html += "<li>Altitud: " + altitudInicio + "</li>";
			html += "</ul>";
			html += "</li>";
			html += "<li>Referencias bibliografía: ";
			html += "<ul>";
			for (let j = 0; j < referenciasBibliografia.length; j++) {
				html += "<li><a href='" + referenciasBibliografia[j].textContent + "'>" + referenciasBibliografia[j].textContent + "</a></li>";
			}
			html += "</ul>";
			html += "</li>";
			html += "<li>Recomendación: " + recomendacion + "</li>";
			html += "<li>Hitos:";
			for (let j = 0; j < hitos.length; j++) {

				const hito = hitos[j];
				const hitoNombre = hito.getElementsByTagName("nombre")[0].textContent;
				const hitoDescripcion = hito.getElementsByTagName("descripcion")[0].textContent;
				const hitoLongitud = hito.getElementsByTagName("longitud")[0].textContent;
				const hitoLatitud = hito.getElementsByTagName("latitud")[0].textContent;
				const hitoAltitud = hito.getElementsByTagName("altitud")[0].textContent;
				const distanciaAnterior = hito.getElementsByTagName("distancia_anterior")[0].textContent;
				const distanciaUnidad = hito.getElementsByTagName("distancia_anterior")[0].getAttribute("unidad");
				const galeriaFotografias = hito.getElementsByTagName("fotografia");
				const galeriaVideos = hito.getElementsByTagName("video");

				html += "<ul>";
				html += "<li>Nombre: " + hitoNombre + "</li>";
				html += "<li>Descripción: " + hitoDescripcion + "</li>";
				html += "<li>Coordenadas:";
				html += "<ul>";
				html += "<li>Longitud: " + hitoLongitud + "</li>";
				html += "<li>Latitud: " + hitoLatitud + "</li>";
				html += "<li>Altitud: " + hitoAltitud + "</li>";
				html += "</ul>";
				html += "</li>";
				html += "<li>Distancia desde el hito anterior: " + distanciaAnterior + " " + distanciaUnidad + "</li>";

				html += "<li>Galería de fotografías:<ul>";

				for (let k = 0; k < galeriaFotografias.length; k++) {
					html += '<li><img src=' + '"' + galeriaFotografias[k].textContent + '"' + ' alt="imagen de la ruta"></li>';

				}
				html += "</ul></li>";


				if (galeriaVideos.length != 0) {
					html += "<li>Galería de videos:<ul>";

					for (let k = 0; k < galeriaVideos.length; k++) {
						html += "<li><video controls>";
						html += '<source src=' + '"' + galeriaVideos[k].textContent + '"' + 'type= "video/mp4">';
						html += "Tu navegador no admite la etiqueta de video.";
						html += "</video></li>";

					}
					html += "</ul></li>";

				}
				html += "</ul>";

			}
			html += "</li>";
			var boton = "button";
			var value = "Generar KML";
			var onclick = "convertidor.generarKML(" + i + ")";
			html += '<li name="planimetria' + i + '">Planimetría:<input type=' + boton + ' value=' + value + ' onclick=' + onclick + '> </li>';
			value = "Generar SVG";
			onclick = "convertidor.generarSVG(" + i + ")";
			html += '<li name="altimetria' + i + '">Altimetría:<input type=' + boton + ' value=' + value + ' onclick=' + onclick + '> </li>';
			html += "</ul></section>";
		}

		return html;
	}

	generarKML(indiceRuta) {
		var rutas = this.xmlDoc.getElementsByTagName("ruta");
		var ruta = rutas[indiceRuta];
		var hitos = ruta.getElementsByTagName("hito");
		let kmlContent = `<?xml version="1.0" encoding="UTF-8"?>
        <kml xmlns="http://www.opengis.net/kml/2.2">
          <Document>
            <name>Ruta</name>
            <description>Planimetría de la ruta</description>`;

		// Generar puntos para los hitos
		for (let j = 0; j < hitos.length; j++) {
			const hito = hitos[j];
			const hitoNombre = hito.getElementsByTagName("nombre")[0].textContent;
			const hitoLongitud = hito.getElementsByTagName("longitud")[0].textContent;
			const hitoLatitud = hito.getElementsByTagName("latitud")[0].textContent;


			kmlContent += `
          <Placemark>
            <name>${hitoNombre}</name>
            <Point>
              <coordinates>${hitoLatitud},${hitoLongitud}</coordinates>
            </Point>
          </Placemark>`;
		}

		// Generar línea que une los hitos
		kmlContent += `
        <Placemark>
          <name>Línea de la ruta</name>
          <LineString>
            <coordinates>`;

		for (let j = 0; j < hitos.length; j++) {
			const hito = hitos[j];
			const hitoLongitud = hito.getElementsByTagName("longitud")[0].textContent;
			const hitoLatitud = hito.getElementsByTagName("latitud")[0].textContent;

			kmlContent += `${hitoLatitud},${hitoLongitud} `;
		}

		kmlContent += `</coordinates>
          </LineString>
        </Placemark>
      </Document>
    </kml>`;

		document.querySelector('[name="planimetria' + indiceRuta + '"]').append("<section>" + kml + "</section>");
	}



	generarSVG(indiceRuta) {
		var rutas = this.xmlDoc.getElementsByTagName("ruta");
		var ruta = rutas[indiceRuta];
		var hitos = ruta.getElementsByTagName("hito");
		let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1">`;

		// Generar puntos para los hitos
		for (let j = 0; j < hitos.length; j++) {
			const hito = hitos[j];
			const hitoNombre = hito.getElementsByTagName("nombre")[0].textContent;
			const hitoLongitud = hito.getElementsByTagName("longitud")[0].textContent;
			const hitoLatitud = hito.getElementsByTagName("latitud")[0].textContent;
			const hitoAltitud = hito.getElementsByTagName("altitud")[0].textContent;

			svgContent += `
          <circle cx="${hitoLongitud}" cy="${hitoLatitud}" r="5" fill="red" />
          <text x="${hitoLongitud}" y="${hitoLatitud}" font-size="10" text-anchor="middle">${hitoNombre}</text>`;
		}

		// Generar línea que une los hitos
		svgContent += `<polyline points="`;

		for (let j = 0; j < hitos.length; j++) {
			const hito = hitos[j];
			const hitoLongitud = hito.getElementsByTagName("longitud")[0].textContent;
			const hitoLatitud = hito.getElementsByTagName("latitud")[0].textContent;

			svgContent += `${hitoLongitud},${hitoLatitud} `;
		}

		svgContent += `" fill="none" stroke="blue" stroke-width="2" />`;
		svgContent += `</svg>`;

		document.querySelector('[name="altimetria' + indiceRuta + '"]').append("<section>" + svgContent + "</section>");
	}

}
var convertidor = new Convertidor();
$(document).ready(function () {convertidor.convertir();});