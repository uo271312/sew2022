class Meteo {

    constructor() {
        this.apikey = "48c5ce6486b6e5b860c8658430ff622f";


    }
    cargarDatos() {


        this.url = "https://api.openweathermap.org/data/2.5/forecast?lat=43.3395&lon=-5.4949&cnt=7&appid=" + this.apikey;
        $.getJSON({
            dataType: "json",
            url: this.url,
            method: 'GET',
            context: this,
            success: function (datos) {
                
                const fechaActual = new Date();
                const dias = [];
                dias.push(fechaActual);
                for (let i = 1; i <= 6; i++) {
                    const siguienteDia = new Date();
                    siguienteDia.setDate(fechaActual.getDate() + i);
                    dias.push(siguienteDia);
                }
                var diasFormat=[];
                dias.forEach(dia => {
                    diasFormat.push(dia.toLocaleDateString('es-ES', { weekday: 'long' }));
                });
                var stringDatos = "<table><tr><th>Dia</th><th>Previsión</th></tr>";
                for (var i = 0; i < datos.list.length; i++) {
                    var dia = datos.list[i];
                    stringDatos += "<tr><td>" + diasFormat[i] + "</td><td><img src='http://openweathermap.org/img/w/" + dia.weather[0].icon + ".png' alt='' /></td></tr>";
                }
                stringDatos += "</table>"

                $("section").append(stringDatos);
            }
        });
    }

}
var meteo = new Meteo();
$(document).ready(function () { meteo.cargarDatos(); });






