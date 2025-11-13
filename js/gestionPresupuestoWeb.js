import * as gp from './gestionPresupuesto.js'

function mostrarDatoEnId(idElemento, valor) {
    document.getElementById(idElemento).textContent = valor;
}

function mostrarGastoWeb(idElemento, gasto) {
    let elem = document.getElementById(idElemento)

    if (elem) {
        let etiquetasHTML = "";
        if (Array.isArray(gasto.etiquetas)) {
            for (let i = 0; i < gasto.etiquetas.length; i++) {
                etiquetasHTML += `<span class="gasto-etiquetas-etiqueta">${gasto.etiquetas[i]}</span><br>`;
            }
        }
        let gastoHTML =
            `<div class="gasto">
      <div class="gasto-descripcion">${gasto.descripcion}</div>
      <div class="gasto-fecha">${gasto.fecha}</div>
      <div class="gasto-valor">${gasto.valor}</div>
      <div class="gasto-etiquetas">
        ${etiquetasHTML}
      </div>
    </div><br>`;
        elem.innerHTML += gastoHTML;
    }
    else {
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
        this.descripcion = prompt("Introduce una descripción para el gasto.");
        this.valor = Number(prompt("Introduce un valor para el gasto."));
        this.fecha = prompt("Introduce una fecha con formato yyyy-mm-dd para el gasto.");
        this.etiquetas = prompt("Introduce las etiquetas correspondientes con formato etiqueta1,etiqueta2,etiqueta3 para para el gasto.");
        this.etiquetas = this.etiquetas.split(",");

        this.gasto.actualizarValor(this.valor);
        this.gasto.actualizarDescripcion(this.descripcion);
        this.gasto.actualizarFecha (this.fecha);
        this.gasto.anyadirEtiquetas(this.etiquetas);
        repintar();
    }
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle
}