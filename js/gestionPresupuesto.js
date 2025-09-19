// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;

function actualizarPresupuesto(value) {
    const num = Number(value);
    if (isNaN(num) || num < '') {
        console.log(`Error en el valor del presupuesto`);
        return -1;
    }
    presupuesto = value;
    return value;
}

function mostrarPresupuesto() {
    const text = `Tu presupuesto actual es de ${presupuesto} €`;
    return text;
}

function CrearGasto(descripcion, valor) {
    this.descripcion = descripcion;
    this.valor = this.actualizarValor(valor);

    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

    this.actualizarDescripcion = function(value) {
        this.descripcion = value;
    }
    
    this.actualizarValor = function(value) {
        const num = Number(value);
        if (isNaN(num) || num < 0) {
            return 0;
        }
        return num;
    }

    return this;
}

// CrearGasto.prototype.mostrarGasto = function() {
//     return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
// };

// CrearGasto.prototype.actualizarDescripcion = function(value) {
//     this.descripcion = value;
// };

// CrearGasto.prototype.actualizarValor = function(value) {
//     const num = Number(value); //dupe
//     if (isNaN(num) || num < '') {
//         return;
//     }
//     if (num < 0) {
//         return;
//     }

//     this.valor = num;
// };



// function CrearGasto(descripcion, valor) {
//     return new Gasto(descripcion, valor);
// }

// class Gasto {
//     constructor(descripcion, valor) {
//         this.actualizarDescripcion(descripcion);
//         this.actualizarValor(valor);
//     }
    
//     mostrarGasto() {
//         const desc = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`
//         return desc;
//     }

//     actualizarDescripcion(value) {
//         this.descripcion = value;
//     }

//     actualizarValor(value) {
//         this.valor = 0;
//         const num = Number(value); //dupe
//         if (isNaN(num) || num < '') {
//             return;
//         }
//         if (num < 0) {
//             return;
//         }

//         this.valor = num;
//     }
// }


// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
