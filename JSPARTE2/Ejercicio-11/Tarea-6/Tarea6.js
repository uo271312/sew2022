class MapaClima{
  constructor(){
    this.lat=43.3672702;
    this.lng= -5.8502461
  }


  initAll(){
    this.initMap();
    this.cargarDatosMeteo();
  }
initMap(){  
    var centro = {lat: this.lat, lng: this.lng};
    var mapaGeoposicionado = new google.maps.Map(document.getElementsByTagName('main')[0],{
        zoom: 8,
        center:centro,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    
    var infoWindow = new google.maps.InfoWindow;
    if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            miMapa.lat=pos.lat;
            miMapa.lng=pos.lng;
            infoWindow.setPosition(pos);
            infoWindow.setContent('Localización encontrada');
            infoWindow.open(mapaGeoposicionado);
            mapaGeoposicionado.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, mapaGeoposicionado.getCenter());
          });
        } else {
         
          handleLocationError(false, infoWindow, mapaGeoposicionado.getCenter());
        }
      }

      handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: Ha fallado la geolocalización' :
                              'Error: Su navegador no soporta geolocalización');
        infoWindow.open(mapaGeoposicionado);
      }

      cargarDatosMeteo(){

      

        var apikey = "c88a657239ea082db6d82990d4d1e943";
        var unidades = "&units=metric";
        var idioma = "&lang=es";
        

        
        var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + this.lat + "&lon=" +this.lng + unidades + idioma + "&APPID=" + apikey;
            $.getJSON({
                dataType: "json",
                url: url,
                method: 'GET',
                success: function(datos){
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
                            stringDatos += "<tr><td>Amanece a las: </td><td>" + new Date(datos.sys.sunrise *1000).toLocaleTimeString() + "</td></tr>";
                            stringDatos += "<tr><td>Oscurece a las:</td><td> " + new Date(datos.sys.sunset *1000).toLocaleTimeString() + "</td></tr>";
                            stringDatos += "<tr><td>Dirección del viento: </td><td>" + datos.wind.deg + " grados</td></tr>";
                            stringDatos += "<tr><td>Velocidad del viento:</td><td> " + datos.wind.speed + " metros/segundo</td></tr>";
                            stringDatos += "<tr><td>Hora de la medida: </td><td>" + new Date(datos.dt *1000).toLocaleTimeString() + "</td></tr>";
                            stringDatos += "<tr><td>Fecha de la medida:</td><td> " + new Date(datos.dt *1000).toLocaleDateString() + "</td></tr>";
                            stringDatos += "<tr><td>Descripción:</td><td>" + datos.weather[0].description + "</td></tr>";
                            stringDatos += "<tr><td>Visibilidad: </td><td>" + datos.visibility + " metros</td></tr>";
                            stringDatos += "<tr><td>Nubosidad:</td><td> " + datos.clouds.all + " %</td></tr>";
                stringDatos += "<tr><td>Icono</td><td><img src='http://openweathermap.org/img/w/"+ datos.weather[0].icon + ".png' alt='' /></td></tr>";
                        
                        $("table").html(stringDatos);
                    }
            });
        }
    }
var miMapa=new MapaClima();

   
           
        
    



