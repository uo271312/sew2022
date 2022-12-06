

class Gasolina {

    constructor() {




    }


    cargarDatos() {



        this.municipio = $("select").val();

        $.ajax({

            method: 'GET',
            url: 'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/',



            success: function (datos) {
                $("pre").text(JSON.stringify(datos, null, 2));
                var listaPrecios = [];

                $.each(datos['ListaEESSPrecio'], function (i, data) {
                    listaPrecios.push(parseFloat(data['Precio Gasolina 95 E5'].replace(",", ".")))

                });

                var i = 0;
                var estaciones = 0;
                var suma = 0;
                
                for(i;i < listaPrecios.length;i++) {
                     
                    let precio = listaPrecios[i++];
                    if (!Number.isNaN(precio))
                        estaciones++;
                    suma += listaPrecios[i++] || 0.0;
                }
                console.log(Math.min(listaPrecios.filter(precio => !Number.isNaN(precio))))
                
                var stringDatos =  "<table><tr><th>Precio medio gasolina de 95 en España</th><th>"+ (suma / estaciones) + "</th></tr>";
                stringDatos += "<tr><th>Gasolineras sobre las que se realizó la media</th><th>"+ estaciones + "</th></tr></table>";
                
                $("main").html(stringDatos);


            },

        });
    }

}
var gasolina = new Gasolina();