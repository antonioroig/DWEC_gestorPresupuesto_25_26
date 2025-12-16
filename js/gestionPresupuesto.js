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

    this.mostrarGastoCompleto = function() {
    
        let fechaLocal = new Date(this.fecha).toLocaleString();
        let resultado = "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €.\n";
        resultado += "Fecha: " + fechaLocal + "\n";
        resultado += "Etiquetas:\n";

        for (let i = 0; i < this.etiquetas.length; i++) {
            resultado += "- " + this.etiquetas[i] + "\n";
        }

        return resultado;
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

    this.actualizarFecha = function(nuevaFecha) {
        let marcaDeTiempo = Date.parse(nuevaFecha);
        if (!isNaN(marcaDeTiempo)) {
            this.fecha = marcaDeTiempo;
        }
    }

    this.borrarEtiquetas = function(...etiquetasAEliminar) {
    for (let i = 0; i < etiquetasAEliminar.length; i++) {
        let etiqueta = etiquetasAEliminar[i];
        let index = this.etiquetas.indexOf(etiqueta);
        if (index !== -1) {
                this.etiquetas.splice(index, 1);
            }
        }
    }

     this.actualizarDescripcion = function(descripcion){
        this.descripcion = descripcion;
    }

    this.actualizarValor = function(valor){
        if(valor >= 0 && !isNaN(valor)){
        this.valor = valor;
        }
    }

    this.obtenerPeriodoAgrupacion = function(periodo) {

    let fechaObj = new Date(this.fecha);
    
    let anyo = fechaObj.getFullYear();
    let mes = (fechaObj.getMonth() + 1).toString().padStart(2, '0');
    let dia = fechaObj.getDate().toString().padStart(2, '0');

    switch(periodo.toLowerCase()) {
        case "dia":
            return (anyo + "-" + mes + "-" + dia);
        case "mes":
            return (anyo + "-" + mes);
        case "anyo":
            return anyo;
        default:
            return "Período no válido. Usa 'dia', 'mes' o 'anyo'.";
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
    let totalGastos = calcularTotalGastos(); 
    return presupuesto - totalGastos;
}

function filtrarGastos(filtro){
    console.log('filtro recibido:', filtro);
    if (!filtro || Object.keys(filtro).length === 0) {
        console.log('Devolviendo todos los gastos:', gastos);
        return gastos;
    }

    return gastos.filter(gasto => {
        if (filtro.fechaDesde) {
            const fechaDesde = Date.parse(filtro.fechaDesde);
            if (isNaN(fechaDesde) || gasto.fecha < fechaDesde) {
                return false;
            }
        }

        if (filtro.fechaHasta) {
            const fechaHasta = Date.parse(filtro.fechaHasta);
            if (isNaN(fechaHasta) || gasto.fecha > fechaHasta) {
                return false;
            }
        }

        if (filtro.valorMinimo !== undefined) {
            if (gasto.valor < filtro.valorMinimo) {
                return false;
            }
        }

        if (filtro.valorMaximo !== undefined) {
            if (gasto.valor > filtro.valorMaximo) {
                return false;
            }
        }

        if (filtro.descripcionContiene) {
            const descripcionFiltro = filtro.descripcionContiene.toLowerCase();
            const descripcionGasto = gasto.descripcion.toLowerCase();
            if (!descripcionGasto.includes(descripcionFiltro)) {
                return false;
            }
        }

        if (filtro.etiquetasTiene && Array.isArray(filtro.etiquetasTiene)) {
            const etiquetasFiltro = filtro.etiquetasTiene.map(e => e.toLowerCase());
            const etiquetasGasto = gasto.etiquetas.map(e => e.toLowerCase());
            const coincideAlguna = etiquetasFiltro.some(etiqueta => etiquetasGasto.includes(etiqueta));
            if (!coincideAlguna) {
                return false;
            }
        }
    
        return true;//si pasa todos los filtros
    });
    
}

function agruparGastos(periodo = "mes", etiquetas = [], fechaDesde, fechaHasta){
    const filtro = {};

    if (etiquetas && etiquetas.length > 0) {
        filtro.etiquetasTiene = etiquetas;
    }

    if (fechaDesde) {
        filtro.fechaDesde = fechaDesde;
    }

    if (fechaHasta) {
        filtro.fechaHasta = fechaHasta;
    } else {
        filtro.fechaHasta = new Date().toISOString(); 
    }

    const gastosFiltrados = filtrarGastos(filtro);

    const resultado = gastosFiltrados.reduce((acc, gasto) => {
        const periodoAgrupacion = gasto.obtenerPeriodoAgrupacion(periodo);

        if (!acc[periodoAgrupacion]) {
            acc[periodoAgrupacion] = 0;
        }

        acc[periodoAgrupacion] += gasto.valor;
        return acc;
    }, {});

    return resultado;
}

function transformarListadoEtiquetas(etiq) {
//   if (!etiq) return [];
  let partes = etiq.split(/[,\.\:;\s]+/);
  return partes;
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
    transformarListadoEtiquetas
}
