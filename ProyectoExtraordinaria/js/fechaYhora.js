class FechaYhora {

  constructor() {
    this.date = new Date();
  }
formatDate(n){
  if(n<10)return "0"+n;
  return n;
}
  getTime() {
    var date = this.date;
    document.querySelector('[title="fechaYhora"]').insertAdjacentHTML('beforeend', "<p>"+this.formatDate(date.getHours()) + ":" + this.formatDate(date.getMinutes()) 
    + " del dia "+this.formatDate(date.getDay()+4)+ "/" + this.formatDate(date.getMonth()+1) + "/" + date.getFullYear()+"</p>");
   
}


}
var fecha= new FechaYhora();
$(document).ready(function () {fecha.getTime();});