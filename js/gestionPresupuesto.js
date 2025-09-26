// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

let presupuesto = 0;
let gastos = [];
let idGasto = 0;
// TODO: Variable global



function CrearGasto(nuevaDescripcion, nuevoValor, nuevaFecha, ...nuevaEtiqueta) {
    //descripcion
    this.descripcion = nuevaDescripcion;
    //valor
    if (nuevoValor < 0 || nuevoValor == undefined || isNaN(nuevoValor)){
        this.valor = 0;
    }
    else {
        this.valor = nuevoValor;
    }

    if (nuevaFecha == undefined || nuevaFecha == null)
    {
        this.fecha = Date.now();
    }
    else {
        this.fecha = Date.parse(nuevaFecha);
    }
    if (nuevaEtiqueta == null || nuevaEtiqueta == undefined){
        this.etiquetas = [];
    }
    else
        this.etiquetas = [...nuevaEtiqueta];
        
    //MÉTODOS

    this.mostrarGasto = function() {
        return (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
    };

    this.actualizarDescripcion = function(newDescription) {
        this.descripcion = newDescription;
    },

    this.actualizarValor = function (newValue){
        if (newValue < 0 || newValue == undefined || isNaN(newValue)){
            return;
            }
            else {
                this.valor = newValue;
            }
    }

    this.anyadirEtiquetas = function (...nuevasEtiquetas){
        if(nuevasEtiquetas.length == 0 || nuevasEtiquetas == null ||nuevasEtiquetas == undefined)
            return;
        for(let i = 0; i < nuevasEtiquetas.length; i++)
            {
                if(this.etiquetas.indexOf(nuevasEtiquetas[i]) == -1)
                    this.etiquetas.push(nuevasEtiquetas[i])
            }   
        }
        
    

    this.actualizarFecha = function(fechaActualizada){
        if(fechaActualizada == null || fechaActualizada == undefined || !isFinite(fechaActualizada))
            return;
        this.fecha = fechaActualizada; 
    }

    return this;
    }



    //FUNCIONES
    function actualizarPresupuesto(nuevoPresupuesto) 
    {
        if (nuevoPresupuesto < 0 || nuevoPresupuesto == undefined || isNaN(nuevoPresupuesto))
        {
            return-1;
        }
        else
        { 
            presupuesto = nuevoPresupuesto;
        }
        return presupuesto;
    }

    function mostrarPresupuesto() 
    {
        return (`Tu presupuesto actual es de ${presupuesto} €`)
    }


    function listarGastos()
    {
        return gastos;
    }

    function anyadirGasto(gasto)
    {
        gasto.id = idGasto;
        idGasto++;
        gastos.push[gasto];
    }

    function borrarGasto(gasto)
    {
        for(let i = 0; i < gastos.length; i++)
        {
            if (gastos[i] == gasto.id)
                gastos.splice(i, 1)
        }
    }
    function calcularTotalGastos()
    {

    }
    function calcularBalance()
    {

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

