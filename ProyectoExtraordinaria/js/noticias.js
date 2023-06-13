
class Noticias {
    API_KEY = 'hQz0d1faEqX_cbJxfpTCPmMeyTcZBYe-LmdIRVBxMHI';
   

    cargarDatos(query) {
        

        this.url = 'https://api.newscatcherapi.com/v2/search?q=concejo de Nava&lang=es';
        $.ajax({
            dataType: 'json',
            url: this.url,
            headers: {
                'x-api-key': this.API_KEY
              },
            method: 'GET',
            success: function (data) {
                this.datos = data;
                var str;
                var i;
                var cantidadNoticias=0;
                if(this.datos.articles.length>3)
                    cantidadNoticias=3;
                else
                    cantidadNoticias=this.datos.articles.length;

                for(i=0;i<cantidadNoticias;i++){ 

                    str +="<h3>" + this.datos.articles[i].title + "</h3>"
                    str += "<p>" + this.datos.articles[i].summary + "</p>";
                   
                }
                $("[title='noticias']").append(str);
                if (this.datos.articles.length == 0) {
                    $("[title='noticias']").append('<p>No se han encontrado noticias</p>');
                }
            }
        });
    }

}




let not = new Noticias();
not.cargarDatos();