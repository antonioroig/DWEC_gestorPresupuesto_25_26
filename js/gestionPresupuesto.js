// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

let presupuesto = 0;

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

function CrearGasto() {
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
console.log(gastos.descripcion);
console.log(gastos.valor);
console.log(gastos.mostrarGasto(gastos.descripcion, gastos.valor));
console.log(gastos.actualizarDescripcion(gastos.descripcion, "Buenas tarde"));
console.log(gastos.actualizarValor(gastos.valor, 200));

let ciudadano = {
    nombre: "David",
    saludarConRetardo: function(){
        setTimeout(() => {
            console.log(this.nombre);
        }, 1000);
    }
}

ciudadano.saludarConRetardo();


//FUNDAMENTOS JAVASCRIPT II

let gastos = [];
let idGasto = 0;

function CrearGasto() {
    let gasto = {
        descripcion: "el gasto le pertenece a anónimo 321",
        valor: 200,
        etiquetas: [],
        fecha: new Date(Date.parse()),
        mostrarGastoCompleto: function() {
            console.log("Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + ` €
                Fecha: ` + this.fecha + `
                Etiquetas:
                ` );        
        },
        actualizarDescripcion: function(descripcion, descripcionNueva) {
            descripcion = descripcionNueva;
        },
        actualizarValor: function(valor, valorNuevo){
            if (valorNuevo < 0)
                return;
            valor = valorNuevo;
        },
        actualizarFecha: function(date){
            if (Date.parse(date) == undefined)
                return;
            this.fecha = date;
        },
        anyadirEtiquetas: function(...etiquetas){
            for(let i = 0; i < etiquetas.length; i++)
                if (this.etiquetas.includes(etiquetas[i]))
                {
                    i++;
                    continue;
                }
                this.etiquetas.push(etiquetas[i]);
        },
        borrarEtiquetas: function(...etiquetas){
            for(let i = 0; i < etiquetas.length; i++){
                if (this.etiquetas.includes(etiquetas[i])){
                    let index = this.etiquetas.indexOf(etiquetas[i]);
                    delete this.etiquetas[index];
                }
            }
        }
    }
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
    delete gastos[gasto.id];
}

function calcularTotalGastos()
{
    let sumaTotal = 0;
    for(let i = 0; i < gastos.length; i++)
        sumaTotal += gastos[i];
    return sumaTotal;
}

function calcularBalance()
{
    let gastosTotales = calcularTotalGastos();
    return presupuesto - gastosTotales;
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
