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
function mostrarGastosAgrupadosWeb(){

}
export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
};