// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(val) {
    if(val >= 0)
    {
        presupuesto = val
        return presupuesto
    }
    else
    {
        console.log("Valor introducido erroneo")
        return -1
    }
}

function mostrarPresupuesto() {
    return(`Tu presupuesto actual es de ${presupuesto} €`)
}

function CrearGasto(descripcion1, valor, fecha, ...etiquetas) {
    
        this.descripcion = descripcion1;
        this.valor = (valor > 0) ? valor:0;
        this.fecha = (fecha == null) ? new Date() : Date.parse(fecha);
        this.etiquetas = etiquetas;
        this.mostrarGasto = function(){
            return(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`)
        }
        this.actualizarDescripcion = function(descripcion2){
            this.descripcion = descripcion2
        }
        this.actualizarValor = function(value){
            if(value > 0)
                this.valor = value
        }
}

function listarGastos(){
    return gastos;
}
function anyadirGasto(gasto){
    gasto.


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
