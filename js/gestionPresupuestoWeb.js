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





function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    const contenedor = document.getElementById(idElemento);
    if (!contenedor || !agrup) return;

    const divAgrupacion = document.createElement("div");
    divAgrupacion.className = "agrupacion";
  
    const h1Periodo = document.createElement("h1");
    h1Periodo.textContent = `Gastos agrupados por ${periodo}`;
    divAgrupacion.appendChild(h1Periodo);

    for (const clave of Object.keys(agrup)) {
      const valor = agrup[clave];

      const divAgrupacionDato = document.createElement("div");
      divAgrupacionDato.className = "agrupacion-dato";

      const spanClave = document.createElement("span");
      spanClave.className = "agrupacion-dato-clave";
      spanClave.textContent = clave;

      const spanValor = document.createElement("span");
      spanValor.className = "agrupacion-dato-valor";
      spanValor.textContent = valor;

      divAgrupacionDato.append(spanClave, spanValor);
      divAgrupacion.appendChild(divAgrupacionDato);
    }

    contenedor.appendChild(divAgrupacion);
  }


 function repintar (){

 } 

 function actualizarPresupuestoWeb(){

 }

 function nuevoGastoWeb(){

 }

 function EditarHandle(){

 }

 function BorrarHandle(){

 }

function borrarEtiquetasHandle(){

}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle,
    BorrarHandle,
    borrarEtiquetasHandle
}

import * as gP from './gestionPresupuesto.js';
