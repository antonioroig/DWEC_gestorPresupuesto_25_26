// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
let presupuesto = 0;
// TODO: Variable global

function actualizarPresupuesto(nuevoPresupuesto) {
    // TODO
    if (nuevoPresupuesto < 0 || nuevoPresupuesto == undefined || isNaN(nuevoPresupuesto)){
        return-1;
    }
    else{ 
        presupuesto = nuevoPresupuesto;
    }
    return presupuesto;
}

function mostrarPresupuesto() {
    return (`Tu presupuesto actual es de ${presupuesto} €`)
}
function CrearGasto(nuevaDescripcion, nuevoValor) {
    // TODO
        if (nuevoValor < 0 || nuevoValor == undefined || isNaN(nuevoValor)){
            this.valor = 0;
        }
        else {
            this.valor = nuevoValor;
        }
        
        this.descripcion = nuevaDescripcion;
        this.mostrarGasto = function() {
            return (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`)
        };
        this.actualizarDescripcion = function(newDescription) {
            this.descripcion = newDescription;
        },
        this.actualizarValor = function (newValue){
            if (newValue < 0 || newValue == undefined || isNaN(newValue)){
                return;
                }
                else {
                    this.valor = newValue;
                }
        }
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
