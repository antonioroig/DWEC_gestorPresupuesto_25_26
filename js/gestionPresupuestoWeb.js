import * as L from './gestionPresupuesto.js';

function mostrarDatoEnId(id, valor) {
    const e = document.getElementById(id);
    if(e) e.textContent = valor;
}

function mostrarGastoWeb(idCont, gasto) {
    const cont = document.getElementById(idCont);
    if(!cont) return;

    const divG = document.createElement("div"); divG.className = "gasto";
    const divDesc = document.createElement("div"); divDesc.className = "gasto-descripcion"; divDesc.textContent = gasto.descripcion;
    const divFecha = document.createElement("div"); divFecha.className = "gasto-fecha"; divFecha.textContent = new Date(gasto.fecha).toLocaleDateString();
    const divValor = document.createElement("div"); divValor.className = "gasto-valor"; divValor.textContent = gasto.valor;

    const divEtiq = document.createElement("div"); divEtiq.className = "gasto-etiquetas";
    const etiquetas = Array.isArray(gasto.etiquetas) ? gasto.etiquetas : [];
    etiquetas.forEach(et=>{
        const span = document.createElement("span"); span.className="gasto-etiquetas-etiqueta"; span.textContent=et;
        const botonB = document.createElement("button"); botonB.className="gasto-etiquetas-borrar"; botonB.textContent="x";
        botonB.addEventListener("click", new BorrarEtiquetaHandle(gasto, et));
        span.appendChild(botonB);
        divEtiq.appendChild(span);
    })

    const botonEditar = document.createElement("button"); botonEditar.className="gasto-editar"; botonEditar.textContent="Editar";
    botonEditar.addEventListener("click", new EditarHandle(gasto));
    const botonBorrar = document.createElement("button"); botonBorrar.className="gasto-borrar"; botonBorrar.textContent="Borrar";
    botonBorrar.addEventListener("click", new BorrarHandle(gasto));

    divG.append(divDesc, divFecha, divValor, divEtiq, botonEditar, botonBorrar);
    cont.appendChild(divG);
}

function repintar() {
    mostrarDatoEnId("presupuesto", L.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", L.calcularTotalGastos());
    mostrarDatoEnId("balance-total", L.calcularBalance());

    const listado = document.getElementById("listado-gastos-completo");
    if(listado) listado.innerHTML="";
    L.listarGastos().forEach(g=>mostrarGastoWeb("listado-gastos-completo", g));
}

function actualizarPresupuestoWeb() {
    const entrada = prompt("Introduce el nuevo presupuesto:");
    const n = Number(entrada);
    if(!isNaN(n)) { L.actualizarPresupuesto(n); repintar(); } 
    else alert("Introduce un número válido.");
}

function nuevoGastoWeb() {
    const g = new L.CrearGasto(
        prompt("Descripción:"),
        Number(prompt("Valor:")),
        prompt("Fecha (yyyy-mm-dd):"),
        prompt("Etiquetas separadas por comas:").split(",").map(e=>e.trim())
    );
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
        gasto.actualizarDescripcion(desc);
        gasto.actualizarValor(val);
        gasto.actualizarFecha(fecha);
        gasto.reemplazarEtiquetas(etiq);
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

function nuevoGastoWebFormulario() {
            let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
            
            const botonGuardar = plantillaFormulario.querySelector(".boton-guardar-gasto-form");

            botonGuardar.addEventListener("click", (e) => {
                const formContainer = e.target.closest('.gasto-formulario-dinamico'); 
                if (!formContainer) return;

                const descInput = formContainer.querySelector('input[name="descripcion"]');
                const valorInput = formContainer.querySelector('input[name="valor"]');
                const fechaInput = formContainer.querySelector('input[name="fecha"]');
                const etiquetasInput = formContainer.querySelector('input[name="etiquetas"]');

                if (!descInput.value || !valorInput.value || !fechaInput.value) {
                    alert("Por favor, rellena todos los campos obligatorios.");
                    return;
                }
                
                const valorNumerico = Number(valorInput.value);
                if (isNaN(valorNumerico)) {
                    alert("El valor debe ser un número válido.");
                    return;
                }

                const g = new L.CrearGasto(
                    descInput.value,
                    valorNumerico,
                    fechaInput.value,
                    etiquetasInput.value.split(",").map(e=>e.trim()).filter(e=>e.length > 0)
                );
                
                L.anyadirGasto(g);
                repintar();
                
                formContainer.remove();
            });


            const contenedor = document.getElementById("contenedor-formularios-gasto");

            if (contenedor) {
                contenedor.appendChild(plantillaFormulario);
            } else {
                console.error("Error: No se encontró el contenedor de formularios.");
            }            
        }


        document.getElementById("actualizarpresupuesto")?.addEventListener("click", actualizarPresupuestoWeb);
        document.getElementById("anyadirgasto")?.addEventListener("click", nuevoGastoWeb);
        document.getElementById("anyadirgasto-formulario")?.addEventListener("click", nuevoGastoWebFormulario);

        
        export const Web = { mostrarDatoEnId, mostrarGastoWeb, repintar, actualizarPresupuestoWeb, nuevoGastoWeb, EditarHandle, BorrarHandle, BorrarEtiquetaHandle, nuevoGastoWebFormulario, CancelarHandle };

const BotonAnyadirFormulario = document.createElement("button", BotonAnyadirFormulario.className("anyadirgasto-formulario"));