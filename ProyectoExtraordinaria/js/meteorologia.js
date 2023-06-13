
class Meteo {
	
	constructor(){
        this.apikey = "48c5ce6486b6e5b860c8658430ff622f";
     
        
    }
    cargarDatos(){

		
        this.url = "https://api.openweathermap.org/data/2.5/weather?lat=43.3395&lon=-5.4949&appid="+this.apikey;
        $.getJSON({
            dataType: "json",
            url: this.url,
            method: 'GET',
            success: function(datos){
                    var stringDatos = "<table><tr><th>Parametros</th><th>Datos</th></tr>";
                        stringDatos += "<tr><td>Ciudad:</td><td>" + datos.name + "</td></tr>";
                        stringDatos += "<tr><td>País:</td><td> " + datos.sys.country + "</td></tr>";
                        stringDatos += "<tr><td>Latitud:</td><td> " + datos.coord.lat + " grados</td></tr>";
                        stringDatos += "<tr><td>Longitud:</td><td> " + datos.coord.lon + " grados</td></tr>";
                        stringDatos += "<tr><td>Temperatura:</td><td> " + datos.main.temp + " grados Celsius</td></tr>";
                        stringDatos += "<tr><td>Temperatura máxima:</td><td> " + datos.main.temp_max + " grados Celsius</td></tr>";
                        stringDatos += "<tr><td>Temperatura mínima:</td><td> " + datos.main.temp_min + " grados Celsius</td></tr>";
                        stringDatos += "<tr><td>Presión:</td><td> " + datos.main.pressure + " milibares</td></tr>";
                        stringDatos += "<tr><td>Humedad:</td><td> " + datos.main.humidity + " %</td></tr>";
                        stringDatos += "<tr><td>Amanece a las: </td><td>" + new Date(datos.sys.sunrise *1000).toLocaleTimeString() + "</td></tr>";
                        stringDatos += "<tr><td>Oscurece a las:</td><td> " + new Date(datos.sys.sunset *1000).toLocaleTimeString() + "</td></tr>";
                        stringDatos += "<tr><td>Dirección del viento: </td><td>" + datos.wind.deg + " grados</td></tr>";
                        stringDatos += "<tr><td>Velocidad del viento:</td><td> " + datos.wind.speed + " metros/segundo</td></tr>";
                        stringDatos += "<tr><td>Nubosidad:</td><td> " + datos.clouds.all + " %</td></tr>";
						stringDatos += "<tr><td>Icono</td><td><img src='http://openweathermap.org/img/w/"+ datos.weather[0].icon + ".png' alt='' /></td></tr></table>";
                    
                        $("[title='tiempoYubicacion']").append(stringDatos);
                }
        });
    }
   
}
var meteo = new Meteo();
$(document).ready(function () {meteo.cargarDatos();});


