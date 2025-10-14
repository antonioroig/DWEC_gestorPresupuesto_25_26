"use strict"
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(nuevoPresupuesto) {
    if(!isNaN(nuevoPresupuesto) && nuevoPresupuesto >= 0)
    {
        presupuesto = nuevoPresupuesto  
        return presupuesto;
    }
    else
    {
        console.log("Error: Numero negativo")
        return -1;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor, fecha, ...listaEtiquetas) {
    if (!isNaN(valor) && valor >= 0)
    {
        this.valor = valor;
    }
    else
    {
        this.valor = 0;
    }

    this.descripcion = descripcion;

    let fechaNueva = Date.parse(fecha);
    if (isNaN(fechaNueva))
    {
        this.fecha = Date.now();
    }
    else
    {
        this.fecha = fechaNueva;
    }

    this.etiquetas = [];

    this.anyadirEtiquetas = function(...nuevasEtiquetas)
    {
        for (let i=0; i < nuevasEtiquetas.length; i++)
        {
            let etiquetaExiste = false;
            for (let j=0; j < this.etiquetas.length && !etiquetaExiste; j++)
            {
                if (this.etiquetas[j] == nuevasEtiquetas[i])
                {
                    etiquetaExiste = true;
                }
            }
            if(!etiquetaExiste)
            {
                this.etiquetas.push(nuevasEtiquetas[i]);
            }
        }
    }

    if(listaEtiquetas.length > 0)
    {
        this.anyadirEtiquetas(...listaEtiquetas)
    }

    this.mostrarGasto = function()
    {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }
    this.actualizarDescripcion = function(nuevoDescripcion)
    {
        this.descripcion = nuevoDescripcion;
    }
    this.actualizarValor = function(nuevoValor)
    {
        if(!isNaN(nuevoValor) && nuevoValor >= 0)
        {
            this.valor = nuevoValor;
        }
    }
    this.mostrarGastoCompleto = function()
    {
        let fechaGasto = new Date(this.fecha).toLocaleString();
        let textoEtiquetas = ``;
        for (let i = 0; i < this.etiquetas.length; i++)
        {
            textoEtiquetas += `- ${this.etiquetas[i]}\n`
        }
        return `${this.mostrarGasto()}.\nFecha: ${fechaGasto}\nEtiquetas:\n${textoEtiquetas}`
    }
    this.actualizarFecha = function(nuevaFecha)
    {
        let fechaAct = Date.parse(nuevaFecha);
        if(!isNaN(fechaAct))
        {
            this.fecha = fechaAct;
        }
    }
    this.borrarEtiquetas = function(...etiquetasBorrar)
    {
        for (let i = 0; i < etiquetasBorrar.length; i++)
        {
            let etiquetaExiste = false;
            for (let j = 0; j < this.etiquetas.length && !etiquetaExiste; j++)
            {
                if (this.etiquetas[j] == etiquetasBorrar[i])
                {
                    etiquetaExiste = true;
                    this.etiquetas.splice(j, 1)
                }
            }
        }
    }
    this.obtenerPeriodoAgrupacion = function(periodo)
    {
        fecha = new Date(this.fecha)
        let resultado = "";
        if (periodo == "dia")
        {
            resultado = fecha.toISOString().slice(0, 10);
        }
        else if (periodo == "mes")
        {
            resultado = fecha.toISOString().slice(0, 7);
        }
        else if (periodo == "anyo")
        {
            resultado = fecha.toISOString().slice(0, 4);
        }
        return resultado;
    }
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

function borrarGasto(idGastoBorrar)
{   
    let idInList = false;
    for(let i = 0; i < gastos.length && !idInList; i++)
    {
        if(gastos[i].id == idGastoBorrar)
        {
            idInList = true;
            gastos.splice(i, 1);
        }
    }
}

function calcularTotalGastos()
{
    let suma = 0;
    for (let i = 0; i < gastos.length; i++)
    {
        suma += gastos[i].valor
    }
    return suma;
}

function calcularBalance()
{
    return presupuesto - calcularTotalGastos();
}

function filtrarGastos(filtro)
{
    if (!filtro)
    {
        return gastos;
    }

    let gastosFiltrados = gastos.filter(function(gasto){
        let cumpleCond = true;
        if (filtro.fechaDesde)
        {
            let fechaDesde = Date.parse(filtro.fechaDesde)
            if(isNaN(fechaDesde) || gasto.fecha < fechaDesde)
            {
                cumpleCond = false;
            }
        }
        if (filtro.fechaHasta)
        {
            let fechaHasta = Date.parse(filtro.fechaHasta)
            if(isNaN(fechaHasta) || gasto.fecha > fechaHasta)
            {
                cumpleCond = false;
             
            }
        }
        if (!isNaN(filtro.valorMinimo))
        {
            if(gasto.valor < filtro.valorMinimo)
            {
                cumpleCond = false;
            }
        }
        if (!isNaN(filtro.valorMaximo))
        {
            if(gasto.valor > filtro.valorMaximo)
            {
                cumpleCond = false;
            }
        }
        if (filtro.descripcionContiene)
        {
            let textoFiltro = filtro.descripcionContiene.toLowerCase();
            let textoGasto = gasto.descripcion.toLowerCase();
            if(!textoGasto.includes(textoFiltro))
            {
                cumpleCond = false;
            }
        }
        if(filtro.etiquetasTiene && filtro.etiquetasTiene.length > 0)
        {
            let etiquetasFiltro = [];
            for(let i = 0; i < filtro.etiquetasTiene.length; i++)
            {
                etiquetasFiltro.push(filtro.etiquetasTiene[i].toLowerCase())
            }   
            let etiquetasGasto = [];
            for(let j = 0; j < gasto.etiquetas.length; j++)
            {
                etiquetasGasto.push(gasto.etiquetas[j].toLowerCase())
            } 
            let estaEnLista = false;
            for(let k = 0; k < etiquetasFiltro.length; k++)
            {
                if(etiquetasGasto.includes(etiquetasFiltro[k]))
                {
                    estaEnLista = true;
                }
            }
            if(!estaEnLista)
            {
                cumpleCond = false;
            }
        }
        return cumpleCond;
    })
    return gastosFiltrados;
}

function agruparGastos(periodo, etiquetas, fechaDesde, fechaHasta)
{
    let filtro = {};
    if (fechaDesde)
    {
        filtro.fechaDesde = fechaDesde;
    }
    if (fechaHasta)
    {
        filtro.fechaHasta = fechaHasta;
    }
    if (etiquetas && etiquetas.length > 0)
    {
        filtro.etiquetasTiene = etiquetas;
    }
    let gastosFiltrados = filtrarGastos(filtro)

    let resultado = gastosFiltrados.reduce(function(acumulador, gasto)
    {
        let periodoGasto = gasto.obtenerPeriodoAgrupacion(periodo)

        if(!acumulador[periodoGasto])
        {
            acumulador[periodoGasto] = 0;
        }

        acumulador[periodoGasto] += gasto.valor;
        return acumulador;
    }, {})
    return resultado;
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
