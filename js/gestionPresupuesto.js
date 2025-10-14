"use strict";

// Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;


// Función para actualizar el presupuesto
function actualizarPresupuesto(valorPresupuesto) {
    if (valorPresupuesto >= 0 && !isNaN(valorPresupuesto)) {
        presupuesto = valorPresupuesto;
        return presupuesto;
    } else {
        return -1;
    }
}

// Función para mostrar el presupuesto
function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

// Constructor para crear gastos
function CrearGasto(descripcion, valor, fecha, ... etiquetasRecibidas) {
    this.descripcion = descripcion;

    if (valor >= 0 && !isNaN(valor)) {
        this.valor = valor;
    } else {
        this.valor = 0;
    }

    let fechaValida = Date.parse(fecha);
    if (!isNaN(fechaValida)) {
        this.fecha = fechaValida;
    } else {
        this.fecha = Date.now(); 
    }

//etiquetas
    this.etiquetas = [];

    for(let i=0; i < etiquetasRecibidas.length; i++){
        let etiqueta = etiquetasRecibidas[i];
        if(!this.etiquetas.includes(etiqueta)){
            this.etiquetas.push(etiqueta);
        }
    }

    this.mostrarGasto = function(){
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

    this.mostrarGasto = function () {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };

    this.mostrarGastoCompleto = function () {
        let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`;
        texto += `Fecha: ${new Date(this.fecha).toLocaleString()}\n`;
        texto += `Etiquetas:\n`;
        for (let i = 0; i < this.etiquetas.length; i++) {
            texto += `- ${this.etiquetas[i]}\n`;
        }
        return texto;
    };


    this.actualizarDescripcion = function (nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    };

    this.actualizarValor = function (nuevoValor) {
        if (nuevoValor >= 0 && !isNaN(nuevoValor)) {
            this.valor = nuevoValor;
        }
    };

    this.actualizarFecha = function (nuevaFecha){
        let nuevaConvertida = Date.parse(nuevaFecha);
        if(!isNaN(nuevaConvertida)){
            this.fecha = nuevaConvertida;
        }
    }
    
    
    this.anyadirEtiquetas = function (...nuevasEtiquetas) {
            for (let i = 0; i < nuevasEtiquetas.length; i++) {
                let etiqueta = nuevasEtiquetas[i];
                if (!this.etiquetas.includes(etiqueta)) {
                    this.etiquetas.push(etiqueta);
                }
            }
    };

    this.borrarEtiquetas = function (...etiquetasABorrar) {
        let resultado = [];
        for (let i = 0; i < this.etiquetas.length; i++) {
            let etiquetaActual = this.etiquetas[i];
            if (!etiquetasABorrar.includes(etiquetaActual)) {
                resultado.push(etiquetaActual);
            }
        }
        this.etiquetas = resultado;
    };

    this.obtenerPeriodoAgrupacion = function (periodo) {
        const fechaObj = new Date(this.fecha);
        const year = fechaObj.getFullYear();
        const month = String(fechaObj.getMonth() + 1).padStart(2, '0');
        const day = String(fechaObj.getDate()).padStart(2, '0');

        if (periodo === "dia") return `${year}-${month}-${day}`;
        if (periodo === "mes") return `${year}-${month}`;
        if (periodo === "anyo") return `${year}`;
        return "";
    };
}
function listarGastos(){
    return gastos;
}

function anyadirGasto(gasto){
    gasto.id = idGasto;
    idGasto ++;
    gastos.push(gasto);
}

function borrarGasto(id){
    let resultado = [];
    for(let i=0; i < gastos.length; i++){
        let gastoActual = gastos[i];

        if(gastoActual.id != id){
            resultado.push(gastoActual);
        }
    }
    gastos = resultado;
}

function calcularTotalGastos() {
    let total = 0; 

    for (let i = 0; i < gastos.length; i++) {
        let gastoActual = gastos[i];       
        total = total + gastoActual.valor; 
    }

    return total; 

}

function calcularBalance(){
    return presupuesto - calcularTotalGastos();
}

function filtrarGastos(filtros = {}) {
    return gastos.filter(gasto => {
        const fecha = gasto.fecha;
        const valor = gasto.valor;
        const descripcion = gasto.descripcion.toLowerCase();
        // const etiquetas = gasto.etiquetas.map(e => e.toLowerCase());
        const etiquetas = gasto.etiquetas.map(function(e){
                                                return e.toLowerCase();
        })

        let desde = null;
        let hasta = null;

        if (filtros.fechaDesde) {
            desde = Date.parse(filtros.fechaDesde);
        }

        if (filtros.fechaHasta) {
            hasta = Date.parse(filtros.fechaHasta);
        }

        let cumpleFecha = true;
        if (desde !== null && fecha < desde) {
            cumpleFecha = false;
        }
        if (hasta !== null && fecha > hasta) {
            cumpleFecha = false;
        }

        let cumpleValor = true;
        if (filtros.valorMinimo != null && valor < filtros.valorMinimo) {
            cumpleValor = false;
        }
        if (filtros.valorMaximo != null && valor > filtros.valorMaximo) {
            cumpleValor = false;
        }

        let cumpleDescripcion = true;
        if (filtros.descripcionContiene) {
            const textoBuscado = filtros.descripcionContiene.toLowerCase();
            if (!descripcion.includes(textoBuscado)) {
                cumpleDescripcion = false;
            }
        }

        let cumpleEtiquetas = true;
        if (filtros.etiquetasTiene && filtros.etiquetasTiene.length > 0) {
            const etiquetasFiltro = filtros.etiquetasTiene.map(e => e.toLowerCase());
            let coincide = false;
            for (let i = 0; i < etiquetasFiltro.length; i++) {
                if (etiquetas.includes(etiquetasFiltro[i])) {
                    coincide = true;
                    break;
                }
            }
            if (!coincide) {
                cumpleEtiquetas = false;
            }
        }

        if (cumpleFecha && cumpleValor && cumpleDescripcion && cumpleEtiquetas) {
            return true;
        } else {
            return false;
        }
    });
}
function agruparGastos(periodo = "mes", etiquetas = [], fechaDesde = null, fechaHasta = null) {
    const resultado = {};
    let desde = null;
    let hasta = Date.now(); 

    if (fechaDesde) {
        desde = Date.parse(fechaDesde);
    }

    if (fechaHasta) {
        hasta = Date.parse(fechaHasta);
    }

    for (let i = 0; i < gastos.length; i++) {
        const gasto = gastos[i];

        if (desde !== null && gasto.fecha < desde) continue;

        if (hasta !== null && gasto.fecha > hasta) continue;

        if (etiquetas.length > 0) {
            const etiquetasGasto = gasto.etiquetas.map(function(e) {
                return e.toLowerCase();
            });
            const etiquetasFiltro = etiquetas.map(function(e) {
                return e.toLowerCase();
            });

            let coincide = false;
            for (let j = 0; j < etiquetasFiltro.length; j++) {
                if (etiquetasGasto.includes(etiquetasFiltro[j])) {
                    coincide = true;
                    break;
                }
            }

            if (!coincide) continue;
        }

        // Agrupar por período y sumar
        const clave = gasto.obtenerPeriodoAgrupacion(periodo);
        if (!resultado[clave]) {
            resultado[clave] = 0;
        }
        resultado[clave] += gasto.valor;
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
