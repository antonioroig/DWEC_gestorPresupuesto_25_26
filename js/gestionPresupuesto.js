// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;
function actualizarPresupuesto(valor) {
    if (typeof valor === "number" && valor >= 0) {
        presupuesto = valor;
        return presupuesto;
    } else {
        console.error("Error: el valor debe de ser positivo o 0.");
        return -1;
    }
}
function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor = 0, fecha, ...etiquetas) {
    this.id = null; 
    this.descripcion = String(descripcion);
    this.valor = (typeof valor === "number" && valor >= 0) ? valor : 0;
    this.fecha = (fecha && !isNaN(Date.parse(fecha))) ? Date.parse(fecha) : Date.now();
    this.etiquetas = [];

    this.anyadirEtiquetas = function(...nuevasEtiquetas) {
        nuevasEtiquetas.forEach(et => {
            if (!this.etiquetas.includes(et)) this.etiquetas.push(et);
        });
    };

    if (etiquetas.length > 0) this.anyadirEtiquetas(...etiquetas);

  this.mostrarGastoCompleto = function() {
    const fechaLocal = new Date(this.fecha).toLocaleString();
    let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`;
    texto += `Fecha: ${fechaLocal}\n`;
    texto += `Etiquetas:\n`;

    if (this.etiquetas.length > 0) {
        for (let etiqueta of this.etiquetas) {
            texto += `- ${etiqueta}\n`;
        }
    }

    return texto;
};


    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };

    this.actualizarDescripcion = function(nuevaDescripcion) {
        this.descripcion = String(nuevaDescripcion);
    };

    this.actualizarFecha = function(nuevaFecha) {
        if (nuevaFecha && !isNaN(Date.parse(nuevaFecha))) {
            this.fecha = Date.parse(nuevaFecha);
        }
    };

    this.borrarEtiquetas = function(...etiquetasABorrar) {
        this.etiquetas = this.etiquetas.filter(et => !etiquetasABorrar.includes(et));
    };

    this.actualizarValor = function(nuevoValor) {
        if (typeof nuevoValor === "number" && nuevoValor >= 0) {
            this.valor = nuevoValor;
        }
    };
    this.obtenerPeriodoAgrupacion = function(periodo){
        const fecha = new Date(this.fecha)

        const anyo = fecha.getFullYear();
        let mes = fecha.getMonth() + 1;
        let dia = fecha.getDate();

        if(mes < 10){
            mes = "0" + mes;
        }
        if(dia < 10){
            dia = "0" + dia
        }
    if (periodo === "dia") {
        return `${anyo}-${mes}-${dia}`;
    } else if (periodo === "mes") {
        return `${anyo}-${mes}`;
    } else if (periodo === "anyo") {
        return `${anyo}`;
    } 
        return;
    
    }
}


function listarGastos(){
    return gastos
}
function anyadirGasto(gasto) {
    if (!gasto){
        return;
    }        
    gasto.id = idGasto;           
    idGasto++;                     
    gastos.push(gasto);           
}
function borrarGasto(id) {
       for (let i = 0; i < gastos.length; i++) {
        if (gastos[i].id === id) {
            gastos.splice(i, 1);
            break; 
        }
    }
}


function calcularTotalGastos() {
    let total = 0;
    for (let i = 0; i < gastos.length; i++) {
        total += gastos[i].valor;
    }
    return total;
}

function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}
function filtrarGastos(filtros) {


}
function agruparGastos(){

}







// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    filtrarGastos,
    agruparGastos,
    CrearGasto
}
