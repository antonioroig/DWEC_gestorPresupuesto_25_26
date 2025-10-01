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
}

const gasto = {
  fecha: Date.now(),       
  etiquetas: []             
};


function listarGastos() {
  return gastos
}


function anyadirGasto(){


}

function borrarGasto(){


}

function calcularTotalGastos(){

}

function calcularBalance(){
    
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

}
