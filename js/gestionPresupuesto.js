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
    if (obj == null)
        return;
    if (obj == undefined)
        return;

    let newGasto = {
        ...obj,
        idGasto: idGasto,
    }
    
    idGasto++;

    // Hay algo estilo if obj Is gasto?
    gastos.push(newGasto);
}

function borrarGasto(obj) {
    if (obj == null)
        return;
    if (obj == undefined)
        return;

    let index = IndexOf(obj)
    if (index != -1)
        gastos.splice(index, 1)
}

function calcularTotalGastos() {
    // TODO
}

function calcularBalance() {
    // TODO
}




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

    this.mostrarGastoCompleto = function() {
        return `
            Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.
            Fecha: ${this.fecha.toLocaleString()}
            Etiquetas: ${this.etiquetas.map()}
            - etiqueta 1
            - etiqueta 2....` // Esto funciona?
    }

    this.actualizarFecha = function(fecha) {
        console.log(fecha);
        if (!fecha || isNaN(Date.parse(fecha))) {
            console.log("No hay fecha");
            return Date.now();
        } else {
            console.log("La fecha existe, debería guardarse bien parseada");
            return Date.parse(fecha);
        }
    }
    
    this.anyadirEtiquetas = function(...values) {
        if (values == null && this.etiquetas == null) {
            this.etiquetas = [];
        }

        for (let tag in values) {
            if (this.estaEnEtiquetas(tag)) {
                continue;
            }
            etiquetas.push(tag);
        }
    }

    this.borrarEtiquetas = function(...values) {
        for (let tag in values) {
            if (this.estaEnEtiquetas(tag)) {
                let i = this.etiquetas.IndexOf(tag);
                this.etiquetas.splice(i, 1)
            }
        }
    }

    // Función personalizada.
    // Busca en las etiquetas si existe o no la etiqueta.
    // Return boolean
    this.estaEnEtiquetas = function(value) {
        for (let tag in etiquetas) {
            if (tag == value)
                return true;
        }
        return false;
    }

    this.descripcion = descripcion;
    this.valor = this.validarValor(valor);
    this.fecha = this.actualizarFecha(fecha);
    this.etiquetas = this.anyadirEtiquetas(...etiquetas);
}

let gasto1 = new CrearGasto("Gasto 1");
let gasto2 = new CrearGasto("Gasto 2", 23.55);
let gasto3 = new CrearGasto("Gasto 3", 23.55, "2021-10-06T13:10");
let gasto4 = new CrearGasto("Gasto 4", 23.55, "2021-10-06T13:10", "casa");
let gasto5 = new CrearGasto("Gasto 5", 23.55, "2021-10-06T13:10", "casa", "supermercado");
let gasto6 = new CrearGasto("Gasto 6", 23.55, "2021-10-06T13:10", "casa", "supermercado", "comida");

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
