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

function mostrarGastoWeb(){

}

function mostrarGastosAgrupadosWeb(){

}
export{
    mostrarDatoEnId
    // mostrarGastoWeb,
    // mostrarGastosAgrupadosWeb
}