let presupuesto = 0;
let valor = 0;
let gastos = [];
let idGastoCount = 0;

function actualizarPresupuesto(num) {
    if (typeof num != "number" || num < 0){
        console.log("Introduzca un presupuesto válido");
        return -1   ;
    }
    presupuesto = num;
    return presupuesto;
}

function mostrarPresupuesto() {
    return "Tu presupuesto actual es de " + presupuesto + " €";
}

function CrearGasto(desc, value, date) {
    if (typeof value != "number" || value < 0)
    {
        this.valor = 0;
        this.descripcion = desc;
    } 
    else {
        this.valor = value;
        this.descripcion = desc;
    }

    this.mostrarGasto = function(){
        return "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €";
    };

    this.actualizarDescripcion = function(des){
        this.descripcion = des;
    };

    this.actualizarValor = function(value){
        if (typeof value == "number" && value >= 0)
            this.valor = value;
    };
}

function comprobarFormatoFecha(fecha){
    const formato = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;

    if (!formato.test(fecha)) {
        return false;
    }

    const date = new Date(fecha);
    return !isNaN(date.getTime());
}

function listarGastos(){
    if (gastos.length == 0){
        console.log("No hay gastos registrados.");
        return [];
    }
    return gastos;
}

function anyadirGasto(){
            
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