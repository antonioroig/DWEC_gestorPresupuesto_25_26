// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
let presupuesto = 0;
// TODO: Variable global
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(nuevoValor) {
    if (nuevoValor > 0 ) {
        presupuesto = nuevoValor;
        console.log("Presupuesto actualizado correctamente: " + presupuesto);
        return presupuesto;
    } else {
        
        console.error("Error: El valor introducido no es válido.");
        return -1;
    }
}

function mostrarPresupuesto() {
    return "Tu presupuesto actual es de " + presupuesto + " €";
}

function CrearGasto(descripcion, valor, fecha, etiquetas) {
  
    if (typeof valor === 'number' && valor >= 0) 
    {
        this.valor = valor;
    } else {
        this.valor = 0;
    }

    this.descripcion = descripcion;

      
    const timestamp = Date.parse(fecha);
    if (isNaN(timestamp)) {
        this.fecha = Date.now();  
    } else {
        this.fecha = timestamp;
    }

    this.etiquetas = []
    for (let i = 3; i < arguments.length; i++) {
    this.etiquetas[this.etiquetas.length] = arguments[i]
    }


    
    this.actualizarFecha = function (nuevaFecha) {
        const nueva = Date.parse(nuevaFecha)
        if (!isNaN(nueva)) {
            this.fecha = nueva
        }
    }

    this.anyadirEtiquetas = function () {
    for (let i = 0; i < arguments.length; i++) {
        let existe = false

        for (let j = 0; j < this.etiquetas.length && existe == false; j++) {
            if (this.etiquetas[j] == arguments[i]) {
                existe = true
                
            }
        }

        if (!existe) {
            this.etiquetas[this.etiquetas.length] = arguments[i]
        }
    }
    }

    this.mostrarGastoCompleto = function () {
        let gastoCompleto = "Gasto correspondiente a " + this.descripcion +" con valor " + this.valor + " €." + "\n"
        gastoCompleto += "Fecha: " + new Date(this.fecha).toLocaleString() + "\n"
        gastoCompleto += "Etiquetas:"  + "\n"
        for (let i = 0; i < this.etiquetas.length; i++) {
            gastoCompleto += "- " + this.etiquetas[i] + "\n"
        }
        return gastoCompleto
    }
    
    this.borrarEtiquetas = function () {
    for (let i = 0; i < arguments.length; i++) {
        let nuevaLista = []
        for (let j = 0; j < this.etiquetas.length; j++) {
            if (this.etiquetas[j] !== arguments[i]) {
                nuevaLista[nuevaLista.length] = this.etiquetas[j]
            }
        }
        this.etiquetas = nuevaLista
    }
    }


    
    this.mostrarGasto = function () 
    {
        return "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €";
    }

    this.actualizarDescripcion = function (nuevaDescripcion) 
    {
        this.descripcion = nuevaDescripcion;
    }

    this.actualizarValor = function (nuevoValor) 
    {
        if (typeof nuevoValor === 'number' && nuevoValor >= 0) {
            this.valor = nuevoValor;            
        } 
        
    }

    this.obtenerPeriodoAgrupacion = function (periodo) {
    let fechaObjeto = new Date(this.fecha)
    let año = fechaObjeto.getFullYear()
    let mes = fechaObjeto.getMonth() + 1
    let dia = fechaObjeto.getDate()

    if (periodo === "anyo") {
        return "" + año
    }

    if (periodo === "mes") {
        if (mes < 10) {
            mes = "0" + mes
        }
        return año + "-" + mes
    }

    if (periodo === "dia") {
        if (mes < 10) {
            mes = "0" + mes
        }
        if (dia < 10) {
            dia = "0" + dia
        }
        return año + "-" + mes + "-" + dia
    }

    return
    }



}

const gasto = {
  fecha: Date.now(),       
  etiquetas: []             
};


function listarGastos() {
  return gastos
}


function anyadirGasto(gasto){

    gasto.id = idGasto
    idGasto = idGasto + 1
    gastos[gastos.length] = gasto


}

function borrarGasto(idGasto){
    let encontrado = false
    let id = idGasto
    for (let i = 0; i < gastos.length; i++) {
        if (!encontrado && gastos[i].id === id) {
            encontrado = true
        }
        if (encontrado && i < gastos.length - 1) {
            gastos[i] = gastos[i + 1]
        }
    }

    if (encontrado) {
        gastos.length = gastos.length - 1
    }


}

function calcularTotalGastos(){
    let total = 0
    for (let i = 0; i < gastos.length; i++) {
        total = total + gastos[i].valor
    }
    return total


}

function calcularBalance(){
    return presupuesto - calcularTotalGastos()

}

function filtrarGastos(){

}

function agruparGastos(){

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
    calcularBalance,
    filtrarGastos,
    agruparGastos
    

}
