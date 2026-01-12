import * as gp from './gestionPresupuesto.js';

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
    fecha.textContent = new Date(datosGasto.fecha).toLocaleDateString();
    bloqueGasto.appendChild(fecha);

    let valor = document.createElement('div');
    valor.classList.add('gasto-valor');
    valor.textContent = datosGasto.valor;
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

            let manejadorBorrarEtiquetas = new BorrarEtiquetasHandle();
            manejadorBorrarEtiquetas.gasto = datosGasto;
            manejadorBorrarEtiquetas.etiqueta = etiqueta;

            etiquetaSpan.addEventListener("click", manejadorBorrarEtiquetas);
        }
    }

    // Botón Editar (original con prompt)
    let botonEditar = document.createElement("button");
    botonEditar.textContent = "Editar";
    botonEditar.classList.add("gasto-editar");
    botonEditar.type = "button";

    let manejadorEditar = new EditarHandle();
    manejadorEditar.gasto = datosGasto;

    botonEditar.addEventListener("click", manejadorEditar);
    bloqueGasto.appendChild(botonEditar);

    // Botón Borrar
    let botonBorrar = document.createElement("button");
    botonBorrar.textContent = "Borrar";
    botonBorrar.classList.add("gasto-borrar");
    botonBorrar.type = "button";

    let manejadorBorrar = new BorrarHandle();
    manejadorBorrar.gasto = datosGasto;

    botonBorrar.addEventListener("click", manejadorBorrar);
    bloqueGasto.appendChild(botonBorrar);

    // Botón Editar (formulario)
    let botonEditarFormulario = document.createElement("button");
    botonEditarFormulario.textContent = "Editar (formulario)";
    botonEditarFormulario.classList.add("gasto-editar-formulario");
    botonEditarFormulario.type = "button";

    let manejadorEditarFormulario = new EditarHandleFormulario();
    manejadorEditarFormulario.gasto = datosGasto;

    botonEditarFormulario.addEventListener("click", manejadorEditarFormulario);
    bloqueGasto.appendChild(botonEditarFormulario);
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

function repintar() {
    let presupuesto = gp.mostrarPresupuesto();
    mostrarDatoEnId("presupuesto", presupuesto);

    let gastoTotal = gp.calcularTotalGastos();
    mostrarDatoEnId("gastos-totales", gastoTotal);

    let balanceTotal = gp.calcularBalance();
    mostrarDatoEnId("balance-total", balanceTotal);

    const contenedor = document.getElementById("listado-gastos-completo");
    contenedor.innerHTML = "";

    let gastosCompletos = gp.listarGastos();
    for (let gasto of gastosCompletos) {
        mostrarGastoWeb("listado-gastos-completo", gasto);
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

function nuevoGastoWeb() {
  let descripcion = prompt("Introduce la descripcion al gasto");
  let valor = +prompt("Introduce un valor al gasto");
  let fecha = prompt("Introduce la fecha del gasto");
  let etiquetas = prompt("Introduce las etiquetas");

  etiquetas = etiquetas.split(",");

  let gasto = new gp.CrearGasto(descripcion, valor, fecha, etiquetas);

  gp.anyadirGasto(gasto);

  repintar();
}

function EditarHandle(){}

EditarHandle.prototype.handleEvent = function(evento){
  let descripcion = prompt("Introduce la descripcion al gasto", this.gasto.descripcion);
  let valor = +prompt("Introduce un valor al gasto", this.gasto.valor);
  let fecha = prompt("Introduce la fecha del gasto", this.gasto.fecha);
  let etiquetas = prompt("Introduce las etiquetas", this.gasto.etiquetas);

  etiquetas = etiquetas.split(",");

  this.gasto.actualizarDescripcion(descripcion);
  this.gasto.actualizarValor(valor);
  this.gasto.actualizarFecha(fecha);
  this.gasto.anyadirEtiquetas(etiquetas);

  repintar();
}

function BorrarHandle(){}
BorrarHandle.prototype.handleEvent = function(){
  gp.borrarGasto(this.gasto.id);
  repintar();
}

function BorrarEtiquetasHandle(){}
BorrarEtiquetasHandle.prototype.handleEvent = function(){
  this.gasto.borrarEtiquetas(this.etiqueta);
  repintar();
}

function CancelarHandle(){}
CancelarHandle.prototype.handleEvent = function(){
  this.formulario.remove();
  this.boton.disabled = false;
}

function EnviarNuevoGastoHandle(){}
EnviarNuevoGastoHandle.prototype.handleEvent = function(event){
  event.preventDefault();
  
  let formulario = event.currentTarget;
  let descripcion = formulario.elements.descripcion.value;
  let valor = parseFloat(formulario.elements.valor.value);
  let fecha = formulario.elements.fecha.value;
  let etiquetas = formulario.elements.etiquetas.value.split(",");

  let gasto = new gp.CrearGasto(descripcion, valor, fecha, etiquetas);
  gp.anyadirGasto(gasto);
  
  repintar();
  
  formulario.remove();
  
  document.getElementById("anyadirgasto-formulario").disabled = false;
}

function EnviarEditarGastoHandle(){}
EnviarEditarGastoHandle.prototype.handleEvent = function(event){
  event.preventDefault();
  
  let formulario = event.currentTarget;
  let descripcion = formulario.elements.descripcion.value;
  let valor = parseFloat(formulario.elements.valor.value);
  let fecha = formulario.elements.fecha.value;
  let etiquetas = formulario.elements.etiquetas.value.split(",");

  this.gasto.actualizarDescripcion(descripcion);
  this.gasto.actualizarValor(valor);
  this.gasto.actualizarFecha(fecha);
  this.gasto.anyadirEtiquetas(etiquetas);
  
  repintar();
  
  formulario.remove();
}

function EditarHandleFormulario(){}
EditarHandleFormulario.prototype.handleEvent = function(evento){
  let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
  let formulario = plantillaFormulario.querySelector("form");
  
  formulario.elements.descripcion.value = this.gasto.descripcion;
  formulario.elements.valor.value = this.gasto.valor;
  formulario.elements.fecha.value = this.gasto.fecha;
  formulario.elements.etiquetas.value = this.gasto.etiquetas.join(", ");
  
  let manejadorSubmit = new EnviarEditarGastoHandle();
  manejadorSubmit.gasto = this.gasto;
  formulario.addEventListener("submit", manejadorSubmit);
  
  let botonCancelar = formulario.querySelector("button.cancelar");
  let manejadorCancelar = new CancelarHandle();
  manejadorCancelar.formulario = formulario;
  manejadorCancelar.boton = evento.currentTarget;
  botonCancelar.addEventListener("click", manejadorCancelar);
  
  evento.currentTarget.disabled = true;
  
  evento.currentTarget.parentNode.appendChild(plantillaFormulario);
}

function nuevoGastoWebFormulario(evento){
  let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
  let formulario = plantillaFormulario.querySelector("form");

  let manejadorSubmit = new EnviarNuevoGastoHandle();
  formulario.addEventListener("submit", manejadorSubmit);

  let botonCancelar = formulario.querySelector("button.cancelar");
  let manejadorCancelar = new CancelarHandle();
  manejadorCancelar.formulario = formulario;
  manejadorCancelar.boton = evento.currentTarget;
  botonCancelar.addEventListener("click", manejadorCancelar);

  evento.currentTarget.disabled = true;

  document.getElementById("controlesprincipales").appendChild(plantillaFormulario);
}

let btnAnyadirFormulario = document.getElementById("anyadirgasto-formulario");
btnAnyadirFormulario.addEventListener("click", nuevoGastoWebFormulario);

function filtrarGastosWeb(event) {
  event.preventDefault();
  
  let formulario = event.currentTarget;
  
  let descripcion = formulario.elements["formulario-filtrado-descripcion"].value;
  let valorMinimo = formulario.elements["formulario-filtrado-valor-minimo"].value;
  let valorMaximo = formulario.elements["formulario-filtrado-valor-maximo"].value;
  let fechaDesde = formulario.elements["formulario-filtrado-fecha-desde"].value;
  let fechaHasta = formulario.elements["formulario-filtrado-fecha-hasta"].value;
  let etiquetasTexto = formulario.elements["formulario-filtrado-etiquetas-tiene"].value;
  
  valorMinimo = valorMinimo !== "" ? parseFloat(valorMinimo) : undefined;
  valorMaximo = valorMaximo !== "" ? parseFloat(valorMaximo) : undefined;
  
  let etiquetas = undefined;
  if (etiquetasTexto && etiquetasTexto.trim() !== "") {
    etiquetas = gp.transformarListadoEtiquetas(etiquetasTexto);
  }
  
  let contenedor = document.getElementById("listado-gastos-completo");
  contenedor.innerHTML = "";
  
  if (
    descripcion === "" &&
    valorMinimo === undefined &&
    valorMaximo === undefined &&
    fechaDesde === "" &&
    fechaHasta === "" &&
    !etiquetas
  ) {
    gp.listarGastos().forEach(gasto => {
      mostrarGastoWeb("listado-gastos-completo", gasto);
    });
    return;
  }
  
  let filtro = {
    descripcionContiene: descripcion !== "" ? descripcion : undefined,
    valorMinimo: valorMinimo,
    valorMaximo: valorMaximo,
    fechaDesde: fechaDesde !== "" ? fechaDesde : undefined,
    fechaHasta: fechaHasta !== "" ? fechaHasta : undefined,
    etiquetasTiene: etiquetas
  };
  
  let gastosFiltrados = gp.filtrarGastos(filtro);
  
  gastosFiltrados.forEach(gasto => {
    mostrarGastoWeb("listado-gastos-completo", gasto);
  });
}

let formularioFiltrado = document.getElementById("formulario-filtrado");
if (formularioFiltrado) {
  formularioFiltrado.addEventListener("submit", filtrarGastosWeb);
}
function guardarGastosWeb(){
  let botonGuardarGasto = formulario.querySelector("guardar-gasto");
  let manejadorGuardarGasto = new GuardarGastoHandle();
  manejadorGuardarGasto.formulario = formulario;
  manejadorGuardarGasto.boton = evento.currentTarget;
  botonGuardarGasto.addEventListener("click", manejadorGuardarGasto);
}
function cargarGastosWeb(){

}
export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar, 
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    nuevoGastoWebFormulario,
    EditarHandleFormulario,
    filtrarGastosWeb,
    guardarGastosWeb,
    cargarGastosWeb
}