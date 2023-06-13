class Juego {

  evaluar() {

    let repuestasCorrectas = ["2", "10", "14", "16", "25", "29", "35", "36", "43", "50"];
    let respuestasUsuario = new Array();
    let aciertos = 0;
    let countRespuestas = 0;


    for (var i = 1; i <= 50; i++) {
      if (document.querySelectorAll('input')[i].checked == true) {
        countRespuestas++;
        respuestasUsuario.push(i+1);
      }
    }
   
        for (var i = 0; i < 10; i++) {
          if (repuestasCorrectas[i] == respuestasUsuario[i]) {
            aciertos++;
          }

    }
      
    if (countRespuestas != 10)
      alert('Debe responder a todas las preguntas');

    else
      alert('Ha obtenido una calificacion de ' + aciertos + ' puntos');
      



  }
  reset(){
    for (var i = 1; i <= 50; i++) {
      document.querySelectorAll('input')[i].checked =false;
    }
    this.respuestasUsuario = new Array();
    this.aciertos=0;
    this.countRespuestas=0;
  }

}
var juego = new Juego();