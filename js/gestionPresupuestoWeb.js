"use strict";

//función para mostrar dato en id
function mostrarDatoEnId(idElemento, valor){
    let elemento = document.getElementById(idElemento);
    if(elemento){
        elemento.textContent = valor;
    }
}


//función para mostrar gastos agrupados en web
export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
};