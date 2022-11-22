class CalculadoraMilan {
	constructor() {

		this.pantalla = "";
		this.resultado = "";
		this.memoria = "";


	}

	actualizarPantalla() {
		var r = document.getElementById("pantalla");
		r.value = this.pantalla;

	}
	mMas() {
		this.memoria = this.pantalla;
	}
	mMenos() {
		this.memoria = "0";
	}

	mrc() {
		if (this.pantalla == 0) {
			this.pantalla = "";
		}
		this.pantalla += this.memoria;
		this.actualizarPantalla();
	}

	suma() {
		if (this.pantalla == 0) {
			this.pantalla = "";
		}
		this.pantalla += '+';
		this.actualizarPantalla();
	}
	resta() {
		if (this.pantalla == 0) {
			this.pantalla = "";
		}
		this.pantalla += '-';
		this.actualizarPantalla();
	}
	multiplicacion() {
		if (this.pantalla == 0) {
			this.pantalla = "";
		}
		this.pantalla += '*';
		this.actualizarPantalla();
	}
	punto() {
		if (this.pantalla == 0) {
			this.pantalla = "";
		}
		this.pantalla += '.';
		this.actualizarPantalla();
	}
	division() {
		if (this.pantalla == 0) {
			this.pantalla = "";
		}
		this.pantalla += '/';
		this.actualizarPantalla();
	}


	borrar() {
		this.resultado = "0";
		this.pantalla = "0";
		this.actualizarPantalla();

	}

	digitos(x) {
		if (this.pantalla == 0) {
			this.pantalla = "";
		}
		this.pantalla += x;
		this.actualizarPantalla();
	}

	igual() {
		try {
			this.resultado = eval(this.pantalla);
			this.pantalla = this.resultado;
			this.actualizarPantalla();

		}
		catch (err) {
			document.getElementById("pantalla").value = "Error = " + err;
		}
	}
}

class Calculadora extends CalculadoraMilan {
	constructor() {

		super();
		this.x = "";
		this.isRaiz = false;
		this.isPotencia = false;
		this.addListener();

	}
	addListener() {
		document.addEventListener("keydown", function (event) {
			if (event.altKey && event.code === "KeyC") {

				calculadora.borrar();
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

				calculadora.igualAvanzado();
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

			if (event.altKey && event.code === "KeyS") {

				calculadora.seno();
			}

			if (event.altKey && event.code === "KeyC") {

				calculadora.coseno();
			}

			if (event.altKey && event.code === "KeyT") {

				calculadora.tangente();
			}

			if (event.altKey && event.code === "KeyP") {

				calculadora.cuadrado();
			}

			if (event.altKey && event.code === "KeyF") {

				calculadora.factorial();
			}

			if (event.altKey && event.code === "KeyM") {

				calculadora.XpotenciaY();
			}

			if (event.altKey && event.code === "KeyU") {

				calculadora.arcocoseno();
			}

			if (event.altKey && event.code === "KeyI") {

				calculadora.arcoseno();
			}

			if (event.altKey && event.code === "KeyK") {

				calculadora.arcotangente();
			}

			if (event.altKey && event.code === "KeyR") {

				calculadora.raiz();
			}

			if (event.altKey && event.code === "KeyV") {

				calculadora.xraizy();
			}

			if (event.altKey && event.code === "KeyN") {

				calculadora.negado();
			}

			if (event.altKey && event.code === "KeyL") {

				calculadora.log();
			}

			if (event.altKey && event.code === "KeyJ") {

				calculadora.neperiano();
			}

			if (event.altKey && event.code === "KeyD") {

				calculadora.diezExp();
			}
			if (event.altKey && event.code === "KeyZ") {

				calculadora.inversa();
			}




		});


	}


	seno() {
		this.pantalla = Math.sin(this.pantalla);
		this.actualizarPantalla();
	}
	coseno() {
		this.pantalla = Math.cos(this.pantalla);
		this.actualizarPantalla();
	}
	cuadrado() {
		this.pantalla = Math.pow(this.pantalla, 2);
		this.actualizarPantalla();
	}
	raiz() {
		this.pantalla = Math.sqrt(this.pantalla);
		this.actualizarPantalla();
	}
	arcoseno() {
		this.pantalla = Math.asin(this.pantalla);
		this.actualizarPantalla();
	}
	tangente() {
		this.pantalla = Math.tan(this.pantalla);
		this.actualizarPantalla();
	}
	arcotangente() {
		this.pantalla = Math.atan(this.pantalla);
		this.actualizarPantalla();
	}
	arcocoseno() {
		this.pantalla = Math.acos(this.pantalla);
		this.actualizarPantalla();
	}
	modulo() {
		this.pantalla += '%';
		this.actualizarPantalla();

	}
	exp() {
		this.pantalla += Math.exp(this.pantalla);
		this.actualizarPantalla();
	}
	log() {
		this.pantalla = Math.log(this.pantalla);
		this.actualizarPantalla();
	}
	borrarUno() {
		this.pantalla = this.pantalla.substring(0, this.pantalla.length - 1);
		this.actualizarPantalla();
	}
	parIzq() {
		this.pantalla += '(';
		this.actualizarPantalla();
	}
	parDer() {
		this.pantalla += ')';
		this.actualizarPantalla();
	}
	cubo() {
		this.pantalla = Math.pow(this.pantalla, 3);
		this.actualizarPantalla();
	}
	eElevadox() {
		this.pantalla = Math.pow(Math.E, this.pantalla);
		this.actualizarPantalla();
	}
	neperiano() {
		this.pantalla = Math.pow(-10, 7) * Mat.log(this.pantalla / Math.pow(-10, 7))
	}
	diezExp() {
		this.pantalla = Math.pow(10, this.pantalla);
		this.actualizarPantalla();
	}
	xraizy() {
		this.x = this.pantalla;
		this.isRaiz = true;
		this.isPotencia = false;
		this.borrar();

	}
	xpotenciay() {
		this.x = this.pantalla;
		this.isRaiz = false;
		this.isPotencia = true;
		this.borrar();

	}
	igualAvanzado() {
		if (this.isPotencia == false && this.isRaiz == false) {
			this.igual();
		}
		else {
			if (this.isPotencia == true) {
				this.pantalla = Math.pow(this.x, this.pantalla);
				this.actualizarPantalla();
			}
			if (this.isRaiz == true) {
				this.pantalla = Math.pow(this.pantalla, 1 / this.x);
				this.actualizarPantalla();
			}
		}

	}
	factorial() {
		var valor = 1;
		for (var i = 1; i <= this.pantalla; i++) {
			valor *= i;
		}
		this.pantalla = valor;
		this.actualizarPantalla();
	}
	negado() {
		this.pantalla = -this.pantalla;
		this.actualizarPantalla();
	}
	inversa() {
		var value = 1 / this.pantalla;
		this.pantalla = value;
		actualizarPantalla();
	}

}
var calculadora = new Calculadora();

