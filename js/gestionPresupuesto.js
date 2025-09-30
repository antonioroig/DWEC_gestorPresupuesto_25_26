"use strict";
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(pres) {
    // TODO
    if(pres >= 0 && !isNaN(pres))
    {
        presupuesto = pres;
        return presupuesto;
    }
    else
    {
        console.log("Error, valor introducido es menor que 0.")
        return -1;
    }
}

function mostrarPresupuesto() {
    // TODO
    return 'Tu presupuesto actual es de ' + presupuesto + ' €';
}

function CrearGasto(descPre, val, fecha, ... etiqueta) {
    // TODO
    this.descripcion = descPre;

    if(val >= 0 && !isNaN(val)){
        this.valor = val;
    }
    else{
        this.valor = 0;
    }

    this.mostrarGasto = function(){
        return "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €";
    }

    if (fecha !== undefined) {
    let timestamp = Date.parse(fecha);
        if (isNaN(timestamp)) {
            this.fecha = Date.now();
        } 
        else {
            this.fecha = timestamp;
        }
    } else {
        this.fecha = Date.now();
    }
    

    this.actualizarDescripcion = function(descripcion){
        this.descripcion = descripcion;
    }

    this.actualizarValor = function(valor){
        if(valor >= 0 && !isNaN(valor)){
        this.valor = valor;
        }
    }
}

function listarGastos(){
    return gastos;
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
