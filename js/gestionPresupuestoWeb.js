import * as gestionPresupuesto from './gestionPresupuesto.js';

function mostrarDatoEnId(idElemento,valor){
    let elem = document.getElementById(idElemento);

    if (elem){
        elem.textContent = valor;
    }
}
function mostrarGastoWeb(idElemento, gasto){
let contenedor = document.getElementById(idElemento);

if (!contenedor){
    return;
}

let divGasto = document.createElement("div");
divGasto.className = "gasto";

let divDescripcion = document.createElement("div");
divDescripcion.className = "gasto-descripcion";
divDescripcion.textContent = gasto.descripcion;
divGasto.appendChild(divDescripcion);

let divFecha = document.createElement("div");
divFecha.className = "gasto-fecha";
let fecha = new Date(gasto.fecha);
divFecha.textContent = fecha.toLocaleDateString();
divGasto.appendChild(divFecha);

let divValor = document.createElement("div");
divValor.className = "gasto-valor";
divValor.textContent = gasto.valor;
divGasto.appendChild(divValor);

let divEtiquetas = document.createElement("div");
divEtiquetas.className = "gasto-etiquetas";

if (gasto.etiquetas && gasto.etiquetas.length > 0){
    gasto.etiquetas.forEach(element => {
        let span = document.createElement("span");
        span.className = "gasto-etiquetas-etiqueta";
        span.textContent = element;
        divEtiquetas.appendChild(span);
    });
}

divGasto.appendChild(divEtiquetas);
contenedor.appendChild(divGasto);
}
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let contenedor = document.getElementById(idElemento);
    if (!contenedor){
        return;
    }

    let divAgrupacion = document.createElement("div");
    divAgrupacion.classList.add("agrupacion");

    let nombrePeriodo = "";

    switch (periodo){
        case "dia":
            nombrePeriodo = "día";
            break;
        case "mes":
            nombrePeriodo = "mes";
            break;
        case "anyo":
            nombrePeriodo = "año";
            break;
    }

    let h1 = document.createElement("h1");
    h1.textContent = `Gastos agrupados por ${nombrePeriodo}`;
    divAgrupacion.appendChild(h1);

    for (let [clave, valor] of Object.entries(agrup)){
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
    let listadoGastosCompleto = document.getElementById("listado-gastos-completo");

    mostrarDatoEnId("presupuesto", gestionPresupuesto.mostrarPresupuesto());
    mostrarDatoEnId("gastosTotales", gestionPresupuesto.calcularTotalGastos());
    mostrarDatoEnId("balanceTotal", gestionPresupuesto.calcularBalance());
    listadoGastosCompleto.innerHTML = '';
    mostrarDatoEnId("listadoGastosCompleto", gestionPresupuesto.listarGastos());
}
function actualizarPresupuestoWeb(){
    let respuesta = prompt ('Introduce el presupuesto que tienes', '');
    let intPresu = parseInt(respuesta);
    if (!isNaN(intPresu)) {
        gestionPresupuesto.actualizarPresupuesto(intPresu);
        repintar();
      }
}
let botonActualizar = document.getElementById("actualizarpresupuesto");
let objActualizar = {
    handleEvent(event) {
        actualizarPresupuestoWeb();
      }  
};
botonActualizar.addEventListener("click", objActualizar);
export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb
};