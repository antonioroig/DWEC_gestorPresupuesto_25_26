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

function CrearGasto(descripcion, valor) {
    // TODO
    this.descripcion = descripcion
    this.valor = (!isNaN(valor) && valor >= 0) ? valor : 0

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
}
function listarGastos(){
    return gastos
}
function anyadirGasto(){

}
function borrarGasto(){
    
}
function calcularTotalGastos(){
    
}
function calcularBalance(){
    
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
