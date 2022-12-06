"use strict";
class Meteo {
    constructor() {
        this.apikey = "c88a657239ea082db6d82990d4d1e943";
        this.tipo = "&mode=xml";
        this.unidades = "&units=metric";
        this.idioma = "&lang=ES";

    }
    cargarDatos() {

        this.ciudad = $("select").val();
        this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad + this.tipo + this.unidades + this.idioma + "&APPID=" + this.apikey;

        $.ajax({
            dataType: "xml",
            url: this.url,
            method: 'GET',
            success: function (datos) {

                console.log(datos);

                var ciudad = $('city', datos).attr("name");
                var longitud = $('coord', datos).attr("lon");
                var latitud = $('coord', datos).attr("lat");
                var pais = $('country', datos).text();
                var minutosZonaHoraria = new Date().getTimezoneOffset();
                var temperatura = $('temperature', datos).attr("value");
                var temperaturaMin = $('temperature', datos).attr("min");
                var temperaturaMax = $('temperature', datos).attr("max");
                var humedad = $('humidity', datos).attr("value");
                var humedadUnit = $('humidity', datos).attr("unit");
                var presion = $('pressure', datos).attr("value");
                var presionUnit = $('pressure', datos).attr("unit");
                var velocidadViento = $('speed', datos).attr("value");
                var nombreViento = $('speed', datos).attr("name");
                var direccionViento = $('direction', datos).attr("value");
                var precipitacionValue = $('precipitation', datos).attr("value");
                var descripcion = $('weather', datos).attr("value");
                var horaMedida = $('lastupdate', datos).attr("value");
                var horaMedidaMiliSeg1970 = Date.parse(horaMedida);
                horaMedidaMiliSeg1970 -= minutosZonaHoraria * 60 * 1000;
                var horaMedidaLocal = (new Date(horaMedidaMiliSeg1970)).toLocaleTimeString("es-ES");
                var fechaMedidaLocal = (new Date(horaMedidaMiliSeg1970)).toLocaleDateString("es-ES");
                var icon = $('weather', datos).attr("icon");

                var stringDatos = "<table><tr><th>Parametros</th><th>Datos</th></tr>";
                stringDatos += "<tr><td>Ciudad: </td><td>" + ciudad + "</td></tr>";
                stringDatos += "<tr><td>Longitud:</td><td> " + longitud + " grados</td></tr>";
                stringDatos += "<tr><td>Latitud: </td><td>" + latitud + " grados</td></tr>";
                stringDatos += "<tr><td>País:</td><td> " + pais + "</td></tr>";
                stringDatos += "<tr><td>Temperatura:</td><td> " + temperatura + " grados Celsius</td></tr>";
                stringDatos += "<tr><td>Temperatura mínima:</td><td> " + temperaturaMin + " grados Celsius</td></tr>";
                stringDatos += "<tr><td>Temperatura máxima:</td><td> " + temperaturaMax + " grados Celsius</td></tr>";
                stringDatos += "<tr><td>Humedad:</td><td> " + humedad + " " + humedadUnit + "</td></tr>";
                stringDatos += "<tr><td>Presión: </td><td>" + presion + " " + presionUnit + "</td></tr>";
                stringDatos += "<tr><td>Velocidad del viento:</td><td> " + velocidadViento + " metros/segundo</td></tr>";
                stringDatos += "<tr><td>Dirección del viento:</td><td> " + direccionViento + " grados</td></tr>";
                stringDatos += "<tr><td>Nombre del viento:</td><td> " + nombreViento + "</td></tr>";
                stringDatos += "<tr><td>Precipitación valor:</td><td> " + precipitacionValue + "</td></tr>";
                stringDatos += "<tr><td>Descripcion:</td><td> " + descripcion + "</td></tr>";
                stringDatos += "<tr><td>Hora de la medida: </td><td>" + horaMedidaLocal + "</td></tr>";
                stringDatos += "<tr><td>Fecha de la medida:</td><td> " + fechaMedidaLocal + "</td></tr>";
                stringDatos += "<tr><td>Icono</td><td><img src='http://openweathermap.org/img/w/" + icon + ".png' alt='' /></td></tr></table>";

                $("main").html(stringDatos);
            }
        });
    }

}
var meteo = new Meteo();