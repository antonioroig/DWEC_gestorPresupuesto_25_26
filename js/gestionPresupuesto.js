// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(numPresupuesto) {
    if (isNaN(numPresupuesto) || numPresupuesto < 0) {
        console.log("No has introducido un número")
        return -1;
    }
    else {
        presupuesto = numPresupuesto;
    }
    return presupuesto;
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`
}

function CrearGasto(cadena, valorIntroducido) {
    if(isNaN(valorIntroducido) || valorIntroducido < 0)
        valorIntroducido = 0;
    
    
        this.descripcion = cadena;
        this.valor = valorIntroducido;

        this.mostrarGasto = function() {
            return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`
        };
        
        this.actualizarDescripcion = function(nuevaDescripcion) {
            this.descripcion = nuevaDescripcion;
        };

        this.actualizarValor = function(nuevoValor) {
            if (nuevoValor >= 0)
                this.valor = nuevoValor;
        }; 
    return this;
}

function listarGastos() {
    return gastos;
}

function anyadirGasto() {

}

function borrarGasto() {

}

function calcularTotalGastos() {

}

function calcularBalance() {

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
