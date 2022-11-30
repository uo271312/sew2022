
class Meteo {

    constructor() {
        this.apikey = "c88a657239ea082db6d82990d4d1e943";
        this.unidades = "&units=metric";
        this.idioma = "&lang=ES";

    }
    cargarDatos() {

        this.ciudad = $("select").val();

        if (this.ciudad == "Oviedo") {
            this.lat = 43.360;
            this.lon = -5.844;
        }
        if (this.ciudad == "Leon") {
            this.lat = 42.600;
            this.lon = -5.570;
        }
        if (this.ciudad == "Madrid") {
            this.lat = 40.416;
            this.lon = -3.702;
        }
        if (this.ciudad == "Sevilla") {
            this.lat = 37.3824;
            this.lon = -5.9761;
        }
        if (this.ciudad == "Mieres") {
            this.lat = 43.25;
            this.lon = -5.7667;
        }


        this.url = "http://api.openweathermap.org/data/2.5/weather?lat=" + this.lat + "&lon=" + this.lon + this.unidades + this.idioma + "&appid=" + this.apikey;
        $.getJSON({
            dataType: "json",
            url: this.url,
            method: 'GET',
            success: function (datos) {
                var stringDatos = "<tr><th>Parametros</th><th>Datos</th></tr>";
                stringDatos += "<tr><td>Ciudad:</td><td>" + datos.name + "</td></tr>";
                stringDatos += "<tr><td>País:</td><td> " + datos.sys.country + "</td></tr>";
                stringDatos += "<tr><td>Latitud:</td><td> " + datos.coord.lat + " grados</td></tr>";
                stringDatos += "<tr><td>Longitud:</td><td> " + datos.coord.lon + " grados</td></tr>";
                stringDatos += "<tr><td>Temperatura:</td><td> " + datos.main.temp + " grados Celsius</td></tr>";
                stringDatos += "<tr><td>Temperatura máxima:</td><td> " + datos.main.temp_max + " grados Celsius</td></tr>";
                stringDatos += "<tr><td>Temperatura mínima:</td><td> " + datos.main.temp_min + " grados Celsius</td></tr>";
                stringDatos += "<tr><td>Presión:</td><td> " + datos.main.pressure + " milibares</td></tr>";
                stringDatos += "<tr><td>Humedad:</td><td> " + datos.main.humidity + " %</td></tr>";
                stringDatos += "<tr><td>Amanece a las: </td><td>" + new Date(datos.sys.sunrise * 1000).toLocaleTimeString() + "</td></tr>";
                stringDatos += "<tr><td>Oscurece a las:</td><td> " + new Date(datos.sys.sunset * 1000).toLocaleTimeString() + "</td></tr>";
                stringDatos += "<tr><td>Dirección del viento: </td><td>" + datos.wind.deg + " grados</td></tr>";
                stringDatos += "<tr><td>Velocidad del viento:</td><td> " + datos.wind.speed + " metros/segundo</td></tr>";
                stringDatos += "<tr><td>Hora de la medida: </td><td>" + new Date(datos.dt * 1000).toLocaleTimeString() + "</td></tr>";
                stringDatos += "<tr><td>Fecha de la medida:</td><td> " + new Date(datos.dt * 1000).toLocaleDateString() + "</td></tr>";
                stringDatos += "<tr><td>Descripción:</td><td>" + datos.weather[0].description + "</td></tr>";
                stringDatos += "<tr><td>Visibilidad: </td><td>" + datos.visibility + " metros</td></tr>";
                stringDatos += "<tr><td>Nubosidad:</td><td> " + datos.clouds.all + " %</td></tr>";
                stringDatos += "<tr><td>Icono</td><td><img src='http://openweathermap.org/img/w/" + datos.weather[0].icon + ".png' alt='' /></td></tr>";

                $("table").html(stringDatos);
            }
        });
    }

}
var meteo = new Meteo();
