// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
//Actividad 2
let gastos = [];
let idGasto = 0;

// MOVER ESTO A LA FUNCION CONSTRUCTORA
function listarGastos() {
    return gastos;
}

function anyadirGasto(obj) {
    if (obj == null || obj == undefined)
        return;

    let newGasto = {
        ...obj,
        id: idGasto,
    }
    idGasto++;

    gastos.push(newGasto);
}

function borrarGasto(id) {
    if (isNaN(id))
        return;
    
    for (let i = 0; i < gastos.length; i++) {
        if (gastos[i].id == id) {
            gastos.splice(i, 1);
            return;
        }
    }
}

function calcularTotalGastos() {
    let total = 0;
    if (gastos.length > 0) {
        for (let gasto of gastos) {
            total += gasto.valor;
        }
    }
    return total;
}

function calcularBalance() {
    let totalGasto = calcularTotalGastos();
    return totalGasto - presupuesto;
}



function actualizarPresupuesto(value) {
    const num = Number(value);
    if (isNaN(num) || num < '') {
        return -1;
    }
    presupuesto += value;
    return value;
}

function mostrarPresupuesto() {
    const text = `Tu presupuesto actual es de ${presupuesto} €`;
    return text;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

    this.actualizarDescripcion = function(value) {
        this.descripcion = value;
    }
    
    this.actualizarValor = function(value) {
        const num = Number(value);
        if (isNaN(num) || num < 0) {
            return;
        }
        this.valor = num;
    }

    //codigo duplicado, esto se debería de refactorizar
    this.validarValor = function(value) {
        const num = Number(value);
        if (isNaN(num) || num < 0) {
            return 0;
        }
        return num;
    }

    // Función personalizada. Formatea y devuelve el texto en el formato indicado
    this.formatearGastos = function() {
        return this.etiquetas.map(tag => `\n- ${tag}`);
    }


    // Función personalizada. Formatea la fecha en el formato indicado.
    this.formatearFecha = function() {
        return new Date(this.fecha).toLocaleString();
    }

    this.mostrarGastoCompleto = function() {
    return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.
Fecha: ${this.formatearFecha()}
Etiquetas:${this.formatearGastos()}`
    }


    this.actualizarFecha = function(fecha) {
        if (!fecha || isNaN(Date.parse(fecha))) {
            return;
        } else {
            this.fecha = Date.parse(fecha);
        }
    }

    this.validarFecha = function(fecha) {
        if (!fecha || isNaN(Date.parse(fecha))) {
            return Date.now();
        } else {
            return Date.parse(fecha);
        }
    }
    
    this.anyadirEtiquetas = function(...values) {
        if (values == null || values == undefined)
            return;

        for (let tag of values) {
            if (this.etiquetas.indexOf(tag) == -1) {
                this.etiquetas.push(tag);
            }
        }
    }

    this.validarEtiquetas = function(...values) {
        let arr = [];
        if (values == null || values == undefined) {
            return arr;
        } else {
            for (let tag of values) {
                arr.push(tag);
            }
            return arr;
        }
    }


    this.borrarEtiquetas = function(...values) {
        if (values == null || values == undefined || values.length == 0)
            return;

        for (let tag of values) {
            let index = this.etiquetas.indexOf(tag);
            if (index != -1) {
                this.etiquetas.splice(index, 1);
            }
        }
    }




    this.descripcion = descripcion;
    this.valor = this.validarValor(valor); // DEBERIA SER ACTUALIZAR VALOR NO VALIDARLO
    this.fecha = this.validarFecha(fecha);
    this.etiquetas = this.validarEtiquetas(...etiquetas);
}










// TODO
// let valor = 23.55;
// let fechalocale = new Date("2021-10-06T13:10Z").toLocaleString();
// let gasto1 = new CrearGasto("pasteles", valor, "2021-10-06T13:10Z", "casa", "supermercado", "comida" );
// console.log("Esperado");
// console.log(`Gasto correspondiente ${gasto1.descripcion} con valor ${gasto1.valor} €.
// Fecha: ${fechalocale}
// Etiquetas:
// - casa
// - supermercado
// - comida`    
// );
// console.log("-----------------");
// console.log("objeto");
// console.log("funcion gasto1", gasto1.mostrarGastoCompleto());



// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance 
}
