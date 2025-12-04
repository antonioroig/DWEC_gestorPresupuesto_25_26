import * as L from './gestionPresupuesto.js';

function mostrarDatoEnId(id, valor) {
    const e = document.getElementById(id);
    if(e) e.textContent = valor;
}

function mostrarGastoWeb(idCont, gasto) {
    const cont = document.getElementById(idCont);
    if(!cont) return;

    const divG = document.createElement("div"); divG.className = "gasto";
    divG.dataset.id = gasto.id; 
    
    const divDesc = document.createElement("div"); divDesc.className = "gasto-descripcion"; divDesc.textContent = gasto.descripcion;
    const divFecha = document.createElement("div"); divFecha.className = "gasto-fecha"; divFecha.textContent = new Date(gasto.fecha).toLocaleDateString();
    const divValor = document.createElement("div"); divValor.className = "gasto-valor"; divValor.textContent = gasto.valor;

    const divEtiq = document.createElement("div"); divEtiq.className = "gasto-etiquetas";
    const etiquetas = gasto.etiquetas;
    etiquetas.forEach(et=>{
        const span = document.createElement("span"); span.className="gasto-etiquetas-etiqueta"; span.textContent=et;
        
        span.addEventListener("click", new BorrarEtiquetaHandle(gasto, et));
        
        divEtiq.appendChild(span);
    });

    const botonEditar = document.createElement("button"); botonEditar.className="gasto-editar"; botonEditar.textContent="Editar";
    botonEditar.addEventListener("click", new EditarHandle(gasto));
    
    const botonBorrar = document.createElement("button"); botonBorrar.className="gasto-borrar"; botonBorrar.textContent="Borrar";
    botonBorrar.addEventListener("click", new BorrarHandle(gasto));

    const botonEditarFormulario = document.createElement("button"); 
    botonEditarFormulario.className="gasto-editar-formulario"; 
    botonEditarFormulario.textContent="Editar Gasto)";
    botonEditarFormulario.addEventListener("click", new EditarHandleFormulario(gasto)); 

    divG.append(divDesc, divFecha, divValor, divEtiq, botonEditar, botonBorrar, botonEditarFormulario);
    return divG;
}

function mostrarGastosWeb(gastos, id) {
    const contenedor = document.getElementById(id);
    if (contenedor) {
        contenedor.innerHTML = '';
        gastos.forEach(gasto => {
            const gastoElement = mostrarGastoWeb(id, gasto);
            if(gastoElement){
                contenedor.appendChild(gastoElement)
            }
        })
    }
}

function mostrarGastosAgrupadosWeb(agrupacion, id, titulo) {
    const contenedor = document.getElementById(id);
    if (contenedor) {
        contenedor.innerHTML = '';

        const divAgrupacion = document.createElement("div");
        divAgrupacion.classList.add("agrupacion");

        const tituloH1 = document.createElement("h1");
        tituloH1.textContent = titulo;
        divAgrupacion.appendChild(tituloH1);

        for (const periodo in agrupacion) {
            const divDato = document.createElement("div");
            divDato.classList.add("agrupacion-dato");

            const spanClave = document.createElement("span");
            spanClave.classList.add("agrupacion-dato-clave");
            spanClave.textContent = periodo;

            const spanValor = document.createElement("span");
            spanValor.classList.add("agrupacion-dato-valor");
            spanValor.textContent = agrupacion[periodo].toFixed(2) + " €";

            divDato.append(spanClave, spanValor);
            divAgrupacion.appendChild(divDato);
        }
        contenedor.appendChild(divAgrupacion);
    }
}

function repintar() {
    mostrarDatoEnId("presupuesto", L.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", L.calcularTotalGastos().toFixed(2));
    mostrarDatoEnId("balance-total", L.calcularBalance().toFixed(2));

    const listadoCompleto = L.listarGastos();
    mostrarGastosWeb(listadoCompleto, "listado-gastos-completo");
    mostrarGastosWeb(L.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"}), "listado-gastos-filtrado-1");
    mostrarGastosWeb(L.filtrarGastos({etiquetasTiene: ["transporte", "seguros"]}), "listado-gastos-filtrado-2");
    mostrarGastosWeb(L.filtrarGastos({descripcionContiene: "gasolina"}), "listado-gastos-filtrado-3");
    mostrarGastosWeb(L.filtrarGastos({valorMinimo: 100}), "listado-gastos-filtrado-4");
    
    mostrarGastosAgrupadosWeb(L.agruparGastos('dia'), "agrupacion-dia", "Gastos agrupados por día");
    mostrarGastosAgrupadosWeb(L.agruparGastos('mes'), "agrupacion-mes", "Gastos agrupados por mes");
    mostrarGastosAgrupadosWeb(L.agruparGastos('anyo'), "agrupacion-anyo", "Gastos agrupados por año");
}

function actualizarPresupuestoWeb() {
    const entrada = prompt("Introduce el nuevo presupuesto:");
    const n = Number(entrada);
    if(!isNaN(n) && n >= 0) { L.actualizarPresupuesto(n); repintar(); } 
    else if(entrada !== null) alert("Introduce un número válido y no negativo.");
}

function nuevoGastoWeb() {
    const desc = prompt("Descripción:");
    if (desc === null) return;
    
    const val = Number(prompt("Valor:"));
    if (isNaN(val) || val < 0) { alert("Valor no válido."); return; }
    
    const fecha = prompt("Fecha (yyyy-mm-dd):");
    
    const etiqStr = prompt("Etiquetas separadas por comas:");
    const etiq = etiqStr ? etiqStr.split(",").map(e=>e.trim()) : [];

    const g = new L.CrearGasto(desc, val, fecha, etiq);
    L.anyadirGasto(g);
    repintar();
}

function EditarHandle(gasto) {
    this.gasto = gasto;
    this.handleEvent = () => {
        const desc = prompt("Descripción:", gasto.descripcion);
        const val = Number(prompt("Valor:", gasto.valor));
        const fecha = prompt("Fecha (yyyy-mm-dd):", new Date(gasto.fecha).toISOString().slice(0,10));
        const etiq = prompt("Etiquetas:", gasto.etiquetas.join(",")).split(",").map(e=>e.trim());
        
        if (desc !== null) gasto.actualizarDescripcion(desc);
        if (!isNaN(val) && val >= 0) gasto.actualizarValor(val);
        if (fecha !== null) gasto.actualizarFecha(fecha);
        if (etiq.length > 0) gasto.reemplazarEtiquetas(etiq);

        repintar();
    }
}

function BorrarHandle(gasto) { 
    this.gasto=gasto; 
    this.handleEvent=()=>{ 
        L.borrarGasto(gasto.id); 
        repintar(); 
    } 
}

function BorrarEtiquetaHandle(gasto, etiq) { 
    this.gasto=gasto; 
    this.etiq=etiq; 
    this.handleEvent=()=>{ 
        gasto.borrarEtiquetas(etiq); 
        repintar(); 
    } 
}

function CancelarHandle(formularioContenedor, botonActivar){
    this.formularioContenedor = formularioContenedor;
    this.botonActivar = botonActivar;
    this.handleEvent= (event) =>{
        event.preventDefault();
        this.formularioContenedor.remove();
        this.botonActivar.disabled = false;
    }
}

function SubmitAddHandle(e, botonActivar){
    e.preventDefault();
    const form = e.currentTarget;
    const descInput = form.querySelector('input[name="descripcion"]');
    const valorInput = form.querySelector('input[name="valor"]');
    const fechaInput = form.querySelector('input[name="fecha"]');
    const etiquetasInput = form.querySelector('input[name="etiquetas"]');

    const valorNumerico = Number(valorInput.value);

    if(!descInput.value || isNaN(valorNumerico) || valorNumerico < 0){
        alert("Por favor, rellena la descripción y el valor (debe ser un número no negativo)."); 
        return;
    }

    const g = new L.CrearGasto(
        descInput.value, 
        valorNumerico, 
        fechaInput.value, 
        etiquetasInput.value.split(",").map(e=>e.trim()).filter(e =>e.length>0)
    );

    L.anyadirGasto(g);
    repintar();

    form.closest('div.gasto-formulario-dinamico').remove();
    botonActivar.disabled = false;
}

function SubmitEditHandle(e, gasto, formContainer, botonActivar){
    e.preventDefault();
    const form = e.currentTarget;
    const descInput = form.querySelector('input[name="descripcion"]');
    const valorInput = form.querySelector('input[name="valor"]');
    const fechaInput = form.querySelector('input[name="fecha"]');
    const etiquetasInput = form.querySelector('input[name="etiquetas"]');

    const valorNumerico = Number(valorInput.value);
    
    if(!descInput.value || isNaN(valorNumerico) || valorNumerico < 0) {
        alert("Por favor, revisa la descripción y el valor (debe ser un número no negativo).");
        return;
    }

    gasto.actualizarDescripcion(descInput.value);
    gasto.actualizarValor(valorNumerico);
    gasto.actualizarFecha(fechaInput.value);
    gasto.reemplazarEtiquetas(etiquetasInput.value.split(",").map(e=>e.trim()).filter(e =>e.length>0));

    formContainer.remove();
    repintar();
}

function nuevoGastoWebFormulario() {
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    const formContainer = plantillaFormulario.querySelector("div.gasto-formulario-dinamico"); 
    const formulario = formContainer?.querySelector("form"); 

    if (!formulario || !formContainer) return;
    
    const botonActivar = document.getElementById("anyadirgasto-formulario");
    if(!botonActivar) return;

    formulario.addEventListener("submit", (e) => SubmitAddHandle(e, botonActivar));
    
    const botonCancelar = formulario.querySelector("button.cancelar"); 
    if(botonCancelar) {
        const manejadorCancelar = new CancelarHandle(formContainer, botonActivar);
        botonCancelar.addEventListener("click", manejadorCancelar);
    }
    
    botonActivar.disabled = true;

    const contenedor = document.getElementById("controlesprincipales");

    if (contenedor) {
        contenedor.appendChild(formContainer)
    } else {
        botonActivar.disabled = false;
    }
}

function EditarHandleFormulario(gasto) {
    this.gasto = gasto;
    this.handleEvent = (e) => {
        const botonActivar = e.currentTarget;
        const divGasto = botonActivar.closest('.gasto');

        const plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        const formContainer = plantillaFormulario.querySelector("div.gasto-formulario-dinamico");
        const formulario = formContainer?.querySelector("form");

        if (!formulario || !formContainer) return;

        formulario.querySelector('input[name="descripcion"]').value = this.gasto.descripcion;
        formulario.querySelector('input[name="valor"]').value = this.gasto.valor;
        formulario.querySelector('input[name="etiquetas"]').value = this.gasto.etiquetas.join(",");

        const f = new Date(this.gasto.fecha);
        const fechaStr = `${f.getFullYear()}-${String(f.getMonth() + 1).padStart(2, '0')}-${String(f.getDate()).padStart(2, '0')}`;
        formulario.querySelector('input[name="fecha"]').value = fechaStr;

        formulario.addEventListener("submit", (submitEvent) => SubmitEditHandle(submitEvent, this.gasto, formContainer, botonActivar));
        
        const botonCancelar = formulario.querySelector("button.cancelar"); 
        if(botonCancelar) {
            const manejadorCancelar = new CancelarHandle(formContainer, botonActivar);
            botonCancelar.addEventListener("click", manejadorCancelar);
        }
        
        botonActivar.disabled = true;
        divGasto.appendChild(plantillaFormulario);
    }
}



document.getElementById("actualizarpresupuesto")?.addEventListener("click", actualizarPresupuestoWeb);
document.getElementById("anyadirgasto")?.addEventListener("click", nuevoGastoWeb);
document.getElementById("anyadirgasto-formulario")?.addEventListener("click", nuevoGastoWebFormulario);

window.addEventListener('DOMContentLoaded', repintar);

export const Web = { mostrarDatoEnId, mostrarGastoWeb, repintar, actualizarPresupuestoWeb, nuevoGastoWeb, EditarHandle, BorrarHandle, BorrarEtiquetaHandle, nuevoGastoWebFormulario, CancelarHandle, EditarHandleFormulario };