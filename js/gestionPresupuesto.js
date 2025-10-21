let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(cantidad) {
    if (cantidad >= 0 && !isNaN(cantidad)) {
        presupuesto = cantidad;
        return presupuesto;
    } else {
        console.error("Error: El presupuesto debe ser un número no negativo");
        return -1;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    this.descripcion = descripcion;
    
    if (valor >= 0 && !isNaN(valor)) {
        this.valor = valor;
    } else {
        this.valor = 0;
    }
    
    if (fecha && !isNaN(Date.parse(fecha))) {
        this.fecha = Date.parse(fecha);
    } else {
        this.fecha = Date.now();
    }
    
    this.etiquetas = [];
    
    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };
    
    this.mostrarGastoCompleto = function() {
        let fechaFormateada = new Date(this.fecha).toLocaleString();
        let etiquetasTexto = "";
        
        if (this.etiquetas.length > 0) {
            etiquetasTexto = "\nEtiquetas:\n" + this.etiquetas.map(etiqueta => `- ${etiqueta}`).join('\n');
        }
        
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${fechaFormateada}${etiquetasTexto}\n`;
    };
    
    this.actualizarDescripcion = function(nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    };
    
    this.actualizarValor = function(nuevoValor) {
        if (nuevoValor >= 0 && !isNaN(nuevoValor)) {
            this.valor = nuevoValor;
        }
    };
    
    this.actualizarFecha = function(nuevaFecha) {
        if (nuevaFecha && !isNaN(Date.parse(nuevaFecha))) {
            this.fecha = Date.parse(nuevaFecha);
        }
    };
    
    this.anyadirEtiquetas = function(...nuevasEtiquetas) {
        nuevasEtiquetas.forEach(etiqueta => {
            if (!this.etiquetas.includes(etiqueta)) {
                this.etiquetas.push(etiqueta);
            }
        });
    };
    
    this.borrarEtiquetas = function(...etiquetasABorrar) {
        this.etiquetas = this.etiquetas.filter(etiqueta => !etiquetasABorrar.includes(etiqueta));
    };
    
    this.obtenerPeriodoAgrupacion = function(periodo) {
        const fecha = new Date(this.fecha);
        const año = fecha.getFullYear();
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        const dia = String(fecha.getDate()).padStart(2, '0');
        
        switch(periodo) {
            case 'dia':
                return `${año}-${mes}-${dia}`;
            case 'mes':
                return `${año}-${mes}`;
            case 'anyo':
                return `${año}`;
            default:
                return `${año}-${mes}`;
        }
    };
    
    if (etiquetas.length > 0) {
        this.anyadirEtiquetas(...etiquetas);
    }
}

function listarGastos() {
    return gastos;
}

function anyadirGasto(gasto) {
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(id) {
    const indice = gastos.findIndex(gasto => gasto.id === id);
    if (indice !== -1) {
        gastos.splice(indice, 1);
    }
}

function calcularTotalGastos() {
    return gastos.reduce((total, gasto) => total + gasto.valor, 0);
}

function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}

function filtrarGastos(filtro = {}) {
    return gastos.filter(gasto => {
        if (filtro.fechaDesde) {
            const fechaDesde = Date.parse(filtro.fechaDesde);
            if (gasto.fecha < fechaDesde) {
                return false;
            }
        }
        
        if (filtro.fechaHasta) {
            const fechaHasta = Date.parse(filtro.fechaHasta);
            if (gasto.fecha > fechaHasta) {
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
            const descripcionGasto = gasto.descripcion.toLowerCase();
            const textoBusqueda = filtro.descripcionContiene.toLowerCase();
            if (!descripcionGasto.includes(textoBusqueda)) {
                return false;
            }
        }
        
        if (filtro.etiquetasTiene && filtro.etiquetasTiene.length > 0) {
            const tieneEtiqueta = filtro.etiquetasTiene.some(etiquetaFiltro => 
                gasto.etiquetas.some(etiquetaGasto => 
                    etiquetaGasto.toLowerCase() === etiquetaFiltro.toLowerCase()
                )
            );
            if (!tieneEtiqueta) {
                return false;
            }
        }
        
        return true;bmn
    });
}

function agruparGastos(periodo = 'mes', etiquetas = [], fechaDesde = null, fechaHasta = null) {
    const filtro = {};
    
    if (fechaDesde) filtro.fechaDesde = fechaDesde;
    if (fechaHasta) filtro.fechaHasta = fechaHasta;
    if (etiquetas && etiquetas.length > 0) filtro.etiquetasTiene = etiquetas;
    
    const gastosFiltrados = filtrarGastos(filtro);
    
    return gastosFiltrados.reduce((acumulador, gasto) => {
        const periodoAgrupacion = gasto.obtenerPeriodoAgrupacion(periodo);
        
        if (!acumulador[periodoAgrupacion]) {
            acumulador[periodoAgrupacion] = 0;
        }
        
        acumulador[periodoAgrupacion] += gasto.valor;
        
        return acumulador;
    }, {});
}

export {
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
};