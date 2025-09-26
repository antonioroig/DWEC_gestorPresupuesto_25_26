// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

let presupuesto = 10000;

function actualizarPresupuesto(presupuestoActualizado) {
    if (presupuesto < 0)
    {
        console.log("El valor introducido es negativo");
        return -1;
    }
    presupuesto = presupuestoActualizado;
    return presupuesto
}

function mostrarPresupuesto() {
    return "Tu presupuesto actual es de " + presupuesto + " €";
}

/*function CrearGasto() {
    let gasto = {
        descripcion: "el gasto le pertenece a anónimo 321",
        valor: 324,
        mostrarGasto: function(descripcion, valor) {
            console.log("Gasto correspondiente a " + descripcion + " con valor " + valor + " €");        
        },
        actualizarDescripcion: function(descripcion, descripcionNueva) {
            descripcion = descripcionNueva;
        },
        actualizarValor: function(valor, valorNuevo){
            if (valorNuevo < 0)
                return;
            valor = valorNuevo;
        }
    }
    return gasto;
}

actualizarPresupuesto(10000);
console.log(presupuesto);
console.log(mostrarPresupuesto());
let gast = CrearGasto();
console.log(gast.descripcion);
console.log(gast.valor);
console.log(gast.mostrarGasto());
console.log(gast.actualizarDescripcion(gast.descripcion, "Buenas tarde"));
console.log(gast.actualizarValor(gast.valor, 200));

let ciudadano = {
    nombre: "David",
    saludarConRetardo: function(){
        setTimeout(() => {
            console.log(this.nombre);
        }, 1000);
    }
}

ciudadano.saludarConRetardo();
*/

//FUNDAMENTOS JAVASCRIPT II

let gastos = [];
let idGasto = 0;

function CrearGasto(description, value, date, ...etiquets) {

    let gasto = {
        descripcion: description,
        valor: value,
        fecha: new Date(Date.parse(date)),
        etiquetas: etiquets,
        mostrarGastoCompleto: function() {
            console.log("Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + ` €
Fecha: ` + this.fecha.toLocaleString() + `
Etiquetas:`) 
            for (let i = 0; i < this.etiquetas.length; i++)
                console.log("- " + this.etiquetas[i]);
        },
        actualizarDescripcion: function(descripcionNueva) {
            this.descripcion = descripcionNueva;
        },
        actualizarValor: function(valorNuevo){
            if (valorNuevo < 0)
                return;
            this.valor = valorNuevo;
        },
        actualizarFecha: function(date){
            if (Date.parse(date) == undefined)
                return;
            this.fecha = date;
        },
        anyadirEtiquetas: function(...etiquetas){
            for(let i = 0; i < etiquetas.length; i++)
                if (this.etiquetas.includes(etiquetas[i]) == false)
                    this.etiquetas.push(etiquetas[i]);
        },
        borrarEtiquetas: function(...etiquetas){
            for(let i = 0; i < etiquetas.length; i++){
                if (this.etiquetas.includes(etiquetas[i])){
                    let index = this.etiquetas.indexOf(etiquetas[i]);
                    this.etiquetas.splice(index, 1);
                }
            }
        }
    }
    if (value < 0)
        gasto.valor = 0;
    return gasto;
}

function listarGastos()
{
    return gastos;
}

function anyadirGasto(gasto)
{
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(gasto)
{
    gastos.splice(gasto.id, 1);
}

function calcularTotalGastos()
{
    let sumaTotal = 0;
    for(let i = 0; i < gastos.length; i++)
        if (gastos[i].valor != undefined)
            sumaTotal += gastos[i].valor;
    return sumaTotal;
}

function calcularBalance()
{
    let gastosTotales = calcularTotalGastos();
    return presupuesto - gastosTotales;
}

let gasto1 = new CrearGasto("Gasto 1");
let gasto2 = new CrearGasto("Gasto 2", 23.55);
let gasto3 = new CrearGasto("Gasto 3", 23.55, "2021-10-06T13:10" );
let gasto4 = new CrearGasto("Gasto 4", 23.55, "2021-10-06T13:10", "casa" );
let gasto5 = new CrearGasto("Gasto 5", 23.55, "2021-10-06T13:10", "casa", "supermercado" );
let gasto6 = new CrearGasto("Gasto 6", 23.55, "2021-10-06T13:10", "casa", "supermercado", "comida" );

/*
console.log(gasto1);
console.log(gasto2);
console.log(gasto3);
console.log(gasto4);
console.log(gasto5);
console.log(gasto6);
*/

anyadirGasto(gasto1);
anyadirGasto(gasto2);
anyadirGasto(gasto3);
anyadirGasto(gasto4);
anyadirGasto(gasto5);
anyadirGasto(gasto6);
borrarGasto(gasto3);
gasto4.actualizarFecha("2021-12-06T13:10");
gasto4.anyadirEtiquetas("jardín", "mascota");
gasto6.borrarEtiquetas("comida", "bebida", "supermercado");
gasto5.mostrarGastoCompleto();

for (let i = 0; i < gastos.length; i++)
    console.log(gastos[i]);

let gastoTotal = calcularTotalGastos();
console.log(gastoTotal);
let balance = calcularBalance();
console.log(balance);

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
