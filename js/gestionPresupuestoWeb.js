"use strict";
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
    if (elemento) {
        let divGasto = document.createElement("div");
        divGasto.classList.add("gasto");
    }
    let divDescripcion = document.createElement("div");
    divDescripcion.classList.add("gasto-descripcion");
    divDescripcion.textContent = "DESCRIPCIÓN DEL GASTO";
    divGasto.appendChild(divDescripcion);

    let divFecha = document.createElement("div");
    divFecha.classList.add("gasto-fecha");
    // let fechaLocal = new Date(gasto.fecha).toLocaleString();
    divFecha.textContent = "FECHA DEL GASTO";
    divGasto.appendChild(divFecha);

    let divValor = document.createElement("div");
    divValor.classList.add("gasto-valor");
    divValor.textContent = "VALOR DEL GASTO";
    divGasto.appendChild(divValor);

    let divEtiquetas = document.createElement("div");
    divEtiquetas.classList.add("gasto-etiquetas");
    divGasto.appendChild(divEtiquetas);
    



    
}

function mostrarGastosAgrupadosWeb(){

}
export{
    mostrarDatoEnId
    // mostrarGastoWeb,
    // mostrarGastosAgrupadosWeb
}