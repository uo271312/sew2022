class CalculadoraMilan{

	
    constructor(){
		
        this.pantalla = "0";
		this.memoria="0";
		this.numeros=new Array();
		this.operadores=new Array();
		this.addListener();
		
    }
	addListener() {
		document.addEventListener("keydown", function (event) {
			if (event.altKey && event.code === "KeyO") {

				calculadora.borrarTodo();
			}
			if (event.altKey && event.code === "Backspace") {

				calculadora.cero();
			}
			if (event.altKey && event.code === "KeyQ") {

				calculadora.mMas();
			}
			if (event.altKey && event.code === "KeyW") {

				calculadora.mMenos();
			}
			if (event.altKey && event.code === "Digit0") {

				calculadora.digitos(0);
			}

			if (event.altKey && event.code === "Digit1") {

				calculadora.digitos(1);
			}

			if (event.altKey && event.code === "Digit2") {

				calculadora.digitos(2);
			}

			if (event.altKey && event.code === "Digit3") {

				calculadora.digitos(3);
			}

			if (event.altKey && event.code === "Digit4") {

				calculadora.digitos(4);
			}

			if (event.altKey && event.code === "Digit5") {

				calculadora.digitos(5);
			}

			if (event.altKey && event.code === "Digit6") {

				calculadora.digitos(6);
			}

			if (event.altKey && event.code === "Digit7") {

				calculadora.digitos(7);
			}

			if (event.altKey && event.code === "Digit8") {

				calculadora.digitos(8);
			}

			if (event.altKey && event.code === "Digit9") {

				calculadora.digitos(9);
			}

			if (event.altKey && event.code === "Enter") {

				calculadora.igual();
			}

			if (event.altKey && event.code === "NumpadAdd") {

				calculadora.suma();
			}

			if (event.altKey && event.code === "NumpadSubtract") {

				calculadora.resta();
			}

			if (event.altKey && event.code === "NumpadMultiply") {

				calculadora.multiplicacion();
			}

			if (event.altKey && event.code === "NumpadDivide") {

				calculadora.division();
			}


			if (event.altKey && event.code === "KeyR") {

				calculadora.raiz();
			}

			if (event.altKey && event.code === "KeyI") {

				calculadora.negado();
			}
			if (event.altKey && event.code === "Period") {

				calculadora.punto();
			}
			if (event.altKey && event.code === "KeyP") {

				calculadora.porcentage();
			}
			if (event.altKey && event.code === "KeyE") {

				calculadora.mrc();
			}

		});


	}
    actualizarPantalla(){
		var r=document.getElementById("pantalla");
		r.value=this.pantalla;
        
	}
	mMas(){
		this.memoria=this.pantalla;
	}
	mMenos(){
		this.memoria="0";
	}

	mrc(){
		if(this.pantalla==0){
			this.pantalla="";
		}
		this.pantalla+=this.memoria;
		this.actualizarPantalla();
	}
	masMenos(){
		
		var aux=Number(this.pantalla);
		if(aux>=0)
			aux=aux-(Math.abs(aux)*2);
		else
			aux=Math.abs(aux);

		this.pantalla=aux;
		this.actualizarPantalla();
			
	}
    suma(){
		if(this.pantalla==0){
			this.pantalla="";
		}
		this.pantalla+='+';
		this.actualizarPantalla();
	}
	resta(){
		if(this.pantalla==0){
			this.pantalla="";
		}
		this.pantalla+='-';
		this.actualizarPantalla();
	}
	multiplicacion(){
		if(this.pantalla==0){
			this.pantalla="";
		}
		this.pantalla+='*';
		this.actualizarPantalla();
	}
	punto(){
		if(this.pantalla==0){
			this.pantalla="";
		}
		this.pantalla+='.';
		this.actualizarPantalla();
	}
	division(){
		if(this.pantalla==0){
			this.pantalla="";
		}
		this.pantalla+='/';
		this.actualizarPantalla();
	}
    porcentage(){
		if(this.pantalla==0){
			this.pantalla="";
		}
		this.pantalla+='%';
		this.actualizarPantalla();
	}
    raiz(){
		if(this.pantalla==0){
			this.pantalla="";
		}
		this.pantalla+=String.fromCharCode(8730);
		this.actualizarPantalla();
	}
    borrarTodo(){
        
		this.pantalla = "0";
		this.memoria="0";
		this.numeros=new Array();
		this.operadores=new Array();
		
    }
	
	digitos(x){
		if(this.pantalla==0){
			this.pantalla="";
		}
		this.pantalla+=x;
		this.actualizarPantalla();
		
	}
	cero(){
		this.pantalla='0';
		this.actualizarPantalla();
	}
	calcular(){
		var i=0;
		var resultado=this.numeros.pop();
		while(this.operadores.length>0)
			resultado=this.operar(resultado,this.numeros.pop(),this.operadores.pop());
		return resultado;
	}
	operar(n1,n2,operacion){
		n1=Number(n1);
		n2=Number(n2);
		if(operacion=="+")
			return n1+n2;
		else if(operacion=="-")
			return n1-n2;
		else if(operacion=="*")
			return n1*n2;
		else if(operacion=="/")
			return n1/n2;
		else if(operacion=="%")
			return n1%n2;
	}
    reverseNumber(n) {
		
		return n.split("").reverse().join("");
	  }
	  
    igual(){
		var i=0;
		var j=0;
		var n="";
		var str="";
		var digs = "0123456789.";
		
		
		
        try {
			
			for(i=0;i<this.pantalla.length;i++){
			
				if(this.pantalla[i]=="√"){
					for(j=i+1;j<this.pantalla.length+1;j++){
						if(digs.includes(this.pantalla[j])){
							n+=this.pantalla[j];
						}
					
						else{
							str+=Math.sqrt(n);
							n="";
							i=j-1;
							break;
							
						}
						
					}
					
				}
				else
				 	str+=this.pantalla[i];

			}

			
			n=""
			for(i=str.length-1;i>=0;i--){
					

				if(digs.includes(str[i]))
					n+=str[i];
				
				else{
					this.numeros.push(this.reverseNumber(n));
					this.operadores.push(str[i]);
					n="";
					}

			}
			this.numeros.push(this.reverseNumber(n));



			
			

	
			this.pantalla=this.calcular();
			this.actualizarPantalla();
			

			
        }
        catch (err) {
            document.getElementById("pantalla").value = "Error = " + err;
        }
    }
}
var calculadora = new CalculadoraMilan();