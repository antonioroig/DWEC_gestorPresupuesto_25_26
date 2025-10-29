function mostrarDatoEnId(idElemento, valor){
    document.getElementById(idElemento).textContent = valor;
}
function mostrarGastoWeb(idElemento, gasto){
    const elem = document.getElementById(idElemento)
    if(elem){
        
    }
    else{
        alert("El elemento seleccionado no existe");
    }
}

export{
    mostrarDatoEnId,
    mostrarGastoWeb
}