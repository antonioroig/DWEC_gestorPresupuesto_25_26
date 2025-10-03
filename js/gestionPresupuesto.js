// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(valor) {
    if (typeof valor !== "number" || valor <= 0) {
    return -1;
  }
  presupuesto = valor;
  return presupuesto;
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor = 0, fecha = null, ...etiquetas) {
  this.descripcion = descripcion;
  this.valor = valor;
  let fechaParseada = Date.parse(fecha);
  if (!fecha || isNaN(fechaParseada)) {
    this.fecha = Date.now();
  } else {
    this.fecha = fechaParseada;
  }
  this.etiquetas = [];
  if (etiquetas.length > 0) {
    this.anyadirEtiquetas(...etiquetas);
  }
}


  this.mostrarGasto = function () {
    return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
  };

  this.actualizarDescripcion = function (nuevaDescripcion) {
    this.descripcion = nuevaDescripcion;
    return this.descripcion;
  };

  this.actualizarValor = function (nuevoValor) {
    if (typeof nuevoValor === "number" && nuevoValor >= 0) {
      this.valor = nuevoValor;
    }
    return this.valor; 
  };
  function listarGastos() {}
  function anyadirGasto() {}
  function borrarGasto() {}
  function calcularTotalGastos() {}
  function calcularBalance() {}

}


// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
}