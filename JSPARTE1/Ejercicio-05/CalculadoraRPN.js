class CalculadoraRPN {

	constructor() {



		this.pantalla0 = "";
		this.pantalla1 = "";
		this.pantalla2 = "";
		this.pantalla3 = "";
		this.pantalla4 = "";
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

				calculadora.enter();
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

				calculadora.XElevadoY();
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

				calculadora.xRaizY();
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

				calculadora.diezaX();
			}
			if (event.altKey && event.code === "Period") {

				calculadora.digitos(".");
			}

		});


	}

	borrar() {
		this.pantalla0 = "";
		this.actualizarPantalla();
	}
	actualizarPantalla() {
		var r0 = document.getElementById("pantalla0");
		var r1 = document.getElementById("pantalla1");
		var r2 = document.getElementById("pantalla2");
		var r3 = document.getElementById("pantalla3");
		var r4 = document.getElementById("pantalla4");
		r0.value = this.pantalla0;
		r1.value = this.pantalla1;
		r2.value = this.pantalla2;
		r3.value = this.pantalla3;
		r4.value = this.pantalla4;

	}
	digitos(x) {
		if (this.pantalla0 == this.pantalla1)
			this.pantalla0 = x;
		else {
			this.pantalla0 += x;


		}

		this.actualizarPantalla();
	}

	enter() {
		var aux0 = this.pantalla0;
		var aux1 = this.pantalla1;
		var aux2 = this.pantalla2;
		var aux3 = this.pantalla3;


		this.pantalla4 = aux3;
		this.pantalla3 = aux2;
		this.pantalla2 = aux1;
		this.pantalla1 = aux0;


		this.actualizarPantalla();

	}


	suma() {
		var x = parseInt(this.pantalla1);
		var y = parseInt(this.pantalla0);
		this.pantalla0 = (x + y);
		this.pantalla1 = this.pantalla2;
		this.pantalla2 = this.pantalla3;
		this.pantalla3 = this.pantalla4;
		this.pantalla4 = "";

		this.actualizarPantalla();
	}
	resta() {
		var x = parseInt(this.pantalla1);
		var y = parseInt(this.pantalla0);
		this.pantalla0 = (x - y);
		this.pantalla1 = this.pantalla2;
		this.pantalla2 = this.pantalla3;
		this.pantalla3 = this.pantalla4;
		this.pantalla4 = "";

		this.actualizarPantalla();

	}
	multiplicacion() {
		var x = parseInt(this.pantalla1);
		var y = parseInt(this.pantalla0);
		this.pantalla0 = (x + y);
		this.pantalla1 = this.pantalla2;
		this.pantalla2 = this.pantalla3;
		this.pantalla3 = this.pantalla4;
		this.pantalla4 = "";

		this.actualizarPantalla();
	}

	division() {
		var x = parseInt(this.pantalla1);
		var y = parseInt(this.pantalla0);
		this.pantalla0 = (x + y);
		this.pantalla1 = this.pantalla2;
		this.pantalla2 = this.pantalla3;
		this.pantalla3 = this.pantalla4;
		this.pantalla4 = "";

		this.actualizarPantalla();
	}
	seno() {
		this.pantalla0 = Math.sin(this.pantalla0);
		this.actualizarPantalla();
	}
	coseno() {
		this.pantalla0 = Math.cos(this.pantalla0);
		this.actualizarPantalla();
	}
	cuadrado() {
		this.pantalla0 = Math.pow(this.pantalla0, 2);
		this.actualizarPantalla();
	}
	factorial() {
		var valor = 1;
		var x = this.pantalla0;
		for (var i = 1; i <= x; i++) {
			valor *= i;
		}
		this.pantalla0 = valor;
		this.actualizarPantalla();
	}
	diezaX() {
		this.pantalla0 = Math.pow(10, this.pantalla0);
		this.actualizarPantalla();
	}
	exp() {
		this.pantalla0 = Math.pow(Math.E, this.pantalla0);
		this.actualizarPantalla();
	}
	XElevadoY() {
		this.pantalla0 = Math.pow(this.pantalla1, this.pantalla0);
		this.pantalla1 = this.pantalla2;
		this.pantalla2 = this.pantalla3;
		this.pantalla3 = this.pantalla4;
		this.pantalla4 = "";
		this.actualizarPantalla();
	}
	xRaizY() {
		this.pantalla0 = Math.pow(this.pantalla1, 1 / this.pantalla0);
		this.pantalla1 = this.pantalla2;
		this.pantalla2 = this.pantalla3;
		this.pantalla3 = this.pantalla4;
		this.pantalla4 = "";
		this.actualizarPantalla();
	}
	raiz() {
		this.pantalla0 = Math.sqrt(this.pantalla0);
		this.actualizarPantalla();
	}
	arcoseno() {
		this.pantalla0 = Math.asin(this.pantalla0);
		this.actualizarPantalla();
	}
	tangente() {
		this.pantalla0 = Math.tan(this.pantalla0);
		this.actualizarPantalla();
	}
	arcotangente() {
		this.pantalla0 = Math.atan(this.pantalla0);
		this.actualizarPantalla();
	}
	arcocoseno() {
		this.pantalla0 = Math.acos(this.pantalla0);
		this.actualizarPantalla();
	}

	log() {
		this.pantalla0 = Math.log2(this.pantalla0);
		this.actualizarPantalla();
	}
	neperiano() {
		this.pantalla0 = Math.log(this.pantalla0);
		this.actualizarPantalla();
	}
	negado() {
		if (this.pantalla0 > 0)
			this.pantalla0 = this.pantalla0 - (this.pantalla0 * 2);
		else
			this.pantalla0 = this.pantalla0 + (this.pantalla0 * 2);
		this.actualizarPantalla();
	}
}

var calculadora = new CalculadoraRPN();

