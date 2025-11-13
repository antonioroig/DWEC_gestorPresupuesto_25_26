import * as gp from './gestionPresupuesto.js';

function mostrarDatoEnId(idElemento, valor) {
  const elemento = document.getElementById(idElemento);
  if (elemento) {
    elemento.textContent = valor;
  }
}

function mostrarGastoWeb(idElemento, gasto) {
  const elemento = document.getElementById(idElemento);
  if (!elemento) return;

  const divGasto = document.createElement("div");
  divGasto.classList.add("gasto");

  const divDescripcion = document.createElement("div");
  divDescripcion.classList.add("gasto-descripcion");
  divDescripcion.textContent = gasto.descripcion;
  divGasto.appendChild(divDescripcion);

  const divFecha = document.createElement("div");
  divFecha.classList.add("gasto-fecha");
  divFecha.textContent = new Date(gasto.fecha).toISOString().split("T")[0];
  divGasto.appendChild(divFecha);

  const divValor = document.createElement("div");
  divValor.classList.add("gasto-valor");
  divValor.textContent = gasto.valor;
  divGasto.appendChild(divValor);

  const divEtiquetas = document.createElement("div");
  divEtiquetas.classList.add("gasto-etiquetas");

  if (Array.isArray(gasto.etiquetas)) {
    gasto.etiquetas.forEach(et => {
      const spanEtiqueta = document.createElement("span");
      spanEtiqueta.classList.add("gasto-etiquetas-etiqueta");
      spanEtiqueta.textContent = et;
      divEtiquetas.appendChild(spanEtiqueta);
    });
  }

  divGasto.appendChild(divEtiquetas);
  elemento.appendChild(divGasto);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
  const elemento = document.getElementById(idElemento);
  if (!elemento) return;

  const divAgrupacion = document.createElement("div");
  divAgrupacion.classList.add("agrupacion");

  const titulo = document.createElement("h1");
  titulo.textContent = `Gastos agrupados por ${periodo}`;
  divAgrupacion.appendChild(titulo);

  Object.entries(agrup).forEach(([clave, valor]) => {
    const divDato = document.createElement("div");
    divDato.classList.add("agrupacion-dato");

    const spanClave = document.createElement("span");
    spanClave.classList.add("agrupacion-dato-clave");
    spanClave.textContent = clave;

    const spanValor = document.createElement("span");
    spanValor.classList.add("agrupacion-dato-valor");
    spanValor.textContent = valor;

    divDato.appendChild(spanClave);
    divDato.appendChild(spanValor);
    divAgrupacion.appendChild(divDato);
  });

  elemento.appendChild(divAgrupacion);

}
function repintar(){

}
let btnAcualizar = document.getElementById("actualizarpresupuesto");
btnAcualizar.addEventListener("click", actualizarPresupuestoWeb);
function actualizarPresupuestoWeb(){

}
export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar, 
    actualizarPresupuestoWeb
}