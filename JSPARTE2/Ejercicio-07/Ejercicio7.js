class Ejercicio {

    constructor() {

    }
    monstrar() {
        $("p:first").show();
    }
    ocultar() {
        $("p:first").hide();
    }
    añadirEdad() {

        $("p:nth-of-type(2)").append($("input:nth-of-type(3)").val());

    }
    añadirAltura() {
        $("p:nth-of-type(3)").append($("input:nth-of-type(5)").val());
    }
    añadirPeso() {

        $("p:nth-of-type(4)").append($("input:nth-of-type(7)").val());
    }
    eliminarCampos() {

        $("p:nth-of-type(4)").remove();
        $("p:nth-of-type(2)").remove();
        $("p:nth-of-type(3)").remove();
    }
    calcularCalorias() {
        var sexo = $("select").val();
        var cons = 10 * ($("input:nth-of-type(7)").val()) + 6.25 * ($("input:nth-of-type(5)").val()) - 5 * ($("input:nth-of-type(3)").val());
        var res;
        if (sexo == "Hombre")
            res = cons + 5;
        else
            res = cons - 161;


        $("input:nth-of-type(11)").val(res);


    }


    recorrerYmonstrar() {

        $("*", document.body).each(function () {
            var padre = $(this).parent().get(0).tagName;
            $(this).prepend(document.createTextNode("Elemento padre : <" + padre + "> Tipo elemento : <" + $(this).get(0).tagName + ">"));
        });
        $("input:nth-of-type(12)").prop('disabled', true);

    }



    calculateSum() {

        var total_col = 0;

        $('table').find('tr').each(function () {

            total_col += parseFloat($(this).find('td').text());

        });

        $("tr:last").after("<tr><th>Total</th><td>"+total_col+"</td>")
        


    }
}

var ej = new Ejercicio();

