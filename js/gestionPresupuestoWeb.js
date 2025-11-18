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
  let presupuesto = gp.mostrarPresupuesto();
  mostrarDatoEnId("presupuesto", presupuesto);

  let gastoTotal = gp.calcularTotalGastos();
  mostrarDatoEnId("gastos-totales", gastoTotal);

  let balanceTotal = gp.calcularBalance();
  mostrarDatoEnId("balance-total", balanceTotal);

  document.getElementById("listado-gastos-completo").innerHtml = "";

  let gastosCompletos = gp.listarGastos();
  for (let gasto of gastosCompletos)
  {
    mostrarDatoEnId("listado-gastos-completo", gasto);
  }
}

let btnAcualizar = document.getElementById("actualizarpresupuesto");
btnAcualizar.addEventListener("click", actualizarPresupuestoWeb);

function actualizarPresupuestoWeb(){
  let valor = +prompt("Introduce un nuevo presupuesto");
  gp.actualizarPresupuesto(valor);
  repintar();
}

let btnAnyadir = document.getElementById("anyadirgasto");
btnAnyadir.addEventListener("click", nuevoGastoWeb);

function nuevoGastoWeb ()
{
     let descripcion = prompt("Introduce la descripcion al gasto");
      let valor = +prompt("Introduce un valor al gasto");
      let fecha = prompt("Introduce la fecha del gasto");
      let etiquetas = prompt("Introduce las etiquetas");

  etiquetas = etiquetas.split(",")

  let gasto = new gp.CrearGasto(descripcion, valor, fecha, etiquetas)

  gp.anyadirGasto(gasto);

  repintar();
}

function EditarHandle(){
  this.gasto = gasto;

  EditarHandle.prototype.handleEvent = function(evento){
      let descripcion = prompt("Introduce la descripcion al gasto", this.gasto.descripcion);
      let valor = +prompt("Introduce un valor al gasto", this.gasto.valor);
      let fecha = prompt("Introduce la fecha del gasto", this.gasto.fecha);
      let etiquetas = prompt("Introduce las etiquetas", this.gasto.etiquetas);
     
  }
  etiquetas = etiquetas.split(",");

  this.gasto.actualizarDescripcion(descripcion);
  this.gasto.actualizarValor(valor);
  this.gasto.actualizarFecha(fecha);
  this.gasto.actualizarValor(etiquetas);

  repintar();
}
export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar, 
    actualizarPresupuestoWeb,
    nuevoGastoWeb
}