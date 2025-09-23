"use strict";
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;

function actualizarPresupuesto(valorPresupuesto) {
    if(valorPresupuesto < 0 ){
        valorPresupuesto = -1;
    }else{
        valorPresupuesto = presupuesto;
    }
    return valorPresupuesto;
}

function mostrarPresupuesto() {
    console.log(`Tu presupuesto actual es de ${presupuesto} €`);
}

function CrearGasto(descripcion, valor) {
    if( isNaN(valor) || valor < 0){
        valor = 0;
    }
    this.descripcion = descripcion;
    this.valor = valor;

    this.mostrarGasto = function(){
        console.log(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);};
    this.actualizarDescripcion = function(nuevaDescripcion){
        this.descripcion = nuevaDescripcion;
    }

    this.actualizarValor = function(nuevoValor) {
        if (!isNaN(nuevoValor) && nuevoValor >= 0) {
            this.valor = nuevoValor;
            }
    }
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
