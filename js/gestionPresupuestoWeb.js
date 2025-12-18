"use strict";

import * as gp from "./gestionPresupuesto.js";

function mostrarDatoEnId(idElemento, valor){
    let elemento = document.getElementById(idElemento);
    if (elemento) {
        elemento.textContent = valor;
    }
    else {
        console.log("Elemento con ID " + idElemento + " no encontrado.");
    }
}

function mostrarGastoWeb(idElemento , gasto){
    let elemento = document.getElementById(idElemento);
    
    if (!elemento) {
        return;
    }

    let divGasto = document.createElement("div");
    divGasto.classList.add("gasto");

    let divDescripcion = document.createElement("div");
    divDescripcion.classList.add("gasto-descripcion");
    divDescripcion.textContent = gasto.descripcion;
    divGasto.appendChild(divDescripcion);

    let divFecha = document.createElement("div");
    divFecha.classList.add("gasto-fecha");
    divFecha.textContent = gasto.fecha;
    divGasto.appendChild(divFecha);

    let divValor = document.createElement("div");
    divValor.classList.add("gasto-valor");
    divValor.textContent = gasto.valor;
    divGasto.appendChild(divValor);

    let divEtiquetas = document.createElement("div");
    divEtiquetas.classList.add("gasto-etiquetas");

    if (Array.isArray(gasto.etiquetas)) {

        gasto.etiquetas.forEach(etiqueta => {
            let spanEtiqueta = document.createElement("span");
            spanEtiqueta.classList.add("gasto-etiquetas-etiqueta");
            spanEtiqueta.textContent = etiqueta;

            spanEtiqueta.addEventListener("click", new BorrarEtiquetasHandle(gasto, etiqueta));
            divEtiquetas.appendChild(spanEtiqueta);
        });
    }

    divGasto.appendChild(divEtiquetas);
    elemento.appendChild(divGasto);

    let botonEditar = document.createElement("button");
    botonEditar.type = "button";
    botonEditar.classList.add("gasto-editar");
    botonEditar.textContent = "Editar";

    let editarHandler = new EditarHandle();
    editarHandler.gasto = gasto; 
    botonEditar.addEventListener("click", editarHandler);

    divGasto.appendChild(botonEditar);


    let botonBorrar = document.createElement("button");
    botonBorrar.type = "button";
    botonBorrar.classList.add("gasto-borrar");
    botonBorrar.textContent = "Borrar";

    let borrarHandler = new BorrarHandle(gasto);
    botonBorrar.addEventListener("click", borrarHandler);
    divGasto.appendChild(botonBorrar);

    let botonEditarForm = document.createElement("button");
    botonEditarForm.type = "button";
    botonEditarForm.classList.add("gasto-editar-formulario");
    botonEditarForm.textContent = "Editar (formulario)";
    
    let editarFormHandler = new EditarHandleFormulario();
    editarFormHandler.gasto = gasto;

    botonEditarForm.addEventListener("click", editarFormHandler);

    divGasto.appendChild(botonEditarForm);
}

function EditarHandleFormulario() {
    this.handleEvent = function (event) {

        let botonEditar = event.currentTarget;
        botonEditar.disabled = true;

        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        let formulario = plantillaFormulario.querySelector("form");

        formulario.elements["descripcion"].value = this.gasto.descripcion;
        formulario.elements["valor"].value = this.gasto.valor;
        formulario.elements["fecha"].value = this.gasto.fecha;
        formulario.elements["etiquetas"].value = this.gasto.etiquetas.join(",");

        let submitEditar = new SubmitEditarFormularioHandle();
        submitEditar.gasto = this.gasto;

        formulario.addEventListener("submit", submitEditar);

        let cancelar = new CancelarFormularioHandle();
        cancelar.botonAnyadirGastoForm = botonEditar;

        formulario.querySelector(".cancelar").addEventListener("click", cancelar);

        botonEditar.parentNode.appendChild(formulario);
    }
}

function SubmitEditarFormularioHandle() {

    this.handleEvent = function(event) {
        event.preventDefault();
        let form = event.currentTarget;

        let descripcion = form.elements["descripcion"].value.trim();
        let valor = Number(form.elements["valor"].value.trim());
        let fecha = form.elements["fecha"].value.trim();
        let etiquetas = form.elements["etiquetas"].value.split(",");

        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);

        this.gasto.borrarEtiquetas(...this.gasto.etiquetas);
        this.gasto.anyadirEtiquetas(...etiquetas);

        repintar();  

        form.remove();
    }
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){

    const elemento = document.getElementById(idElemento);
    if (!elemento) {
        console.log("Elemento con ID " + idElemento + " no encontrado.");
        return;
    }

    const divAgrupacion = document.createElement("div");
    divAgrupacion.classList.add("agrupacion");

    const titulo = document.createElement("h1");
    titulo.textContent = "Gastos agrupados por " + periodo;
    divAgrupacion.appendChild(titulo);

    const claves = Object.keys(agrup);
    for (let i = 0; i < claves.length; i++) {
        const clave = claves[i];
        const valor = agrup[clave];

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
    }

    elemento.appendChild(divAgrupacion);
}

function repintar(){
    mostrarDatoEnId("presupuesto", gp.mostrarPresupuesto());

    mostrarDatoEnId("gastos-totales", gp.calcularTotalGastos());

    mostrarDatoEnId("balance-total", gp.calcularBalance());

    let listaGastos = document.getElementById("listado-gastos-completo");
    if(listaGastos){
        listaGastos.textContent = "";
    }
    
    let lista = gp.listarGastos();
    for(let i = 0; i < lista.length; i++){
        mostrarGastoWeb("listado-gastos-completo", lista[i]);
    }
}

function actualizarPresupuestoWeb(){
    let nuevoPresupuesto = prompt("Introduce el nuevo presupuesto:");

    if (nuevoPresupuesto === null) {
        return;
    }

    let presupuestoNumerico = Number(nuevoPresupuesto);

    if (isNaN(presupuestoNumerico) || presupuestoNumerico < 0) {
        alert("Por favor, introduce un número válido para el presupuesto.");
        return;
    }

    gp.actualizarPresupuesto(presupuestoNumerico);

    repintar();
}

    let botonActualizar = document.getElementById("actualizarpresupuesto");
    botonActualizar.addEventListener("click", actualizarPresupuestoWeb);


function nuevoGastoWeb() {

    let descripcion = prompt("Introduce la descripción del gasto: ");
    let valorString = prompt("Introduce el valor del gasto: ");
    let fecha = prompt("Introduce la fecha del gasto (Formato yyyy-mm-dd): ");
    let etiquetasString = prompt("Introduce las etiquetas separadas por comas (Ejemplo: comida,ocio,transporte): ");

    let valor = Number(valorString);

    let etiquetas = [];
    etiquetas = etiquetasString.split(",");

    let nuevoGasto = new gp.CrearGasto(descripcion, valor, fecha, ...etiquetas);

    gp.anyadirGasto(nuevoGasto);

    repintar();
}

let botonAnyadir = document.getElementById("anyadirgasto");
botonAnyadir.addEventListener("click", nuevoGastoWeb);


function EditarHandle(){

    this.handleEvent = function(evento) {

        let descripcion = prompt("Introduce la descripción del gasto:", this.gasto.descripcion);
        this.gasto.actualizarDescripcion(descripcion);

        let valor = +prompt("Introduce el valor del gasto:", this.gasto.valor);
        this.gasto.actualizarValor(valor);

        let fecha = prompt("Introduce la fecha del gasto (Formato yyyy-mm-dd):", this.gasto.obtenerPeriodoAgrupacion("dia"));
        this.gasto.actualizarFecha(fecha);

        let etiqueta = prompt("Introduce las etiquetas:", this.gasto.etiquetas.join(","));
        this.gasto.borrarEtiquetas(...this.gasto.etiquetas.join(","));
        etiqueta = etiqueta.split(",");
        this.gasto.anyadirEtiquetas(...etiqueta);

        repintar();
    }
}

function BorrarHandle(gasto) {

    this.gasto = gasto;

    this.handleEvent = function() {
        gp.borrarGasto(this.gasto.id);
        repintar();
    };
}

function BorrarEtiquetasHandle(gasto, etiqueta){
    this.gasto = gasto;
    this.etiqueta = etiqueta;

    this.handleEvent = function(){
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}

function nuevoGastoWebFormulario(){
    document.getElementById("anyadirgasto-formulario").disabled = true;
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    let formulario = plantillaFormulario.querySelector("form");
    let divForm = document.getElementById("controlesprincipales");
    divForm.appendChild(formulario);

    formulario.addEventListener("submit", submitHand);

    let btnCancelar = formulario.querySelector(".cancelar");
    
    let cancelarGasto = new CancelarFormularioHandle();
    cancelarGasto.botonAnyadirGastoForm = document.getElementById('anyadirgasto-formulario');
    btnCancelar.addEventListener("click", cancelarGasto)

}

let btnNewGasto = document.getElementById("anyadirgasto-formulario");
btnNewGasto.addEventListener("click", nuevoGastoWebFormulario);



function submitHand(event){
    event.preventDefault();
    let form = event.currentTarget;
    let descripcion = form.elements["descripcion"].value.trim();
    let valor = Number(form.elements["valor"].value.trim());
    let fecha = form.elements["fecha"].value.trim();
    let etiquetas = form.elements["etiquetas"].value.split(',');

    let gasto = new gp.CrearGasto(descripcion, valor, fecha, ... etiquetas);
    gp.anyadirGasto(gasto);
    repintar();
    document.getElementById("anyadirgasto-formulario").disabled = false;

    form.remove();

}

function CancelarFormularioHandle() {
    this.handleEvent = function(event) {
        let formulario = event.currentTarget.closest("form");
        if(formulario){
            formulario.remove();
        }
        this.botonAnyadirGastoForm.disabled = false;
        repintar();
    }
}

///aqui

function filtrarGastosWeb(event) {
  event.preventDefault();

  let desc = document.getElementById("formulario-filtrado-descripcion").value;
  let valmin = document.getElementById("formulario-filtrado-valor-minimo").value;
  let valmax = document.getElementById("formulario-filtrado-valor-maximo").value;
  let fechdesde = document.getElementById("formulario-filtrado-fecha-desde").value;
  let fechahasta = document.getElementById("formulario-filtrado-fecha-hasta").value;
  let etiq = document.getElementById("formulario-filtrado-etiquetas-tiene").value;

  let filtro = {};

  if (desc) filtro.descripcionContiene = desc;

  if (valmin !== "") filtro.valorMinimo = Number(valmin);
  if (valmax !== "") filtro.valorMaximo = Number(valmax);

  if (fechdesde) filtro.fechaDesde = fechdesde;
  if (fechahasta) filtro.fechaHasta = fechahasta;

  if (etiq && etiq.trim() !== "") {
    filtro.etiquetasTiene = gp.transformarListadoEtiquetas(etiq);
  }

  let gastosFiltrados = gp.filtrarGastos(filtro);

  let listaGastos = document.getElementById("listado-gastos-completo");
  if (listaGastos) {
    listaGastos.textContent = "";
  }

  for (let i = 0; i < gastosFiltrados.length; i++) {
    mostrarGastoWeb("listado-gastos-completo", gastosFiltrados[i]);
  }
}

let formularioFiltrado = document.getElementById("formulario-filtrado");
formularioFiltrado.addEventListener("submit", filtrarGastosWeb);

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    actualizarPresupuestoWeb
}