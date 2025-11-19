import * as gp from './gestionPresupuesto.js';


export function mostrarDatoEnId(idElemento, valor) {
  const el = document.getElementById(idElemento);
  if (!el) return;
  el.textContent = String(valor ?? "");
}

export function mostrarGastoWeb(idElemento, gasto) {
  const cont = document.getElementById(idElemento);
  if (!cont || !gasto) return;

  const wrap = document.createElement("div");
  wrap.className = "gasto";

  const dsc = document.createElement("div");
  dsc.className = "gasto-descripcion";
  dsc.textContent = gasto.descripcion ?? "";
  wrap.appendChild(dsc);

  const fechaDiv = document.createElement("div");
  fechaDiv.className = "gasto-fecha";
  const ts = typeof gasto.fecha === "number"
    ? gasto.fecha
    : Date.parse(gasto.fecha);
  fechaDiv.textContent = isNaN(ts)
    ? ""
    : new Date(ts).toLocaleDateString();
  wrap.appendChild(fechaDiv);

  const valorDiv = document.createElement("div");
  valorDiv.className = "gasto-valor";
  const num = typeof gasto.valor === "number"
    ? gasto.valor
    : Number(gasto.valor) || 0;
  valorDiv.textContent = num.toFixed(2);
  wrap.appendChild(valorDiv);

  const etq = document.createElement("div");
  etq.className = "gasto-etiquetas";

  (Array.isArray(gasto.etiquetas) ? gasto.etiquetas : []).forEach((tag, i) => {
    if (i > 0) etq.appendChild(document.createTextNode(" "));
    const span = document.createElement("span");
    span.className = "gasto-etiquetas-etiqueta";
    span.textContent = String(tag);
    const handleEtiqueta = new BorrarEtiquetasHandle();
    handleEtiqueta.gasto = gasto;
    handleEtiqueta.etiqueta = tag;

    span.addEventListener("click", handleEtiqueta);

    etq.appendChild(span);
  });
  wrap.appendChild(etq);

  const btnBorrar = document.createElement("button");
  btnBorrar.type = "button";
  btnBorrar.className = "gasto-borrar";
  btnBorrar.textContent = "Borrar";

  const handleBorrar = new BorrarHandle();
  handleBorrar.gasto = gasto;

  btnBorrar.addEventListener("click", handleBorrar);
  wrap.appendChild(btnBorrar);

  const btnEditar = document.createElement("button");
  btnEditar.type = "button";
  btnEditar.className = "gasto-editar";
  btnEditar.textContent = "Editar";

  const handleEditar = new EditarHandle();
  handleEditar.gasto = gasto;

  btnEditar.addEventListener("click", handleEditar);
  wrap.appendChild(btnEditar);
  cont.appendChild(wrap);
}


export function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo = "mes") {
  const cont = document.getElementById(idElemento);
  if (!cont || !agrup || typeof agrup !== "object") return;

  cont.innerHTML = "";

  const wrap = document.createElement("div");
  wrap.className = "agrupacion";

  const titulo = document.createElement("h1");
  const literal = periodo === "dia" ? "día" : (periodo === "anyo" ? "año" : "mes");
  titulo.textContent = `Gastos agrupados por ${literal}`;
  wrap.appendChild(titulo);

  Object.entries(agrup).forEach(([clave, valor]) => {
    const fila = document.createElement("div");
    fila.className = "agrupacion-dato";

    const sClave = document.createElement("span");
    sClave.className = "agrupacion-dato-clave";
    sClave.textContent = String(clave);
    fila.appendChild(sClave);
    fila.appendChild(document.createTextNode(" "));

    const sValor = document.createElement("span");
    sValor.className = "agrupacion-dato-valor";
    const num = typeof valor === "number" ? valor : Number(valor) || 0;
    sValor.textContent = num.toFixed(2);

    fila.appendChild(sValor);
    wrap.appendChild(fila);
  });

  cont.appendChild(wrap);
}

function ponerTituloAntesDe(idElemento, texto) {
  const div = document.getElementById(idElemento);
  if (!div) return;

  const titulo = document.createElement("h2");
  titulo.textContent = texto;

  div.parentNode.insertBefore(titulo, div);
}

export function repintar() {
  const presupuestoActual = gp.mostrarPresupuesto();
  mostrarDatoEnId("presupuesto", presupuestoActual);

  const totalGastos = gp.calcularTotalGastos();
  mostrarDatoEnId("gastos-totales", totalGastos);

  const balanceActual = gp.calcularBalance();
  mostrarDatoEnId("balance-total", balanceActual);

  const contenedorListado = document.getElementById("listado-gastos-completo");
  if (!contenedorListado) return;
  contenedorListado.innerHTML = "";

  gp.listarGastos().forEach(gasto => {
    mostrarGastoWeb("listado-gastos-completo", gasto);
  });

}


export function actualizarPresupuestoWeb() {

  const nuevoPresupuesto = prompt('Introduce el nuevo presupuesto');
  const presupuesto = Number(nuevoPresupuesto)
  gp.actualizarPresupuesto(presupuesto);
  repintar();
}

export function nuevoGastoWeb() {
  const desc = prompt("Descripción del gasto:");
  const valorStr = prompt("Valor del gasto:");
  const fechaStr = prompt("Fecha (yyyy-mm-dd):");
  const etiquetasStr = prompt("Etiquetas separadas por comas (eti1,eti2,eti3):");

  const valorNum = Number(valorStr);

  let etiquetas = [];
  if (etiquetasStr && etiquetasStr.trim() !== "") {
    etiquetas = etiquetasStr.split(",")
      .map(e => e.trim());
  }

  const nuevo = new gp.CrearGasto(desc, valorNum, fechaStr, ...etiquetas);
  gp.anyadirGasto(nuevo);
  repintar();
}

export function EditarHandle() { }

EditarHandle.prototype.handleEvent = function () {
  if (!this.gasto) return;

  const nuevaDescripcion = prompt(
    "Nueva descripción:",
    this.gasto.descripcion
  );


  const nuevoValorStr = prompt(
    "Nuevo valor:",
    String(this.gasto.valor)
  );

  let fechaActualISO;
  if (typeof this.gasto.fecha === "number") {
    fechaActualISO = new Date(this.gasto.fecha).toISOString().slice(0, 10);
  } else {
    fechaActualISO = this.gasto.fecha;
  }
  const nuevaFechaStr = prompt(
    "Nueva fecha (yyyy-mm-dd):",
    fechaActualISO
  );

  const etiquetasActuales = Array.isArray(this.gasto.etiquetas)
    ? this.gasto.etiquetas.join(",")
    : "";
  const nuevasEtiquetasStr = prompt(
    "Nuevas etiquetas separadas por comas (eti1,eti2,eti3):",
    etiquetasActuales
  );


  const nuevoValor = Number(nuevoValorStr);

  let nuevasEtiquetas = [];
  if (nuevasEtiquetasStr && nuevasEtiquetasStr.trim() !== "") {
    nuevasEtiquetas = nuevasEtiquetasStr
      .split(",")
      .map(e => e.trim())
      .filter(e => e !== "");
  }

  this.gasto.actualizarDescripcion(nuevaDescripcion);
  this.gasto.actualizarValor(nuevoValor);
  this.gasto.actualizarFecha(nuevaFechaStr);

  this.gasto.borrarEtiquetas(...(this.gasto.etiquetas || []));
  this.gasto.anyadirEtiquetas(...nuevasEtiquetas);

  repintar();
};

export function BorrarHandle() { }

BorrarHandle.prototype.handleEvent = function () {
  if (!this.gasto) return;

  gp.borrarGasto(this.gasto.id);
  repintar();
};

export function BorrarEtiquetasHandle() { }

BorrarEtiquetasHandle.prototype.handleEvent = function () {
  if (!this.gasto || !this.etiqueta) return;

  this.gasto.borrarEtiquetas(this.etiqueta);
  repintar();
};


const botonPresupuesto = document.getElementById("actualizarpresupuesto");
if (botonPresupuesto) {
  botonPresupuesto.addEventListener("click", actualizarPresupuestoWeb);
}

const botonAnyadir = document.getElementById("anyadirgasto");
if (botonAnyadir) {

  botonAnyadir.addEventListener("click", nuevoGastoWeb);
}


ponerTituloAntesDe("listado-gastos-filtrado-1", "Gastos filtrados 1");
ponerTituloAntesDe("listado-gastos-filtrado-2", "Gastos filtrados 2");
ponerTituloAntesDe("listado-gastos-filtrado-3", "Gastos filtrados 3");
ponerTituloAntesDe("listado-gastos-filtrado-4", "Gastos filtrados 4");


