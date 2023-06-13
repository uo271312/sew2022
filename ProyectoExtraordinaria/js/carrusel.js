class Carrusel {

    constructor(){
    this.posicionActual = 0;
    }
    
    
    avanzar() {
      if (this.posicionActual >= images.length - 1) {
        this.posicionActual = 0;
      } else {
        this.posicionActual++;
      }
      this.mostrarImagenes();
    }
    
    atrasar() {
      if (this.posicionActual <= 0) {
        this.posicionActual = images.length - 1;
      } else {
        this.posicionActual--;
      }
      this.mostrarImagenes();
    }
    
    mostrarImagenes() {
      let image = 'multimedia/'+ images[this.posicionActual];
      document.querySelector('section img').setAttribute('src', image);  
      
        
    }
  }
  
  // Crear instancia del carrusel y agregar imágenes
  const images = [
    'imagen1.jpg',
    'imagen2.jpg',
    'imagen3.jpg',
    'imagen4.jpg',
    'imagen5.jpg',
    'imagen6.jpg',

    ];
  
 var car = new Carrusel();
