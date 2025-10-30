function mostrarDatoEnId(valor,idElemento){
    document.getElementById(idElemento).textContent = valor;
}

function mostrarGastoWeb(idElemento,gasto){
const cont  = document.getElementById(idElemento);
if (!contenedor) {
    console.error(`No se encontró el elemento con id "${idElemento}"`);
    return;
  }

  const divGasto = document.createElement("div");
  divGasto.classList.add("gasto");

  const divDescripcion = document.createElement("div");
  divDescripcion.classList.add("gasto-descripcion");
  divDescripcion.textContent = gasto.descripcion;
  divGasto.appendChild(divDescripcion);

  const divFecha = document.createElement("div");
  divFecha.classList.add("gasto-fecha");
  divFecha.textContent = gasto.fecha;
  divGasto.appendChild(divFecha);

  const divValor = document.createElement("div");
  divValor.classList.add("gasto-valor");
  divValor.textContent = gasto.valor.toFixed(2) + " €";
  divGasto.appendChild(divValor);

  
  const divEtiquetas = document.createElement("div");
  divEtiquetas.classList.add("gasto-etiquetas");

  if (Array.isArray(gasto.etiquetas)) {
    gasto.etiquetas.forEach(etiqueta => {
      const spanEtiqueta = document.createElement("span");
      spanEtiqueta.classList.add("gasto-etiquetas-etiqueta");
      spanEtiqueta.textContent = etiqueta;
      divEtiquetas.appendChild(spanEtiqueta);
    });
  }

  divGasto.appendChild(divEtiquetas);

  contenedor.appendChild(divGasto);
}


function mostrarGastosAgrupadosWeb(){

}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}