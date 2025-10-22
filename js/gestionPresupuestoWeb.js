function mostrarDatoEnId(id, valor) {
    let tag = document.getElementById(id);
    tag.textContent = valor;
}

function mostrarGastoWeb(id, gasto) {
    let idElement = document.getElementById(id);
    

    let body = document.body;
    let mainDiv = document.createElement("div");
    mainDiv.setAttribute("gasto")
    body.append(mainDiv);

    let desc = mainDiv.createElement("div")
    desc.setAttribute("gasto-descripcion")
    desc.textContent = gasto.descripcion;
    mainDiv.append(desc)

    let fecha = mainDiv.createElement("div")
    fecha.setAttribute("gasto-fecha")
    fecha.textContent = gasto.fecha;
    mainDiv.append(fecha)

    let valor = mainDiv.createElement("div")
    valor.setAttribute("gasto-valor")
    valor.textContent = gasto.valor;

    let etiqueta = mainDiv.createElement("div");
    etiqueta.setAttribute("gasto-etiquetas")
    mainDiv.append(etiqueta);
    for (let tag in gasto.etiqueta) {
        let element = body.createElement("span")
        element.setAttribute("gasto-etiquetas-etiqueta")
        element.textContent = tag;
        etiqueta.append(element);
    }

}


function mostrarGastosAgrupadosWeb() {

}



export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}
