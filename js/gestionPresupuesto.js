let presupuesto = 0;
let valor = 0;
let gastos = [];
let idGastoCount = 0;

function actualizarPresupuesto(num) {
    if (num < 0){
        console.log("Introduzca un presupuesto válido");
        return -1;
    }
    presupuesto = num;
}

function mostrarPresupuesto() {
    console.log("Tu presupuesto actual es de " + presupuesto + " €");
}

function CrearGasto(desc, value, date) {
    let fechaValida;
    if (date == null || comprobarFormatoFecha(date) == false)
        fechaValida = new Date();
    else
        fechaValida = date;
    if (value < 0)
    {
        console.log("Introduzca un gasto válido");
        return {
            valor: -1,
            descripcion: "No válido",
            mostrarGasto: function() {
                console.log("Gasto no válido");
            },
            actualizarDescripcion: function() {},
            actualizarValor: function() {}
        }
    }
    let gasto = {
        valor: value,
        descripcion: desc,
        idGasto: idGastoCount,
        fecha: fechaValida,

        mostrarGasto: function(){
            console.log("Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " € el día " + date.getDate() + "/" + (date.getMonth() +1) + "/" + date.getFullYear());
        },

        actualizarDescripcion: function(des){
            this.descripcion = des;
        },

        actualizarValor: function(value){
            if (value >= 0)
                this.valor = value;
        }
    }
    gastos[idGastoCount] = gasto;
    idGastoCount++;
    return gasto;
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