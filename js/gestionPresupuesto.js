let presupuesto = 0;
let valor = 0;
let gastos = [];
let idGasto = 0;

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

function CrearGasto(descripcion, value, fecha, ...etiquetas) {
    if (typeof fecha === "string" && !isNaN(Date.parse(fecha))) 
        this.fecha = Date.parse(fecha);
    else 
        this.fecha = Date.now(); // timestamp actual
    if (typeof value != "number" || value < 0)
    {
        this.valor = 0;
        this.descripcion = descripcion;
    } 
    else {
        this.valor = value;
        this.descripcion = descripcion;
    }
    this.etiquetas = [];
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

function listarGastos(){
    if (gastos.length == 0){
        console.log("No hay gastos registrados.");
        return [];
    }
    return gastos;
}

function anyadirGasto(gasto){
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(gasto){
    for (let i = 0; i < gastos.length; i++){
        if (gastos[i].id == gasto)
            gastos.splice(i, 1);
    }
}

function calcularTotalGastos(){
    let resultado = 0;
    for (let i = 0; i < gastos.length; i++){
        resultado += gastos[i].valor;
    }
    return resultado;
}

function calcularBalance(){
    return presupuesto - calcularTotalGastos();
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