"use strict";
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(nuevopresupuesto) {
    if (!isNaN(nuevopresupuesto) && nuevopresupuesto >= 0) {
        presupuesto = nuevopresupuesto;
        return presupuesto;
    } else {
        console.log("Error: presupuesto no válido");
        return -1;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
    
}

function CrearGasto(descripcion,valor, fecha, ...etiquetas) {
    this.descripcion = descripcion;
    if (!isNaN(valor) && valor >= 0){
        this.valor= valor;
    }
    else {
        this.valor = 0;
    }

    this.etiquetas = [];

    for (let i = 0; i < etiquetas.length; i++) {
    let etiqueta = etiquetas[i];
    let existe = false;

    for (let j = 0; j < this.etiquetas.length; j++) {
        if (this.etiquetas[j] === etiqueta) {
            existe = true;
        }
    }

    if (!existe && typeof etiqueta === "string") {
        this.etiquetas.push(etiqueta);
    }
}

    this.anyadirEtiquetas = function(...nuevasEtiquetas) {
        for (let i = 0; i < nuevasEtiquetas.length; i++) {
        let etiqueta = nuevasEtiquetas[i];
        let existe = false;

        for (let j = 0; j < this.etiquetas.length; j++) {
            if (this.etiquetas[j] === etiqueta) {
                existe = true;
            }
        }

        if (!existe && typeof etiqueta === "string") {
            this.etiquetas.push(etiqueta);
        }
    }        
    }

    if (fecha === undefined){
        this.fecha = Date.now();
    }
    else {
        const fechaConvertida = Date.parse(fecha)
        if (!isNaN(fechaConvertida)){
            this.fecha = fechaConvertida;
        } else{
            this.fecha = Date.now();
        }
    }
 

    this.mostrarGasto = function(){
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

    this.mostrarGastoCompleto= function(){
        let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`;
        texto += `Fecha: ${new Date(this.fecha).toLocaleString()}\n`;
        texto += "Etiquetas:\n";
        for (let i = 0; i < this.etiquetas.length; i++) {
            texto += `- ${this.etiquetas[i]}\n`;
        }
        return texto;
    
    }

    this.actualizarDescripcion = function(descripcion){
        this.descripcion = descripcion;
    }
    this.actualizarValor = function(valor){
        if (!isNaN(valor) && valor >= 0){
        this.valor= valor;
        }      

    }
    this.actualizarFecha = function(nuevaFecha) {
        const parsed = Date.parse(nuevaFecha);
        if (!isNaN(parsed)) {
            this.fecha = parsed;
        }
    }
    
    this.borrarEtiquetas = function(...etiquetasABorrar) {
    let nuevasEtiquetas = [];

    for (let i = 0; i < this.etiquetas.length; i++) {
        let agregar = true;

        for (let j = 0; j < etiquetasABorrar.length; j++) {
            if (this.etiquetas[i] === etiquetasABorrar[j]) {
                agregar = false; 
            }
        }

        if (agregar) {
            nuevasEtiquetas.push(this.etiquetas[i]);
        }
        }
    this.etiquetas = nuevasEtiquetas;
    }
    this.obtenerPeriodoAgrupacion = function(periodo) {
        let fechaObj = new Date(this.fecha);

        let anyo = fechaObj.getFullYear(); 
        let mes = fechaObj.getMonth() + 1;  
        let dia = fechaObj.getDate();     

        let mesStr = '' + mes;
        if (mes < 10) {
            mesStr = '0' + mes;
        }
        let diaStr = '' + dia;
        if (dia < 10) {
            diaStr = '0' + dia;
        }

        if (periodo === "dia") {
            return anyo + "-" + mesStr + "-" + diaStr;
        } else if (periodo === "mes") {
            return anyo + "-" + mesStr;
        } else if (periodo === "anyo") {
            return "" + anyo;
        } else {
            return "";
        }
    }
}

function listarGastos() {
    return gastos; 
}

function anyadirGasto(gasto){
    gasto.id = idGasto;
    idGasto = idGasto + 1;
    gastos.push(gasto);
}

function borrarGasto(id){
    let nuevosGastos = []; 

    for (let i = 0; i < gastos.length; i++) {
        if (gastos[i].id !== id) {
            nuevosGastos.push(gastos[i]);
        }
    }
    gastos = nuevosGastos;
}

function calcularTotalGastos(){
    let total = 0; 
        
    for (let i = 0; i < gastos.length; i++) {
        let g = gastos[i];        
        if (g && !isNaN(g.valor)) {
            total = total + g.valor; 
        }
    }
    return total; 
}

function calcularBalance(){     
    return presupuesto - calcularTotalGastos();
}

function filtrarGastos(filtros){
    if (!filtros || typeof filtros !== "object" || Object.keys(filtros).length === 0) {
        return gastos;
    }
    
    let fechaDesde = null;
    let fechaHasta = null;
    if (typeof filtros.fechaDesde === "string") {
        let fecha = Date.parse(filtros.fechaDesde);
        if (!isNaN(fecha)) fechaDesde = fecha;
    }
    if (typeof filtros.fechaHasta === "string") {
        let fecha = Date.parse(filtros.fechaHasta);
        if (!isNaN(fecha)) fechaHasta = fecha;
    }

    let valorMinimo = null;
    if (!isNaN(filtros.valorMinimo)) 
        valorMinimo = Number(filtros.valorMinimo);

    let valorMaximo = null;
    if (!isNaN(filtros.valorMaximo)) 
        valorMaximo = Number(filtros.valorMaximo);

    let descripcionContiene = null;
    if (typeof filtros.descripcionContiene === "string" && filtros.descripcionContiene.length > 0) {
        descripcionContiene = filtros.descripcionContiene.toLowerCase();
    }

    let etiquetasReq = null;
    if (filtros.etiquetasTiene && typeof filtros.etiquetasTiene !== "string" && filtros.etiquetasTiene.length > 0) {
        etiquetasReq = [];
        for (let i = 0; i < filtros.etiquetasTiene.length; i++) {
            let etiqueta = filtros.etiquetasTiene[i];
            if (typeof etiqueta === "string") etiquetasReq.push(etiqueta.toLowerCase());
            else etiquetasReq.push(String(etiqueta).toLowerCase());
        }
    }

    let resultado = gastos.filter(function(gasto) {
        if (fechaDesde !== null && gasto.fecha < fechaDesde) 
            return false;
        if (fechaHasta !== null && gasto.fecha > fechaHasta) 
            return false;
        if (valorMinimo !== null && (isNaN(gasto.valor) || Number(gasto.valor) < valorMinimo)) 
            return false;
        if (valorMaximo !== null && (isNaN(gasto.valor) || Number(gasto.valor) > valorMaximo)) 
            return false;

        if (descripcionContiene !== null) {
            let descr = (typeof gasto.descripcion === "string") ? gasto.descripcion.toLowerCase() : ""; 
            if (descr.indexOf(descripcionContiene) === -1) 
                return false;
        }

        if (etiquetasReq !== null) {
            let tiene = false;
            for (let i = 0; i < etiquetasReq.length && !tiene; i++) {
                let buscada = etiquetasReq[i];
                for (let j = 0; j < gasto.etiquetas.length; j++) {
                    if (buscada === String(gasto.etiquetas[j]).toLowerCase()) {
                        tiene = true;
                        break;
                    }
                }
            }
            if (!tiene) 
                return false;
        }
        return true;
    });
    return resultado;
}

function agruparGastos(periodo, etiquetas, fechaDesde, fechaHasta) {
    if (periodo === undefined || periodo === null || periodo === "") {
        periodo = "mes";
    }

    let filtro = {};

    if (etiquetas !== undefined && etiquetas !== null && etiquetas instanceof Array && etiquetas.length > 0) {
        filtro.etiquetasTiene = etiquetas;
    }

    if (fechaDesde !== undefined && fechaDesde !== null && fechaDesde !== "") {
        filtro.fechaDesde = fechaDesde;
    }

    if (fechaHasta !== undefined && fechaHasta !== null && fechaHasta !== "") {
        filtro.fechaHasta = fechaHasta;
    } else {
        filtro.fechaHasta = new Date().toString();
    }

    let gastosFiltrados = filtrarGastos(filtro);

    let resultado = {};

    for (let i = 0; i < gastosFiltrados.length; i++) {
        let gasto = gastosFiltrados[i];

        let clave = gasto.obtenerPeriodoAgrupacion(periodo);

        if (resultado[clave] === undefined) {
            resultado[clave] = 0;
        }

        let valor = 0;
        if (gasto.valor !== undefined && gasto.valor !== null && !isNaN(gasto.valor)) {
            valor = Number(gasto.valor);
        }
        resultado[clave] = resultado[clave] + valor;
    }

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
