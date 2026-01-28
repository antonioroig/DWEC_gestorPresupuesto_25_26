// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
"use strict"
// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(valor) {
    if(!isNaN(valor) && valor >= 0)
    {
        presupuesto = valor;
        return presupuesto;

    }
    else{
        console.log("Debes introducir un número positivo")
        return -1;
    }
}

function mostrarPresupuesto() {
    return "Tu presupuesto actual es de " + presupuesto + " €"
}

function CrearGasto(descripcion,valor,fecha,...etiquetas) {
   
    this.fecha = (fecha !== undefined && !isNaN(Date.parse(fecha))) ? Date.parse(fecha) : Date.now(); 
    this.etiquetas = (etiquetas.length >0) ? etiquetas : [];
    this.descripcion = descripcion
    this.valor = (!isNaN(valor) && valor >= 0) ? valor : 0;
    this.mostrarGasto = function(){
        return "Gasto correspondiente a " + descripcion + " con valor " + valor + " €"
    }
    this.actualizarDescripcion = function(descripcion){
         this.descripcion = descripcion
    }
    this.actualizarValor = function(valor){
        this.valor = (!isNaN(valor) && valor >= 0) ? valor : this.valor;
       
            }
  this.mostrarGastoCompleto = function() {
        let etiqueta = "";
        for (let i = 0; i < this.etiquetas.length; i++) {
            etiqueta += `- ${this.etiquetas[i]}\n`;
        }

        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.
Fecha: ${new Date(this.fecha).toLocaleString()}
Etiquetas:
${etiqueta}`;
    
    }
    this.actualizarFecha  = function(fecha){
        if (fecha !== undefined && !isNaN(Date.parse(fecha))){
            this.fecha = Date.parse(fecha);
        }
    }

    this.anyadirEtiquetas = function(...arrayEtiquetas){

        let aux
        for (let i = 0 ; i < arrayEtiquetas.length ; i++){
            aux = arrayEtiquetas[i]
            if (!this.etiquetas.includes(aux)){
                this.etiquetas.push(aux)
            }
        }
    }

    this.borrarEtiquetas = function (...etiquetasPasadas){
         

        for(let i = 0 ; i < etiquetasPasadas.length ; i++){
           for (let j = 0; j < this.etiquetas.length; j++){

                if(this.etiquetas[j] === etiquetasPasadas[i]){
                    this.etiquetas.splice(j, 1);
                    j--;
                }
            }
        }
    }

    this.obtenerPeriodoAgrupacion = function (periodo){
     const fecha = new Date(this.fecha);
  const anyo = fecha.getFullYear();
  let mes = fecha.getMonth() + 1;
  let dia = fecha.getDate();

   if (dia < 10){
    dia = "0" + dia
   }
   
     if (mes < 10){
    mes = "0" + mes
   }  

  if (periodo === "dia"){
        return anyo + "-" + mes + "-"+ dia;
  } 
  else if (periodo === "mes"){
       return anyo + "-" + mes;
        ;
  } 
  else if (periodo === "anyo"){
        return anyo;
  } 

  return;
        
    }
 }
 

function listarGastos(){
    return gastos
}

function anyadirGasto(nuevoGasto){
    nuevoGasto.id = idGasto;
    idGasto++;
    gastos.push(nuevoGasto)

}

function borrarGasto(id){
    for(let i= 0; i < gastos.length ; i++){
        if (gastos[i].id === id){
            gastos.splice(i,1);
            break;
        }
    }


}

function calcularTotalGastos(){
    let suma = 0;
    for (let i = 0 ; i <gastos.length ; i++){
        suma += gastos[i].valor;
    }
    return suma;
}

function calcularBalance(){
    return presupuesto - calcularTotalGastos();
}



function filtrarGastos(param) {
  return gastos.filter(function(g) {
    let fecha = new Date(g.fecha).getTime();

    if (param.fechaDesde && fecha < new Date(param.fechaDesde).getTime()){
        return false;
    } 
    if (param.fechaHasta && fecha > new Date(param.fechaHasta).getTime()){
        return false;
    } 

    if (param.valorMinimo != null && g.valor < param.valorMinimo){
        return false;
    } 
    if (param.valorMaximo != null && g.valor > param.valorMaximo){
        return false;
    } 

    if (param.descripcionContiene &&
        g.descripcion.toLowerCase().indexOf(param.descripcionContiene.toLowerCase()) === -1){
        return false;
    }
      

    if (param.etiquetasTiene && param.etiquetasTiene.length > 0) {
      let etiquetasGasto = g.etiquetas.map(function(e) { return e.toLowerCase(); });
      let etiquetasFiltro = param.etiquetasTiene.map(function(e) { return e.toLowerCase(); });
      let coincide = etiquetasFiltro.some(function(e) {
        return etiquetasGasto.indexOf(e) !== -1;
      });
      if (!coincide){
        return false;
      } 
    }

    return true;
  });
}



function agruparGastos(periodo = "mes", etiquetas = [], fechaDesde, fechaHasta) {
    let filtros = {};

    if (etiquetas && etiquetas.length > 0) {
        filtros.etiquetasTiene = etiquetas;
    }

    if (fechaDesde) {
        filtros.fechaDesde = fechaDesde;
    }

    if (fechaHasta) {
        filtros.fechaHasta = fechaHasta;
    }

    let gastosFiltrados = filtrarGastos(filtros);

    let agrupado = gastosFiltrados.reduce((acc, gasto) => {
        let clave = gasto.obtenerPeriodoAgrupacion(periodo);

        if (!acc[clave]) {
            acc[clave] = 0;
        }

        acc[clave] += gasto.valor;

        return acc;
    }, {});

    return agrupado;
}

function transformarListadoEtiquetas(cadena){
    let array = cadena.split(/[,\.:;\s]+/)

    return array;
}

function cargarGastos(gastosAlmacenamiento) {
    // gastosAlmacenamiento es un array de objetos "planos"
    // No tienen acceso a los métodos creados con "CrearGasto":
    // "anyadirEtiquetas", "actualizarValor",...
    // Solo tienen guardadas sus propiedades: descripcion, valor, fecha y etiquetas
  
    // Reseteamos la variable global "gastos"
    gastos = [];
    // Procesamos cada gasto del listado pasado a la función
    for (let g of gastosAlmacenamiento) {
        // Creamos un nuevo objeto mediante el constructor
        // Este objeto tiene acceso a los métodos "anyadirEtiquetas", "actualizarValor",...
        // Pero sus propiedades (descripcion, valor, fecha y etiquetas) están sin asignar
        let gastoRehidratado = new CrearGasto();
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
    
// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    filtrarGastos,
    agruparGastos,
    transformarListadoEtiquetas,
    cargarGastos
}
