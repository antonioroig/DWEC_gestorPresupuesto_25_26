function mostrarDatoEnId(idElemento, valor){

    const elemento = document.getElementById(idElemento);

    if (elemento) {
        elemento.textContent = valor;
    } else {
        console.warn(`No existe un elemento con id: ${idElemento}`);
    }

}

function mostrarGasto(){

}

function mostrarGastosAgrupadosWeb(){

}

export{
    mostrarDatoEnId,
    mostrarGasto,
    mostrarGastosAgrupadosWeb
}