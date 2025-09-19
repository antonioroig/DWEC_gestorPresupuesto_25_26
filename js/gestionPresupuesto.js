// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

let presupuesto = 0;

function actualizarPresupuesto(presupuestoActualizado) {
    if (presupuesto < 0)
    {
        console.log("El valor introducido es negativo");
        return -1;
    }
    presupuesto = presupuestoActualizado;
    return presupuesto
}

function mostrarPresupuesto() {
    return "Tu presupuesto actual es de " + presupuesto + " €";
}

function CrearGasto() {
    let gasto = {
        descripcion: "el gasto le pertenece a anónimo 321",
        valor: 324,
        mostrarGasto: function(descripcion, valor) {
            console.log("Gasto correspondiente a " + descripcion + " con valor " + valor + " €");        
        },
        actualizarDescripcion: function(descripcion, descripcionNueva) {
            descripcion = descripcionNueva;
            return descripcion;
        },
        actualizarValor: function(valor, valorNuevo){
            if (valorNuevo < 0)
                return;
            valor = valorNuevo;
            return valor;
        }
    }
    return gasto;
}

actualizarPresupuesto(10000);
console.log(presupuesto);
console.log(mostrarPresupuesto());
let gastos = CrearGasto();
console.log(gastos.descripcion);
console.log(gastos.valor);
console.log(gastos.mostrarGasto(gastos.descripcion, gastos.valor));
console.log(gastos.actualizarDescripcion(gastos.descripcion, "Buenas tarde"));
console.log(gastos.actualizarValor(gastos.valor, 200))


// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
