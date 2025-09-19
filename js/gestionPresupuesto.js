// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;

function actualizarPresupuesto(valor) {
    // TODO
    if(valor > 0){
        presupuesto = valor;
        return valor;
    }
    else{
        console.log("Valor introducido erroneo");
        return -1;
    }
}

function mostrarPresupuesto() {
    // TODO
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor) {
    // TODO
    this.descripcion = descripcion,
    this.valor = (valor > 0) ? valor : 0,
    this.mostrarGasto = function(){
        return(`Gasto correspondiente a ${descripcion} con valor ${valor} €`);
    },
    this.actualizarDescripcion = function(descripcion){
        this.descripcion = descripcion;
    },
    this.actualizarValor = function (valor) {
        this.valor = (valor > 0) ? valor : this.valor;
    }
}



// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
