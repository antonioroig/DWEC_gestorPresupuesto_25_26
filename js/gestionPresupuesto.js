let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(nuevoPresupuesto) {
    if (!isNaN(nuevoPresupuesto) && nuevoPresupuesto >= 0) {
        presupuesto = nuevoPresupuesto;
        return presupuesto;
    } else {
        console.log("Error: el valor introducido no es un número válido o es negativo.");
        return -1;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor = 0, fecha, ...etiquetas) {
    if (isNaN(valor) || valor < 0) {
        valor = 0;
    }

    this.descripcion = descripcion;
    this.valor = valor;
    this.etiquetas = [];

    if (fecha && !isNaN(Date.parse(fecha))) {
        this.fecha = Date.parse(fecha);
    } else {
        this.fecha = Date.now();
    }

    this.mostrarGasto = function () {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };

    this.mostrarGastoCompleto = function () {
        let fechaStr = new Date(this.fecha).toLocaleString();
        let etiquetasStr = this.etiquetas.map(e => `- ${e}`).join("\n");
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${fechaStr}\nEtiquetas:\n${etiquetasStr ? etiquetasStr + "\n" : ""}`;
    };

    this.actualizarDescripcion = function (nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    };

    this.actualizarValor = function (nuevoValor) {
        if (!isNaN(nuevoValor) && nuevoValor >= 0) {
            this.valor = nuevoValor;
        }
    };

    this.actualizarFecha = function (nuevaFecha) {
        if (nuevaFecha && !isNaN(Date.parse(nuevaFecha))) {
            this.fecha = Date.parse(nuevaFecha);
        }
    };

    this.anyadirEtiquetas = function (...nuevasEtiquetas) {
        nuevasEtiquetas.forEach(et => {
            if (!this.etiquetas.includes(et)) {
                this.etiquetas.push(et);
            }
        });
    };

    this.borrarEtiquetas = function (...etiquetasABorrar) {
        this.etiquetas = this.etiquetas.filter(e => !etiquetasABorrar.includes(e));
    };
    this.obtenerPeriodoAgrupacion = function (periodo) {
        const fechaObj = new Date(this.fecha);
        const anyo = fechaObj.getFullYear();
        const mes = String(fechaObj.getMonth() + 1).padStart(2, "0");
        const dia = String(fechaObj.getDate()).padStart(2, "0");

        switch (periodo) {
            case "dia":
                return `${anyo}-${mes}-${dia}`;
            case "mes":
                return `${anyo}-${mes}`;
            case "anyo":
                return `${anyo}`;
            default:
                return null;
        }
    }
    if (etiquetas.length > 0) {
        this.anyadirEtiquetas(...etiquetas);
    }
}


function listarGastos(){
    return gastos;
}
function anyadirGasto(gasto) {
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}
function borrarGasto(id){
    gastos = gastos.filter(gasto => gasto.id != id);
}
function calcularTotalGastos(){
    return gastos.reduce((total, gasto) => total + gasto.valor, 0);
}
function calcularBalance(){
    return presupuesto - calcularTotalGastos();
}
function filtrarGastos(filtros) {
    return gastos.filter(gasto => {
        if (filtros.fechaDesde && gasto.fecha < Date.parse(filtros.fechaDesde)) {
            return false;
        }

        if (filtros.fechaHasta && gasto.fecha > Date.parse(filtros.fechaHasta)) {
            return false;
        }

        if (filtros.valorMinimo && gasto.valor < filtros.valorMinimo) {
            return false;
        }

        if (filtros.valorMaximo && gasto.valor > filtros.valorMaximo) {
            return false;
        }

        if (filtros.descripcionContiene && 
            !gasto.descripcion.toLowerCase().includes(filtros.descripcionContiene.toLowerCase())) {
            return false;
        }

        if (filtros.etiquetasTiene && filtros.etiquetasTiene.length > 0) {
            let etiquetasGasto = gasto.etiquetas.map(e => e.toLowerCase());
            let etiquetasFiltro = filtros.etiquetasTiene.map(e => e.toLowerCase());
            if (!etiquetasFiltro.some(et => etiquetasGasto.includes(et))) {
                return false;
            }
        }

        return true;
    });
}
function agruparGastos(periodo = "mes", etiquetas = [], fechaDesde, fechaHasta) {
    let gastosFiltrados = filtrarGastos({
        fechaDesde,
        fechaHasta,
        etiquetasTiene: etiquetas
    });

    let agrupados = gastosFiltrados.reduce((acc, gasto) => {
        let clave = gasto.obtenerPeriodoAgrupacion(periodo);

        if (!acc[clave]) {
            acc[clave] = 0;
        }

        acc[clave] += gasto.valor;

        return acc;
    }, {});

    return agrupados;
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
