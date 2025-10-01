"use strict"
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0
var gastos = []
var idGasto = 0

function actualizarPresupuesto(nuevoPresupuesto) {
    // TODO
    if(!isNaN(nuevoPresupuesto) && nuevoPresupuesto >= 0){
        presupuesto = nuevoPresupuesto
        return presupuesto
    }
    else{
        console.log("El valor introducido no es valido")
        return -1
    }
}

function mostrarPresupuesto() {
    // TODO
    return `Tu presupuesto actual es de ${presupuesto} €`
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    // TODO
    this.descripcion = descripcion
    this.valor = (!isNaN(valor) && valor >= 0) ? valor : 0
    this.fecha = (fecha !== undefined && !isNaN(Date.parse(fecha))) ? Date.parse(fecha) : Date.now()
    this.etiquetas = (etiquetas !== undefined) ? etiquetas : []

    this.mostrarGasto = function(){
    // console.log(`Gasto correspondiente a ${descripcion} con valor ${valor} €`)
    return `Gasto correspondiente a ${descripcion} con valor ${valor} €`
    }
    this.actualizarDescripcion = function(descripcionNueva){
        this.descripcion = descripcionNueva
    }
    this.actualizarValor = function(valorNuevo){
        if(!isNaN(valorNuevo) && valorNuevo >= 0){
            this.valor = valorNuevo
        }
    }
    this.mostrarGasto = function(){
        return `Gasto correspondiente a ${descripcion} con valor ${valor} €`
    }

    this.mostrarGastoCompleto = function(){
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.
Fecha: ${(new Date(this.fecha)).toLocaleString()}
Etiquetas:
- ${this.etiquetas.join("\n- ")}
`}
    
}
function listarGastos(){
    return gastos
}
function anyadirGasto(Gasto){
    Object.assign(Gasto, {id : idGasto})
    idGasto++
    gastos.push(Gasto)
}
function borrarGasto(id) {
  for (let i = 0; i < gastos.length; i++) {
    if (gastos[i].id === id) { 
      gastos.splice(i, 1);
      break; 
    }
  }
}
function calcularTotalGastos(){
    let suma = 0
    for (let i = 0; i < gastos.length; i++) {
        suma += gastos[i].valor
    }
    return suma
}
function calcularBalance(){
    let gastosTotales = calcularTotalGastos()
    return presupuesto - gastosTotales
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
    calcularBalance
}
