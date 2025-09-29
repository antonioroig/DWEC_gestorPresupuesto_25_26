// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

let presupuesto = 0;

function actualizarPresupuesto(valor) {
    if (valor > 0)
    {
        presupuesto = valor;
        return presupuesto
    }
    return -1;
}

function mostrarPresupuesto() {
    return "Tu presupuesto actual es de " + presupuesto + " €";
}

function CrearGasto(des, value) {

    this.descripcion = des;
    if (value > 0)
        this.valor = value;
    else
        this.valor = 0;

    this.mostrarGasto = function(){
        return "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €"
    }

    this.actualizarValor = function(value){
        if (value > 0)
            this.valor = value;
    }

    this.actualizarDescripcion = function(description){
        this.descripcion = description;
    }
}





//FUNDAMENTOS JAVASCRIPT II
/*
let gastos = [];
let idGasto = 0;

function CrearGasto(description, value, date, ...etiquets) {

    let gasto = {
        descripcion: description,
        valor: value,
        fecha: Date.parse(date),
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
    if (value < 0 || value == undefined)
        gasto.valor = 0;
    if (etiquets.length == 0)
        gasto.etiquetas = [];
    
    return gasto;
}

function listarGastos()
{
    if (gastos.length == 0)
        return[];
    return gastos;
}

function anyadirGasto(...gasto)
{
    gasto.id = idGasto;
    idGasto++;
    gastos.push(...gasto);
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

listarGastos();

let gasto1 = new CrearGasto("Gasto 1");
let gasto2 = new CrearGasto("Gasto 2", 23.55);
let gasto3 = new CrearGasto("Gasto 3", 23.55, "2021-10-06T13:10" );
let gasto4 = new CrearGasto("Gasto 4", 23.55, "2021-10-06T13:10", "casa" );
let gasto5 = new CrearGasto("Gasto 5", 23.55, "2021-10-06T13:10", "casa", "supermercado" );
let gasto6 = new CrearGasto("Gasto 6", 23.55, "2021-10-06T13:10", "casa", "supermercado", "comida" );



aBalance();
console.log(balance);
*/
// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto/*,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance*/
}
