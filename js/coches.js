function Coches(marca, color){
    this.marca = marca;
    this.color = color;
    this.arrancar = function(){
        console.log(`Arrancando un coche ${marca} de color ${color}`);
    }
}
let coche1 = new Coches("citroen", "negro");
let coche2 = new Coches("peujeot", "rojo");
let coche3 = new Coches("honda", "blanco");

let coches = [coche1, coche2, coche3];

localStorage.setItem("coches", JSON.stringify(coches));
let cocheStorage = JSON.parse(localStorage.getItem("coches"));

cocheStorage.forEach((element, i) => {
    cocheStorage[i] = new Coches(element.marca, element.color)
});
cocheStorage.forEach(element => {
    element.arrancar()
});