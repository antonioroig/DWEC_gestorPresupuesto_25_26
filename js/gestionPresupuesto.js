// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idgastos = 0;

function actualizarPresupuesto(value) {

    if(value > 0){
        presupuesto = value;
        return presupuesto;
    }
    else{
        console.log("Error");
    }
    return -1;
}

function mostrarPresupuesto() {
    console.log("Tu presupuesto actual es de " + presupuesto + "€");
}

function CrearGasto(numero, cadena, tags) {
    
    let gasto = {
    valor : numero,
    descripcion : cadena,
    etiquetas : tags,
    fecha : new Date().getTime(),

    actualizarDescripcion : function(value){
        this.descripcion = value;
        console.log(this.descripcion);
    },

    actualizarValor : function(value){
        if(value > 0 && Number(value) === value){
            this.valor = value;
            console.log("Tu valor es " + this.valor);
        }
    },

    mostrarGastoCompleto : function(){
        console.log("Gasto correspondiente a " + this.descripcion + "con valor " + this.valor + "€");
    }
    
}
    return gasto;
}

/////////////////PRUEBAS OBSOLETAS//////////////////////////////////
/*actualizarPresupuesto(4);
mostrarPresupuesto();
let toni = CrearGasto(90 ,"Toni");
toni.mostrarGasto();
toni.actualizarDescripcion("Enrique");
toni.actualizarValor("gfasd");*/
///////////////////////////////////////////////////////////////////

function listarGastos(){
    return gastos;
};

function anyadirGasto(objetoGasto){

    objetoGasto.id = idgastos;
    idgastos++;
    gastos.push(objetoGasto);
};

function borrarGasto(idGasto){

    if(typeof idGasto != 'number' || idGasto < 0){
        return;
    }

    gastos.splice(idGasto,1);

};
function calcularTotalGastos(){

    let aux=0;
    let sum=0;

    for(let i=0; i < gastos.length; i++){
        aux = gastos[i].valor;
        sum += aux;
    }
    return sum;
};

function calcularBalance(){
    let gastosTotales = calcularTotalGastos();
    return presupuesto - gastosTotales;
};

/*
let gasto1 = CrearGasto(15, "Antonio", 4);
let gasto2 = CrearGasto(92, "dsads", 5);
anyadirGasto(gasto1);
anyadirGasto(gasto2);
presupuesto= 124;
console.log(calcularTotalGastos());
console.log(calcularBalance());*/

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
