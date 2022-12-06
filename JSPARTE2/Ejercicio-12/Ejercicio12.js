"use strict";
class Carga{
		
	subirArchivos(files) { 
		
		var archivo = files[0];
		var extensiones_text = new Array("plain","xml");	
		var extension_json="application/json";
		document.querySelector("p:nth-of-type(1)").innerText="Nombre:"+archivo.name;
		document.querySelector("p:nth-of-type(2)").innerText="Tamaño del archivo:"+archivo.size + 'bytes'; 
		document.querySelector("p:nth-of-type(3)").innerText="Tipo de archivo:"+archivo.type;
		document.querySelector("p:nth-of-type(4)").innerText="Ultima modificacion:"+archivo.lastModifiedDate;
		
		
		var valido = false;
		
		for (var i = 0; i < extensiones_text.length; i++) {
			var tipoTexto = "text/" + extensiones_text[i];
			
			if (archivo.type.match(tipoTexto)) 
			{
				valido = true;
			}
		}
		if(archivo.type.match(extension_json))valido=true;

		
		if (valido) {
			var lector = new FileReader();
			lector.onload = function (evento)
			{
			
				document.querySelector("p:nth-of-type(5)").innerText=lector.result;
			}      
			lector.readAsText(archivo);
			document.querySelector("p:nth-of-type(6)").innerText="No existen errores"
			
		}
		else
		{
			document.querySelector("p:nth-of-type(6)").innerText="El formato del archivo no es válido";
		}
	}
}
var carga = new Carga();
