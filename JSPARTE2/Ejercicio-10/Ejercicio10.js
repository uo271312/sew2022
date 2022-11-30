

class Bolsa {
	
    constructor(){		
       
        this.apikey = "14176c76a9a854608e1da158796abf5d";
        this.empresa="";
       
    }
	//http://api.marketstack.com/v1/eod
    //? access_key = YOUR_ACCESS_KEY
	
    cargarDatos(empresa){
        
		this.empresa = document.getElementById('empresa').options[document.getElementById('empresa').selectedIndex].value;
	$.ajax({
        url: 'http://api.marketstack.com/v1/tickers/'+this.empresa+'/eod/latest',
       data: {
           access_key: this.apikey
        },
        dataType: 'json',
        success: function(apiResponse) {
                        var stringDatos =  "<tr><th>Parametros</th><th>Datos</th></tr>";
                        stringDatos += "<tr><td>Simbolo:</td><td> " + apiResponse['symbol'] + "</td></tr>";
                        stringDatos += "<tr><td>Fecha: </td><td>" + apiResponse['date'] + "</td></tr>";
                        stringDatos += "<tr><td>Valor de inicio:</td><td> " + apiResponse['adj_open'] + "</td></tr>";
                        stringDatos += "<tr><td>Valor de cierre:</td><td> " + apiResponse['adj_close'] + "</td></tr>";
                        stringDatos += "<tr><td>Valor máximo</td><td> " + apiResponse['adj_high'] + "</td></tr>";
                        stringDatos += "<tr><td>Valor mínimo</td><td> " + apiResponse['adj_low'] + "</td></tr>";
                        stringDatos += "<tr><td>Volumen:</td><td> " + apiResponse['adj_volume'] + "</td></tr>";
                    
                    $("table").html(stringDatos); 
        }
        
        }); 
    }                

}             
var bolsa = new Bolsa();