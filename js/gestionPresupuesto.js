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
    this.etiquetas = (etiquetas.lenght >0) ? etiquetas : [];
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
