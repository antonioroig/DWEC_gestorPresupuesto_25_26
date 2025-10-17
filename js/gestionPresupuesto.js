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
                    this.etiquetas.splice(j, 1);
                    j--;
                }
            }
        }
    }
    this.obtenerPeriodoAgrupacion = function(periodo){
        let fecha = new Date(this.fecha);
        let dia =  fecha.getDate();
        let mes =  fecha.getMonth();
        let anyo = fecha.getFullYear();
        
        if (periodo === "dia" && dia < 10){
            dia = "0" + dia;
        }
            mes++;  
        if (mes < 10){
            mes = "0" + mes;
        }

        if(periodo === "mes"){
            return `${anyo}-${mes}`
        }        
        else if(periodo === "anyo"){
            return anyo
        }        
        else if(periodo === "dia"){
            return `${anyo}-${mes}-${dia}`
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
function filtrarGastos(filtro){
    let filtrado = gastos.filter(i =>
    (!filtro.fechaDesde || (!isNaN(Date.parse(filtro.fechaDesde)) && i.fecha >= (Date.parse(filtro.fechaDesde)))) &&
    (!filtro.fechaHasta || (!isNaN(Date.parse(filtro.fechaHasta)) && i.fecha <= (Date.parse(filtro.fechaHasta)))) &&
    (!filtro.valorMinimo || (!isNaN(filtro.valorMinimo) && i.valor > filtro.valorMinimo)) &&
    (!filtro.valorMaximo || (!isNaN(filtro.valorMaximo) && i.valor < filtro.valorMaximo)) &&
    (!filtro.descripcionContiene || i.descripcion.toLowerCase().includes(filtro.descripcionContiene.toLowerCase())) &&
    (!filtro.etiquetasTiene || (filtro.etiquetasTiene.some(filtroEti =>
        i.etiquetas.some(etiquetaGasto =>
            etiquetaGasto.toLowerCase() === filtroEti.toLowerCase()            
        )))))    
    return filtrado;
}
function agruparGastos(periodo, etiquetas, fechaDesde, fechaHasta){

    let filtro = {};

    if(etiquetas !== undefined && etiquetas.length > 0){
        filtro.etiquetasTiene = etiquetas;
    }
    if (fechaDesde !== undefined && !isNaN(Date.parse(fechaDesde))){
        filtro.fechaDesde = fechaDesde;
    }
    if (fechaHasta !== undefined && !isNaN(Date.parse(fechaHasta))){
        filtro.fechaHasta = fechaHasta;
    }

    let gastosFiltrados = filtrarGastos(filtro);

    let resultado = gastosFiltrados.reduce((acc, gasto) => {
        let clave = gasto.obtenerPeriodoAgrupacion(periodo);

        if (!acc[clave]) {
            acc[clave] = gasto.valor;
        } 
        else {
            acc[clave] += gasto.valor;
        }

        return acc;
    }, {});

    return resultado;
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
