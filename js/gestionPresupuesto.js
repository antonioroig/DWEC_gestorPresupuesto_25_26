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

function borrarGasto(id) {
    if (isNaN(id))
        return;
    
    for (let i = 0; i < gastos.length; i++) {
        if (gasto.id == id) {
            gastos.splice(i, 1);
        }
    }
}

function calcularTotalGastos() {
    let total = 0;
    if (gastos.length > 0) {
        for (let gasto in gastos) {
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
        if (!fecha || isNaN(Date.parse(fecha))) {
            return Date.now();
        } else {
            return Date.parse(fecha);
        }
    }
    
    this.anyadirEtiquetas = function(...values) {
        if (values == null || this.etiquetas == null) {
            return [];
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
    this.valor = this.validarValor(valor); // DEBERIA SER ACTUALIZAR VALOR NO VALIDARLO
    this.fecha = this.actualizarFecha(fecha);
    this.etiquetas = this.anyadirEtiquetas(...etiquetas);
}


        let now = new Date();

        let descr = "Ejemplo de gasto";
        // let gasto1 = new CrearGasto(descr);
        // console.log(gasto1.descripcion, descr);
        
        // console.log(gasto1.valor, 0);
        // console.log(new Date(gasto1.fecha).getMonth(), now.getMonth());
        // console.log(new Date(gasto1.fecha).getDate(), now.getDate());
        // console.log(gasto1.etiquetas, "Si el gasto se crea sin etiquetas, la propiedad 'etiquetas' debe inicializarse a un array vacío");
        // console.log(gasto1);

        // let gasto2 = new CrearGasto(descr, 23.55);
        // console.log(gasto2.descripcion, descr);
        // console.log(gasto2.valor, 23.55);
        // console.log(new Date(gasto2.fecha).getMonth(), now.getMonth());
        // console.log(new Date(gasto2.fecha).getDate(), now.getDate());
        // console.log(gasto2.etiquetas);

        // let gasto3 = new CrearGasto(descr, 23.55, "2021-10-06T13:10Z" );
        // console.log(gasto3.descripcion, descr);
        // console.log(gasto3.valor, 23.55);
        // console.log(gasto3.fecha, Date.parse("2021-10-06T13:10Z"));
        // console.log(gasto3.etiquetas);

        let gasto4 = new CrearGasto(descr, 23.55, "2021-10-06T13:10Z", "casa" );
        console.log(gasto4.descripcion, descr);
        console.log(gasto4.valor, 23.55);
        console.log(gasto4.fecha, Date.parse("2021-10-06T13:10Z"));
        console.log(gasto4.etiquetas.length,1);
        console.log(gasto4.etiquetas[0], "casa");

        // let gasto5 = new CrearGasto(descr, 23.55, "2021-10-06T13:10Z", "casa", "supermercado" );
        // assert.equal(gasto5.descripcion, descr);
        // assert.equal(gasto5.valor, 23.55);
        // assert.equal(gasto5.fecha, Date.parse("2021-10-06T13:10Z"));
        // assert.lengthOf(gasto5.etiquetas,2);
        // assert.equal(gasto5.etiquetas[0], "casa");
        // assert.equal(gasto5.etiquetas[1], "supermercado");

        // let gasto6 = new CrearGasto(descr, 23.55, "2021-10-06T13:10Z", "casa", "supermercado", "comida" );
        // assert.equal(gasto6.descripcion, descr);
        // assert.equal(gasto6.valor, 23.55);
        // assert.equal(gasto6.fecha, Date.parse("2021-10-06T13:10Z"));
        // assert.lengthOf(gasto6.etiquetas,3);
        // assert.equal(gasto6.etiquetas[0], "casa");
        // assert.equal(gasto6.etiquetas[1], "supermercado");
        // assert.equal(gasto6.etiquetas[2], "comida");






// let gasto1 = new CrearGasto("Gasto 1");
// let gasto2 = new CrearGasto("Gasto 2", 23.55);
// let gasto3 = new CrearGasto("Gasto 3", 23.55, "2021-10-06T13:10");
// let gasto4 = new CrearGasto("Gasto 4", 23.55, "2021-10-06T13:10", "casa");
// let gasto5 = new CrearGasto("Gasto 5", 23.55, "2021-10-06T13:10", "casa", "supermercado");
// let gasto6 = new CrearGasto("Gasto 6", 23.55, "2021-10-06T13:10", "casa", "supermercado", "comida");

// console.log("Gasto 1");
// console.log(gasto1);
// console.log("Gasto 2");
// console.log(gasto2);
// console.log("Gasto 3");
// console.log(gasto3);
// console.log("Gasto 4");
// console.log(gasto4);
// console.log("Gasto 5");
// console.log(gasto5);
// console.log("Gasto 6");
// console.log(gasto6);



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
