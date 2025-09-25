// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(nuevoPresupuesto) {
    // TODO
    if (isNaN(nuevoPresupuesto) || nuevoPresupuesto < 0.0)
    {
        console.log('El presupuesto introducido no es válido.')
        return -1;
    }
    else {
        presupuesto = nuevoPresupuesto;
    }
    return presupuesto;
}

function mostrarPresupuesto() {
    // TODO
    return 'Tu presupuesto actual es de ' + presupuesto + ' €'
}

function CrearGasto(descripcion, valor) {
    // TODO
    if (isNaN(valor) || valor < 0.0){
        valor = 0;
    }
        this.descripcion = descripcion;
        this.valor = valor;

        this.mostrarGasto = function() {
            return 'Gasto correspondiente a ' + this.descripcion + ' con valor ' + this.valor + ' €'
        };

        this.actualizarDescripcion = function(nuevaDescripcion) {
            this.descripcion = nuevaDescripcion;
        };

        this.actualizarValor = function(nuevoValor) {
            if(nuevoValor >= 0.0)
                this.valor = nuevoValor;
        };
    
    return this;
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
