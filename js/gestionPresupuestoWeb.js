import * as gP from './gestionPresupuesto.js';

function mostrarDatoEnId(idElemento, valor){
    let presupuesto = document.getElementById(idElemento);
    let parrafo = document.createElement('p');
    parrafo.innerHTML = valor;
    presupuesto.appendChild(parrafo);
}

function mostrarGastoWeb(idElemento, gasto){
    for (let i = 0; i < gasto.length; i++){
        let divgasto = document.createElement('div');
        divgasto.className = 'gasto';
        let divgastodescripcion = document.createElement('div');
        divgastodescripcion.className = 'gasto-descripcion';
        divgastodescripcion.innerHTML = gasto[i].descripcion;
        divgasto.appendChild(divgastodescripcion);
        let divgastofecha = document.createElement('div');
        divgastofecha.className = 'gasto-fecha';
        divgastofecha.innerHTML = gasto[i].fecha;
        divgasto.appendChild(divgastofecha);
        let divgastovalor = document.createElement('div');
        divgastovalor.className = 'gasto-valor';
        divgastovalor.innerHTML = gasto[i].valor;
        divgasto.appendChild(divgastovalor);
        let divgastoetiquetas = document.createElement('div');
        divgastoetiquetas.className = 'gasto-etiquetas';
        for (let j = 0; j < gasto[i].etiquetas.length; j++){
            let spanetiquetas = document.createElement('span');
            spanetiquetas.className = 'gasto-etiquetas-etiqueta';
            spanetiquetas.innerHTML = gasto[i].etiquetas[j];
            divgastoetiquetas.appendChild(spanetiquetas);
        }
        divgasto.appendChild(divgastoetiquetas);
        document.getElementById(idElemento).appendChild(divgasto);
    }
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let divagrupacion = document.createElement("div");
    divagrupacion.className = "agrupacion";
    let h1 = document.createElement("h1");
    h1.innerHTML = ("Gastos agrupados por " + periodo);
    divagrupacion.appendChild(h1);
    for (let i = 0; i < Object.keys(agrup).length; i++){
        let divagrupaciondato = document.createElement("div");
        divagrupaciondato.className = "agrupacion-dato";
        let spanagrupaciondatoclave = document.createElement("span");
        spanagrupaciondatoclave.className = "agrupacion-dato-clave";
        spanagrupaciondatoclave.innerHTML = Object.keys(agrup)[i];
        divagrupaciondato.appendChild(spanagrupaciondatoclave);
        let spanagrupaciondatovalor = document.createElement("span");
        spanagrupaciondatovalor.className = "agrupacion-dato-valor";
        spanagrupaciondatovalor.innerHTML = Object.values(agrup)[i];
        divagrupaciondato.appendChild(spanagrupaciondatovalor);
        divagrupacion.appendChild(divagrupaciondato);
    }
    document.getElementById(idElemento).appendChild(divagrupacion);
}

function repintar (){
    mostrarDatoEnId("presupuesto", gP.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gP.calcularTotalGastos());
    mostrarDatoEnId("balance-total", gP.calcularBalance());
    document.getElementById("listado-gastos-completo").innerHTML = "";
    mostrarGastoWeb("listado-gastos-completo", gP.listarGastos());
}

function actualizarPresupuestoWeb (){
    let presupuesto = prompt("Introduce un presupuesto");
    let nPresupuesto = Number(presupuesto);
    if (nPresupuesto != NaN)
        gP.actualizarPresupuesto(nPresupuesto);
    repintar();
}

let bActualizarPresupuesto = document.getElementById("actualizarpresupuesto");
bActualizarPresupuesto.addEventListener("click", actualizarPresupuestoWeb);

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar
}