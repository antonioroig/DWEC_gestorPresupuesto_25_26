function mostrarDatoEnId(idElemento, valor){
    let presupuesto = document.getElementById(idElemento);
    let parrafo = document.createElement('p');
    presupuesto.appendChild(parrafo);
    parrafo.innerHTML = valor;
}

function mostrarGastoWeb(idElemento, gasto){
    let divgasto = document.createElement('div');
    divgasto.className = 'gasto';
    let divgastodescripcion = document.createElement('div');
    divgastodescripcion.className = 'gasto-descripcion';
    divgasto.appendChild(divgastodescripcion);
    divgastodescripcion.innerHTML = gasto.descripcion;
    let divgastofecha = document.createElement('div');
    divgastofecha.className = 'gasto-fecha';
    divgasto.appendChild(divgastofecha);
    divgastofecha.innerHTML = gasto.fecha;
    let divgastovalor = document.createElement('div');
    divgastovalor.className = 'gasto-valor';
    divgasto.appendChild(divgastovalor);
    divgastovalor.innerHTML = gasto.valor;
    let divgastoetiquetas = document.createElement('div');
    divgastoetiquetas.className = 'gasto-etiquetas';
    divgasto.appendChild(divgastoetiquetas);
    for (let i = 0; i < gasto.etiquetas.length; i++){
        let spanetiquetas = document.createElement('span');
        spanetiquetas.className = 'gasto-etiquetas-etiqueta';
        divgastoetiquetas.appendChild(spanetiquetas);
        spanetiquetas.innerHTML = gasto.etiquetas[i];
    }
    document.getElementById(idElemento).appendChild(divgasto);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){

}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}