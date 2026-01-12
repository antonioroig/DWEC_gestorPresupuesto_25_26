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

  const btnEditar = document.createElement("button");
  btnEditar.type = "button";
  btnEditar.className = "gasto-editar";
  btnEditar.textContent = "Editar";

  const handleEditar = new EditarHandle();
  handleEditar.gasto = gasto;

  btnEditar.addEventListener("click", handleEditar);
  wrap.appendChild(btnEditar);

  const btnBorrar = document.createElement("button");
  btnBorrar.type = "button";
  btnBorrar.className = "gasto-borrar";
  btnBorrar.textContent = "Borrar";

  const handleBorrar = new BorrarHandle();
  handleBorrar.gasto = gasto;

  btnBorrar.addEventListener("click", handleBorrar);
  wrap.appendChild(btnBorrar);

  const btnEditarFormulario = document.createElement("button");
  btnEditarFormulario.type = "button";
  btnEditarFormulario.className = "gasto-editar-formulario";
  btnEditarFormulario.textContent = "Editar (formulario)";

  const handleEditarForm = new EditarHandleFormulario();
  handleEditarForm.gasto = gasto;
  btnEditarFormulario.addEventListener("click", handleEditarForm);
  wrap.appendChild(btnEditarFormulario);
  cont.appendChild(wrap);
}
export function EditarHandleFormulario() { }

EditarHandleFormulario.prototype.handleEvent = function (event) {
  if (!this.gasto) return;

  const boton = event.currentTarget;

  let plantillaFormulario = document
    .getElementById("formulario-template")
    .content
    .cloneNode(true);

  const formulario = plantillaFormulario.querySelector("form");

  formulario.elements.descripcion.value = this.gasto.descripcion ?? "";

  formulario.elements.valor.value = this.gasto.valor;

  let fechaISO;
  if (typeof this.gasto.fecha === "number") {
    fechaISO = new Date(this.gasto.fecha).toISOString().slice(0, 10);
  } else {
    fechaISO = this.gasto.fecha || "";
  }
  formulario.elements.fecha.value = fechaISO;

  let etiquetasTexto = "";
  if (Array.isArray(this.gasto.etiquetas)) {
    etiquetasTexto = this.gasto.etiquetas.join(",");
  }
  formulario.elements.etiquetas.value = etiquetasTexto;

  function EditarSubmitHandleFormulario() { }

  EditarSubmitHandleFormulario.prototype.handleEvent = function (event) {
    event.preventDefault();
    const form = event.currentTarget;

    const descripcion = form.elements.descripcion.value;
    const valor = form.elements.valor.value;
    const fecha = form.elements.fecha.value;
    const etiquetas = form.elements.etiquetas.value;

    const valorNum = Number(valor);

    let etiquetasArray = [];
    if (etiquetas && etiquetas.trim() !== "") {
      etiquetasArray = etiquetas
        .split(",")
        .map(e => e.trim())
        .filter(e => e !== "");
    }

    this.gasto.actualizarDescripcion(descripcion);
    this.gasto.actualizarValor(valorNum);
    this.gasto.actualizarFecha(fecha);

    this.gasto.borrarEtiquetas(...(this.gasto.etiquetas || []));
    this.gasto.anyadirEtiquetas(...etiquetasArray);

    repintar();
    form.remove();
  }

  const submitHandler = new EditarSubmitHandleFormulario();
  submitHandler.gasto = this.gasto;

  formulario.addEventListener("submit", submitHandler);

  const botonCancelar = formulario.querySelector("button.cancelar");
  const cancelarHandler = new CancelarHandleFormulario();
  cancelarHandler.formulario = formulario;
  cancelarHandler.boton = boton;

  botonCancelar.addEventListener("click", cancelarHandler);


  boton.setAttribute("disabled", "disabled");
const gastoDiv = boton.parentNode;
gastoDiv.appendChild(plantillaFormulario);
}

export function CancelarHandleFormulario() { }

CancelarHandleFormulario.prototype.handleEvent = function (event) {
  if (this.formulario) {
    this.formulario.remove();
  }
  if (this.boton) {
    this.boton.removeAttribute("disabled");
  }
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

const botonAnyadirFormulario = document.getElementById("anyadirgasto-formulario");
if (botonAnyadirFormulario) {
  botonAnyadirFormulario.addEventListener("click", nuevoGastoWebFormulario);
}


export function nuevoGastoWebFormulario(event) {

  const boton = event.currentTarget
  let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
  const formulario = plantillaFormulario.querySelector("form");

  function manejarSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;


    const descripcion = form.elements.descripcion.value;
    const valor = parseFloat(form.elements.valor.value); //mirar
    const fecha = form.elements.fecha.value;
    const etiquetas = form.elements.etiquetas.value;

    const valorNum = Number(valor);

    let etiquetasArray = [];
    if (etiquetas && etiquetas.trim() !== "") {
      etiquetasArray = etiquetas.split(",").map(e => e.trim()).filter(e => e !== "");
    }

    const nuevo = new gp.CrearGasto(
      descripcion,
      valorNum,
      fecha,
      ...etiquetasArray
    );
    gp.anyadirGasto(nuevo);

    repintar();

    const botonAnyadirFormulario = document.getElementById("anyadirgasto-formulario");
    if (botonAnyadirFormulario) {
      botonAnyadirFormulario.removeAttribute("disabled");
    }

    form.remove();
  }
  formulario.addEventListener("submit", manejarSubmit);
  const btnCancelar = formulario.querySelector("button.cancelar");
  const cancelarHandler = new CancelarHandleFormulario();
  cancelarHandler.formulario = formulario;
  cancelarHandler.boton = boton;

  btnCancelar.addEventListener("click", cancelarHandler);

  boton.setAttribute("disabled", "disabled");
  document.getElementById("controlesprincipales").append(plantillaFormulario);
}

export function filtrarGastosWeb(event) {
  event.preventDefault();

  const form = event.currentTarget;

  const descripcion = form.elements["formulario-filtrado-descripcion"].value.trim();
  const valorMinimoStr = form.elements["formulario-filtrado-valor-minimo"].value;
  const valorMaximoStr = form.elements["formulario-filtrado-valor-maximo"].value;
  const fechaDesde = form.elements["formulario-filtrado-fecha-desde"].value;
  const fechaHasta = form.elements["formulario-filtrado-fecha-hasta"].value;
  const etiquetasTexto = form.elements["formulario-filtrado-etiquetas-tiene"].value;

  const filtros = {};

  if (descripcion !== "") filtros.descripcionContiene = descripcion;

  if (valorMinimoStr !== "") filtros.valorMinimo = Number(valorMinimoStr);
  if (valorMaximoStr !== "") filtros.valorMaximo = Number(valorMaximoStr);

  if (fechaDesde !== "") filtros.fechaDesde = fechaDesde;
  if (fechaHasta !== "") filtros.fechaHasta = fechaHasta;

  if (etiquetasTexto.trim() !== "") {
    filtros.etiquetasTiene = gp.transformarListadoEtiquetas(etiquetasTexto);
  }

  const gastosFiltrados = gp.filtrarGastos(filtros);

  const contenedorListado = document.getElementById("listado-gastos-completo");
  if (!contenedorListado) return;

  contenedorListado.innerHTML = "";
  gastosFiltrados.forEach(gasto => {
    mostrarGastoWeb("listado-gastos-completo", gasto);
  })
}

const formFiltrado = document.getElementById("formulario-filtrado");
if (formFiltrado) {
  formFiltrado.addEventListener("submit", filtrarGastosWeb);
}

const CLAVE_LOCALSTORAGE = "GestorGastosDWEC";

function guardarGastosWeb() {
  const gastos = gp.listarGastos();              
  const texto = JSON.stringify(gastos);     
  localStorage.setItem(CLAVE_LOCALSTORAGE, texto);
}
function cargarGastosWeb() {
  const texto = localStorage.getItem(CLAVE_LOCALSTORAGE);

  if (texto === null) {

    gp.cargarGastos([]);
  } else {

    const gastosPlanos = JSON.parse(texto);
    gp.cargarGastos(gastosPlanos);
  }

  repintar();
}




ponerTituloAntesDe("listado-gastos-filtrado-1", "Gastos filtrados 1");
ponerTituloAntesDe("listado-gastos-filtrado-2", "Gastos filtrados 2");
ponerTituloAntesDe("listado-gastos-filtrado-3", "Gastos filtrados 3");
ponerTituloAntesDe("listado-gastos-filtrado-4", "Gastos filtrados 4");


