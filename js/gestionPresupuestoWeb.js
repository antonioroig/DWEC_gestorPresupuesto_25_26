"use strict";

import * as gp from "./gestionPresupuesto.js";

function mostrarDatoEnId(idElemento, valor){
    let elemento = document.getElementById(idElemento);
    if (elemento) {
        elemento.textContent = valor;
    }
    else {
        console.log("Elemento con ID " + idElemento + " no encontrado.");
    }
}

function mostrarGastoWeb(idElemento , gasto){
    let elemento = document.getElementById(idElemento);
    
    if (!elemento) {
        return;
    }

    let divGasto = document.createElement("div");
    divGasto.classList.add("gasto");

    let divDescripcion = document.createElement("div");
    divDescripcion.classList.add("gasto-descripcion");
    divDescripcion.textContent = gasto.descripcion;
    divGasto.appendChild(divDescripcion);

    let divFecha = document.createElement("div");
    divFecha.classList.add("gasto-fecha");
    divFecha.textContent = gasto.fecha;
    divGasto.appendChild(divFecha);

    let divValor = document.createElement("div");
    divValor.classList.add("gasto-valor");
    divValor.textContent = gasto.valor;
    divGasto.appendChild(divValor);

    let divEtiquetas = document.createElement("div");
    divEtiquetas.classList.add("gasto-etiquetas");
    if (Array.isArray(gasto.etiquetas)) {
    for (let i = 0; i < gasto.etiquetas.length; i++) {
        let spanEtiqueta = document.createElement("span");
        spanEtiqueta.classList.add("gasto-etiquetas-etiqueta");
        spanEtiqueta.textContent = gasto.etiquetas[i];
        divEtiquetas.appendChild(spanEtiqueta);
        }
    }
    divGasto.appendChild(divEtiquetas);
    elemento.appendChild(divGasto);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){

    const elemento = document.getElementById(idElemento);
    if (!elemento) {
        console.log("Elemento con ID " + idElemento + " no encontrado.");
        return;
    }

    const divAgrupacion = document.createElement("div");
    divAgrupacion.classList.add("agrupacion");

    const titulo = document.createElement("h1");
    titulo.textContent = "Gastos agrupados por " + periodo;
    divAgrupacion.appendChild(titulo);

    const claves = Object.keys(agrup);
    for (let i = 0; i < claves.length; i++) {
        const clave = claves[i];
        const valor = agrup[clave];

        const divDato = document.createElement("div");
        divDato.classList.add("agrupacion-dato");

        const spanClave = document.createElement("span");
        spanClave.classList.add("agrupacion-dato-clave");
        spanClave.textContent = clave;

        const spanValor = document.createElement("span");
        spanValor.classList.add("agrupacion-dato-valor");
        spanValor.textContent = valor;

        divDato.appendChild(spanClave);
        divDato.appendChild(spanValor);
        divAgrupacion.appendChild(divDato);
    }

    elemento.appendChild(divAgrupacion);
}

function repintar(){
    mostrarDatoEnId("presupuesto", gp.mostrarPresupuesto());

    mostrarDatoEnId("gastos-totales", gp.calcularTotalGastos());

    mostrarDatoEnId("balance-total", gp.calcularBalance());

    let listaGastos = document.getElementById("listado-gastos-completo");
    if(listaGastos){
        listaGastos.textContent = "";
    }
    
    let lista = gp.listarGastos();
    for(let i = 0; i < lista.length; i++){
        mostrarGastoWeb("listado-gastos-completo", lista[i]);
    }
}

function actualizarPresupuestoWeb(){
    let nuevoPresupuesto = prompt("Introduce el nuevo presupuesto:");

    if (nuevoPresupuesto === null) {
        return;
    }

    let presupuestoNumerico = Number(nuevoPresupuesto);

    if (isNaN(presupuestoNumerico) || presupuestoNumerico < 0) {
        alert("Por favor, introduce un número válido para el presupuesto.");
        return;
    }

    gp.actualizarPresupuesto(presupuestoNumerico);

    repintar();
}

    let botonActualizar = document.getElementById("actualizarpresupuesto");
    botonActualizar.addEventListener("click", actualizarPresupuestoWeb);


function nuevoGastoWeb() {

    let descripcion = prompt("Introduce la descripción del gasto: ");
    let valorString = prompt("Introduce el valor del gasto: ");
    let fecha = prompt("Introduce la fecha del gasto (Formato yyyy-mm-dd): ");
    let etiquetasString = prompt("Introduce las etiquetas separadas por comas (Ejemplo: comida,ocio,transporte): ");

    let valor = Number(valorString);

    let etiquetas = [];
    etiquetas = etiquetasString.split(",");

    let nuevoGasto = new gp.CrearGasto(descripcion, valor, fecha, ...etiquetas);

    gp.anyadirGasto(nuevoGasto);

    repintar();
}

let botonAnyadir = document.getElementById("anyadirgasto");
botonAnyadir.addEventListener("click", nuevoGastoWeb);


export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    actualizarPresupuestoWeb
}