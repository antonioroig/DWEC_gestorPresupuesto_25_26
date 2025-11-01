function mostrarDatoEnId(idElemento, valor) {
  const elemento = document.getElementById(idElemento);
  if (elemento) {
    elemento.textContent = valor;
  }
}

function mostrarGastoWeb(idContenedor, datosGasto) {
    let contenedor = document.getElementById(idContenedor);

    let bloqueGasto = document.createElement('div');
    bloqueGasto.classList.add('gasto');
    contenedor.appendChild(bloqueGasto);

    let descripcion = document.createElement('div');
    descripcion.classList.add('gasto-descripcion');
    descripcion.textContent = datosGasto.descripcion;
    bloqueGasto.appendChild(descripcion);

    let fecha = document.createElement('div');
    fecha.classList.add('gasto-fecha');
    fecha.textContent = datosGasto.fecha;
    bloqueGasto.appendChild(fecha);

    let valor = document.createElement('div');
    valor.classList.add('gasto-valor');
    valor.textContent = datosGasto.valor + ' €';
    bloqueGasto.appendChild(valor);

    let etiquetas = document.createElement('div');
    etiquetas.classList.add('gasto-etiquetas');
    bloqueGasto.appendChild(etiquetas);

    if (datosGasto.etiquetas && datosGasto.etiquetas.length > 0) {
        for (let etiqueta of datosGasto.etiquetas) {
            let etiquetaSpan = document.createElement('span');
            etiquetaSpan.classList.add('gasto-etiquetas-etiqueta');
            etiquetaSpan.textContent = etiqueta;
            etiquetas.appendChild(etiquetaSpan);
        }
    }
}





function mostrarGastosAgrupadosWeb(id, periodo, agrupacion) {
 let id = document.getElementById(idElemento);
    let titulo = document.createElement("h1");
    titulo.textContent = 'Gastos agrupados por ' + periodo;
    let agrupacion = document.createElement("div");
    agrupacion.classList.add("agrupacion");
    agrupacion.append(titulo);

    for(let dato in agrupacion){
        let agrupacion_dato = document.createElement("div");
        agrupacion_dato.classList.add("agrupacion-dato");

        let agrupacion_clave = document.createElement("span");
        agrupacion_clave.classList.add("agrupacion-dato-clave");
        agrupacion_clave.textContent = dato;

        let agrupacion_valor = document.createElement("span");
        agrupacion_valor.classList.add("agrupacion-dato-valor");
        agrupacion_valor.textContent = agrupacion[dato];

        
        agrupacion_dato.append(agrupacion_clave);
        agrupacion_dato.append(agrupacion_valor);
        agrupacion.append(agrupacion_dato);
    }
    
    id.append(agrupacion);
}


export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}