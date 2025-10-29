"use strict";

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
    if (elemento) {
        let divGasto = document.createElement("div");
        divGasto.classList.add("gasto");
    }

    //descripción
    let divDescripcion = document.createElement("div");
    divDescripcion.classList.add("gasto-descripcion");
    divDescripcion.textContent = gasto.descripcion;
    divGasto.appendChild(divDescripcion);

    //fecha
    let divFecha = document.createElement("div");
    divFecha.classList.add("gasto-fecha");
    let fecha = new Date(gasto.fecha);
    divFecha.textContent = fecha.toLocaleDateString();
    divGasto.appendChild(divFecha);

    ///valor gasto
    let divValor = document.createElement("div");
    divValor.classList.add("gasto-valor");
    divValor.textContent = gasto.valor.toFixed(2);
    divGasto.appendChild(divValor);

    //div de etiquetas
    let divEtiquetas = document.createElement("div");
    divEtiquetas.classList.add("gasto-etiquetas");

    //span por cada etiqueta

    if (Array.isArray(gasto.etiquetas)) {
        gasto.etiquetas.forEach(etiqueta => {
            let spanEtiqueta = document.createElement("span");
            spanEtiqueta.classList.add("gasto-etiquetas-etiqueta");
            spanEtiqueta.textContent = etiqueta;
            divEtiquetas.appendChild(spanEtiqueta);
        });
    } else if (gasto.etiqueta) {
        let spanEtiqueta = document.createElement("span");
        spanEtiqueta.classList.add("gasto-etiquetas-etiqueta");
        spanEtiqueta.textContent = gasto.etiqueta;
        divEtiquetas.appendChild(spanEtiqueta);
    }
    divGasto.appendChild(divEtiquetas);

    elemento.appendChild(divGasto);


}

//función para mostrar gastos agrupados en web
export {
    mostrarDatoEnId,
    mostrarGastoWeb
    // mostrarGastosAgrupadosWeb
};