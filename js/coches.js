function CrearCoche(marca, color){
    this.marca =marca;
    this.color = color;

    this.arrancar = function(){
        console.log('Arrancando un coche ' + marca + 'de color' + color)
    }
}
let concesionario = [];

let coche1 = new CrearCoche("Toyota", "Amarillo");
let coche2 = new CrearCoche("Seat", "Amarillo");
let coche3 = new CrearCoche("Audi", "Verde");

concesionario.push(coche1, coche2, coche3);
localStorage.setItem("concesionario", JSON.stringify(concesionario));

let cochesRecuperados = JSON.parse(localStorage.getItem('concesionario'));
console.log(cochesRecuperados);

let cochesFinal = [];
 cochesFinal = cochesRecuperados.map(c => CrearCoche(c.marca, c.color));
 cochesFinal.array.forEach(coche => coche.arrancar);

 let gastosAlmacenamiento = [];
 
 function cargarGastos(gastosAlmacenamiento) {
     
     // gastosAlmacenamiento es un array de objetos "planos"
     // No tienen acceso a los métodos creados con "CrearGasto":
     // "anyadirEtiquetas", "actualizarValor",...
     // Solo tienen guardadas sus propiedades: descripcion, valor, fecha y etiquetas
    localStorage.setItem('gastosAlmacenamiento', JSON.stringify(gastos));
     // Reseteamos la variable global "gastos"
     const gastosAlmacenamiento = JSON.parse(localStorage.getItem('gastosAlmacenamiento'));
     gastos = [];
     // Procesamos cada gasto del listado pasado a la función
     for (let g of gastosAlmacenamiento) {
         // Creamos un nuevo objeto mediante el constructor
         // Este objeto tiene acceso a los métodos "anyadirEtiquetas", "actualizarValor",...
         // Pero sus propiedades (descripcion, valor, fecha y etiquetas) están sin asignar
         let gastoRehidratado = new CrearGasto(gasto.descripcion, gasto.valor, gasto.fecha, gasto.etiquetas);
         // Copiamos los datos del objeto guardado en el almacenamiento
         // al gasto rehidratado
         // https://es.javascript.info/object-copy#cloning-and-merging-object-assign
         Object.assign(gastoRehidratado, g);
         // Ahora "gastoRehidratado" tiene las propiedades del gasto
         // almacenado y además tiene acceso a los métodos de "CrearGasto"
           
         // Añadimos el gasto rehidratado a "gastos"
         gastos.push(gastoRehidratado)
     }
 }