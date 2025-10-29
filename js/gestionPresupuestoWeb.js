function mostrarDatoEnId(valor, idElemento) {
    let elem = document.getElementById(idElemento);

    if(elem)
        elem.textContent = valor;
};

function mostrarGastoWeb(idElemento, gasto) {

};

function mostrarGastosAgrupadosWeb(idElemento, gasto, periodo) {

};

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}