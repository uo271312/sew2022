class CalculadoraEspecializada{

    constructor(){

	}
	calcularDistancia(){
		var lat1=parseInt(document.getElementById('lat1').value);
		var lon1=parseInt(document.getElementById('lon1').value);
		var lat2=parseInt(document.getElementById('lat2').value);
		var lon2=parseInt(document.getElementById('lon2').value);

		var difLats=this.EnRadianes(Math.abs(lat1-lat2));
		var difLongs=this.EnRadianes(Math.abs(lon1-lon2));

		var a = (Math.sin(difLats/2)*(Math.sin(difLats/2)))+Math.cos(this.EnRadianes(lat1))*
		Math.cos(this.EnRadianes(lat2))*(Math.sin(difLongs/2)*(Math.sin(difLongs/2)));

  		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		
		var distancia=c*6371;
		document.getElementById('distancia').value=distancia.toFixed(3)+" km";
		

		
	}
	EnRadianes(valor)
	{
  		return (Math.PI / 180) * valor;
	}
	convertirUTM(){
	
	var a=6371000;
	var f=1/298.25;
	var k0 = 0.9996;
	var b = a*(1-f);
	
	var e = Math.sqrt(1 - (b/a)*(b/a));
	
    var latd0 = parseFloat(document.getElementById("lat").value);
	var lngd0 = parseFloat(document.getElementById("lon").value);
	
	

	var lngd=lngd0;
	var latd=latd0;
	

	var xd = lngd;
	var yd = latd;

	var drad = Math.PI/180;
	
	var phi = latd*drad;
	var lng = lngd*drad;
	var utmz = 1 + Math.floor((lngd+180)/6);
	var latz = 0;
	if (latd > -80 && latd < 72){latz = Math.floor((latd + 80)/8)+2;}
	if (latd > 72 && latd < 84){latz = 21;}
	if (latd > 84){latz = 23;}
		
	var zcm = 3 + 6*(utmz-1) - 180;

	
	var e0 = e/Math.sqrt(1 - e*e);
	var esq = (1 - (b/a)*(b/a));
	var e0sq = e*e/(1-e*e);

	var N = a/Math.sqrt(1-Math.pow(e*Math.sin(phi),2));
	
	var T = Math.pow(Math.tan(phi),2);
	
	var C = e0sq*Math.pow(Math.cos(phi),2);
	
	var A = (lngd-zcm)*drad*Math.cos(phi);
	
	var M = phi*(1 - esq*(1/4 + esq*(3/64 + 5*esq/256)));
	M = M - Math.sin(2*phi)*(esq*(3/8 + esq*(3/32 + 45*esq/1024)));
	M = M + Math.sin(4*phi)*(esq*esq*(15/256 + esq*45/1024));
	M = M - Math.sin(6*phi)*(esq*esq*esq*(35/3072));
	M = M*a;
	var M0 = 0;
	var x = k0*N*A*(1 + A*A*((1-T+C)/6 + A*A*(5 - 18*T + T*T + 72*C -58*e0sq)/120));
	var y = k0*(M - M0 + N*Math.tan(phi)*(A*A*(1/2 + A*A*((5 - T + 9*C + 4*C*C)/24 + A*A*(61 - 58*T + T*T + 600*C - 330*e0sq)/720))));
	var yg = y + 10000000;
	if (y < 0){y = 10000000+y;}
	
	var zona = utmz;
	var este = Math.round(10*(x))/10 
	var norte = Math.round(10*y)/10 
	
	document.getElementById('formatoUTM').value="Este:"+este+"  Norte:"+norte+"  Zona:"+zona;	
}
}
var calculadora=new CalculadoraEspecializada();

