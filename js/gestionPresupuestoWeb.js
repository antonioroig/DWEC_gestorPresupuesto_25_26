function mostrarDatoEnId(id, valor) {
    let tag = document.getElementById(id);
    tag.textContent = valor;
}

function mostrarGastoWeb(id, gasto) {
    let idElement = document.getElementById(id);
    let body = document.body;

    for (let obj of gasto) {
        let mainDiv = document.createElement("div");
        mainDiv.setAttribute("class", "gasto")
        idElement.append(mainDiv);

        let desc = document.createElement("div")
        desc.setAttribute("class", "gasto-descripcion")
        desc.textContent = obj.descripcion;
        mainDiv.append(desc)

        let fecha = document.createElement("div")
        fecha.setAttribute("class", "gasto-fecha")
        fecha.textContent = obj.fecha;
        mainDiv.append(fecha)

        let valor = document.createElement("div")
        valor.setAttribute("class", "gasto-valor")
        valor.textContent = obj.valor;
        mainDiv.append(valor)

        let etiqueta = document.createElement("div");
        etiqueta.setAttribute("class", "gasto-etiquetas")
        mainDiv.append(etiqueta);
        for (let tag of obj.etiquetas) {
            let element = document.createElement("span")
            element.setAttribute("class", "gasto-etiquetas-etiqueta")
            element.textContent = tag;
            etiqueta.append(element);
            let br = document.createElement("br");
            etiqueta.append(br)
        }

        idElement.append(mainDiv)
    }
    

}


function mostrarGastosAgrupadosWeb() {

}



export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}
