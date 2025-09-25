// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
//Actividad 2
let gastos = [];
let idGasto = 0;



function listarGastos() {
    // TODO
}

function anyadirGasto() {
    // TODO
}

function borrarGasto() {
    // TODO
}

function calcularTotalGastos() {
    // TODO
}

function calcularBalance() {
    // TODO
}



function actualizarPresupuesto(value) {
    const num = Number(value);
    if (isNaN(num) || num < '') {
        console.log(`Error en el valor del presupuesto`);
        return -1;
    }
    presupuesto = value;
    return value;
}

function mostrarPresupuesto() {
    const text = `Tu presupuesto actual es de ${presupuesto} €`;
    return text;
}

function CrearGasto(descripcion, valor) {
    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

    this.actualizarDescripcion = function(value) {
        this.descripcion = value;
    }
    
    this.actualizarValor = function(value) {
        const num = Number(value);
        if (isNaN(num) || num < 0) {
            return;
        }
        this.valor = num;
    }

    //codigo duplicado, esto se debería de refactorizar
    this.validarValor = function(value) {
        const num = Number(value);
        if (isNaN(num) || num < 0) {
            return 0;
        }
        return num;
    }

    this.descripcion = descripcion;
    this.valor = this.validarValor(valor);

    return this;
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
