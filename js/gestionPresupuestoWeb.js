function mostrarDatoEnId(idElemento, valor){
    let presupuesto = document.getElementById(idElemento);
    let parrafo = document.createElement('p');
    presupuesto.appendChild(parrafo);
    parrafo.innerHTML = valor;
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
    
}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}