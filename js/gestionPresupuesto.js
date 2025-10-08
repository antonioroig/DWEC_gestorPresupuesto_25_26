"use strict"
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(valor) {
    if(!isNaN(valor) && valor >= 0)
    {
        presupuesto = valor;
        return presupuesto
    }
    else
    {
        console.log("El valor debe ser un número positivo.")
        return -1;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    this.descripcion = descripcion;
    this.valor = (!isNaN(valor) && valor >= 0) ? valor : 0;
    this.etiquetas = (etiquetas.length > 0) ? etiquetas : [];
    this.fecha = (fecha !== undefined && !isNaN(Date.parse(fecha))) ? Date.parse(fecha) : Date.now();

    this.mostrarGasto = function(){
        return `Gasto correspondiente a ${descripcion} con valor ${valor} €`;
    }
    this.actualizarDescripcion = function(descripcion) {
        this.descripcion = descripcion;
    }
    this.actualizarValor = function(valor){
        this.valor = (!isNaN(valor) && valor >= 0) ? valor : this.valor;
    }    
    this.mostrarGastoCompleto = function(){
        let lEtiquetas = "";

        for(let i = 0; i < this.etiquetas.length; i++){
            lEtiquetas += `- ${this.etiquetas[i]}\n`
        }

        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.
Fecha: ${new Date(this.fecha).toLocaleString()}
Etiquetas:
${lEtiquetas}`
    } 
    this.actualizarFecha  = function(fecha){
        if (fecha !== undefined && !isNaN(Date.parse(fecha))){
            this.fecha = Date.parse(fecha);
        }
    }
    this.anyadirEtiquetas = function(...nuevasEtiquetas){
        let etiqueta;
        for(let i = 0; i < nuevasEtiquetas.length; i++){
            etiqueta = nuevasEtiquetas[i];

            if(!this.etiquetas.includes(etiqueta)){
                this.etiquetas.push(etiqueta);
            }
        }
    }
    this.borrarEtiquetas = function(...etiquetasEliminar){
        for(let i = 0; i < etiquetasEliminar.length; i++){
            
            for (let j = 0; j < this.etiquetas.length; j++){

                if(this.etiquetas[j] === etiquetasEliminar[i]){
                    this.etiquetas.splice[j, 1];
                    j--;
                }
            }
        }
    }
    this.obtenerPeriodoAgrupacion = function(periodo){
        switch(periodo){
            case "mes":
                return (new Date(this.fecha).getYear() + "-" + new Date(this.fecha).getMonth())
                break;
                        
            case "anyo":
                return (new Date(this.fecha).getYear().toString())
                break;

           case "dia":
                return (new Date(this.fecha).getDate().toString())
                break;
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
    let pararBucle = false;

    for (let i = 0; i < gastos.length && pararBucle !== true; i++){
        if(gastos[i].id === id){
            gastos.splice(i, 1);
            pararBucle = true
        }
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
    return presupuesto - calcularTotalGastos();
}
function filtrarGastos (){

}
function agruparGastos(){

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
    agruparGastos
    
}
