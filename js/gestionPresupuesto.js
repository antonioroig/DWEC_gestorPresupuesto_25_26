// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;

function actualizarPresupuesto(value) {
    if (value < 0) {
        console.log(`Error en el valor del presupuesto`);
        return -1;
    }
    return value;
}

function mostrarPresupuesto() {
    console.log(`Tu presupuesto actual es de: ${presupuesto}€`)
}

class Gasto {
    constructor(descripcion, valor) {
        this.descripcion = descripcion
        this.valor = valor
    }
    mostrarGasto() {
        const desc = `Gasto correspondiente "${this.descripcion}" con Valor: ${this.valor} €`
        return desc;
    }
    actualizarDescripcion(value) {
        this.descripcion = value;
    }
    actualizarValor(value) {
        if (value < 0)
            return;
        this.valor = value;
    }
}

function CrearGasto() {

}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
