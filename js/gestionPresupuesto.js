let presupuesto = 0;
let valor = 0;

function actualizarPresupuesto(num) {
    if (num < 0){
        console.log("Introduzca un presupuesto válido");
        return -1;
    }
    presupuesto = num;
}

function mostrarPresupuesto() {
    console.log("Tu presupuesto actual es de " + presupuesto + " €");
}

function CrearGasto(desc, value, date) {
    if (value < 0)
    {
        console.log("Introduzca un gasto válido");
        return {
            valor: -1,
            descripcion: "No válido",
            mostrarGasto: function() {
                console.log("Gasto no válido");
            },
            actualizarDescripcion: function() {},
            actualizarValor: function() {}
        }
    }
    let gasto = {
        valor: value,
        descripcion: desc,
        gastos: [],
        idGasto: 0,
        fecha: date,
        if (date = null || comprobarFormatoFecha(date) == false){
            fecha: new Date();
        },
        

        mostrarGasto: function(){
            console.log("Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €");
        },

        actualizarDescripcion: function(des){
            this.descripcion = des;
        },

        actualizarValor: function(value){
            if (value >= 0)
                this.valor = value;
        },

        anyadirGasto: function(){
            
        },

        borrarGasto: function(idGasto){
            if (idGasto != this.idGasto)
                return;
            this.gastos = [],
            this.valor = 0;
            this.fecha = null;
            this.descripcion = null;
        }
    }
    return gasto;
}

function comprobarFormatoFecha(fecha){
    const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;

    if (!regex.test(fecha)) {
        return false;
    }

    const date = new Date(fecha);
    return !isNaN(date.getTime());
}

function listarGastos(){
    return this.gastos;
} 





function calcularTotalGastos(){

}

function calcularBalance(){

}

actualizarPresupuesto(1000);
mostrarPresupuesto();
let gasto1 = CrearGasto(400);
gasto1.mostrarGasto();
gasto1.actualizarDescripcion("Adrián");
gasto1.actualizarValor(500);
gasto1.mostrarGasto();

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