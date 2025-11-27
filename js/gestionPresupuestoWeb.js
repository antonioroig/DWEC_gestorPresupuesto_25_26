import * as gp from './gestionPresupuesto.js'

function mostrarDatoEnId(idElemento, valor) {
    document.getElementById(idElemento).textContent = valor;
}

function mostrarGastoWeb(idElemento, gasto) {
    let elem = document.getElementById(idElemento);

    if (elem) {
        let divGasto = document.createElement("div");
        divGasto.className = "gasto";

        let divDescripcion = document.createElement("div");
        divDescripcion.className = "gasto-descripcion";
        divDescripcion.textContent = gasto.descripcion;
        divGasto.appendChild(divDescripcion);

        let divFecha = document.createElement("div");
        divFecha.className = "gasto-fecha";
        divFecha.textContent = new Date(gasto.fecha).toISOString().slice(0,10);
        divGasto.appendChild(divFecha);

        let divValor = document.createElement("div");
        divValor.className = "gasto-valor";
        divValor.textContent = gasto.valor;
        divGasto.appendChild(divValor);

        let divEtiquetas = document.createElement("div");
        divEtiquetas.className = "gasto-etiquetas";

        if (Array.isArray(gasto.etiquetas)) {
            for (let i = 0; i < gasto.etiquetas.length; i++) {
                let span = document.createElement("span");
                span.className = "gasto-etiquetas-etiqueta";
                span.textContent = gasto.etiquetas[i];
                let borrarEtiquetas = new BorrarEtiquetasHandle();
                borrarEtiquetas.gasto = gasto;
                borrarEtiquetas.etiqueta = gasto.etiquetas[i];
                span.addEventListener("click", borrarEtiquetas);

                divEtiquetas.appendChild(span);
                let br = document.createElement("br");
                divEtiquetas.appendChild(br);
            }
        }

        divGasto.appendChild(divEtiquetas);

        let btnEditar = document.createElement("button");
        btnEditar.className = "gasto-editar";
        btnEditar.type = "button";
        btnEditar.textContent = "Editar";
        let editarHandle = new EditarHandle();
        editarHandle.gasto = gasto;
        btnEditar.addEventListener("click", editarHandle);
        divGasto.appendChild(btnEditar);

        let btnBorrar = document.createElement("button");
        btnBorrar.className = "gasto-borrar";
        btnBorrar.type = "button";
        btnBorrar.textContent = "Borrar";
        let borrarHandle = new BorrarHandle();
        borrarHandle.gasto = gasto;
        btnBorrar.addEventListener("click", borrarHandle);
        divGasto.appendChild(btnBorrar);

        elem.appendChild(divGasto);

        let br = document.createElement("br");
        elem.appendChild(br);

    } else {
        alert(`El elemento ${idElemento} no existe`);
    }
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    let elem = document.getElementById(idElemento)

    if (elem) {
        let agrupacionHTML =
            `<div class="agrupacion">
        <h1>Gastos agrupados por ${periodo}</h1>`

        for (let claves in agrup) {

            agrupacionHTML +=
                `<div class="agrupacion-dato">
            <span class="agrupacion-dato-clave">${claves}</span>
            <span class="agrupacion-dato-valor">${agrup[claves]}</span>
            </div>`
        }
        agrupacionHTML += "</div>"
        elem.innerHTML = agrupacionHTML;
    }
    else {
        alert(`El elemento ${idElemento} no existe`);
    }
}

function repintar() {
    let presupuesto = gp.mostrarPresupuesto();
    mostrarDatoEnId("presupuesto", presupuesto);

    let totalGastos = gp.calcularTotalGastos();
    mostrarDatoEnId("gastos-totales", totalGastos);

    let balance = gp.calcularBalance();
    mostrarDatoEnId("balance-total", balance);

    let lGastosComp = document.getElementById("listado-gastos-completo");
    lGastosComp.innerHTML = "";

    let lGastos = gp.listarGastos();
    for (let gasto of lGastos) {
        mostrarGastoWeb("listado-gastos-completo", gasto)
    }
}

function actualizarPresupuestoWeb() {
    let presupuesto = Number(prompt("Introduce un presupuesto:"));
    gp.actualizarPresupuesto(presupuesto);
    repintar();
}
let btnActPresu = document.getElementById("actualizarpresupuesto");
btnActPresu.addEventListener("click", actualizarPresupuestoWeb);

function nuevoGastoWeb() {
    let descripcion, valor, fecha, etiquetas;
    descripcion = prompt("Introduce una descripción para el gasto.");
    valor = Number(prompt("Introduce un valor para el gasto."));
    fecha = prompt("Introduce una fecha con formato yyyy-mm-dd para el gasto.");
    etiquetas = prompt("Introduce las etiquetas correspondientes con formato etiqueta1,etiqueta2,etiqueta3 para para el gasto.");
    etiquetas = etiquetas.split(",");

    let nuevoGasto = new gp.CrearGasto(descripcion, valor, fecha, etiquetas);
    gp.anyadirGasto(nuevoGasto);
    repintar();
}
let btnAGrasto = document.getElementById("anyadirgasto");
btnAGrasto.addEventListener("click", nuevoGastoWeb);


function EditarHandle() {
    this.handleEvent = function() {
        let descripcion, valor, fecha, etiquetas;
        
        descripcion = prompt("Introduce una descripción nueva para el gasto.", this.gasto.descripcion);
        valor = Number(prompt("Introduce un valor nuevo para el gasto.", this.gasto.valor));
        fecha = prompt("Introduce una fecha nueva con formato yyyy-mm-dd para el gasto.", this.gasto.fecha);
        etiquetas = prompt("Introduce las etiquetas nuevas con formato etiqueta1,etiqueta2,etiqueta3 para para el gasto.", this.gasto.etiquetas.toString());
        etiquetas = etiquetas.split(",");

        this.gasto.actualizarValor(valor);
        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarFecha (fecha);

        let etiquetasCopia = [...this.gasto.etiquetas];

        for (let etiqueta of etiquetasCopia) {
            this.gasto.borrarEtiquetas(etiqueta);
        }
        this.gasto.anyadirEtiquetas(etiquetas);
        repintar();
    }
}

function BorrarHandle(){
    this.handleEvent = function(){
        gp.borrarGasto(this.gasto.id)
        repintar();
    }
}

function BorrarEtiquetasHandle(){
    this.handleEvent = function(){
        this.gasto.borrarEtiquetas(this.etiqueta)
        repintar();        
    }
}

function nuevoGastoWebFormulario(){
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
    var formulario = plantillaFormulario.querySelector("form");

}
function manejarSubmit(evento){
    evento.preventDefault()
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb
}