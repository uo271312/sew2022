

class Gasolina {

    constructor() {




    }


    cargarDatos() {



        this.municipio = $("select").val();

        $.ajax({

            method: 'GET',
            url: 'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/',



            success: function (datos) {

                for (var item in datos.ListaEESSPrecio) {
                    if (item.municipio == this.municipio) {
                        
                        var stringDatos = "<tr><th>Municipio</th><td>" + item.Municipio + "</td></tr>";
                        stringDatos += "<tr><th>Localidad</th><td> " + item.Localidad+ "</td></tr>";
                        stringDatos += "<tr><th>Precio</th><td> " + item.Precio_x0020_Gasolina_x0020_95_x0020_E5+ "</td></tr>";
                       

                        $("table").html(stringDatos);
                        break;

                    }
                }


            }

        });
    }

}
var gasolina = new Gasolina();