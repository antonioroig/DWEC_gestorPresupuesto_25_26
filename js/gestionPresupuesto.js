// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gasto = [];
let idGasto = 0;
function actualizarPresupuesto(valor) {
    if (typeof valor === "number" && valor >= 0) {
        presupuesto = valor;
        return presupuesto;
    } else {
        console.error("Error: el valor debe de ser positivo o 0.");
        return -1;
    }
}
function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor = 0, fecha, ...etiquetas) {
    this.id = idGasto++;
    this.descripcion = String(descripcion);

    // Valor válido
    this.valor = (typeof valor === "number" && valor >= 0) ? valor : 0;

    // Fecha válida
    if (fecha && !isNaN(Date.parse(fecha))) {
        this.fecha = Date.parse(fecha);
    } else {
        this.fecha = Date.now();
    }

    // Inicializamos etiquetas
    this.etiquetas = [];
    if (etiquetas.length > 0) {
        this.anyadirEtiquetas(...etiquetas);
    }

    // Métodos usados en los tests
    this.mostrarGasto = function () {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };

    this.mostrarGastoCompleto = function () {
        let fechaLocal = new Date(this.fecha).toLocaleString();
        let etiquetasTexto = this.etiquetas.map(e => `- ${e}`).join("\n");
        if (etiquetasTexto) etiquetasTexto = "\n" + etiquetasTexto;
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${fechaLocal}\nEtiquetas:${etiquetasTexto}\n`;
    };

    this.actualizarFecha = function (nuevaFecha) {
        if (nuevaFecha && !isNaN(Date.parse(nuevaFecha))) {
            this.fecha = Date.parse(nuevaFecha);
        }
    };

    this.anyadirEtiquetas = function (...nuevasEtiquetas) {
        nuevasEtiquetas.forEach(et => {
            if (!this.etiquetas.includes(et)) this.etiquetas.push(et);
        });
    };

    this.borrarEtiquetas = function (...etiquetasABorrar) {
        this.etiquetas = this.etiquetas.filter(et => !etiquetasABorrar.includes(et));
    };
}
function listarGastos(){
    return gasto
}
function anyadirGasto (){

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
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    CrearGasto
}
