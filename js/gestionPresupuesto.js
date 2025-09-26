// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(numPresupuesto) {
    if (isNaN(numPresupuesto) || numPresupuesto < 0) {
        console.log("No has introducido un número")
        return -1;
    }
    else {
        presupuesto = numPresupuesto;
    }
    return presupuesto;
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`
}

function CrearGasto(cadena, valorIntroducido, fecha, ...etiquetas) {
    if(isNaN(valorIntroducido) || valorIntroducido < 0)
        valorIntroducido = 0;

    fecha = Date.parse(fecha);
    if (isNaN(fecha)) {
        fecha = Date.now();
    }

    this.descripcion = cadena;
    this.valor = valorIntroducido;
    this.fecha = Date.parse(fecha);
    this.etiquetas;

    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`
    };
    
    this.actualizarDescripcion = function(nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    };

    this.actualizarValor = function(nuevoValor) {
        if (nuevoValor >= 0)
            this.valor = nuevoValor;
    };
    
    this.mostrarGastoCompleto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €
        Fecha: ${new Date(this.fecha).toLocaleString()}
        Etiquetas:`
    };
        
    this.actualizarFecha = function(fechaNueva) {
        fecha = Date.parse(fecha);
        if (isNaN(fecha)) {
            fecha = Date.now(); 
        }
    }
    this.anyadirEtiquetas = function(...etiquetas) {
        for (let etiqueta of etiquetas) {
            if (!this.etiquetas.includes(etiqueta))
                this.etiquetas.push(etiqueta);
        }
    }
    
}

function listarGastos() {
    return gastos;
}

function anyadirGasto(gasto) {
    gasto.id = idGasto++;
    gastos.push(gasto);
}

function borrarGasto(idGasto) {
    let index = gastos.findIndex(gasto => gasto.id == idGasto);
    if(index >= 0)
        gastos.splice(index, 1);       
}

function calcularTotalGastos() {
    let total = 0;
    for(let gasto of gastos) {
       total += gasto.valor;
    }
    return total;
}

function calcularBalance() {
    return (presupuesto - calcularTotalGastos())
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
