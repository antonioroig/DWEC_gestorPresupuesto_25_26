"use strict";
import * as gestionPresupuesto from './gestionPresupuesto.js';
//función para mostrar dato en id
function mostrarDatoEnId(idElemento, valor) {
    let elemento = document.getElementById(idElemento);
    if (elemento) {
        elemento.textContent = valor;
    }
}

// función para mostrar gasto en web
function mostrarGastoWeb(idElemento, gasto) {
    let elemento = document.getElementById(idElemento);
    if (!elemento) return;

    let divGasto = document.createElement("div");
    divGasto.classList.add("gasto");

    // descripción
    let divDescripcion = document.createElement("div");
    divDescripcion.classList.add("gasto-descripcion");
    divDescripcion.textContent = gasto.descripcion;
    divGasto.appendChild(divDescripcion);

    // fecha
    let divFecha = document.createElement("div");
    divFecha.classList.add("gasto-fecha");
    let fecha = new Date(gasto.fecha);
    divFecha.textContent = fecha.toLocaleDateString();
    divGasto.appendChild(divFecha);

    // valor
    let divValor = document.createElement("div");
    divValor.classList.add("gasto-valor");
    divValor.textContent = gasto.valor.toFixed(2);
    divGasto.appendChild(divValor);

    // etiquetas
    let divEtiquetas = document.createElement("div");
    divEtiquetas.classList.add("gasto-etiquetas");

    if (Array.isArray(gasto.etiquetas)) {
    gasto.etiquetas.forEach(etiqueta => {

        let spanEtiqueta = document.createElement("span");
        spanEtiqueta.classList.add("gasto-etiquetas-etiqueta");
        spanEtiqueta.textContent = etiqueta;

        let manejadorEtiqueta = new BorrarEtiquetasHandle();
        manejadorEtiqueta.gasto = gasto;
        manejadorEtiqueta.etiqueta = etiqueta;

        spanEtiqueta.addEventListener("click", manejadorEtiqueta);

        divEtiquetas.appendChild(spanEtiqueta);
    });
}




    divGasto.appendChild(divEtiquetas);
    elemento.appendChild(divGasto);

     // BOTÓN EDITAR
    let botonEditar = document.createElement("button");
    botonEditar.type = "button";
    botonEditar.textContent = "Editar";
    botonEditar.classList.add("gasto-editar");

    let manejador = new EditarHandle();
    manejador.gasto = gasto;
    botonEditar.addEventListener("click", manejador);

    divGasto.appendChild(botonEditar);
    //boton borrar
    let botonBorrar = document.createElement("button");
    botonBorrar.type = "button";
    botonBorrar.textContent = "Borrar";
    botonBorrar.classList.add("gasto-borrar");
    
    let manejadorBorrar = new BorrarHandle();
    manejadorBorrar.gasto = gasto;
    botonBorrar.addEventListener("click", manejadorBorrar);
    divGasto.appendChild(botonBorrar);
}

//función para mostrar gastos agrupados en web
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    let contenedor = document.getElementById(idElemento);
    if (!contenedor) return;

    let divAgrupacion = document.createElement("div");
    divAgrupacion.classList.add("agrupacion");

    let titulo = document.createElement("h1");
    titulo.textContent = `Gastos agrupados por ${periodo}`;
    divAgrupacion.appendChild(titulo);

    for (let clave in agrup) {
        let valor = agrup[clave];

        let divDato = document.createElement("div");
        divDato.classList.add("agrupacion-dato");

        let spanClave = document.createElement("span");
        spanClave.classList.add("agrupacion-dato-clave");
        spanClave.textContent = clave;

        let spanValor = document.createElement("span");
        spanValor.classList.add("agrupacion-dato-valor");
        spanValor.textContent = valor;

        divDato.appendChild(spanClave);
        divDato.appendChild(spanValor);
        divAgrupacion.appendChild(divDato);
    }
    contenedor.appendChild(divAgrupacion);
    
}
function repintar(){
        mostrarDatoEnId('presupuesto', gestionPresupuesto.mostrarPresupuesto());
        mostrarDatoEnId('gastos-totales', gestionPresupuesto.calcularTotalGastos());   
        mostrarDatoEnId('balance-total', gestionPresupuesto.calcularBalance());

        let contenedorListadoGastoComp = document.getElementById('listado-gastos-completo');
        contenedorListadoGastoComp.innerHTML = '';

        for (let i = 0; i < gestionPresupuesto.listarGastos().length; i++) {
            mostrarGastoWeb('listado-gastos-completo', gestionPresupuesto.listarGastos()[i]);
        }
    }
    

    function actualizarPresupuestoWeb (){
        debugger;
        let entradaPresupuesto = prompt("Introduce el nuevo presupuesto:");
        entradaPresupuesto = Number(entradaPresupuesto);

        gestionPresupuesto.actualizarPresupuesto(entradaPresupuesto);
        repintar();
    }

    let botonActualizarpresupuesto = document.getElementById('actualizarpresupuesto');
    botonActualizarpresupuesto.addEventListener('click', actualizarPresupuestoWeb);
    


    function ayadirGastoWeb (){
        debugger;
        let descripcion = prompt("Introduce la descripción del gasto:");
        let valor = Number(prompt("Introduce el valor del gasto:"));
        let fecha = prompt("Introduce la fecha del gasto (YYYY-MM-DD):");
        let etiquetas = prompt("Introduce las etiquetas del gasto (separadas por comas):");

        etiquetas = etiquetas.split(',');

        let nuevoGasto = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, ...etiquetas);
        gestionPresupuesto.anyadirGasto(nuevoGasto);
        repintar();
    }

    let ayadirGAsto = document.getElementById('anyadirgasto');
    ayadirGAsto.addEventListener('click', ayadirGastoWeb);

    //funcion creadora de objeto manejador de evento

    function EditarHandle(){

    this.handleEvent = function(evento){

        // --- DESCRIPCIÓN ---
        let nuevaDescripcion = prompt("Nueva descripcion", this.gasto.descripcion);
        if (nuevaDescripcion !== "") {
            this.gasto.actualizarDescripcion(nuevaDescripcion);
        }

        // --- VALOR ---
        let nuevoValor = prompt("Nuevo valor", this.gasto.valor);
        if (nuevoValor !== "" && nuevoValor !== null) {
            this.gasto.actualizarValor(Number(nuevoValor));
        }

        // --- FECHA ---
        let nuevaFecha = prompt("Nueva fecha (YYYY-MM-DD)", new Date(this.gasto.fecha).toISOString().slice(0,10));
        if (nuevaFecha !== "") {
            this.gasto.actualizarFecha(nuevaFecha);
        }

        // --- ETIQUETAS ---
        let entradaEtiquetas = prompt(
            "Etiquetas (coma separadas). Déjalo vacío para no cambiar.",
            this.gasto.etiquetas.join(",")
        );

        if (entradaEtiquetas !== "") {
            let nuevas = entradaEtiquetas.split(",").map(e => e.trim());

            // reemplazar etiquetas actuales por las nuevas
            this.gasto.etiquetas = []; 
            this.gasto.anyadirEtiquetas(...nuevas);
        }

        repintar();
    }
}

function BorrarHandle(){

    this.handleEvent = function(event){
        gestionPresupuesto.borrarGasto(this.gasto.id);
        repintar();
    }
}   

function BorrarEtiquetasHandle() {

    this.handleEvent = function(event) {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}

let anyadirGastoFormulario = document.getElementById("anyadirgasto-formulario");
anyadirGastoFormulario.addEventListener('click', nuevoGastoWebFormulario);

function nuevoGastoWebFormulario(event) {
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    let formulario = plantillaFormulario.querySelector("form");

    let controlesPrincipales = document.getElementById("controlesprincipales");
    controlesPrincipales.appendChild(formulario);

    // manejador de enviar
    formulario.addEventListener("submit", manejadoraEnviarFormulario);

    // cancelar
    let botonCancelar = formulario.querySelector(".cancelar");
    let manejadorCancelar = new botonCancelarHandle();
    botonCancelar.addEventListener("click", manejadorCancelar);

    // desactivar el botón principal mientras el formulario está visible
    let activarBoton = document.getElementById("anyadirgasto-formulario");
    activarBoton.setAttribute("disabled", true);
}

//enviar
function manejadoraEnviarFormulario(event){
    event.preventDefault();

    let form = event.currentTarget; 
    let descripcion = form.elements.descripcion.value.trim();
    let valor = Number(form.elements.valor.value);
    let fecha = form.elements.fecha.value;
    let etiquetas = form.elements.etiquetas.value.split(",").map(e => e.trim());

    let gasto = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, ...etiquetas);
    gestionPresupuesto.anyadirGasto(gasto);

    form.remove();
    let activarBoton = document.getElementById("anyadirgasto-formulario");
    activarBoton.removeAttribute("disabled", true);
    repintar();
    
}


function botonCancelarHandle(){

    this.handleEvent = function(event){
        let from = event.currentTarget.closest("form");
        if(from){
            from.remove();
        }
        let activarBoton = document.getElementById("anyadirgasto-formulario");
        activarBoton.removeAttribute("disabled", true);
        repintar();
    }
}


export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    actualizarPresupuestoWeb
};