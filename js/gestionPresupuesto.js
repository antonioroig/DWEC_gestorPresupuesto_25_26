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
    
/*
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
*/




//FUNDAMENTOS JAVASCRIPT II

let gastos = [];
let idGasto = 0;

function CrearGasto(description, value, date, ...tags) {
    this.descripcion = description;
    if (value > 0)
        this.valor = value;
    else
        this.valor = 0;
    if (date == undefined || Date.parse(date) == NaN)
        this.fecha = new Date();
    else
        this.fecha = Date.parse(date);

    if (tags == undefined || tags.length === 0)
        this.etiquetas = [];
    else
        this.etiquetas = tags;

    this.mostrarGastoCompleto = function(){
        let allTags = "";
        let fechaFormateada = new Date(this.fecha)

        for (let i = 0; i < this.etiquetas.length; i++)
            allTags = allTags + "- " + this.etiquetas[i] + "\n";
        
        return `Gasto correspondiente a ` + this.descripcion +  ` con valor `  + this.valor +  ` €.\nFecha: ` + fechaFormateada.toLocaleString() +`\nEtiquetas:\n` + allTags;
    }

    this.actualizarValor = function(value){
        if (value > 0)
            this.valor = value;
    }

    this.actualizarDescripcion = function(description){
        this.descripcion = description;
    }

    this.actualizarFecha = function(date){
        if (!isNaN(Date.parse(date)))
            this.fecha = Date.parse(date);
    }
    
    this.anyadirEtiquetas = function(...tags){
        for (let i = 0; i < tags.length; i++)
        {
            if(this.etiquetas.includes(tags[i]) == false)
                this.etiquetas.push(tags[i]);
        }
    }

    this.borrarEtiquetas = function(...tags){
        for (let i = tags.length - 1; i >= 0; i--)
        {
            if(this.etiquetas.includes(tags[i]))
            {
                let index = this.etiquetas.indexOf(tags[i])
                this.etiquetas.splice(index, 1);
            }
        }
    }
}

function listarGastos()
{
    if (gastos.length == 0)
        return[];
    return gastos;
}

function anyadirGasto(gasto)
{
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(id)
{
    for (let i = 0; i < gastos.length; i++)
    {
        if (id === gastos[i].id)
            gastos.splice(i, 1);
    }
}

function calcularTotalGastos()
{
    let total = 0;
    for (let i = 0; i < gastos.length; i++)
        total += gastos[i].valor;
    return total;
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
