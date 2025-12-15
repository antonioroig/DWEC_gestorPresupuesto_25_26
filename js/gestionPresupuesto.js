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

    this.mostrarGasto = function(){
        return "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €"
    }

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

    this.obtenerPeriodoAgrupacion = function(periodo){

        let fechaFormateada = new Date(this.fecha);

        let year = fechaFormateada.getFullYear();
        let month = fechaFormateada.getMonth();
        let day = fechaFormateada.getDate();
        month += 1;

        if (month < 10)
            month = "0" + month;
        if (day < 10)
            day = "0" + day;

        date = year + "-" + month + "-" + day;

        let año = date.slice(0, 4);
        let mes = date.slice(5, 7);
   

        if (periodo === "anyo")
            return año;
        else if(periodo === "mes")
            return año + "-" + mes;
        else if(periodo === "dia")
            return date;

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

function filtrarGastos(objeto)
{
    if(objeto == undefined || Object.keys(objeto).length === 0)
        return gastos;

    let arrayCopia = [...gastos];

    if (objeto.fechaDesde != undefined && !isNaN(Date.parse(objeto.fechaDesde)))
    {
        arrayCopia = arrayCopia.filter(function(gasto){
            return gasto.fecha >= Date.parse(objeto.fechaDesde);
        });
    }
    if (objeto.fechaHasta != undefined && !isNaN(Date.parse(objeto.fechaHasta)))
    {
        arrayCopia = arrayCopia.filter(function(gasto){
            return gasto.fecha <= Date.parse(objeto.fechaHasta);
        })
    }
    if (objeto.valorMinimo != undefined)
    {
        arrayCopia = arrayCopia.filter(function(gasto){
            return Number(gasto.valor) >= objeto.valorMinimo;
        })
    }
    if (objeto.valorMaximo != undefined)
    {
        arrayCopia = arrayCopia.filter(function(gasto){
            return Number(gasto.valor) <= objeto.valorMaximo;
        })
    }
    if (objeto.descripcionContiene !== undefined && objeto.descripcionContiene.length > 0)
    {
        arrayCopia = arrayCopia.filter(function(gasto){
            let arrayDescripcion = gasto.descripcion.split(" ");
            for (let i = 0; i < arrayDescripcion.length; i++)
                return arrayDescripcion[i].toLowerCase().includes(objeto.descripcionContiene.toLowerCase());
        })
    }
    if (objeto.etiquetasTiene !== undefined && objeto.etiquetasTiene.length > 0)
    {
        arrayCopia = arrayCopia.filter(function(gasto){
            for (let i = 0; i < objeto.etiquetasTiene.length; i++)
            {
                if(gasto.etiquetas !== undefined && gasto.etiquetas.length > 0)
                {
                    let j = 0;
                    while (j < gasto.etiquetas.length)
                    {
                        if(objeto.etiquetasTiene[i].toLowerCase() == gasto.etiquetas[j].toLowerCase())
                            return true; 
                        else
                            j++;
                    }
                }
            }
            return false;
        })
    }
    return arrayCopia;
}

function agruparGastos(periodo, etiquetas, fechadesde, fechahasta)
{
    if(periodo == undefined)
        periodo = "mes";
    if(fechahasta == undefined || isNaN(Date.parse(fechahasta)))
        fechahasta = new Date();
    let objetoVacio = new Object();
    let gastosFiltrados = filtrarGastos({fechaDesde: fechadesde, fechaHasta: fechahasta, etiquetasTiene: etiquetas})
    gastosFiltrados.reduce(function(sum, gasto){
        let gastoPeriodo = gasto.obtenerPeriodoAgrupacion(periodo);
        if(gastoPeriodo in objetoVacio){
            return objetoVacio[gastoPeriodo] += gasto.valor;
        }
        else
            return objetoVacio[gastoPeriodo] = gasto.valor;
    }, objetoVacio);
    return objetoVacio;
}

function transformarListadoEtiquetas(stringEtiqueta){
    
    return stringEtiqueta.split(/[,;:\.\s]+/gi);

}
/*
let gasto1 = new CrearGasto("Gasto 1");
let gasto2 = new CrearGasto("Gasto 2", 23.55);
let gasto3 = new CrearGasto("Gasto 3", 23.55, "2021-10-06T13:10" );
let gasto4 = new CrearGasto("Gasto 4", 23.55, "2021-10-06T13:10", "casa" );
let gasto5 = new CrearGasto("Gasto 5", 23.55, "2021-10-06T13:10", "casa", "supermercado" );
let gasto6 = new CrearGasto("Gasto 6", 23.55, "2021-10-06T13:10", "casa", "supermercado", "comida" );
*/

let gasto1 = new CrearGasto("Gasto 1", 23.55, "2021-09-06", "casa", "supermercado" );
let gasto2 = new CrearGasto("Gasto 2", 27.55, "2021-11-24", "casa", "supermercado", "comida" );

gasto1.obtenerPeriodoAgrupacion("mes");
// Resultado: "2021-09"
gasto1.obtenerPeriodoAgrupacion("anyo");
// Resultado: "2021"
gasto1.obtenerPeriodoAgrupacion("dia");
// Resultado: "2021-09-06"

gasto2.obtenerPeriodoAgrupacion("mes");
// Resultado: "2021-11"
gasto2.obtenerPeriodoAgrupacion("anyo");
// Resultado: "2021"
gasto2.obtenerPeriodoAgrupacion("dia");
// Resultado: "2021-11-24"


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
    agruparGastos,
    transformarListadoEtiquetas
}
