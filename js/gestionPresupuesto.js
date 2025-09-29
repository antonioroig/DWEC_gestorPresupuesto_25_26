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
