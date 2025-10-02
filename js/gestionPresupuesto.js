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

function CrearGasto(descPre, val, fecha, ... etiquetasObtenidas) {
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

    let marcaDeTiempo  = Date.parse(fecha);
    if (fecha !== undefined) {
        if (isNaN(marcaDeTiempo )) {
            this.fecha = Date.now();
        } 
        else {
            this.fecha = marcaDeTiempo ;
        }
    } else {
        this.fecha = Date.now();
    }

    this.etiquetas = [];
    
    for (let i = 0; i < etiquetasObtenidas.length; i++) {
            let etiqueta = etiquetasObtenidas[i];
            if (!this.etiquetas.includes(etiqueta)) {  
                this.etiquetas.push(etiqueta);
            }
        }

    this.anyadirEtiquetas = function(...etiquetasObtenidas) {
        for (let i = 0; i < etiquetasObtenidas.length; i++) {
            let etiqueta = etiquetasObtenidas[i];
            if (!this.etiquetas.includes(etiqueta)) {  
                this.etiquetas.push(etiqueta);
            }
        }
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

function anyadirGasto(gasto){
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(id){
    let index = gastos.findIndex(g => g.id === id);
    if (index !== -1) {
            gastos.splice(index, 1); 
        }
}

function calcularTotalGastos(){
    let total = 0;
    for(let i = 0; i < gastos.length; i++){
        total += gastos[i].valor;
    }
    return total;
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
